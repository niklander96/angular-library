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
import { User } from '../helpers/user';
import { Book } from '../helpers';
import { books } from '../../app/mock/books'

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let lastId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
    
    
    const { url, method, body } = request;

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

    function addBook(): Observable<HttpResponse<Book>> {
      const books = getBooksFromStorage();
      const newBook = { id: generateNewId(), ...body, bookStatus: 'NOT_IN_USE' };
      books.push(newBook);
      saveBooksToStorage(books);
      return ok(newBook);
    }

    function deleteBook(): Observable<HttpResponse<void>> {
      let books = getBooksFromStorage();
      const index = books.findIndex(b => b.id === body.id);
      if (index === -1) return error('Книга не найдена');
  
      books = books.filter(b => b.id !== body.id);
      saveBooksToStorage(books);
      return ok();
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
  }
}