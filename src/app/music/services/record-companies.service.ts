import { HttpClient }                       from '@angular/common/http';
import { Injectable, inject }               from '@angular/core';
import { Observable, catchError, map, of }  from 'rxjs';

import { environments }   from '../../../environments/environments';
import { RecordCompany }  from '../interfaces/record-companies.interface';


@Injectable({
  providedIn: 'root'
})
export class RecordCompaniesService {

  private http = inject( HttpClient );

  private baseUrl= environments.baseUrl;

  public getRecordCompanies():Observable<RecordCompany[]> {
    return this.http.get<{ message: string, recordCompanies: RecordCompany[] }>(`${this.baseUrl}/recor-companies`)
    .pipe(
      map((response: { message: string, recordCompanies: RecordCompany[] })  => response.recordCompanies),
      catchError(() => of ([])),
    );
  }

  public getRecordCompanyById(id: number): Observable<RecordCompany> {
    return this.http.get<{ message: string, recordCompany: RecordCompany }>(`${this.baseUrl}/record-companies/${id}`)
      .pipe(
        map((response: { message: string, recordCompany: RecordCompany }) => response.recordCompany)
      );
  }
}
