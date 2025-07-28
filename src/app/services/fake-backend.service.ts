import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Book } from '../models';
import { BookService } from './book.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  books: Book[] = []

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('request')

    const books = this.books

    let lastId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;

    
    
    const { url, method, headers, body } = request;
    console.log('url', url)
    // Имитируем задержку API
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // Задержка + эмуляция поведения сервера
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        // Пример: GET /users
        case url.endsWith('/users') && method === 'GET':
          return getUsers();

        case url.endsWith('/books') && method === 'GET':
          return getBooks();

        case url.endsWith('/books/create') && method === 'POST':
          return addBook();

        case url.endsWith('/books/search') && method === 'POST':
          return searchBooks(';');

        case url.endsWith('/books/delete') && method === 'DELETE':
          return deleteBook();
        
        // Пример: POST /auth/login
        case url.endsWith('/auth/login') && method === 'POST':
          return authenticate();
        
        // Если URL не совпадает ни с одним mock-эндпоинтом, пропускаем запрос дальше
        default:
          return next.handle(request);
      }
    }

    // Mock-функции
    function getUsers(): Observable<HttpResponse<User[]>> {
      return ok([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ]);
    }

    function getBooks(): Observable<HttpResponse<Book[]>> {
      const books = getBooksFromStorage();
      return ok(books);
    }

    function searchBooks(searchValue: string): Observable<HttpResponse<Book[]>> {
      const books = getBooksFromStorage();
      return ok(books.filter((book) => {
        return book.name === searchValue
      }));
    }

    function addBook(): Observable<HttpResponse<Book>> {
      const books = getBooksFromStorage();
      console.log('body', body)
      const newBook = { id: generateNewId(), ...body };
      books.push(newBook);
      saveBooksToStorage(books);
      return ok(newBook);
    }

    function deleteBook(): Observable<HttpResponse<Book[]>> {
      let books = getBooksFromStorage();

      const index = books.findIndex(b => b.id === body.id);
      if (index === -1) return error('Книга не найдена');
  
      books = books.filter(b => b.id !== body.id);
      console.log('books', books)
      saveBooksToStorage(books);
      return ok(books);
    }

    function authenticate() {
      const { username, password } = body;
      if (username === 'admin' && password === 'admin') {
        return ok({ token: 'fake-jwt-token' });
      } else {
        return error('Неверный логин или пароль');
      }
    }

    // Вспомогательные функции
    // Получение книг из localStorage (или начального массива)
    function getBooksFromStorage(): Book[] {
      const stored = localStorage.getItem('library-books');
      return stored ? JSON.parse(stored) : [...books];
    }

    // Сохранение книг в localStorage
    function saveBooksToStorage(books: Book[]): void {
      localStorage.setItem('library-books', JSON.stringify(books));
    }

    function generateNewId(): number {
      return ++lastId;
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } }));
    }

    function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: any) {
            const { id, username, firstName, lastName } = user;
            return { id, username, firstName, lastName };
    }

    function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}