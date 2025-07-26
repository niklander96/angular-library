import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EBookStatuses } from 'src/app/enum/book-statuses.enum';
import { Book } from 'src/app/helpers';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-create-form',
  templateUrl: './book-create-form.component.html',
  styleUrls: ['./book-create-form.component.css']
})
export class BookCreateFormComponent implements OnInit {
  bookStatuses: string[] = []
  constructor(
    private router: Router,
    private bookService: BooksService
) {}

  saveBook(): void {
    console.log('Кинга сохранена')
    this.bookService.addBook(new Book(0, '', '', '', EBookStatuses.DAMAGED))
  }

  ngOnInit(): void {
    this.bookStatuses = Object.values(EBookStatuses)
  }

  returnToList() {
    this.router.navigate(['books'])
  }
}
