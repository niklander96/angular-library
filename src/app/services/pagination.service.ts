import { Injectable } from '@angular/core';

interface IPaginationService {
  pageFromService: number
  setPage(page: number): void
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements IPaginationService {
  private page: number = 1;

  constructor() { }

  get pageFromService() {
    return this.page;
  }

  public setPage(page: number) {
    this.page = page;
  }
}
