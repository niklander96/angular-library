import { Injectable } from '@angular/core';
import {Book} from '../models';
import { delay, map, Observable } from 'rxjs';
import {EntityService} from "./entity.service";
import {IEntityMethods} from "../interfaces/entity-methods.interface";
import {EBookStatuses} from "../enum/book-statuses.enum";
import {FormGroup} from "@angular/forms";

/**
 * Сервис для работы с книгами.
 */
@Injectable({
  providedIn: 'root'
})
export class BookService implements IEntityMethods<Book> {
  private books: Book[] = []

  constructor(private entityService: EntityService<Book>) {
    this.entityService.entityNameFromService = 'books';
  }

  get booksFromClass(): Book[] {
    return this.books;
  }

  set booksFromClass(books: Book[]) {
    this.books = books;
  }

  /**
   * Возвращает книгу по id.
   * @param {number} id - Уникальный идентификатор.
   * @returns {Observable<Book>}
   */
  getById(id: string): Observable<Book> {
    return this.entityService.getById(id).pipe(delay(3000));
  }

  /**
   * Возвращает все книги.
   * @returns {Observable<Book[]>}
   */
  getAll(): Observable<Book[]> {
    return this.entityService.getAll().pipe(delay(3000));
  }

  /**
   * Добавляет книгу.
   * @param {Book} newBook - Объект новой книги.
   * @returns {Observable<Book>}
   */
  add(newBook: Book): Observable<Book> {
    return this.entityService.add(newBook).pipe(delay(3000))
  }

  /**
   * Обновляет книгу.
   * @param {string} id - Уникальный идентификатор.
   * @param {any} params - Параметры.
   * @returns {Observable<Book>}
   */
  update(id: string, params: any): Observable<Book> {
    return this.entityService.update(id, params).pipe(delay(3000))
  }

  /**
   * Удаляет книгу.
   * @param {string} bookId - Уникальный идентификатор книги.
   * @returns {Observable<Book[]>}
   */
  delete(bookId: string): Observable<Book[]> {
    return this.entityService.delete(bookId).pipe(delay(3000))
  }
}
