import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ReadBook} from "../../models/user";

@Component({
  selector: 'tsc-current-books',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './current-books.component.html',
})
export class CurrentBooksComponent {
  @Input() public currentBooks?: ReadBook[];
}
