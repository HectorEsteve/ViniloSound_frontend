import { CommonModule }   from '@angular/common';
import { Component }      from '@angular/core';
import { RouterModule }   from '@angular/router';

@Component({
  selector:    'app-home',
  standalone:  true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl:    './home.component.css',

})
export class HomeComponent {

    public isHoveredInfo: boolean = false;
    public isHoveredProd: boolean = false;
    public isHoveredSear: boolean = false;
    public isHoveredJoin: boolean = false;

}
