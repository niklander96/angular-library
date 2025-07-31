import { HttpRequest } from '@angular/common/http';

export class AuthHelper {
  static isLoggedIn(request: HttpRequest<any>): boolean {
    return request.headers.get('Authorization') === 'Bearer fake-jwt-token';
  }
}
