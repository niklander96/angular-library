import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Book } from '../../../models';
import { StorageService } from './storage.service';
import { ResponseHelper } from '../helpers/response.helper';
import { AuthHelper } from '../helpers/auth.helper';
import { UrlHelper } from '../helpers/url.helper';
import {BOOKS_MOCK} from "../../../mock/books";

@Injectable({
  providedIn: 'root'
})
export class BookMethodsService {
  private storageService: StorageService<Book> = inject(StorageService<Book>)
  private books: Book[] = inject(BOOKS_MOCK)

  constructor() {
    this.storageService.entityKey = 'library-books';
  }

  getBooks(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const gettedBooks = this.storageService.getItems();

    if (gettedBooks.length === 0) {
      this.storageService.saveItems(this.books)
    }

    return ResponseHelper.ok(gettedBooks);
  }

  getBookById(request: HttpRequest<any>): Observable<HttpResponse<Book | undefined>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const books = this.storageService.getItems();
    const bookId = UrlHelper.idFromUrl(request.url);
    const book = books.find(books => books.id === bookId.toString());

    return ResponseHelper.ok(book);
  }

  addBook(request: HttpRequest<any>): Observable<HttpResponse<Book>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const books = this.storageService.getItems();
    const newBook = { ...request.body };
    books.push(newBook);
    this.storageService.saveItems(books);

    return ResponseHelper.ok(newBook);
  }

  updateBook(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    if (!AuthHelper.isLoggedIn(request)) {
      return ResponseHelper.unauthorized();
    }

    const books = this.storageService.getItems();
    const bookId = UrlHelper.idFromUrl(request.url);
    const book = books.find(book => book.id === bookId.toString()) || new Book();

    book.bookStatus = request.body.bookStatus
    const updatedBooks = books.map(item => {
      if (item.id !== book?.id) return item;
      return { ...book };
    });
    this.storageService.saveItems(updatedBooks);

    return ResponseHelper.ok(updatedBooks);
  }

  searchBooks(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
    const books = this.storageService.getItems();
    const searchValue = request.body.searchValue || '';

    return ResponseHelper.ok(books.filter((book) => {
      return book.name === searchValue;
    }));
  }

  deleteBook(request: HttpRequest<any>): Observable<HttpResponse<Book[]>> {
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
