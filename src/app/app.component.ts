import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.introMessage = true;
    setTimeout(() => {
      this.introMessage = false;
    }, 4000);
  }

  title = 'ViSo';
  introMessage: boolean = false;

  public closeMessage(): void {
    this.introMessage = false;
  }
}
