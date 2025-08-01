import {inject, Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {Book, User} from "../../../models";
import {ResponseHelper} from "../helpers/response.helper";

@Injectable({
  providedIn: 'root'
})
export class UserMethodsService {
  private storageService: StorageService<User> = inject(StorageService<User>)

  public register(user: any): Observable<HttpResponse<any>> {
    this.storageService.entityKey = 'users';
    const users = this.storageService.getItems();

    if (users.find(x => x.username === user.username)) {
      return ResponseHelper.error('Username "' + user.username + '" is already taken');
    }

    user.id = users.length ? Math.max(...users.map(user => Number(user.id))) + 1 : 1;
    users.push(user);
    this.storageService.saveItems(users);

    return ResponseHelper.ok();
  }
}
