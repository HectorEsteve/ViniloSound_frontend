export interface SearchGenre {
  message: string;
  genres:  Genre[];
}

export interface Genre {
  id:          number;
  name:        string;
  history:     string;
  description: string;
  created_at:  Date;
  updated_at:  Date;
}
