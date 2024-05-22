import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { CollectionCacheStore } from '../interfaces/collection-cache-store.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Collection } from '../interfaces/collection-interface';
import { DataCollection } from '../../auth/interfaces/dataCollection.interface';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private http = inject( HttpClient );
  private baseUrl= environments.baseUrl;

  public cacheStoreCollection: CollectionCacheStore = {
    byName:     {term: ''},
    byUser:     {term: ''},
    byVinyl:    {term: ''},
    byBand:     {term: ''},
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStoreCollections',JSON.stringify(this.cacheStoreCollection));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStoreCollections')) return;
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
  }

  public resetFromLocalStorageByName(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byName.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  public resetFromLocalStorageByUser(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byUser.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  public resetFromLocalStorageByVinyl(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
      this.cacheStoreCollection.byVinyl.term = '';
      localStorage.setItem('cacheStoreCollections', JSON.stringify(this.cacheStoreCollection));
  };

  public resetFromLocalStorageByBand(): void {
    this.cacheStoreCollection = JSON.parse(localStorage.getItem('cacheStoreCollections')!);
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

  getRandomCollections(limit: number): Observable<Collection[]> {
    let params = new HttpParams().set('limit', limit.toString());
    return this.http.get<{ message: string, collections: Collection[] }>(`${this.baseUrl}/collections/random`, { params })
      .pipe(
        map(response => response.collections),
        catchError(() => of([]))
      );
  }

  getCollectionById(id: number): Observable<Collection> {
    return this.http.get<{ message: string, collection: Collection }>(`${this.baseUrl}/collections/${id}`)
      .pipe(
        map((response: { message: string, collection: Collection }) => response.collection)
      );
  }

  createCollection(collection: DataCollection): Observable<Collection | null> {
    return this.http.post<{ message: string, collection: Collection }>(`${this.baseUrl}/collections`, collection)
      .pipe(
        map(response => response.collection),
        catchError(() => of(null))
      );
  }

  updateCollection(collection: DataCollection, id: number): Observable<Collection | null> {
    return this.http.put<{ message: string, collection: Collection }>(`${this.baseUrl}/collections/${id}`, collection)
      .pipe(
        map(response => response.collection),
        catchError(() => of(null))
      );
  }

  deleteCollection(id: number): Observable<{ message: string, collection: Collection | null }> {
    return this.http.delete<{ message: string, collection: Collection | null }>(`${this.baseUrl}/collections/${id}`)
      .pipe(
        catchError(() => of({ message: '', collection: null })),
      );
  }

  searchCollectionsByName(term:string):Observable<Collection[]>{
    return this.getCollections()
    .pipe(
      map((collections: Collection[]) => {
        return collections.filter(collections => collections.name.toLowerCase().includes(term.toLowerCase()));
      }),
      tap( collections => this.cacheStoreCollection.byName = { term: term}),
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
        tap( collections => this.cacheStoreCollection.byUser = { term: term}),
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
          this.cacheStoreCollection.byVinyl = { term: term};
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
          this.cacheStoreCollection.byBand = { term: term};
          this.saveToLocalStorage();
        })
    );
  }

  public addVinylToCollection(collectionId: number, vinylId: number): Observable<Collection | null> {
    return this.http.post<{ message: string, collection: Collection }>(`${this.baseUrl}/collections/${collectionId}/add-vinyl`, { vinyl_id: vinylId })
      .pipe(
        map(response => response.collection),
        catchError(() => of(null)),
      );
  }

  public removeVinylFromCollection(collectionId: number, vinylId: number): Observable<Collection | null> {
    return this.http.post<{ message: string, collection: Collection }>(`${this.baseUrl}/collections/${collectionId}/remove-vinyl`, { vinyl_id: vinylId })
      .pipe(
        map(response => response.collection),
        catchError(() => of(null)),
      );
  }

}
