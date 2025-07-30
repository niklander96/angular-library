import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models';
import { BookStatusPipe } from "../../../pipes/book-status.pipe";
import {Router, RouterLink} from "@angular/router";

/**
 * Интерфейс компонента книги.
 * @prop {Book | undefined} book - Объект книги.
 * @prop {((bookId: number | undefined) => void) | undefined} deleteBook - Удаляет книгу.
 */
interface IBookComponent {
  book?: Book;
  deleteBook?: (bookId?: string) => void
}

/**
 * Компонент книги.
 */
@Component({
  selector: 'tsc-book',
  standalone: true,
  imports: [BookStatusPipe, RouterLink],
  templateUrl: './book.component.html',
})

export class BookComponent implements IBookComponent{
  @Input() public book?: Book

  @Input() public deleting?: boolean = false;

  @Input() public deleteBook?: (bookId?: string) => void
}
