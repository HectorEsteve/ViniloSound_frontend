export interface CollectionCacheStore{
  byUser:Termcollection;
  byName:Termcollection;
  byVinyl:Termcollection;
  byBand:Termcollection;
}

export interface Termcollection{
  term:string;
}
