import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Format } from '../../../../music/interfaces/format.interface';
import { FormatService } from '../../../../music/services/format.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-format-table',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
  ],
  templateUrl: './admin-format-table.component.html',
  styleUrl: './admin-format-table.component.css',
})

export class AdminFormatTableComponent implements OnChanges, OnInit {
  @Input() formats: Format[] = [];
  public filteredFormats: Format[] = [];
  public isLoading: boolean = false;
  public showAddFormatForm: boolean = false;
  public newFormat: Format = { id: 0, name: '', diameter: 0, rpm: '', duration_side: 0 };
  public showConfirmDialog: boolean = false;
  public confirmMessage: string = '';
  private formatIdToDelete: number | null = null;
  private formatService= inject (FormatService);

  ngOnInit(): void {
    this.filteredFormats = this.formats;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formats'] && changes['formats'].currentValue) {
      this.filteredFormats = this.formats;
    }
  }

  public confirmDelete(formatId: number): void {
    this.formatIdToDelete = formatId;
    this.confirmMessage = '¿Está seguro de que desea eliminar este formato?';
    this.showConfirmDialog = true;
  }

  public handleConfirm(confirm: boolean): void {
    if (confirm && this.formatIdToDelete !== null) {
      this.deleteFormat(this.formatIdToDelete);
    }
    this.showConfirmDialog = false;
    this.formatIdToDelete = null;
  }

  public deleteFormat(formatId: number): void {
    this.formatService.deleteFormat(formatId).subscribe(
      response => {
        this.filteredFormats = this.filteredFormats.filter(format => format.id !== formatId);
      }
    );
  }

  public addFormat(): void {
    if (this.newFormat.name.trim()) {
      this.formatService.createFormat({
        name: this.newFormat.name,
        diameter: this.newFormat.diameter,
        rpm: this.newFormat.rpm,
        duration_side: this.newFormat.duration_side
      } as Format).subscribe(
        (createdFormat) => {
          this.filteredFormats.push(createdFormat);
          this.newFormat = { id: 0, name: '', diameter: 0, rpm: '', duration_side: 0 };
          this.showAddFormatForm = false;
        },
        (error) => {
          console.error('Error creating format:', error);
        }
      );
    }
  }

  public toggleAddFormatForm(): void {
    this.showAddFormatForm = !this.showAddFormatForm;
  }

  public editFormat(format: Format): void {
    format.editing = true;
  }
  public cancelEdit(format: Format): void {
    format.editing = false;
    this.loadFormats();
  }

  public updateFormat(format: Format): void {
    if (format.name.trim()) {
      this.formatService.updateFormat(format.id, format).subscribe(
        (updatedFormat) => {
          Object.assign(format, updatedFormat);
          format.editing = false;
        },
        (error) => {
          console.error('Error updating format:', error);
        }
      );
    }
  }

  public loadFormats(): void {
    this.formatService.getFormats().subscribe((formats) => {
      this.filteredFormats = formats;
      this.filteredFormats.forEach(format => format.editing = false);
    });
  }
}
