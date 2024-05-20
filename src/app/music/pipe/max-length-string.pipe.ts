import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'MaxLengthString',
  standalone: true,
})
export class MaxLengthStringPipe implements PipeTransform {

  transform(value: string): string {
    const maxLength = 30;
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }

}
