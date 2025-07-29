
/** Класс прочитанных книг. */
export class ReadBooks {
  /**
   *
   * @param bookId
   * @param name
   * @param startReadingDate
   * @param endReadingDate
   */
  constructor(
    public bookId: number,
    public name: string,
    public startReadingDate: string,
    public endReadingDate: string
  ) {

  }
}

/** Класс клиента (пользователя). */
export class User {
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  readBooks?: ReadBooks[]
}
