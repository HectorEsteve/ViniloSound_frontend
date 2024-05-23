import { CommonModule }                                     from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output }   from '@angular/core';
import { Subject, debounceTime }                            from 'rxjs';

@Component({
  selector:     'search-box',
  standalone:   true,
  imports: [
    CommonModule,
  ],
  templateUrl:  './searchBox.component.html',
  styleUrl:     './searchBox.component.css',
})

export class SearchBoxComponent implements OnInit{

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(1500)
      )
      .subscribe(value =>{
        this.onDebounce.emit(value);
      })
  }

  private debouncer: Subject<string> = new Subject();

  @Input()
  public initialValue: String ='' ;
  @Input()
  public placeholder: String ='' ;

  @Output()
  public onValue = new EventEmitter <string> ();
  @Output()
  public onDebounce = new EventEmitter <string> ();

  public emitValue (value:string):void{
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm:string):void{
    this.debouncer.next(searchTerm);
  }
}
