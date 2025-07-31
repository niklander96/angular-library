import {BookService} from "./services";

import {ApplicationConfig, importProvidersFrom, InjectionToken} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { routes } from './app.routes';
import {fakeBackendProvider} from "./helpers";
import {errorProvider} from "./helpers/error.interceptor";
import {jwtProvider} from "./helpers/jwt.interceptor";
import {booksMock} from "./mock/books";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    jwtProvider,
    errorProvider,
    booksMock,
    fakeBackendProvider,
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BookService
    )
  ]
};
