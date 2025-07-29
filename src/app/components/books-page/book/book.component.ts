import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models';
import { BookStatusPipe } from "../../../pipes/book-status.pipe";
import {Router} from "@angular/router";

/**
 * Интерфейс компонента книги.
 * @prop {Book | undefined} book - Объект книги.
 * @prop {((bookId: number | undefined) => void) | undefined} deleteBook - Удаляет книгу.
 */
interface IBookComponent {
  book?: Book;
  deleteBook?: (bookId?: number) => void
}

/**
 * Компонент книги.
 */
@Component({
  selector: 'tsc-book',
  standalone: true,
  imports: [BookStatusPipe],
  templateUrl: './book.component.html',
})

export class BookComponent implements IBookComponent{
  @Input() public book?: Book

  @Input() public deleteBook?: (bookId?: number) => void

  constructor(private router: Router) {
  }

  turnToEdit(bookId?: number) {
    this.router.navigate([`/books/edit/${bookId}`])
  }
}
