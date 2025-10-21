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