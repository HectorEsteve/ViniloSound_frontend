export interface dataVinyl {
  name: string;
  publication_year: number;
  edition_year?: number | null;
  format_id?: number | null;
  record_company_id?: number | null;
  cover_url?: string | null;
  song_ids?: number[] | null;
  band_ids?: number[] | null;
}
