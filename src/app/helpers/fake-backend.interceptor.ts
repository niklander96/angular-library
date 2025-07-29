import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';
import { Book } from '../models';
import { BookService } from '../services/book.service';

// array in local storage for registered users
const usersKey = 'angular-14-registration-login-example-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  books: Book[] = []

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const books = this.books

    let lastId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;

    const { url, method, headers, body } = request;

    // Имитируем задержку API
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // Задержка + эмуляция поведения сервера
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();

        case url.endsWith('/register') && method === 'POST':
          return register();

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

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token'
      })
    }

    function register() {
      const user = body

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
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

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
}

