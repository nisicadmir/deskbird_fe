export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  id: number;
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserJwtPayload = Pick<IUser, "id" | "email" | "role">;

/**
 * Model for manipulating user in database
 */
export type UserCreateModel = Pick<
  IUser,
  "email" | "password" | "role" | "fullName"
>;
export type UserUpdateModel = Pick<IUser, "fullName" | "role">;

export type UserResponseModel = Pick<
  IUser,
  "id" | "email" | "fullName" | "role" | "createdAt" | "updatedAt"
>;
export type UserListResponseModel = UserResponseModel[];
