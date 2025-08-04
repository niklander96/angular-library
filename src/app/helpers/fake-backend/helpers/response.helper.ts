import { Observable, of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { delay, materialize, dematerialize } from 'rxjs/operators';

export class ResponseHelper {
  public static ok(body?: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({status: 200, body}));
  }

  public static error(message: string): Observable<never> {
    return throwError(() => ({error: {message}}));
  }

  public static unauthorized(): Observable<never> {
    return throwError(() => ({status: 401, error: {message: 'Unauthorized'}}))
      .pipe(materialize(), delay(500), dematerialize());
  }
}
