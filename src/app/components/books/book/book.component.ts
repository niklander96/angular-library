import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { Book } from 'src/app/models';
import {BookStatusPipe} from "../../../pipes/book-status.pipe";
import {DatePipe} from "@angular/common";

/**
 * Интерфейс компонента книги.
 */
interface IBookComponent {
  deleteBook: EventEmitter<string | undefined>
  delete(bookId?: string): void
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

  @Input() public deleting?: boolean = false;

  @Output() public deleteBook: EventEmitter<string | undefined>  = new EventEmitter<string | undefined>()
  public delete(bookId?: string): void {
    this.deleteBook.emit(bookId);
  }

}
