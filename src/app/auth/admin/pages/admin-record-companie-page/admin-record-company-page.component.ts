import { Component, OnInit, inject } from '@angular/core';
import { RecordCompaniesService } from '../../../../music/services/record-companies.service';
import { RecordCompany } from '../../../../music/interfaces/record-companies.interface';

@Component({
  selector: 'app-admin-record-companie-page',
  templateUrl: './admin-record-company-page.component.html',
  styleUrl: './admin-record-company-page.component.css',
})
export class AdminRecordCompaniePageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.recordCompaniesService.searchRecordCompanyByName('')
      .subscribe(recordCompanies => {
        this.recordCompanies = recordCompanies;
        this.isLoading = false;
      });
  }

  private recordCompaniesService = inject( RecordCompaniesService );

  public isLoading: boolean = false;
  public recordCompanies: RecordCompany[] = [];
  public initialValue='';

  public clear(): void {
    this.recordCompanies=[];
    this.initialValue='';
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.recordCompaniesService.searchRecordCompanyByName(term)
      .subscribe(recordCompanies => {
        this.recordCompanies = recordCompanies;
        this.isLoading = false;
      });
  }
}
