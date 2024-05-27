import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable, map }    from 'rxjs';

import { environments }     from '../../../environments/environments';
import { Role, SearchRol }  from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})

export class RolService {

  private baseUrl = environments.baseUrl;

  private http = inject( HttpClient );


  public getRoles(): Observable<Role[]> {
    return this.http.get<SearchRol>(`${this.baseUrl}/roles`).pipe(
      map(response => response.roles)
    );
  }

  public getRoleById(id: number): Observable<Role> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<{ message: string; rol: Role }>(url).pipe(
      map(response => response.rol)
    );
  }

  public createRole(role: Role): Observable<Role> {
    return this.http.post<{ message: string; rol: Role }>(`${this.baseUrl}/roles`, role).pipe(
      map(response => response.rol)
    );
  }

  public updateRole(id: number, role: Role): Observable<Role> {
    const url = `${this.baseUrl}/roles/${id}`;
    return this.http.put<{ message: string; rol: Role }>(url, role).pipe(
      map(response => response.rol)
    );
  }

  public deleteRole(id: number): Observable<Role> {
    const url = `${this.baseUrl}/roles/${id}`;
    return this.http.delete<{ message: string; rol: Role }>(url).pipe(
      map(response => response.rol)
    );
  }
}


