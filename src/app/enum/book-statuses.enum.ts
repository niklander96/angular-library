/**
 * Статусы книги.
 * @member {string} BookStatuses.IN_USE - В пользовании.
 * @member {string} BookStatuses.NOT_IN_USE - Не в пользовании.
 * @member {string} BookStatuses.LOST - Утеряна.
 * @member {string} BookStatuses.DAMAGED - Повреждена.
 */
export enum EBookStatuses {
    IN_USE = 'inUse',
    NOT_IN_USE = 'notInUse',
    LOST = 'lost',
    DAMAGED = 'damaged'
}