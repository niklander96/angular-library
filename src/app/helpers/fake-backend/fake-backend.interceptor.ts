import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {RouteHandler} from "./helpers/route-handler.helper";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private routeHandler: RouteHandler = inject(RouteHandler);

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return of(null)
      .pipe(mergeMap(() => this.routeHandler.handleRoute(request, next)))
      .pipe(materialize()) // Задержка + эмуляция поведения сервера
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
}

