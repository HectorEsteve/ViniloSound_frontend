import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector:     'search-box',
  standalone:   true,
  imports: [
    CommonModule,
  ],
  templateUrl:  './searchBox.component.html',
  styleUrl: './searchBox.component.css',
})

export class SearchBoxComponent{

  @Input()
  public initialValue: String ='' ;

  @Input()
  public placeholder: String ='' ;

  @Output()
  public onValue = new EventEmitter <string> ();


  public emitValue (value:string):void{
    this.onValue.emit(value);
  }

}
