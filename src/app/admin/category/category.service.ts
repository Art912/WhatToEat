import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../shared/dto/category";

@Injectable()
export class CategoryService {

  readonly rootUrl = 'http://localhost:5068/api';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Category[]> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.get<Category[]>(`${this.rootUrl}/category/getAll`);
  }

  public create(item: Category): Observable<void> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.post<void>(`${this.rootUrl}/category/Create`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/category/${id}`);
  }

  public getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.rootUrl}/category/${id}`);
  }

  public update(item: Category): Observable<void> {
    // вызов get метода из HttpClient
    // <BreedResponse> - тип данных который мы ожидаем что придёт из API
    return this.http.put<void>(`${this.rootUrl}/category/${item.id}`, item);
  }

}
