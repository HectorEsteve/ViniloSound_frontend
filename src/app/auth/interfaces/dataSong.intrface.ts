export interface dataSong {
  name: string;
  duration: number;
  lyrics: string;
  video_url?: string | null;
  audio_url?: string | null;
  band_id: number;
  genre_id?: number | null;
}
