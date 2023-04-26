import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Ingredient} from "../../shared/dto/ingredient";

@Injectable()

export class IngredientsService {

  readonly rootUrl = 'http://localhost:5068/api';

  constructor(private http: HttpClient) {
  }

  //  Observable - наблюдатель который возвращает поток данный все кто на него подписан
  //  подписываюься на него в компонентах через .subscribe()
  public getAllIngredients(): Observable<Ingredient[]> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.get<Ingredient[]>(`${this.rootUrl}/ingredient/getAll`);
  }

  public create(item: Ingredient): Observable<void> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.post<void>(`${this.rootUrl}/ingredient/Create`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/ingredient/Remove?id=${id}`);
  }

  public getById(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.rootUrl}/ingredient/GetById?id=${id}`);
  }

  public update(item: Ingredient): Observable<void> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.put<void>(`${this.rootUrl}/ingredient/Update`, item);
  }
}
