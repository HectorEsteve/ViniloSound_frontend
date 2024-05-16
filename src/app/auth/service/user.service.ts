import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserCacheStore } from '../interfaces/user-cache-store.interface';
import { DataUser } from '../interfaces/dataUser.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environments.baseUrl;

  private http = inject( HttpClient );

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

  createUser(user: DataUser): Observable<{ message: string, users: User[] }> {
    return this.http.post<{ message: string, users: User[] }>(`${this.baseUrl}/users`, user)
      .pipe(
        catchError(() => of ({ message: '', users: [] })),
      );
  }

  public login(email: string, password: string): Observable<{ message: string, user: User | null }> {
    return this.http.post<{ message: string, user: User | null }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response: { message: string, user: User | null }) => {
          this.cacheStoreUser = { user: response.user, token: 'DefaultToken' };
          this.saveToLocalStorage();
        }),
        catchError(() => of({ message: '', user: null })),
      );
  }

  public logout() {
    this.resetFromLocalStorage();
  }

  constructor() {this.loadFromLocalStorage()}

  private saveToLocalStorage(): void{
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

}
