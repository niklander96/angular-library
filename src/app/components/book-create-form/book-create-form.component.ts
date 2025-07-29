import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EBookStatuses } from 'src/app/enum/book-statuses.enum';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';
import { BookStatusPipe } from "../../pipes/book-status.pipe";
import { CommonModule } from "@angular/common";

/**
 * Интерфейс компонента формы создания карточки книги.
 */
interface IBookCreateFormComponent {
  createBookForm: FormGroup;
  bookStatuses: string[]
  returnToBookList(): void
  onSubmitBook(): void
}

/**
 * Компонент формы создания карточки книги.
 */
@Component({
  selector: 'tsc-book-create-form',
  standalone: true,
  imports: [BookStatusPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './book-create-form.component.html',
})
export class BookCreateFormComponent implements IBookCreateFormComponent, OnInit {
  /**
   * Объект формы создания книги.
   */
  public createBookForm: FormGroup;

  /**
   * Массив статусов книг.
   */
  public bookStatuses: string[] = []

  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private bookService: BookService
) {
    this.createBookForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "author": new FormControl('', Validators.required),
      "releaseDate": new FormControl('', Validators.required),
      "bookStatus": new FormControl('notInUse')
    })
  }

  /**
   * Возвращает к списку книг.
   * @returns {void}
   */
  returnToBookList(): void {
    void this.router.navigate(['books'])
  }

  /**
   * Отправляет данные на сервер.
   * @returns {void}
   */
  onSubmitBook(): void {
    this.loading = true;

    const ids = this.bookService.books
      .map(book => book.id)
      .filter(id => typeof id === 'number' && !isNaN(id));

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    const formValue = this.createBookForm.value

    const objectToSend = new Book(newId, formValue.name, formValue.author, formValue.releaseDate, formValue.bookStatus)

    this.bookService.addBook(objectToSend).subscribe({
      next: () => {
        this.returnToBookList();
      },
      error: (err) => {
        console.error('Ошибка при добавлении книги:', err);
        this.loading = false;
      }})
  }

  ngOnInit(): void {
    this.bookStatuses = Object.values(EBookStatuses).map((status) => {
      return status.toString()
    })
  }
}
