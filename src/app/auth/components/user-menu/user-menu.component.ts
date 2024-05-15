import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

interface Options{
  title: string;
  route: string;
}

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})

export class UserMenuComponent {

  private userService = inject(UserService);

  public menu : Options[]=[
    { title: 'Cerrar sesión',  route: '' }
  ]

  public logOut () : void {
    this.userService.logout();
  }


 }
