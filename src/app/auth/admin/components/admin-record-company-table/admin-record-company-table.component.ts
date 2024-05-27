import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { RecordCompany } from '../../../../music/interfaces/record-companies.interface';
import { RecordCompaniesService } from '../../../../music/services/record-companies.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-record-company-table',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
  ],
  templateUrl: './admin-record-company-table.component.html',
  styleUrl: './admin-record-company-table.component.css',
})
export class AdminRecordCompanyTableComponent implements OnChanges, OnInit {
  @Input() recordCompanies: RecordCompany[] = [];
  public filteredRecordCompanies: RecordCompany[] = [];
  public isLoading: boolean = false;
  public showAddRecordCompanyForm: boolean = false;
  public newRecordCompany: RecordCompany = { id: 0, name: '', logo_url: '', active: false, website_url: '' };
  public showConfirmDialog: boolean = false;
  public confirmMessage: string = '';
  private recordCompanyIdToDelete: number | null = null;
  private recordCompaniesService = inject(RecordCompaniesService);

  ngOnInit(): void {
    this.filteredRecordCompanies = this.recordCompanies;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recordCompanies'] && changes['recordCompanies'].currentValue) {
      this.filteredRecordCompanies = this.recordCompanies;
    }
  }

  public confirmDelete(recordCompanyId: number): void {
    this.recordCompanyIdToDelete = recordCompanyId;
    this.confirmMessage = '¿Está seguro de que desea eliminar esta compañía discográfica?';
    this.showConfirmDialog = true;
  }

  public handleConfirm(confirm: boolean): void {
    if (confirm && this.recordCompanyIdToDelete !== null) {
      this.deleteRecordCompany(this.recordCompanyIdToDelete);
    }
    this.showConfirmDialog = false;
    this.recordCompanyIdToDelete = null;
  }

  public deleteRecordCompany(recordCompanyId: number): void {
    this.recordCompaniesService.deleteRecordCompany(recordCompanyId).subscribe(
      () => {
        this.filteredRecordCompanies = this.filteredRecordCompanies.filter(recordCompany => recordCompany.id !== recordCompanyId);
      },
      error => {
        console.error('Error deleting record company:', error);
      }
    );
  }

  addRecordCompany(): void {
    if (this.newRecordCompany.name.trim()) {
      this.recordCompaniesService.createRecordCompany(this.newRecordCompany).subscribe(
        (createdRecordCompany) => {
          this.filteredRecordCompanies.push(createdRecordCompany);
          this.newRecordCompany = { id: 0, name: '', logo_url: '', active: false, website_url: '' };
          this.showAddRecordCompanyForm = false;
        },
        error => {
          console.error('Error creating record company:', error);
        }
      );
    }
  }

  public toggleAddRecordCompanyForm(): void {
    this.showAddRecordCompanyForm = !this.showAddRecordCompanyForm;
  }

  public editRecordCompany(recordCompany: RecordCompany): void {
    recordCompany.editing = true;
  }

  public cancelEdit(recordCompany: RecordCompany): void {
    recordCompany.editing = false;
    this.loadRecordCompanies();
  }

  updateRecordCompany(recordCompany: RecordCompany): void {
    if (recordCompany.name.trim()) {
      this.recordCompaniesService.updateRecordCompany(recordCompany.id, recordCompany).subscribe(
        (updatedRecordCompany) => {
          Object.assign(recordCompany, updatedRecordCompany);
          recordCompany.editing = false;
        },
        error => {
          console.error('Error updating record company:', error);
        }
      );
    }
  }

  public toggleMoreInfo(recordCompany: RecordCompany): void {
    recordCompany.showMoreInfo = !recordCompany.showMoreInfo;
  }

  public loadRecordCompanies(): void {
    this.recordCompaniesService.getRecordCompanies().subscribe((recordCompanies) => {
      this.filteredRecordCompanies = recordCompanies;
      this.filteredRecordCompanies.forEach(recordCompany => recordCompany.editing = false);
    });
  }
}

