import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";

export interface IEntityMethods<EntityType> {
  getAll() : Observable<EntityType[]> | void;

  getById(id: string) : Observable<EntityType> | void;

  add(entity: EntityType): Observable<EntityType> | void;

  update(id: string, params: any): Observable<EntityType[]> | void;

  delete(id: string): Observable<EntityType[]> | void;
}
