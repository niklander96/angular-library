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

/** Класс прочитанных книг. */
export class LibraryCard {
    /**
     * 
     * @param userId 
     * @param userName 
     * @param readBooks 
     */
    constructor(
        public userId: number,
        public userName: string,
        public readBooks: ReadBooks[],
    ) {

    }
}