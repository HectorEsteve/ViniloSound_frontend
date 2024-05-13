export interface SearchRecordCompanies {
  message:         string;
  recordCompanies: RecordCompany[];
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
