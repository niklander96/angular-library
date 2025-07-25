import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../helpers';
import { map, Observable } from 'rxjs';

@Injectable()
export class BooksService {
  public books: Book[] = []
 
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
      return this.http.get('/books').pipe(map((books) => {
          console.log(books)
          return (books as Book[]).map((book) => {
            return new Book(book.id, book.name, book.author, book.releaseDate, book.bookStatus)
          })
      }));
    }

  addBook(newBook: Book): Observable<Book> {
    console.log('this.http.post', this.http.post('/books/create', newBook))
    return this.http.post('/books/create', newBook) as Observable<Book>
  }

  deleteBook(bookId: number): Observable<unknown> {
    return this.http.delete('/books/delete', { body: { id: bookId }})
  }
}
