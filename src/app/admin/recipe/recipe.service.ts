import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../../shared/dto/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  readonly rootUrl = 'http://localhost:5068/api';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.rootUrl}/recipe/getAll`);
  }

  public create(item: Recipe): Observable<void> {
    return this.http.post<void>(`${this.rootUrl}/recipe/Create`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/recipe/Remove?id=${id}`);
  }

  public getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.rootUrl}/recipe/GetById?id=${id}`);
  }

  public update(item: Recipe): Observable<void> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.put<void>(`${this.rootUrl}/recipe/Update`, item);
  }
}
