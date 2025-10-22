import mongoose, { Schema, model, models, Document } from "mongoose";

export type FacilityStatus = "DIPINJAMKAN" | "DISEWAKAN";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export interface IFacility extends Document {
  name: string;
  description?: string;
  photoUrl?: string;
  location?: GeoPoint;
  addressText?: string;
  capacity?: number;
  picName?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
  facilities?: string[];
  categoryId: { _id: string, name: string }; 
  status: FacilityStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IFacility["contact"]>(
  {
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s\-()]{6,20}$/, "Nomor telepon tidak valid"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email tidak valid"],
    },
  },
  { _id: false }
);

const LocationSchema = new Schema<GeoPoint>(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v: number[]) =>
          Array.isArray(v) &&
          v.length === 2 &&
          v[0] >= -180 &&
          v[0] <= 180 &&
          v[1] >= -90 &&
          v[1] <= 90,
        message: "Koordinat harus [lng, lat]",
      },
    },
  },
  { _id: false }
);

const FacilitySchema = new Schema<IFacility>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    photoUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/i, "URL foto tidak valid"],
    },
    location: {
      type: LocationSchema,
      required: false,
    },
    addressText: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    capacity: {
      type: Number,
      min: 0,
    },
    picName: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    contact: {
      type: ContactSchema,
      default: undefined,
    },
    facilities: {
      type: [String],
      default: [],
    },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "FacilityCategory", 
      required: true 
    },
    status: {
      type: String,
      enum: ["DIPINJAMKAN", "DISEWAKAN"],
      default: "DIPINJAMKAN",
      required: true,
    },
  },
  { timestamps: true }
);

FacilitySchema.index({ name: "text", description: "text" });
FacilitySchema.index({ location: "2dsphere" });

const Facility =
  models.Facility || model<IFacility>("Facility", FacilitySchema);

export default Facility;
