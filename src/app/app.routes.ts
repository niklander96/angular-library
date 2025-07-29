import {Routes} from "@angular/router";
import {BooksComponent} from "./components/books/books.component";
import {BookCreateFormComponent} from "./components/book-create-form/book-create-form.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./helpers";
import {UsersComponent} from "./components/users/users.component";
import {LayoutComponent, LoginComponent, RegisterComponent} from "./components/account";

export const routes: Routes = [
  { path: 'books', component: BooksComponent,
  children: [
    { path: 'create', component: BookCreateFormComponent },
    { path: 'edit', component: BookCreateFormComponent }
  ]},
  { path: 'books/create', component: BookCreateFormComponent },
  { path: 'users', component: UsersComponent,},
  { path: 'account',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '', component: HomeComponent,
    // canActivate: [AuthGuard]
  },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
