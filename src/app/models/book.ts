import { EBookStatuses } from "../enum/book-statuses.enum";

/** Класс книги. */
export class Book {
  /**
   * Конструктор класса книги.
   * @property {string} id - Уникальный идентификатор.
   * @property {string} name - Название книги.
   * @property {string} author - Автор.
   * @property {string} releaseDate - Дата выпуска.
   * @property {BookStatuses} bookStatus - Статус книги.
   * @property {boolean | undefined} isDeleting - Удаляется ли книга?ы
   *
   */
  constructor(
    public id?: string,
    public name?: string,
    public author?: string,
    public releaseDate?: string,
    public bookStatus?: EBookStatuses,
    public isDeleting?: boolean
) {}
}
