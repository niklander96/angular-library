import {BookService} from "./services";

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { routes } from './app.routes';
import {fakeBackendProvider} from "./helpers";
import {createEntityMethodsToken} from "./interfaces/entity-methods.interface";
import {Book, User} from "./models";
import {UserService} from "./services/user.service";
import {EntityService} from "./services/entity.service";
export const USER_METHODS_TOKEN = createEntityMethodsToken<User>('user');
export const BOOK_METHODS_TOKEN = createEntityMethodsToken<Book>('book');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    {provide: USER_METHODS_TOKEN, useClass: UserService},
    {provide: BOOK_METHODS_TOKEN, useClass: BookService},
    fakeBackendProvider,
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BookService
    )
  ]
};
