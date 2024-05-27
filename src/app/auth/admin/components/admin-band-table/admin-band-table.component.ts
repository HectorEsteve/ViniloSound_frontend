import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Band } from '../../../../music/interfaces/band.interface';
import { BandService } from '../../../../music/services/band.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { DataBand } from '../../../interfaces/dataBand.interface';



@Component({
  selector: 'app-admin-band-table',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
  ],
  templateUrl: './admin-band-table.component.html',
  styleUrl: './admin-band-table.component.css',
})
export class AdminBandTableComponent implements OnChanges, OnInit {
  @Input() bands: Band[] = [];
  public filteredBands: Band[] = [];
  public isLoading: boolean = false;
  public showAddBandForm: boolean = false;
  public newBand: Band = {
    id: 0,
    name: '',
    members_count: 0,
    members: '',
    formation_year: 0,
    country: '',
    songs: []
  };
  public showConfirmDialog: boolean = false;
  public confirmMessage: string = '';
  private bandIdToDelete: number | null = null;
  private bandService = inject(BandService);

  ngOnInit(): void {
    this.filteredBands = this.bands;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bands'] && changes['bands'].currentValue) {
      this.filteredBands = this.bands;
    }
  }

  public confirmDelete(bandId: number): void {
    this.bandIdToDelete = bandId;
    this.confirmMessage = '¿Está seguro de que desea eliminar esta banda?';
    this.showConfirmDialog = true;
  }

  public handleConfirm(confirm: boolean): void {
    if (confirm && this.bandIdToDelete !== null) {
      this.deleteBand(this.bandIdToDelete);
    }
    this.showConfirmDialog = false;
    this.bandIdToDelete = null;
  }

  public deleteBand(bandId: number): void {
    this.bandService.deleteBand(bandId).subscribe(
      response => {
        this.filteredBands = this.filteredBands.filter(band => band.id !== bandId);
      },
      error => {
        console.error('Error deleting band:', error);
      }
    );
  }

  addBand(): void {
    if (this.newBand.name.trim()) {
      this.bandService.createBand({
        name: this.newBand.name,
        members_count: this.newBand.members_count,
        members: this.newBand.members,
        formation_year: this.newBand.formation_year,
        country: this.newBand.country
      } as Band).subscribe(
        (createdBand) => {
          this.filteredBands.push(createdBand);
          this.newBand = {
            id: 0,
            name: '',
            members_count: 0,
            members: '',
            formation_year: 0,
            country: '',
            songs: []
          };
          this.showAddBandForm = false;
        },
        (error) => {
          console.error('Error creating band:', error);
        }
      );
    }
  }

  public toggleAddBandForm(): void {
    this.showAddBandForm = !this.showAddBandForm;
  }

  public editBand(band: Band): void {
    band.editing = true;
  }

  public cancelEdit(band: Band): void {
    band.editing = false;
    this.loadBands();
  }

  public updateBand(band: Band): void {
    if (band.name.trim()) {
      const updatedBand: DataBand = {
        name: band.name,
        members_count: band.members_count,
        members: band.members || null,
        formation_year: band.formation_year,
        country: band.country,
      };

      this.bandService.updateBand(band.id, updatedBand).subscribe(
        (responseBand) => {
          Object.assign(band, responseBand);
          band.editing = false;
        },
        (error) => {
          console.error('Error updating band:', error);
        }
      );
    }
  }

  public toggleMoreInfo(band: Band): void {
    band.showMoreInfo = !band.showMoreInfo;
  }

  public loadBands(): void {
    this.bandService.getBands().subscribe((bands) => {
      this.filteredBands = bands;
      this.filteredBands.forEach(band => band.editing = false);
    });
  }
}
