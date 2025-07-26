import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BookCreateFormComponent } from './components/book-create-form/book-create-form.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'books/create', component: BookCreateFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
