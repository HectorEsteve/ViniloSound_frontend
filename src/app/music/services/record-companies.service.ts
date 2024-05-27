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

  public getRecordCompanies(): Observable<RecordCompany[]> {
    return this.http.get<{ message: string; recordCompanies: RecordCompany[] }>(`${this.baseUrl}/record-companies`)
      .pipe(
        map((response: { message: string; recordCompanies: RecordCompany[] }) => response.recordCompanies),
        catchError(() => of([]))
      );
  }

  public getRecordCompanyById(id: number): Observable<RecordCompany> {
    return this.http.get<{ message: string; recordCompany: RecordCompany }>(`${this.baseUrl}/record-companies/${id}`)
      .pipe(
        map((response: { message: string; recordCompany: RecordCompany }) => response.recordCompany)
      );
  }

  public createRecordCompany(recordCompany: RecordCompany): Observable<RecordCompany> {
    return this.http.post<{ message: string; recordCompany: RecordCompany }>(`${this.baseUrl}/record-companies`, recordCompany)
      .pipe(
        map((response: { message: string; recordCompany: RecordCompany }) => response.recordCompany)
      );
  }

  public updateRecordCompany(id: number, recordCompany: RecordCompany): Observable<RecordCompany> {
    return this.http.put<{ message: string; recordCompany: RecordCompany }>(`${this.baseUrl}/record-companies/${id}`, recordCompany)
      .pipe(
        map((response: { message: string; recordCompany: RecordCompany }) => response.recordCompany)
      );
  }

  public deleteRecordCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/record-companies/${id}`);
  }

  public searchRecordCompanyByName(term:string):Observable<RecordCompany[]>{
    return this.getRecordCompanies()
    .pipe(
      map((recordCompanies: RecordCompany[]) => {
        return recordCompanies.filter(recordCompanies => recordCompanies.name.toLowerCase().includes(term.toLowerCase()));
      })
    )
  }
}
