import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FakeBackendInterceptor } from './services/fake-backend.service';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { BooksService } from './services/books.service';
import { BookStatusPipe } from './pipes/book-status.pipe';
import { HomeComponent } from './components/home/home.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    BookStatusPipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterLink
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }, BooksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
