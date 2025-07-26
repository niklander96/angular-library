import { Pipe, PipeTransform } from '@angular/core';
import { EBookStatuses } from '../enum/book-statuses.enum';

@Pipe({
  name: 'bookStatus'
})
export class BookStatusPipe implements PipeTransform {
  transform(value?: EBookStatuses | string, ...args: unknown[]): string {
    switch(value) {
      case EBookStatuses.IN_USE: return 'Взята читателем'
      case EBookStatuses.NOT_IN_USE: return 'Доступна'
      case EBookStatuses.DAMAGED: return 'Повреждена'
      case EBookStatuses.LOST: return 'Утеряна'
      default: return 'Доступна'
    }
  }
}
