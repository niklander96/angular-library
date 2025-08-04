import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../enviroments/enviroment';
import { User } from '../models';
import {StorageService} from "../helpers/fake-backend/services/storage.service";

interface IAccountService {
  user: Observable<User | null>;
  userSubjectFromService: BehaviorSubject<User | null>
  login(username: string, password: string): Observable<User | null>;
  logout(): void;
  updateUser(user: User): void
}

@Injectable({
  providedIn: 'root'
})
export class AccountService implements IAccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService<User>
  ) {
    this.storageService.entityKey = 'user';
    this.userSubject = new BehaviorSubject(this.storageService.getItem());
    this.user = this.userSubject.asObservable();
  }

  public get userSubjectFromService() {
    return this.userSubject;
  }

  /**
   *
   * @param username
   * @param password
   */
  public login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  /**
   *
   */
  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  /**
   *
   * @param user
   */
  public updateUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
