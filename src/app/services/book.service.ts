import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models';
import { map, Observable } from 'rxjs';

interface IBookService {
  books: Book[]
  getBooks() :Observable<Book[]>
  addBook(newBook: Book): Observable<Book>
  deleteBook(bookId: number): Observable<unknown>
}

@Injectable()
export class BookService implements IBookService {
  books: Book[] = []
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns
   */
  getBooks(): Observable<Book[]> {
    return this.http.get('/books').pipe(map((books) => {
        return (books as Book[]).map((book) => {
          return new Book(book.id, book.name, book.author, book.releaseDate, book.bookStatus)
        })
    }));
  }

  /**
   * 
   * @param newBook 
   * @returns 
   */
  addBook(newBook: Book): Observable<Book> {
    return this.http.post('/books/create', newBook) as Observable<Book>
  }

  /**
   * 
   * @param bookId 
   * @returns 
   */
  deleteBook(bookId: number): Observable<unknown> {
    return this.http.delete('/books/delete', { body: { id: bookId }})
  }
}
