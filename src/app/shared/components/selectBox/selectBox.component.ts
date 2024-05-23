import { CommonModule }                           from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector:     'select-box',
  standalone:   true,
  imports: [
    CommonModule,
  ],
  templateUrl:  './selectBox.component.html',
  styleUrl:     './selectBox.component.css',
})
export class SelectBoxComponent {

  @Input()
  public initialValue: String ='';
  @Input()
  public options: string[] = [];
  @Input()
  public placeholder: string = 'Seleccione una opción';

  @Output()
  public onValue = new EventEmitter <string> ();

  public emitValue (value: string):void{
    this.onValue.emit(value);
  }
}
