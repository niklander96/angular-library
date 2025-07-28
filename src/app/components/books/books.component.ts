import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = this.bookService.books

  isBooksShow: boolean = true

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  addBook(): void {
    this.router.navigate(['/books/create'])
    this.isBooksShow = false
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => {
      console.log('books', books)
      this.books = books
      this.bookService.books = books
    })
  }
 
  ngOnInit(): void {
    this.getBooks()
  }
}
