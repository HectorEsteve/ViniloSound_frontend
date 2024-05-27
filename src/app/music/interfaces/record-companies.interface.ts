export interface SearchRecordCompanies {
  message:         string;
  recordCompanies: RecordCompany[];
}

export interface RecordCompany {
  id:             number;
  name:           string;
  logo_url:       string;
  active:         boolean;
  website_url:    string;
  created_at?:     Date;
  updated_at?:     Date;
  editing?:       boolean;
  showMoreInfo?:  boolean;
}
