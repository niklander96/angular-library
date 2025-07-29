import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from "../book/book.component";
import { CommonModule } from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tsc-books',
  standalone: true,
  imports: [BookComponent, CommonModule, RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books: Book[] = this.bookService.books

  constructor(
    private bookService: BookService,
  ) {}

  /**
   * Возвращает список книг.
   * @returns {void}
   */
  getBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books
      this.bookService.books = books
    })
  }

  /**
   * Удаляет книгу.
   * @returns {void}
   */
  deleteBook = (bookId?: number): void  => {
    if (!bookId) return

    this.bookService.deleteBook(bookId).subscribe(books => {
      this.books = books
      this.bookService.books = books
    })
  }

  ngOnInit(): void {
    this.getBooks()
  }
}
