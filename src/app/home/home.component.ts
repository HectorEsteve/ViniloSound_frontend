import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css',

})
export class HomeComponent {

    public isHoveredInfo: boolean = false;
    public isHoveredProd: boolean = false;
    public isHoveredSear: boolean = false;
    public isHoveredJoin: boolean = false;

}
