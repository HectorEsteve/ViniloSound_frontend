import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'StringToArray',
  standalone: true,
})
export class StringToArrayPipe implements PipeTransform {

  transform(value: string): string[] {
    if (!value) return [];

    return value.split(',').map(item => item.trim());
  }
}
