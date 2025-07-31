import {inject, Injectable} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {User} from "../../../models";
import {ResponseHelper} from "../helpers/response.helper";

@Injectable({
  providedIn: 'root'
})
export class UserMethodsService {
  private storageService: StorageService<User> = inject(StorageService<User>)

  constructor() {
    this.storageService.entityKey = 'angular-14-registration-login-example-users';
  }

  register(user: any): Observable<HttpResponse<any>> {
    const users = this.storageService.getItems();

    if (users.find(x => x.username === user.username)) {
      return ResponseHelper.error('Username "' + user.username + '" is already taken');
    }

    user.id = users.length ? Math.max(...users.map(user => Number(user.id))) + 1 : 1;
    users.push(user);
    this.storageService.saveItems(users);

    return ResponseHelper.ok();
  }

  getUsers(): Observable<HttpResponse<User[]>> {
    return ResponseHelper.ok([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]);
  }
}
