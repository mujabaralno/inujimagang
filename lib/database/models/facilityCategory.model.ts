import mongoose, { Schema, Document, models } from "mongoose";

export interface IFacilityCategory extends Document {
  name: string;     
  createdAt: Date;
  updatedAt: Date;
}

const FacilityCategorySchema = new Schema<IFacilityCategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FacilityCategory =
  models.FacilityCategory ||
  mongoose.model<IFacilityCategory>("FacilityCategory", FacilityCategorySchema);

export default FacilityCategory;
