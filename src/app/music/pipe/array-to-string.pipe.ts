import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'ArrayToString',
  standalone: true,
})
export class ArrayToStringPipe implements PipeTransform {

  transform(array: string[]): string {
    if (!array || array.length === 0) {
      return '';
    }

    return array.join(', ');
  }

}
