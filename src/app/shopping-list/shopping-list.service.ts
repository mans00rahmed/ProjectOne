import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class ShoppingListService {
  selectedOption: string;
  startedEditing = new Subject<Number>() ;
  ingredientsChanged = new Subject<Ingredient[]>();

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-ingredients`);
  }

  getIngredientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-ingredients/${id}`);
  }

  addIngredient(ingredient: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add-ingredient`, ingredient);
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-ingredient/${id}`, { responseType: 'text' });
  }
  
}
