import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})

export class AdminSidebarComponent {

  public menu =[
    { title: 'Usuarios',            route: '/admin/users'  },
    { title: 'Genros',              route: '/admin/genres'  },
    { title: 'Formatos',            route: '/admin/formats'  },
    { title: 'Discográficas',       route: '/admin/record-companies'  },
    { title: 'Grupos',              route: '/admin/bands'  },
    { title: 'Canciones',           route: '/admin/songs'  },
    { title: 'Vinilos',             route: '/admin/vinyls'  },
  ]

 }
