import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any): string {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const formattedDate:any = datePipe.transform(value, 'dd MMM yyyy');
      return formattedDate;
    }
    return '';
  }
}