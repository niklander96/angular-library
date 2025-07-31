import {Routes} from "@angular/router";
import {BooksComponent} from "./components/books/books/books.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./helpers";
import {LayoutComponent, LoginComponent, RegisterComponent} from "./components/account";
import {BooksLayoutComponent} from "./components/books/books-layout/books-layout.component";
import {AddEditBookComponent} from "./components/books/add-edit-book/add-edit-book.component";
import {LibraryCardComponent} from "./components/library-card/library-card.component";

export const routes: Routes = [
  { path: 'books', component: BooksLayoutComponent, canActivate: [AuthGuard],
  children: [
    { path: '', component: BooksComponent },
    { path: 'add', component: AddEditBookComponent },
    { path: 'edit/:id', component: AddEditBookComponent }
  ]},
  { path: 'library-card', component: LibraryCardComponent, canActivate: [AuthGuard]},
  { path: 'account',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
