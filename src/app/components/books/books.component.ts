import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from "../book/book.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'tsc-books',
  standalone: true,
  imports: [RouterModule, BookComponent, CommonModule],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books: Book[] = this.bookService.books

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  /**
   * Переходит на страницу создания книги.
   * @returns {void}
   */
  turnToCreateBook(): void {
    void this.router.navigate(['/books/create'])
  }

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
