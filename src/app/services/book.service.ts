import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models';
import { delay, map, Observable } from 'rxjs';

/**
 * Интерфейс сервера для работы с книгами.
 */
interface IBookService {
  books: Book[]
  getBooks() :Observable<Book[]>
  addBook(newBook: Book): Observable<Book>
  deleteBook(bookId: number): Observable<unknown>
}

/**
 * Сервис для работы с книгами.
 */
@Injectable({
  providedIn: 'root'
})
export class BookService implements IBookService {
  books: Book[] = []
  constructor(private http: HttpClient) { }

  /**
   * Возвращает книги.
   * @returns {Observable<Book[]>}
   */
  getBooks(): Observable<Book[]> {
    return this.http.get('/books').pipe(map((books) => {
        return (books as Book[]).map((book) => {
          return new Book(book.id, book.name, book.author, book.releaseDate, book.bookStatus)
        })
    }), delay(3000));
  }

  /**
   * Добавляет книгу.
   * @param {Book} newBook - Объект новой книги.
   * @returns {Observable<Book>}
   */
  addBook(newBook: Book): Observable<Book> {
    return (this.http.post('/books/create', newBook) as Observable<Book>).pipe(delay(3000))
  }

  /**
   * Удаляет книгу.
   * @param {number | null} bookId - Уникальный идентификатор книги.
   * @returns {Observable<Book[]>}
   */
  deleteBook(bookId: number | null): Observable<Book[]> {
    return (this.http.delete('/books/delete', { body: { id: bookId }}) as Observable<Book[]>).pipe(delay(3000))
  }
}
