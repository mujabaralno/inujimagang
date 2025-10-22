export type CreateUserParams = {
  clerkId: string;
  email: string;
  photo: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type UpdateUserParams = {
  firstName?: string;
  lastName?: string;
  photo?: string;
  role?: string;
};

// types/facility.ts
export type FacilityStatus = "DIPINJAMKAN" | "DISEWAKAN";

/** Input lng/lat yang lebih enak dipakai dari UI */
export type LocationInput = {
  lng: number; // longitude
  lat: number; // latitude
};

export type ContactInput = {
  phone?: string;
  email?: string;
};

export type CreateFacilityInput = {
  name: string;
  description?: string;
  photoUrl?: string;
  addressText?: string;
  capacity?: number;
  picName?: string;
  contact?: ContactInput;
  categoryId?: string;
  facilities?: string[];
  status?: FacilityStatus; // default di model: "DIPINJAMKAN"
  location?: LocationInput; // opsional; kalau ada -> disimpan GeoJSON Point
};

export type UpdateFacilityInput = {
  id: string; // Mongo ObjectId (string)
} & Partial<Omit<CreateFacilityInput, "name">> & {
    // name juga boleh di-update, jadi tetap partial seluruh field
    name?: string;
    categoryId?: string;
  };

export type DeleteFacilityInput = {
  id: string; // Mongo ObjectId (string)
};

/** Bentuk data yang dikembalikan ke UI */
export type FacilityDTO = {
  id: string;
  name: string;
  description?: string;
  photoUrl?: string;
  addressText?: string;
  capacity?: number;
  picName?: string;
  contact?: ContactInput;
  facilities: string[];
  status: FacilityStatus;
  categoryId?: string;
  category?: { id: string; name: string };
  location?: { lng: number; lat: number };
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type CreateCategoryParams = {
  categoryName: string;
};


export type ListFacilitiesParams = {
  q?: string;
  categoryId?: string;
  page?: number;     // 1-based
  limit?: number;    // default 12
};

export type ListFacilitiesResult = {
  items: Array<{
    id: string;
    name: string;
    photoUrl?: string;
    addressText?: string;
    capacity?: number;
    status: "DIPINJAMKAN" | "DISEWAKAN";
    category?: { id: string; name: string };
  }>;
  total: number;
  page: number;
  pageCount: number;
};


  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }