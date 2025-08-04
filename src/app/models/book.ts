import { EBookStatuses } from "../enum/book-statuses.enum";

/** Класс книги. */
export class Book {
  /**
   * Конструктор класса книги.
   * @property {string | undefined} id - Уникальный идентификатор.
   * @property {string | undefined} name - Название книги.
   * @property {string | undefined} author - Автор.
   * @property {Date | undefined} releaseDate - Дата выпуска.
   * @property {EBookStatuses | undefined} bookStatus - Статус книги.
   * @property {boolean | undefined} isDeleting - Удаляется ли книга?
   * @property {boolean | undefined} isStatusChanging - Изменяется ли статус книги?
   */
  constructor(
    public id?: string,
    public name?: string,
    public author?: string,
    public releaseDate?: Date,
    public bookStatus?: EBookStatuses,
    public isDeleting?: boolean,
    public isStatusChanging?: boolean

) {}
}
