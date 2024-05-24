import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'search-box',
  standalone: true,
  templateUrl: './searchBox.component.html',
  styleUrls: ['./searchBox.component.css'],
})
export class SearchBoxComponent implements OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private destroy$: Subject<void> = new Subject<void>();
  private skipNextDebounce: boolean = false;

  @Input() initialValue: string = '';
  @Input() placeholder: string = '';
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();

  constructor() {
    this.debouncer
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (!this.skipNextDebounce) {
          this.onDebounce.emit(value);
        }
        this.skipNextDebounce = false;
      });
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
    this.skipNextDebounce = true;
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
