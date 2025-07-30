import {Component, Inject, OnInit} from '@angular/core';
import {BookStatusPipe} from "../../../pipes/book-status.pipe";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AccountService, BookService} from "../../../services";
import {Book} from "../../../models";
import {EBookStatuses} from "../../../enum/book-statuses.enum";
import {first} from "rxjs/operators";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {BOOK_METHODS_TOKEN} from "../../../app.config";
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
  imports: [BookStatusPipe, ReactiveFormsModule, CommonModule, RouterLink],
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
    @Inject(BOOK_METHODS_TOKEN) private bookService: BookService
  ) {
    this.bookForm = new FormGroup({
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

  get formValue() { return this.bookForm.value; }


  /**
   * Отправляет данные на сервер.
   * @returns {void}
   */
  onSubmitBook(): void {
    this.submitted = true;

    console.log('formValue', this.formValue)

    if (this.bookForm.invalid) {
      return;
    }

    this.submitting = true
    this.saveBook().pipe(first()).subscribe({
      next: () => {
        this.router.navigateByUrl('/books');
      },
      error: (err) => {
        console.error('Ошибка при добавлении книги:', err);
        this.submitting = false;
      }})
  }

  private saveBook() {
    const ids = this.bookService.booksFromClass
      .map(book => Number(book.id))
      .filter(id => !isNaN(id));

    const newId = ids.length ? Math.max(...ids) + 1 : 1;
    // create or update user based on id param
    return this.id
      ? this.bookService.update(this.id!, this.bookForm.value)
      : this.bookService.add({id: newId.toString(), ...this.bookForm.value});
  }

  ngOnInit(): void {

    console.log('this.bookForm', this.bookForm)
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

    this.title = 'Add Book';
    if (this.id) {
      // edit mode
      this.title = 'Edit Book';
      this.loading = true;
      this.bookService.getById(this.id)
        .pipe(first())
        .subscribe({
          next: book => {
            console.log('book', book)
            this.bookForm.patchValue(book);
            this.loading = false;
      }
    });
    }
  }
}
