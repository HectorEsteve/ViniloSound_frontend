import { CommonModule }                                                     from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output }  from '@angular/core';

@Component({
  selector:   'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl:    './confirm-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmDialogComponent {

  @Input() message: string = '';
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm(): void {
    this.confirm.emit(true);
  }

  onCancel(): void {
    this.confirm.emit(false);
  }
}
