import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BookService} from "../../../services";
import {Book} from "../../../models";
import {EBookStatuses} from "../../../enum/book-statuses.enum";
import {first} from "rxjs/operators";
import {Observable} from "rxjs";
import {BookStatusPipe} from "../../../pipes/book-status.pipe";

/**
 * Интерфейс компонента формы создания и редактирования карточки книги.
 */
interface IAddEditBookComponent {
  bookForm: FormGroup;
  bookStatuses: string[]
  onSubmitBook(): void
}

/**
 * Компонент формы создания и редактирования карточки книги.
 */
@Component({
  selector: 'tsc-add-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, BookStatusPipe],
  templateUrl: './add-edit-book.component.html',
})
export class AddEditBookComponent implements OnInit, IAddEditBookComponent {
  /** Объект формы создания книги. */
  public bookForm!: FormGroup;
  /** Массив статусов книг. */
  public bookStatuses: string[] = []
  /** Название книги. */
  public title!: string;
  /** Идет ли загрузка? */
  public loading: boolean = false;
  /** Происходит ли  отправка формы? */
  public submitting: boolean = false;
  /** Форма отправлена? */
  public submitted: boolean = false;
  /** Идентификатор книги. */
  public id?: string;
  /** Объект роутера. */
  private router: Router = inject(Router)
  /** Активный роут. */
  private route: ActivatedRoute = inject(ActivatedRoute)
  /** Сервис для работы с книгами. */
  private bookService: BookService = inject(BookService);

  /** Геттер для получения значений формы создания/редактирования книги. */
  get formValue() { return this.bookForm.value; }

  /**
   * Отправляет данные книги с формы.
   * @returns {void}
   */
  onSubmitBook(): void {
    this.submitted = true;

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
      },
      complete: () => {
        this.submitting = false;
      }
    })
  }

  /**
   * Сохраняет книгу.
   * @private
   * @returns {Observable<Book>}
   */
  private saveBook(): Observable<Book> {
    const ids = this.bookService.booksFromClass
      .map(book => Number(book.id))
      .filter(id => !isNaN(id));

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    return this.id
      ? this.bookService.update(this.id!, {...this.bookForm.value})
      : this.bookService.add({id: newId.toString(), ...this.bookForm.value});
  }

  /** Отрабатывает при иницализации. */
  ngOnInit(): void {
    /** Идентификатор книги, полученный из парметров адресной строки. */
    this.id = this.route.snapshot.params['id']

    /** Статусы книги. */
    this.bookStatuses = Object.values(EBookStatuses).map((status) => {
      return status.toString()
    })

    /** Инициализация формы. */
    this.bookForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "author": new FormControl('', Validators.required),
      "releaseDate": new FormControl('', Validators.required),
      "bookStatus": new FormControl('notInUse')
    })

    this.title = 'Добавление книги';

    /** Режим редактирования. */
    if (this.id) {
      this.bookForm.get('name')?.disable()
      this.bookForm.get('author')?.disable()
      this.bookForm.get('releaseDate')?.disable()
      this.title = 'Редактирование книги';
      this.loading = true;
      this.bookService.getById(this.id)
        .pipe(first())
        .subscribe({
          next: book => {
            this.bookForm.patchValue(book);
          },
          complete: () => {
            this.loading = false;
          }
        });
    }
  }
}
