import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserCacheStore } from '../interfaces/user-cache-store.interface';
import { DataUser } from '../interfaces/dataUser.interface';
import { DataCollection } from '../interfaces/dataCollection.interface';
import { CollectionService } from '../../music/services/collection.service';
import { Collection } from '../../music/interfaces/collection-interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environments.baseUrl;

  private http = inject( HttpClient );
  private collectionService= inject ( CollectionService );

  public cacheStoreUser: UserCacheStore = {
    user: null,
    token: ''

  }

  getUsers(): Observable<{ message: string, users: User[] }> {
    return this.http.get<{ message: string, users: User[] }>(`${this.baseUrl}/users`)
   .pipe(
      catchError(() => of ({ message: '', users: [] })),
    );
  }

  getUser(id: number): Observable<{ message: string, user: User | null}> {
  return this.http.get<{ message: string, user: User }>(`${this.baseUrl}/users/${id}?include=collection`)
   .pipe(
      catchError(() => of ({ message: '', user: null })),
    );
}


  createUser(user: DataUser): Observable<{ message: string, users: User[] }> {
    return this.http.post<{ message: string, users: User[] }>(`${this.baseUrl}/users`, user)
      .pipe(
        catchError(() => of ({ message: '', users: [] })),
      );
  }

  updateUser(user: DataUser, id: number): Observable<{ message: string, user: User | null }> {
    return this.http.put<{ message: string, user: User }>(`${this.baseUrl}/users/${id}`, user)
      .pipe(
        tap((response: { message: string, user: User | null }) => {
          if (response.user) {
            this.cacheStoreUser = { user: response.user, token: 'DefaultToken' };
            this.saveToLocalStorage();
          }
        }),
        catchError(() => of({ message: '', user: null })),
      );
  }

  deleteUser(id: number): Observable<{ message: string, user: User | null }> {
    return this.http.delete<{ message: string, user: User | null }>(`${this.baseUrl}/users/${id}`)
      .pipe(
        catchError(() => of({ message: '', user: null })),
      );
  }

  public addCollection(collection: DataCollection, user: User): Observable<User> {
    return this.collectionService.createCollection(collection)
        .pipe(
            map((response: Collection | null) => {
                if (response) {
                    user.collection = response;
                    this.cacheStoreUser = { user: user, token: 'DefaultToken' };
                    this.saveToLocalStorage();
                }
                return user;
            }),
            catchError(error => {
                console.error('Error creating collection:', error);
                return of(user);
            })
        );
  }

  public updateCollection(collection: DataCollection, collectionId: number): Observable<Collection | null> {
    return this.collectionService.updateCollection(collection, collectionId).pipe(
      tap((response: Collection | null) => {
        if (response && this.cacheStoreUser.user) {
          this.cacheStoreUser.user.collection = response;
          this.saveToLocalStorage();
        }
      }),
      catchError(() => of(null))
    );
  }

  public deleteCollection(id: number): Observable<{ message: string, collection: Collection | null }> {
    return this.collectionService.deleteCollection(id).pipe(
      tap(() => {
          this.cacheStoreUser.user!.collection = null;
          this.saveToLocalStorage();
      })
    );
  }


  public login(email: string, password: string): Observable<{ message: string, user: User | null }> {
    return this.http.post<{ message: string, user: User | null }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response: { message: string, user: User | null }) => {
          if (response.user) {
            this.cacheStoreUser = { user: response.user, token: 'DefaultToken' };
            this.saveToLocalStorage();
          }
        }),
        catchError(() => of({ message: '', user: null })),
      );
  }

  public logout() {
    this.resetFromLocalStorage();
  }

  public checkAuth(email: string, password: string): Observable<boolean> {
    const body = { email, password };
    return this.http.post<boolean>(`${this.baseUrl}/check-auth`, body);
  }
  public checkEmail(email: string): Observable<boolean> {
    const body = { email };
    return this.http.post<boolean>(`${this.baseUrl}/check-email`, body);
  }

  constructor() {this.loadFromLocalStorage()}

  public saveToLocalStorage(): void{
    localStorage.setItem('cacheStoreUser',JSON.stringify(this.cacheStoreUser));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStoreUser')) return;
    this.cacheStoreUser = JSON.parse(localStorage.getItem('cacheStoreUser')!);
  }

  public resetFromLocalStorage(): void {
    this.cacheStoreUser = JSON.parse(localStorage.getItem('cacheStoreUser')!);
      this.cacheStoreUser.user = null;
      this.cacheStoreUser.token = '';
      localStorage.setItem('cacheStoreUser', JSON.stringify(this.cacheStoreUser));
      localStorage.removeItem('cacheStoreUser');
  };

  public get currentUser(): User | null {
    if (!this.cacheStoreUser) return null;
    return this.cacheStoreUser.user;
  }

  checkIfAdmin(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-admin/${userId}`)
  }

  checkIfRoot(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-root/${userId}`)
  }

  public addVinylToUserCollection(collectionId: number, vinylId: number): Observable<Collection | null> {
    return this.collectionService.addVinylToCollection(collectionId, vinylId)
      .pipe(
        map(response => {
          if (response) {
            this.cacheStoreUser.user!.collection = response;
            this.saveToLocalStorage();
          }
          return response;
        }),
        catchError(() => of(null))
      );
  }


  public removeVinylFromUserCollection(collectionId: number, vinylId: number): Observable<Collection | null> {
    return this.collectionService.removeVinylFromCollection(collectionId, vinylId)
      .pipe(
        map(response => {
          if (response) {
            this.cacheStoreUser.user!.collection = response;
            this.saveToLocalStorage();
          }
          return response;
        }),
        catchError(() => of(null))
      );
  }


}
