import { EBookStatuses } from "../enum/book-statuses.enum";

/** Класс книги. */
export class Book {
  /**
   * Конструктор класса книги.
   * @param {number} id - Уникальный идентификатор.
   * @param {string} name - Название книги. 
   * @param {string} author - Автор.
   * @param {string} releaseDate - Дата выпуска.
   * @param {BookStatuses} bookStatus - Статус книги.
   */
  constructor(
    public id: number,
    public name: string, 
    public author: string,
    public releaseDate: string,
    public bookStatus: EBookStatuses
) {}
}