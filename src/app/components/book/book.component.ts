import { Component, Input } from '@angular/core';
import { Book } from 'src/app/helpers';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent {
  @Input() public book?: Book

  constructor(private booksService: BooksService) {}

  deleteBook() {

  }
}
