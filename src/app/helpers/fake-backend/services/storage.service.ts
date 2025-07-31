import { Injectable } from '@angular/core';

interface IStorage<EntityType> {
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
   * Возвращает элементы из localStorage.
   * @returns {EntityType[]}
   */
  getItems(): EntityType[] {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Сохраняет элементы в localStorage.
   * @param {EntityType[]} items - Элементы.
   * @returns {void}
   */
  saveItems(items: EntityType[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

}
