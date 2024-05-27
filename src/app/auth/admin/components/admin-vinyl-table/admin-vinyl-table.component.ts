import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Vinyl } from '../../../../music/interfaces/vinyl.interface';

@Component({
  selector: 'app-admin-vinyl-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin-vinyl-table.component.html',
  styleUrl: './admin-vinyl-table.component.css',
})
export class AdminVinylTableComponent {
  @Input() vinyls: Vinyl[] = [];
 }
