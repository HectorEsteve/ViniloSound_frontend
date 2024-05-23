import { CommonModule }       from '@angular/common';
import { Component, inject }  from '@angular/core';
import { RouterModule }       from '@angular/router';

import { NavbarComponent }    from '../navbar/navbar.component';
import { UserMenuComponent }  from '../../../auth/components/user-menu/user-menu.component';
import { UserService }        from '../../../auth/service/user.service';

@Component({
  selector:     'app-header',
  standalone:   true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    UserMenuComponent
  ],
  templateUrl:  './header.component.html',
  styleUrl:     './header.component.css',

})
export class HeaderComponent {
  public userService = inject( UserService );
 }
