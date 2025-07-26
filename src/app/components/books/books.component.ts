import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EBookStatuses } from 'src/app/enum/book-statuses.enum';
import { Book } from 'src/app/helpers';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = []
  isBooksShow: boolean = true

  constructor(
    private bookService: BooksService,
    private router: Router
  ) {}

  addBook(): void {
    this.router.navigate(['/books/create'])
    this.isBooksShow = false
    // this.bookService.addBook(new Book(0, '', '', '', EBookStatuses.DAMAGED))
  }

  getBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books
    })
  }
 
  ngOnInit(): void {
    this.getBooks()
  }
}
