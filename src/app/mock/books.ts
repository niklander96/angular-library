import { EBookStatuses } from "../enum/book-statuses.enum";
import { Book } from "../models";
import {InjectionToken} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FakeBackendInterceptor} from "../helpers/fake-backend/fake-backend.interceptor";

export const books: Book[] =  [
    {
      id: '1',
      name: "Властелин Колец",
      author: "Дж. Р. Р. Толкин",
      releaseDate: new Date("29.07.1954"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '2',
      name: "Гарри Поттер и философский камень",
      author: "Дж. К. Роулинг",
      releaseDate: new Date("26.06.1997"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '3',
      name: "Преступление и наказание",
      author: "Ф. М. Достоевский",
      releaseDate: new Date("01.01.1866"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '4',
      name: "1984",
      author: "Джордж Оруэлл",
      releaseDate: new Date("08.06.1949"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '5',
      name: "Мастер и Маргарита",
      author: "М. А. Булгаков",
      releaseDate: new Date("01.01.1967"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '6',
      name: "Три товарища",
      author: "Эрих Мария Ремарк",
      releaseDate: new Date("01.01.1936"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '7',
      name: "Анна Каренина",
      author: "Л. Н. Толстой",
      releaseDate: new Date("01.01.1877"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '8',
      name: "Убить пересмешника",
      author: "Харпер Ли",
      releaseDate: new Date("11.07.1960"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '9',
      name: "Маленький принц",
      author: "Антуан де Сент-Экзюпери",
      releaseDate: new Date("06.04.1943"),
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: '10',
      name: "Тень горы",
      author: "Грегори Дэвид Робертс",
      releaseDate: new Date("01.01.2015"),
      bookStatus: EBookStatuses.NOT_IN_USE
    }
  ]

export const BOOKS_MOCK = new InjectionToken<Book[]>('books');

export const booksMock = {
  provide: BOOKS_MOCK,
  useValue: books,
}
