export interface SearchFormat {
  message: string;
  formats: Format[];
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
