import { NgModule }           from '@angular/core';
import { CommonModule }        from '@angular/common';

import { RootRoutingModule }        from './root-routing.module';
import { RootLayoutPageComponent }  from './pages/root-layout-page/root-layout-page.component';
import { RootUsersPageComponent }   from './pages/root-users-page/root-users-page.component';
import { SearchBoxComponent }       from '../../shared/components/searchBox/searchBox.component';
import { LoadingSpinnerComponent }  from '../../shared/components/loading-spinner/loading-spinner.component';
import { UsersTableComponent }      from './components/users-table/users-table.component';
import { RootSidebarComponent }     from './components/root-sidevar/root-sidebar.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    RootLayoutPageComponent,
    RootUsersPageComponent,

  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    RootSidebarComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent,
    UsersTableComponent,
    ConfirmDialogComponent


  ]
})
export class RootModule { }
