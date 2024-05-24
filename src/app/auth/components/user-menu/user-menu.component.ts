import { CommonModule }               from '@angular/common';
import { Component, OnInit, inject }  from '@angular/core';
import { RouterModule }               from '@angular/router';

import { UserService } from '../../service/user.service';

interface Options{
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector:     'app-user-menu',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl:  './user-menu.component.html',
  styleUrl:     './user-menu.component.css',
})

export class UserMenuComponent implements OnInit{

  ngOnInit(): void {
    this.userService.checkIfAdmin(this.userService.currentUser!.id).subscribe(
      isAdmin => {
        this.isAdmin = isAdmin;
      },
      error => {
        this.isAdmin = false;
      });

      this.userService.checkIfRoot(this.userService.currentUser!.id).subscribe(
        isRoot => {
          this.isRoot = isRoot;
        },
        error => {
          this.isRoot = false;
        });
  }

  public userService = inject(UserService);

  public isAdmin:boolean  = false;
  public isRoot:boolean   = false;

  public menu : Options[]=[
    { title: 'Mi colección',    route: '/user/my-collection',      icon:'fas fa-folder' },
    { title: 'Mis favoritos',   route: '/user/favourites',         icon:'fas fa-star' },
    { title: 'Sugerencias',     route: '/user/suggestions',        icon:'fas fa-question' },
    { title: 'Compras',         route: '/user/shopping',           icon:'fas fa-shopping-cart' },
    { title: 'Editar perfil',   route: '/user/profile',            icon:'fas fa-user-edit' },
  ]

  public logOut () : void {
    this.userService.logout(this.userService.currentUser!.id).subscribe();
  }
 }
