import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecordCompany } from '../../interfaces/record-companies.interface';
import { environments } from '../../../../environments/environments';


@Component({
  selector: 'redord-company-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './redord-company-info.component.html',
  styleUrl: './redord-company-info.component.css',
})
export class RedordCompanyInfoComponent implements OnInit {

  ngOnInit(): void {
    this.tempRout = environments.tempRoutCompany;
  }

  public tempRout: string = '';

  @Input()
  public recordCompany!: RecordCompany;
}
