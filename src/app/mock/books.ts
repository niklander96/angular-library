import { EBookStatuses } from "../enum/book-statuses.enum";
import { Book } from "../models";

export const books: Book[] =  [
    {
      id: 1,
      name: "Властелин Колец",
      author: "Дж. Р. Р. Толкин",
      releaseDate: "29.07.1954",
      bookStatus: EBookStatuses.IN_USE
    },
    {
      id: 2,
      name: "Гарри Поттер и философский камень",
      author: "Дж. К. Роулинг",
      releaseDate: "26.06.1997",
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: 3,
      name: "Преступление и наказание",
      author: "Ф. М. Достоевский",
      releaseDate: "01.01.1866",
      bookStatus: EBookStatuses.LOST
    },
    {
      id: 4,
      name: "1984",
      author: "Джордж Оруэлл",
      releaseDate: "08.06.1949",
      bookStatus: EBookStatuses.IN_USE
    },
    {
      id: 5,
      name: "Мастер и Маргарита",
      author: "М. А. Булгаков",
      releaseDate: "01.01.1967",
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: 6,
      name: "Три товарища",
      author: "Эрих Мария Ремарк",
      releaseDate: "01.01.1936",
      bookStatus: EBookStatuses.DAMAGED
    },
    {
      id: 7,
      name: "Анна Каренина",
      author: "Л. Н. Толстой",
      releaseDate: "01.01.1877",
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: 8,
      name: "Убить пересмешника",
      author: "Харпер Ли",
      releaseDate: "11.07.1960",
      bookStatus: EBookStatuses.IN_USE
    },
    {
      id: 9,
      name: "Маленький принц",
      author: "Антуан де Сент-Экзюпери",
      releaseDate: "06.04.1943",
      bookStatus: EBookStatuses.NOT_IN_USE
    },
    {
      id: 10,
      name: "Тень горы",
      author: "Грегори Дэвид Робертс",
      releaseDate: "01.01.2015",
      bookStatus: EBookStatuses.IN_USE
    }
  ]