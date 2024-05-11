import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title:    string;
  expanded: boolean;
  options:  Options[];
}
interface Options{
    title: string;
    route: string;
}

@Component({
  selector:   'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl:    './sidebar.component.css',
})
export class MusicSidebarComponent {

  public menu=signal<MenuItem[]>([
    { title:    'Vinilos',
      expanded: true,
      options: [
        { title: 'Por nombre',  route: './vinyls/by-name' },
        { title: 'Por Grupo',   route: './vinyls/by-band' },
        { title: 'Por Género',  route: './vinyls/by-genre' }
      ]
    },
    { title:    'Colecciones',
      expanded: false,
      options: [
        { title: 'Por usuario', route: './collections/by-user' },
        { title: 'Por nombre',  route: './collections/by-name' },
        { title: 'Por vinilo',  route: './collections/by-vinyl' },
        { title: 'Por Grupo',   route: './collections/by-band' }
      ]
    },
    { title:    'Grupos',
      expanded: false,
      options: [
        { title: 'Por nombre',  route: './bands/by-name' },
        { title: 'Por Género',  route: './bands/by-genre' }
      ]
    },
    { title:    'Canciones',
      expanded: false,
      options: [
        { title: 'Por nombre',  route: './songs/by-name' },
        { title: 'Por Grupo',   route: './songs/by-band' },
      ]
    }
  ]);

  toggleCollapse(item: MenuItem) {
    item.expanded = !item.expanded;
  }

}
