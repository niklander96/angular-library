import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import {BookService} from "../../../services";

@Component({
  selector: 'tsc-books-layout',
  standalone: true,
  imports: [RouterOutlet],
  providers: [BookService],
  templateUrl: './books-layout.component.html',
})
export class BooksLayoutComponent {}
