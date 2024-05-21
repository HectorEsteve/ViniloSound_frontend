import { User } from "../../auth/interfaces/user.interface";
import { Vinyl } from "./vinyl.interface";

export interface SearchCollection {
  message:     string;
  collections: Collection[];
}

export interface Collection {
  id:            number;
  name:          string;
  description:   null | string;
  number_vinyls: number;
  rating:        number;
  public:        number;
  created_at:    Date;
  updated_at:    Date;
  user:          User;
  vinyls:        Vinyl[];
}
