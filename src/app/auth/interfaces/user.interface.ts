import { Collection } from "../../music/interfaces/collection-interface";

export interface SearchUser {
  message: string;
  users:   User[];
}

export interface User {
  id:         number;
  name:       string;
  email:      string;
  password?:  string;
  connected:  number;
  points:     number;
  created_at: Date;
  updated_at: Date;
  roles:      Role[];
  collection: Collection | null;
}


export interface Role {
  id:         number;
  name:       Name;
  created_at: Date;
  updated_at: Date;
  pivot:      Pivot;
}

export enum Name {
  Admin = "admin",
  Superadmin = "superadmin",
  User = "user",
}

export interface Pivot {
  user_id: number;
  rol_id:  number;
}
