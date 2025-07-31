import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserMethodsService } from '../services/user-methods.service';
import { BookMethodsService } from '../services/book-methods.service';
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RouteHandler {
  private authService: AuthService = inject(AuthService);
  private userMethodsService: UserMethodsService = inject(UserMethodsService);
  private bookMethodsService: BookMethodsService = inject(BookMethodsService);

  handleRoute(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request;

    switch (true) {
      case url.endsWith('/authenticate') && method === 'POST':

      case url.endsWith('/auth/login') && method === 'POST':
        return this.authService.authenticate(request.body);

      case url.endsWith('/users/add') && method === 'POST':
        return this.userMethodsService.register(request.body);

      case url.endsWith('/users') && method === 'GET':
        return this.userMethodsService.getUsers();

      case url.endsWith('/books') && method === 'GET':
        return this.bookMethodsService.getBooks(request);

      case url.match(/\/books\/\d+$/) && method === 'GET':
        return this.bookMethodsService.getBookById(request);

      case url.endsWith('/books/add') && method === 'POST':
        return this.bookMethodsService.addBook(request);

      case url.match(/\/books\/\d+$/) && method === 'PUT':
        return this.bookMethodsService.updateBook(request);

      case url.endsWith('/books/search') && method === 'POST':
        return this.bookMethodsService.searchBooks(request.body);

      case url.match(/\/books\/\d+$/) && method === 'DELETE':
        return this.bookMethodsService.deleteBook(request);

      default:
        return next.handle(request);
    }
  }
}
