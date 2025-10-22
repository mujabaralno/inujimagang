import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email:   { type: String, required: true, unique: true, index: true },
    photo:   { type: String, required: true },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
      required: true,
    },
    organizationId: { type: String },
  },
  { timestamps: true }
);

// (opsional) pastikan unique index dibuat
UserSchema.index({ clerkId: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

const User = models?.User || model("User", UserSchema);
export default User;
