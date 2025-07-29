import {Component, OnInit} from '@angular/core';
import {BookStatusPipe} from "../../../pipes/book-status.pipe";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService, BookService} from "../../../services";
import {Book} from "../../../models";
import {EBookStatuses} from "../../../enum/book-statuses.enum";
import {first} from "rxjs/operators";
/**
 * Интерфейс компонента формы создания и редактирования карточки книги.
 */
interface IAddEditBookComponent {
  bookForm: FormGroup;
  bookStatuses: string[]
  returnToBookList(): void
  onSubmitBook(): void
}

/**
 * Компонент формы создания и редактирования карточки книги.
 */
@Component({
  selector: 'tsc-add-edit-book',
  standalone: true,
  imports: [BookStatusPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-book.component.html',
})
export class AddEditBookComponent implements OnInit, IAddEditBookComponent {
  /**
   * Объект формы создания книги.
   */
  public bookForm!: FormGroup;

  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  /**
   * Массив статусов книг.
   */
  public bookStatuses: string[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private bookService: BookService
  ) {}

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

    const formValue = this.bookForm.value

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
    this.id = this.route.snapshot.params['id'];

    this.bookStatuses = Object.values(EBookStatuses).map((status) => {
      return status.toString()
    })

    this.bookForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "author": new FormControl('', Validators.required),
      "releaseDate": new FormControl('', Validators.required),
      "bookStatus": new FormControl('notInUse')
    })

    this.title = 'Add User';
    if (this.id) {
      // edit mode
      this.title = 'Edit User';
      this.loading = true;
      this.bookService.getBookById(Number(this.id))
        .pipe(first())
        .subscribe(x => {
          this.bookForm.patchValue(x);
          this.loading = false;
        });
    }
  }
}
