/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import Facility from "@/lib/database/models/facillity.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import type {
  CreateFacilityInput,
  UpdateFacilityInput,
  DeleteFacilityInput,
  FacilityDTO,
  ListFacilitiesParams,
  ListFacilitiesResult,
} from "@/types";
import FacilityCategory from "@/lib/database/models/facilityCategory.model";

/** Helper: ubah dokumen Mongoose -> DTO aman untuk UI */
function toDTO(doc: any): FacilityDTO {
  const catDoc = doc.categoryId && (doc.categoryId as any)._id
    ? (doc.categoryId as any)            // populated: { _id, name }
    : undefined;

  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description ?? undefined,
    photoUrl: doc.photoUrl ?? undefined,
    addressText: doc.addressText ?? undefined,
    capacity: typeof doc.capacity === "number" ? doc.capacity : undefined,
    picName: doc.picName ?? undefined,
    contact: doc.contact
      ? { phone: doc.contact.phone ?? undefined, email: doc.contact.email ?? undefined }
      : undefined,
    facilities: Array.isArray(doc.facilities) ? doc.facilities : [],
    status: doc.status,
    location:
      doc.location?.coordinates
        ? { lng: doc.location.coordinates[0], lat: doc.location.coordinates[1] }
        : undefined,

    // simpan keduanya: id mentah + data kategori hasil populate
    categoryId: doc.categoryId ? doc.categoryId.toString?.() ?? doc.categoryId : undefined,
    category: catDoc ? { id: catDoc._id.toString(), name: catDoc.name } : undefined,

    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}


const populateFacility = (query: any) => {
  return query.populate({
    path: "categoryId",           // << path di schema
    model: FacilityCategory,
    select: "_id name",
  });
};

/** Optional: path yang mau direvalidate setelah mutasi */
const DEFAULT_REVALIDATE_PATH = "/facilities";

/** CREATE */
export async function createFacility(
  input: CreateFacilityInput,
  opts?: { revalidate?: string }
): Promise<FacilityDTO> {
  await connectToDatabase();

  // Minimal validation
  if (!input.name || input.name.trim().length === 0) {
    throw new Error("Nama fasilitas wajib diisi");
  }

  const payload: Record<string, unknown> = {
    name: input.name.trim(),
    description: input.description?.trim(),
    photoUrl: input.photoUrl?.trim(),
    addressText: input.addressText?.trim(),
    capacity: typeof input.capacity === "number" ? input.capacity : undefined,
    picName: input.picName?.trim(),
    
    contact: input.contact
      ? {
          phone: input.contact.phone?.trim(),
          email: input.contact.email?.trim()?.toLowerCase(),
        }
      : undefined,
    facilities: input.facilities ?? [],
    status: input.status ?? "DIPINJAMKAN",
  };

  if (input.categoryId) {
  if (!Types.ObjectId.isValid(input.categoryId)) {
    throw new Error("ID kategori tidak valid");
  }
  payload.categoryId = new Types.ObjectId(input.categoryId);
}

  // Location → GeoJSON Point
  if (input.location) {
    payload.location = {
      type: "Point",
      coordinates: [input.location.lng, input.location.lat] as [number, number],
    };
  }

  const created = await Facility.create(payload);
  const dto = toDTO(created);

  revalidatePath(opts?.revalidate ?? DEFAULT_REVALIDATE_PATH);
  return dto;
}

/** UPDATE */
export async function updateFacility(
  input: UpdateFacilityInput,
  opts?: { revalidate?: string }
): Promise<FacilityDTO> {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(input.id)) {
    throw new Error("ID fasilitas tidak valid");
  }

  // Build update object hanya dari field yang ada
  const update: Record<string, unknown> = {};
  if (typeof input.name === "string") update.name = input.name.trim();
  if (typeof input.description === "string") update.description = input.description.trim();
  if (typeof input.photoUrl === "string") update.photoUrl = input.photoUrl.trim();
  if (typeof input.addressText === "string") update.addressText = input.addressText.trim();
  if (typeof input.capacity === "number") update.capacity = input.capacity;
  if (typeof input.picName === "string") update.picName = input.picName.trim();
  if (typeof input.status === "string") update.status = input.status;
  if (Array.isArray(input.facilities)) update.facilities = input.facilities;

  if (input.contact) {
    update.contact = {
      phone: input.contact.phone?.trim(),
      email: input.contact.email?.trim()?.toLowerCase(),
    };
  }

  if (input.categoryId && Types.ObjectId.isValid(input.categoryId)) {
  update.categoryId = new Types.ObjectId(input.categoryId);
}

  if (input.location) {
    update.location = {
      type: "Point",
      coordinates: [input.location.lng, input.location.lat] as [number, number],
    };
  }

  const updated = await Facility.findByIdAndUpdate(input.id, update, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Fasilitas tidak ditemukan");

  const dto = toDTO(updated);
  revalidatePath(opts?.revalidate ?? DEFAULT_REVALIDATE_PATH);
  return dto;
}

/** DELETE */
export async function deleteFacility(
  input: DeleteFacilityInput,
  opts?: { revalidate?: string }
): Promise<{ id: string }> {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(input.id)) {
    throw new Error("ID fasilitas tidak valid");
  }

  const deleted = await Facility.findByIdAndDelete(input.id);
  if (!deleted) throw new Error("Fasilitas tidak ditemukan");

  revalidatePath(opts?.revalidate ?? DEFAULT_REVALIDATE_PATH);
  return { id: input.id };
}

export async function getFacilities(): Promise<FacilityDTO[]> {
  await connectToDatabase();
  const docs = await populateFacility(
    Facility.find().sort({ createdAt: -1 })
  );
  return docs.map(toDTO);
}

export async function getFacilityById(id: string): Promise<FacilityDTO | null> {
  await connectToDatabase();
  const doc = await populateFacility(Facility.findById(id));
  return doc ? toDTO(doc) : null;
}


const populateCategory = (q: any) =>
  q.populate({ path: "categoryId", model: FacilityCategory, select: "_id name" });

// aman buat regex
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listFacilities({
  q,
  categoryId,
  page = 1,
  limit = 12,
}: ListFacilitiesParams) {
  await connectToDatabase();

  const filter: any = {};
  if (categoryId && categoryId !== "all") filter.categoryId = categoryId;

  // SUBSTRING search (case-insensitive) untuk name/description/addressText
  if (q && q.trim()) {
    const s = escapeRegex(q.trim());
    filter.$or = [
      { name:        { $regex: s, $options: "i" } },
      { description: { $regex: s, $options: "i" } },
      { addressText: { $regex: s, $options: "i" } },
    ];
  }

  const skip = (Math.max(page, 1) - 1) * limit;

  const query = Facility.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({ path: "categoryId", model: FacilityCategory, select: "_id name" })
    // collation agar pencarian dan sort lebih “longgar” (case/diacritic-insensitive)
    .collation({ locale: "id", strength: 1 });

  const [total, docs] = await Promise.all([
    Facility.countDocuments(filter),
    query,
  ]);

  const items = docs.map((d: any) => ({
    id: d._id.toString(),
    name: d.name,
    photoUrl: d.photoUrl ?? undefined,
    addressText: d.addressText ?? undefined,
    capacity: typeof d.capacity === "number" ? d.capacity : undefined,
    status: d.status as "DIPINJAMKAN" | "DISEWAKAN",
    category:
      d.categoryId && (d.categoryId as any)._id
        ? { id: (d.categoryId as any)._id.toString(), name: (d.categoryId as any).name }
        : undefined,
  }));

  const pageCount = Math.max(1, Math.ceil(total / limit));
  return { items, total, page, pageCount };
}