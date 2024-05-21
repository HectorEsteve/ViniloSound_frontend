import { Band } from "./band.interface";
import { Genre } from "./genre.interface";

export interface SearchSong {
  message: string;
  songs:   Song[];
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
  band:       Band;
}



