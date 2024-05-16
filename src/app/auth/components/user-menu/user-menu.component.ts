import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

interface Options{
  title: string;
  route: string;
  icon:string;
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

  public userService = inject(UserService);

  public menu : Options[]=[
    { title: 'Mi colección',    route: '',            icon:'fas fa-folder' },
    { title: 'Mis favoritos',   route: '',            icon:'fas fa-star' },
    { title: 'Sugerencias',     route: '',            icon:'fas fa-question' },
    { title: 'Compras',         route: '',            icon:'fas fa-shopping-cart' },
    { title: 'Editar perfil',   route: '',            icon:'fas fa-user-edit' },
  ]

  public logOut () : void {
    this.userService.logout();

  }


 }
