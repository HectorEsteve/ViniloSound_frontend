import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { SearchBoxComponent } from '../../shared/components/searchBox/searchBox.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AdminUsersTableComponent } from './components/admin-users-table/admin-users-table.component';
import { AdminGenrePageComponent } from './pages/admin-genre-page/admin-genre-page.component';
import { AdminGenreTableComponent } from './components/admin-genre-table/admin-genre-table.component';
import { AdminFormatPageComponent } from './pages/admin-format-page/admin-format-page.component';
import { AdminFormatTableComponent } from './components/admin-format-table/admin-format-table.component';
import { AdminRecordCompanyTableComponent } from './components/admin-record-company-table/admin-record-company-table.component';
import { AdminRecordCompaniePageComponent } from './pages/admin-record-companie-page/admin-record-company-page.component';
import { AdminBandPageComponent } from './pages/admin-band-page/admin-band-page.component';
import { AdminBandTableComponent } from './components/admin-band-table/admin-band-table.component';
import { AdminSongPageComponent } from './pages/admin-song-page/admin-song-page.component';
import { AdminSongTableComponent } from './components/admin-song-table/admin-song-table.component';


@NgModule({
  declarations: [
    AdminLayoutPageComponent,
    AdminUsersPageComponent,
    AdminGenrePageComponent,
    AdminFormatPageComponent,
    AdminRecordCompaniePageComponent,
    AdminBandPageComponent,
    AdminSongPageComponent,
 

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSidebarComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    AdminUsersTableComponent,
    AdminGenreTableComponent,
    AdminFormatTableComponent,
    AdminRecordCompanyTableComponent,
    AdminBandTableComponent,
    AdminSongTableComponent,
    
  ]
})
export class AdminModule { }
