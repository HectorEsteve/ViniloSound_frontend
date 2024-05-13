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
  created_at:     Date;
  updated_at:     Date;
  songs:          Song[];
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
  genre:      Genre;
}

export interface Genre {
  id:          number;
  name:        string;
  history:     string;
  description: string;
  created_at:  Date;
  updated_at:  Date;
}
