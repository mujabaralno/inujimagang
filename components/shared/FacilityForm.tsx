"use client";

import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Building2,
  MapPin,
  Image as ImageIcon,
  Users,
  Phone,
  AtSign,
  Package,
  BadgeCheck,
  Loader2,
  Info,
} from "lucide-react";

import {
  facilityFormSchema,
  FacilityFormValues,
} from "@/lib/validators/facility";
import { FacilityDefaultValues } from "@/constants";
import {
  createFacility,
  updateFacility,
  deleteFacility,
} from "@/actions/facility.actions";
import type { FacilityDTO } from "@/types";
import { FileUploader } from "./fileUploader";
import { getAddressFromCoords } from "@/utils/geolocation";
import Dropdown from "./CategoryDropdown";

const DynamicLocationPicker = dynamic(
  () => import("@/components/shared/LocationPicker"),
  { ssr: false }
);

type Props = {
  type: "Create" | "Update";
  initial?: FacilityDTO;
  revalidatePath?: string;
};

export default function FacilityForm({
  type,
  initial,
  revalidatePath = "/facilities",
}: Props) {
  const router = useRouter();

  const initialValues: FacilityFormValues =
    type === "Update" && initial
      ? {
          ...initial,
          status: initial.status ?? "DIPINJAMKAN",
        }
      : FacilityDefaultValues;

  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: initialValues,
    mode: "onTouched",
  });

  async function onSubmit(values: z.infer<typeof facilityFormSchema>) {
    try {
      if (type === "Create") {
        const created = await createFacility(
          {
            ...values,
            categoryId: values.categoryId, // ✅ kirim
            location: values.location
              ? { lng: values.location.lng, lat: values.location.lat }
              : undefined,
          },
          { revalidate: "/dashboard/all-facility" }
        );
        toast.success("Fasilitas berhasil dibuat");
        form.reset();
        router.push(`/dashboard/all-facility/${created.id}`);
      } else {
        if (!initial) return;
        const updated = await updateFacility(
          {
            id: initial.id,
            ...values,
            location: values.location
              ? { lng: values.location.lng, lat: values.location.lat }
              : undefined,
          },
          { revalidate: revalidatePath }
        );
        toast.success("Fasilitas berhasil diperbarui");
        router.push(`/dashboard/all-facility/${updated.id}`);
      }
    } catch (e) {
      console.error(e);
      toast.error(
        type === "Create"
          ? "Gagal membuat fasilitas"
          : "Gagal memperbarui fasilitas"
      );
    }
  }

  async function onDelete() {
    if (!initial) return;
    try {
      await deleteFacility({ id: initial.id }, { revalidate: revalidatePath });
      toast.success("Fasilitas dihapus");
      router.push(`/dashboard/all-facility`);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus fasilitas");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Section: Informasi Utama */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-700" />
            <h2 className="text-base font-semibold text-slate-900">
              Informasi Utama
            </h2>
          </div>

          {/* Nama Fasilitas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-slate-800">
                Nama Fasilitas<span className="text-rose-600">*</span>
              </Label>
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                <Info className="h-3.5 w-3.5" /> wajib
              </span>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Aula Serbaguna Garut"
                      autoFocus
                      autoCapitalize="sentences"
                      {...field}
                      className="h-12 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 text-base outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </FormControl>
                  <p className="mt-1 text-xs text-slate-500">
                    Gunakan nama yang mudah dikenali publik.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Nama Fasilitas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-slate-800">
                Nama Fasilitas<span className="text-rose-600">*</span>
              </Label>
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                <Info className="h-3.5 w-3.5" /> wajib
              </span>
            </div>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <p className="mt-1 text-xs text-slate-500">
                    Gunakan nama yang mudah dikenali publik.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Foto + Preview */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-800 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-indigo-600" />
              Foto Fasilitas
            </Label>
            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="rounded-xl border-2 border-indigo-200 bg-linear-to-br from-indigo-50 to-blue-50 p-4">
                        <FileUploader
                          value={field.value ?? ""}
                          onChange={(url) => field.onChange(url)}
                          // endpoint="imageUploader"
                        />
                      </div>

                      {/* Preview kecil + copy url */}
                      <div className="flex items-center gap-3">
                        <Input
                          readOnly
                          value={field.value ?? ""}
                          placeholder="URL foto akan muncul di sini"
                          className="h-11 flex-1 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                        />
                        {field.value ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={field.value}
                            alt="Preview"
                            className="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-slate-100 ring-1 ring-slate-200" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Section: Lokasi */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-700" />
            <h2 className="text-base font-semibold text-slate-900">
              Lokasi Fasilitas
            </h2>
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-3">
                    <div className="rounded-xl border-2 border-emerald-200 bg-linear-to-br from-green-50 to-emerald-50 p-4">
                      {/* Tinggi map dibuat proporsional dan full-width */}
                      <div className="h-[260px] w-full overflow-hidden rounded-lg ring-1 ring-emerald-100">
                        <DynamicLocationPicker
                          onLocationSelect={async (lat, lng) => {
                            const address = await getAddressFromCoords(
                              lat,
                              lng
                            );
                            field.onChange({
                              address,
                              lat,
                              lng,
                            });
                            form.setValue("addressText", address ?? "");
                          }}
                        />
                      </div>
                    </div>

                    <Input
                      readOnly
                      value={field.value?.address ?? ""}
                      placeholder="Alamat akan muncul setelah memilih titik peta"
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Section: Kapasitas & PIC */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-700" />
            <h2 className="text-base font-semibold text-slate-900">
              Kapasitas & Penanggung Jawab
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-slate-800">
                    Kapasitas
                  </Label>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      placeholder="Contoh: 200"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                    />
                  </FormControl>
                  <p className="mt-1 text-xs text-slate-500">
                    Jumlah maksimal pengguna dalam satu waktu.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="picName"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-slate-800">
                    Penanggung Jawab
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="Nama PIC"
                      {...field}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-teal-600" />
                    No. Telepon
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="+62 812 3456 7890"
                      {...field}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-pink-600" />
                    E-mail
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="nama@domain.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Section: Fasilitas & Status */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-700" />
            <h2 className="text-base font-semibold text-slate-900">
              Fasilitas & Status
            </h2>
          </div>

          <FormField
            control={form.control}
            name="facilities"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium text-slate-800">
                  Fasilitas (pisahkan dengan koma)
                </Label>
                <FormControl>
                  <Input
                    placeholder="Sound system, Proyektor, AC"
                    value={(field.value ?? []).join(", ")}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                    className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 px-3"
                  />
                </FormControl>
                <p className="mt-1 text-xs text-slate-500">
                  Contoh: “Kursi lipat, Panggung, Karpet, Wifi”.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-indigo-600" />
                  Status
                </Label>
                <FormControl>
                  <select
                    {...field}
                    className="h-11 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 focus:bg-white"
                  >
                    <option value="DIPINJAMKAN">Dipinjamkan</option>
                    <option value="DISEWAKAN">Disewakan</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Section: Deskripsi */}
        <section className="space-y-2">
          <Label className="text-sm font-medium text-slate-800 flex items-center gap-2">
            <Package className="h-4 w-4 text-orange-600" />
            Deskripsi
          </Label>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tuliskan deskripsi, aturan pemakaian, jam operasional, syarat & ketentuan, dll."
                    {...field}
                    className="min-h-32 rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-3 text-base focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Sticky Action Bar (mobile) */}
        <div className=" z-10">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-white/95 p-3 shadow-lg ring-1 ring-slate-200 backdrop-blur supports-backdrop-filter:bg-white/70">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-12 w-full rounded-xl bg-[#25388C] font-semibold text-white shadow hover:brightness-110 disabled:opacity-60"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>
                      {type === "Create" ? "Membuat..." : "Menyimpan..."}
                    </span>
                  </div>
                ) : (
                  <span>
                    {type === "Create" ? "Create Facility" : "Save Changes"}
                  </span>
                )}
              </Button>

              {type === "Update" && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                  className="h-12 w-full rounded-xl font-semibold shadow"
                >
                  Hapus Fasilitas
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
