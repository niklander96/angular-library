import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { Book } from 'src/app/models';
import {BookStatusPipe} from "../../../pipes/book-status.pipe";
import {DatePipe} from "@angular/common";
import {EBookStatuses} from "../../../enum/book-statuses.enum";

/**
 * Интерфейс компонента книги.
 */
interface IBookComponent {
  deleteBook: EventEmitter<string | undefined>
  delete(bookId?: string): void
  changeStatus(book?: Book): void
  book?: Book;
  deleting?: boolean
}


/**
 * Компонент книги.
 */
@Component({
  selector: 'tsc-book',
  standalone: true,
  imports: [BookStatusPipe, DatePipe],
  templateUrl: './book.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements IBookComponent {
  @Input() public book?: Book

  @Output() public deleteBook: EventEmitter<string | undefined>  = new EventEmitter<string | undefined>()
  public delete(bookId?: string): void {
    this.deleteBook.emit(bookId);
  }

  @Output() public changeBookStatus: EventEmitter<Book | undefined>  = new EventEmitter<Book | undefined>()
  public changeStatus(book?: Book): void {
    this.changeBookStatus.emit(book);
  }

  protected readonly EBookStatuses = EBookStatuses;
}
