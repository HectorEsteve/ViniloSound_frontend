import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { CollectionCacheStore } from '../interfaces/collection-cache-store.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Collection } from '../interfaces/collection-interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public cacheStoreCollection: CollectionCacheStore = {
    byName:     {term: '', collections:[]},
    byUser:     {term: '', collections:[]},
    byVinyl:    {term: '', collections:[]},
    byBand:     {term: '', collections:[]},
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStoreCollections',JSON.stringify(this.cacheStoreCollection));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStoreBands')) return;
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
  }

  public resetFromLocalStorageByName(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byName.collections = [];
      this.cacheStoreCollection.byName.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  public resetFromLocalStorageByUser(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byUser.collections = [];
      this.cacheStoreCollection.byUser.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  public resetFromLocalStorageByVinyl(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byVinyl.collections = [];
      this.cacheStoreCollection.byVinyl.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  public resetFromLocalStorageByBand(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byBand.collections = [];
      this.cacheStoreCollection.byBand.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  getCollections():Observable<Collection[]> {
    return this.http.get<{ message: string, collections: Collection[] }>(`${this.baseUrl}/collections`)
    .pipe(
      map((response: { message: string, collections: Collection[] })  => response.collections),
      catchError(() => of ([])),
    );
  }

  getCollectionById(id: number): Observable<Collection> {
    return this.http.get<{ message: string, collection: Collection }>(`${this.baseUrl}/collections/${id}`)
      .pipe(
        map((response: { message: string, collection: Collection }) => response.collection)
      );
  }

  searchCollectionsByName(term:string):Observable<Collection[]>{
    return this.getCollections()
    .pipe(
      map((collections: Collection[]) => {
        return collections.filter(collections => collections.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( collections => this.cacheStoreCollection.byName = { term: term, collections: collections}),
      tap (() => this.saveToLocalStorage()),
    )
  }

  searchCollectionByUser(term: string): Observable<Collection[]> {
    return this.getCollections()
      .pipe(
        map((collections: Collection[]) => {
          return collections.filter(collection =>
            collection.user.name.toLowerCase().includes(term.toLowerCase())
          );
        }),
        tap( collections => this.cacheStoreCollection.byUser = { term: term, collections: collections}),
        tap (() => this.saveToLocalStorage()),
      );
  }

  searchCollectionByVinyl(term: string): Observable<Collection[]> {
    return this.getCollections()
      .pipe(
        map((collections: Collection[]) => {
          return collections.filter(collection =>
            collection.vinyls.some(vinyl =>
              vinyl.name.toLowerCase().includes(term.toLowerCase())
            )
          );
        }),
        tap(collections => {
          this.cacheStoreCollection.byVinyl = { term: term, collections: collections };
          this.saveToLocalStorage();
        })
    );
  }

  searchCollectionsByBand(term: string): Observable<Collection[]> {
    return this.getCollections().pipe(
      map((collections: Collection[]) => {
        return collections.filter(collection =>
          collection.vinyls.some(vinyl =>
            vinyl.bands.some(band =>
              band.name.toLowerCase().includes(term.toLowerCase())
            )
          )
        );
      }),
        tap(collections => {
          this.cacheStoreCollection.byBand = { term: term, collections: collections };
          this.saveToLocalStorage();
        })
    );
  }

}
