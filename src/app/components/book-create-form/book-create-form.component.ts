import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EBookStatuses } from 'src/app/enum/book-statuses.enum';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-create-form',
  templateUrl: './book-create-form.component.html',
  styleUrls: ['./book-create-form.component.css']
})
export class BookCreateFormComponent implements OnInit {
  myForm: FormGroup;
  
  bookStatuses: string[] = []

  constructor(
    private router: Router,
    private bookService: BookService
) {
  this.myForm = new FormGroup({
    "name": new FormControl(),
    "author": new FormControl(),
    "releaseDate": new FormControl(),
    "bookStatus": new FormControl()
  })
}

  ngOnInit(): void {
    this.bookStatuses = Object.values(EBookStatuses).map((status) => {
      return status.toString()
    })
  }

  returnToList() {
    this.router.navigate(['books'])
  }

  submit(){
    const ids = this.bookService.books.map((book) => book.id)

    let id = Math.max(...ids)

    id++
    
    const formValue = this.myForm.value

    const objectToSend = new Book(id, formValue.name, formValue.author, formValue.releaseDate, formValue.bookStatus)

    this.bookService.addBook(objectToSend).subscribe()

    this.returnToList()
  }
}
