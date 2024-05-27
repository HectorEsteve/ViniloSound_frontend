import { Song } from "./song.interface";

export interface SearchBand {
  message: string;
  bands:   Band[];
}

export interface Band {
  id:             number;
  name:           string;
  members_count:  number;
  members:        string;
  formation_year: number;
  country:        string;
  created_at?:     Date;
  updated_at?:     Date;
  songs:          Song[];
  editing?:       boolean;
  showMoreInfo?:  boolean;
}




