import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Book } from '../../../models';
import { StorageService } from './storage.service';
import { ResponseHelper } from '../helpers/response.helper';
import { AuthHelper } from '../helpers/auth.helper';
import { UrlHelper } from '../helpers/url.helper';
import {BOOKS_MOCK} from "../../../mock/books";

interface IBookMethodsService {
  getBooks(request: HttpRequest<any>): Observable<HttpResponse<Book[]>>
  getBookById(request: HttpRequest<any>): Observable<HttpResponse<Book>>
  addBook(request: HttpRequest<any>): Observable<HttpResponse<Book>>
  updateBook(request: HttpRequest<any>): Observable<HttpResponse<Book[]>>
  searchBooks(request: HttpRequest<any>): Observable<HttpResponse<Book[]>>
  deleteBook(request: HttpRequest<any>): Observable<HttpResponse<Book[]>>
}

@Injectable({
  providedIn: 'root'
})
export class BookMethodsService implements IBookMethodsService {
  private storageService: StorageService<Book> = inject(StorageService<Book>)
  private books: Book[] = inject(BOOKS_MOCK)

  constructor() {
    this.storageService.entityKey = 'library-books';
  }

  /**
   *
   * @param request
   */
  public getBooks(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const gettedBooks = this.storageService.getItems();

    if (gettedBooks.length === 0) {
      this.storageService.saveItems(this.books)
    }

    return ResponseHelper.ok(gettedBooks);
  }

  /**
   *
   * @param request
   */
  public getBookById(request: HttpRequest<any>): Observable<HttpResponse<Book>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const books = this.storageService.getItems();
    const bookId = UrlHelper.idFromUrl(request.url);
    const book = books.find(books => books.id === bookId.toString());

    return ResponseHelper.ok(book);
  }

  /**
   *
   * @param request
   */
  public addBook(request: HttpRequest<any>): Observable<HttpResponse<Book>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const books = this.storageService.getItems();

    const newBook = { ...request.body };

    books.push(newBook);

    this.storageService.saveItems(books);

    return ResponseHelper.ok(newBook);
  }

  /**
   *
   * @param request
   */
  public updateBook(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const books = this.storageService.getItems();

    const updatedBooks = books.map(item => {
      if (item.id !== request.body?.id) return item;

      return { ...request.body };
    });

    this.storageService.saveItems(updatedBooks);

    return ResponseHelper.ok(updatedBooks);
  }

  /**
   *
   * @param request
   */
  public searchBooks(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    const books = this.storageService.getItems();
    const searchValue = request.body.searchValue || '';

    return ResponseHelper.ok(books.filter((book) => {
      return book.name === searchValue;
    }));
  }

  /**
   *
   * @param request
   */
  public deleteBook(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    let books = this.storageService.getItems();
    const bookId = UrlHelper.idFromUrl(request.url);
    books = books.filter(book => book.id !== bookId.toString());

    this.storageService.saveItems(books);
    return ResponseHelper.ok(books);
  }
}
