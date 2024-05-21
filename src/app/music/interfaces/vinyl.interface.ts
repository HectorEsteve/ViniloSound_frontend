import { Band } from "./band.interface";
import { Format } from "./format.interface";
import { RecordCompany } from "./record-companies.interface";
import { Song } from "./song.interface";

export interface SearchVinyl {
  message: string;
  vinyls:  Vinyl[];
}

export interface Vinyl {
  id:               number;
  name:             string;
  cover_url:        null | string;
  publication_year: number;
  edition_year:     number;
  created_at:       Date;
  updated_at:       Date;
  format:           Format;
  record_company:   RecordCompany;
  bands:            Band[];
  songs:            Song[];
}

export interface BandPivot {
  vinyl_id: number;
  band_id:  number;
}

export interface SongPivot {
  vinyl_id: number;
  song_id:  number;
}
