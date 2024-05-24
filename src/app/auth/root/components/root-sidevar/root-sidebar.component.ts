import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './root-sidebar.component.html',
  styleUrl: './root-sidebar.component.css',
})
export class RootSidebarComponent {

}
