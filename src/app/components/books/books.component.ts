import { Component, OnInit } from '@angular/core';
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

  constructor(private bookService: BooksService) {}

  public addBook(): void {
    console.log('Кинга добавлена')
    this.bookService.addBook(new Book(0, '', '', '', EBookStatuses.DAMAGED))
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
