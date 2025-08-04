import {inject, Injectable} from '@angular/core';
import {User} from "../../../models";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ResponseHelper} from "../helpers/response.helper";

interface IBasicDetails {
  id: string
  username: string
  firstName: string
  lastName: string
}

interface IAuthService {
  authenticate(body: any): Observable<HttpResponse<any>>
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private storageService: StorageService<User> = inject(StorageService<User>);

  constructor() {
    this.storageService.entityKey = 'users';
  }

  public authenticate(body: any): Observable<HttpResponse<any>> {
    const { username, password } = body;
    const users = this.storageService.getItems();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
      return ResponseHelper.error('Username or password is incorrect');
    }

    return ResponseHelper.ok({
      ...this.basicDetails(user),
      token: 'fake-jwt-token'
    });
  }

  private basicDetails(user: any) {
    const { id, username, firstName, lastName } = user;
    return { id, username, firstName, lastName };
  }
}
