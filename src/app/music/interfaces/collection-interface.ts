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

export interface User {
  id:         number;
  name:       string;
  email:      string;
  connected:  number;
  points:     number;
  created_at: Date;
  updated_at: Date;
}

export interface Vinyl {
  id:               number;
  name:             string;
  cover_url:        null | string;
  publication_year: number;
  edition_year:     number;
  created_at:       Date;
  updated_at:       Date;
  pivot:            VinylPivot;
  format:           Format;
  record_company:   RecordCompany;
  bands:            Band[];
  songs:            Song[];
}

export interface Band {
  id:             number;
  name:           string;
  members_count:  number;
  members:        string;
  formation_year: number;
  country:        string;
  created_at:     Date;
  updated_at:     Date;
  pivot?:         BandPivot;
}

export interface BandPivot {
  vinyl_id: number;
  band_id:  number;
}

export interface Format {
  id:            number;
  name:          string;
  diameter:      number;
  rpm:           string;
  duration_side: number;
  created_at:    Date;
  updated_at:    Date;
}

export interface VinylPivot {
  collection_id: number;
  vinyl_id:      number;
}

export interface RecordCompany {
  id:          number;
  name:        string;
  logo_url:    string;
  active:      number;
  website_url: string;
  created_at:  Date;
  updated_at:  Date;
}

export interface Song {
  id:         number;
  name:       string;
  duration:   number;
  lyrics:     string;
  video_url:  null | string;
  audio_url:  null | string;
  created_at: Date;
  updated_at: Date;
  pivot:      SongPivot;
  genre:      Genre;
  band:       Band;
}

export interface Genre {
  id:          number;
  name:        string;
  history:     string;
  description: string;
  created_at:  Date;
  updated_at:  Date;
}

export interface SongPivot {
  vinyl_id: number;
  song_id:  number;
}
