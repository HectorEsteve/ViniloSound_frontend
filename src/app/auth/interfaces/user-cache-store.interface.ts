import { User } from "./user.interface";


export interface UserCacheStore{
  user:User|null;
  token:string;
}


