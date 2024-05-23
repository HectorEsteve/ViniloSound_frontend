import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { environments } from '../../../../environments/environments';
import { RecordCompany } from '../../interfaces/record-companies.interface';

@Component({
  selector:     'app-record-company-card',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl:  './record-company-card.component.html',
  styleUrl:     './record-company-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordCompanyCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutCompany=this.router.url;
  }

  private router = inject( Router );

  @Input()
  public recordCompanies: RecordCompany[] = [];
}
