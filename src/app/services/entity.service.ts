import { Injectable } from '@angular/core';
import {IEntityMethods} from "../interfaces/entity-methods.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class EntityService<EntityType> implements IEntityMethods<EntityType> {
  private entityName: string = ''

  constructor(private http: HttpClient) {}

  set entityNameFromService(newEntityName: string) {
    this.entityName = newEntityName;
  }

  public getAll(): Observable<EntityType[]> {
    return this.http.get<EntityType[]>(`${environment.apiUrl}/${this.entityName}`);
  }

  public getById(id: string): Observable<EntityType> {
    return this.http.get<EntityType>(`${environment.apiUrl}/${this.entityName}/${id}`);
  }

  public add(entity: EntityType): Observable<EntityType> {
    return this.http.post<EntityType>(`${environment.apiUrl}/${this.entityName}/add`, entity);
  }

  public update(id: string, params: any): Observable<EntityType[]> {
    return this.http.put<EntityType[]>(`${environment.apiUrl}/${this.entityName}/${id}`, params)
  }

  public delete(id: string): Observable<EntityType[]> {
    return this.http.delete<EntityType[]>(`${environment.apiUrl}/${this.entityName}/${id}`)
  }
}
