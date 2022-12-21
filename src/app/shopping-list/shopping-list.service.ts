import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class ShoppingListService {
  selectedOption: string;
  startedEditing = new Subject<number>();
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

  //   ingredients: Ingredient[] = [];
  //   constructor(private recipeSerice:RecipeService){
  //     this.ingredients=this.recipeSerice.getIngredients()
  //   }

  //   addIngredients(ingredients: Ingredient[]) {
  //     ingredients.push(...this.ingredients);

  //    this.ingreditentsChanged.emit(this.ingredients.slice());
  //   }

  //   addIngredient(ingredient: Ingredient) {
  //     this.ingredients.push(ingredient);
  //     this.ingredientsChanged.next(this.ingredients.slice());
  //   }
}
