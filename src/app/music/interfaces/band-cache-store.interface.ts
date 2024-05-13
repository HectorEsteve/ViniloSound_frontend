import { Band } from "./band.interface";

export interface BandCacheStore{
  byName:Termbands;
  byGenre:Termbands;
}

export interface Termbands{
  term:string;
  bands:Band[]
}
