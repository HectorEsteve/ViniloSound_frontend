import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector:     'app-header',
  standalone:   true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule
  ],
  templateUrl:  './header.component.html',
  styleUrl:     './header.component.css',

})
export class HeaderComponent { }
