
import { Injectable } from '@angular/core';
import {User} from "../models";
import {delay, map, Observable} from "rxjs";
import {AccountService} from "./account.service";
import {EntityService} from "./entity.service";
import {IEntityMethods} from "../interfaces/entity-methods.interface";

/**
 * Сервис для работы с пользователями.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService implements IEntityMethods<User> {
  constructor(
    private entityService: EntityService<User>,
    private accountService: AccountService,
  ) {
    this.entityService.entityNameFromService = 'users';
  }

  /**
   * Возвращает всех пользователей.
   * @returns {Observable<User[]>}
   */
  getAll(): Observable<User[]> {
    return this.entityService.getAll().pipe(delay(3000))
  }

  /**
   * Возвращает пользователя по id.
   * @param {number} id - Уникальный идентификатор.
   * @returns {Observable<User>}
   */
  getById(id: string): Observable<User> {
    return this.entityService.getById(id)
  }

  /**
   * Добавляет пользователя.
   * @param {User} user - Объект нового пользователя.
   * @returns {Observable<User>}
   */
  add(user: User): Observable<User> {
    return this.entityService.add(user)
  }

  /**
   * Обновляет пользователя.
   * @param {string} id - Уникальный идентификатор.
   * @param {any} params - Параметры.
   * @returns {Observable<User>}
   */
  update(id: string, params: any): Observable<User> {
    return this.entityService.update(id, params)
      .pipe(map(x => {
        if (id == this.accountService.getUserSubject.value?.id) {
          const user = { ...this.accountService.getUserSubject.value, ...params };

          localStorage.setItem('user', JSON.stringify(user));

          this.accountService.getUserSubject.next(user);
        }
        return x;
      }))
  }

  /**
   * Удаляет пользователя.
   * @param {string} id - Уникальный идентификатор книги.
   * @returns {Observable<User[]>}
   */
  delete(id: string): Observable<User[]> {
    return this.entityService.delete(id)
      .pipe(map(x => {
        // auto logout if the logged-in user deleted their own record
        if (id == this.accountService.getUserSubject.value?.id) {
          this.accountService.logout();
        }
        return x;
      }))
  }
}
