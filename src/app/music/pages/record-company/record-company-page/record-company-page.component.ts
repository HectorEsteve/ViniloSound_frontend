import { Component, OnInit, inject } from '@angular/core';
import { RecordCompany } from '../../../interfaces/record-companies.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordCompaniesService } from '../../../services/record-companies.service';
import { switchMap } from 'rxjs';

@Component({
  selector:     'app-record-company-page',
  templateUrl:  './record-company-page.component.html',
  styleUrl:     './record-company-page.component.css',

})
export class RecordCompanyPageComponent implements OnInit {

  public recordCompany?:RecordCompany;
  public isLoadin:boolean = false;

  private activatedRoute = inject( ActivatedRoute );
  private recordCompanyService = inject( RecordCompaniesService );
  private router = inject( Router );


  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.recordCompanyService.getRecordCompanyById(id))
    )
    .subscribe((recordCompany) =>{
      if(!recordCompany){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.recordCompany = recordCompany;
    });
  }

 }
