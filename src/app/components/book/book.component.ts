import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from 'src/app/models';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookComponent {
  @Input() public book?: Book

  constructor(private bookService: BookService) {}

  /**
   * Удаляет книгу.
   * @returns {void}
   */
  deleteBook(): void {
    if (!this.book?.id) return 

    this.bookService.deleteBook(this.book?.id).subscribe()
  }
}
