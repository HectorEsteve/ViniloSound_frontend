import { CommonModule } from '@angular/common';
import { Component }    from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector:    'app-navbar',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl:  './navbar.component.html',
  styleUrl:     './navbar.component.css',
})
export class NavbarComponent {

  public menu:MenuItem[]=([
    { title: 'Sweet Home',      route: './home' },
    { title: 'Actually', route: './news' },
    { title: 'Material',   route: './store' },
    { title: 'Searchin',    route: './search' },
  ])

}
