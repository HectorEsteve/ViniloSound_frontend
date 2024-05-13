import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'MinuteFormat',
  standalone: true,
})
export class MinuteFormatPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;
    const minutesStr: string = minutes < 10 ? '0' + minutes : '' + minutes;
    const secondsStr: string = seconds < 10 ? '0' + seconds : '' + seconds;
    return minutesStr + ':' + secondsStr;
  }

}
