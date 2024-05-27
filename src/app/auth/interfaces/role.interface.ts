export interface SearchRol {
  message: string;
  roles:   Role[];
}

export interface Role {
  id:         number;
  name:       Name;
  created_at: Date;
  updated_at: Date;
  editing?:   boolean;
}

export enum Name {
  Admin = "admin",
  Superadmin = "superadmin",
  User = "user",
}
