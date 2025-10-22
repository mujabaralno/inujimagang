import * as z from "zod";

export const facilityFormSchema = z.object({
  name: z.string().min(1, "Nama fasilitas wajib"),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  addressText: z.string().optional(),
  capacity: z.number().optional(),
  picName: z.string().optional(),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  contact: z
    .object({
      phone: z.string().optional(),
      email: z.string().email("Email tidak valid").optional(),
    })
    .optional(),
  facilities: z.array(z.string()).optional(),
  status: z.enum(["DIPINJAMKAN", "DISEWAKAN"]),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      address: z.string().optional(),
    })
    .optional(),
});

export type FacilityFormValues = z.infer<typeof facilityFormSchema>;
