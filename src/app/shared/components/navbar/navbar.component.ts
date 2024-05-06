import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  public menu: MenuItem[] = [
    { title: 'Inicio', route: './home' },
    { title: 'Informacion', route: './news' },
    { title: 'Productos', route: './store' },
    { title: 'Buscador', route: './search' },
  ];

}
