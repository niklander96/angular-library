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
import {errorProvider} from "./helpers/error.interceptor";
import {jwtProvider} from "./helpers/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    provideHttpClient(
      withInterceptorsFromDi()
    ),
    jwtProvider,
    errorProvider,
    fakeBackendProvider,
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BookService
    )
  ]
};
