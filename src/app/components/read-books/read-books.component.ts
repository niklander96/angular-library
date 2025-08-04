import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ReadBook} from "../../models/user";

@Component({
  selector: 'tsc-read-books',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './read-books.component.html',
})
export class ReadBooksComponent {
  @Input() public readBooks?: ReadBook[];
}
