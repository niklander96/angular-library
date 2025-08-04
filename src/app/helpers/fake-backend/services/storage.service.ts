import { Injectable } from '@angular/core';

interface IStorage<EntityType> {
  getItem(): EntityType | null
  saveItem(item: EntityType): void
  getItems(): EntityType[]
  saveItems(items: EntityType[]): void
}

@Injectable({
  providedIn: 'root'
})
export class StorageService<EntityType> implements IStorage<EntityType> {
  private key!: string;

  set entityKey(key: string) {
    this.key = key;
  }

  /**
   * Возвращает элемент из localStorage.
   * @returns {EntityType}
   */
  public getItem(): EntityType | null {
    const stored = localStorage.getItem(this.key) ?? '';

    return JSON.parse(stored);
  }

  /**
   * Сохраняет элементы в localStorage.
   * @param {EntityType} item - Элементы.
   * @returns {void}
   */
  public saveItem(item: EntityType): void {
    localStorage.setItem(this.key, JSON.stringify(item));
  }

  /**
   * Возвращает элементы из localStorage.
   * @returns {EntityType[]}
   */
  public getItems(): EntityType[] {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Сохраняет элементы в localStorage.
   * @param {EntityType[]} items - Элементы.
   * @returns {void}
   */
  public saveItems(items: EntityType[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }
}
