import {Component, inject, Input, OnInit} from '@angular/core';
import { Book } from 'src/app/models';
import { RouterLink } from "@angular/router";
import {BookService} from "../../../services";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {BookStatusPipe} from "../../../pipes/book-status.pipe";

/**
 * Интерфейс компонента книги.
 * @prop {Book | undefined} book - Объект книги.
 * @prop {((bookId: number | undefined) => void) | undefined} deleteBook - Удаляет книгу.
 */
interface IBookComponent {
  book?: Book;
  deleting?: boolean
  deleteBook?: (bookId?: string) => void
}

/**
 * Компонент книги.
 */
@Component({
  selector: 'tsc-book',
  standalone: true,
  imports: [RouterLink, BookStatusPipe],
  templateUrl: './book.component.html',
})
export class BookComponent implements IBookComponent{
  @Input() public book?: Book

  @Input() public deleting?: boolean = false;

  @Input() public deleteBook?: (bookId?: string) => void
}
