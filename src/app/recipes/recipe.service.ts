import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe-model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private baseUrl = 'http://localhost:8080/api/v1';

  recipes: Recipe[] = [
    new Recipe(
      'React Recipe',
      'CookBook For ReactJs',
      'https://learning.oreilly.com/library/cover/9781492085836/250w/',
      [new Ingredient('npm', 11), new Ingredient('ngRx', 4.2)],
      1
    ),
  ];

  /**
   *  TO DO:
   * make a dictionay in ingrdient,and pass 2 values
   * secont would be the respective recipe.name
   * access it from getIngerdient method
   * and use in shopping detail compoenent.
   */

  ingredients: Ingredient[] = [];

  constructor(private http: HttpClient) {
    this.recipes.forEach((recipe) =>
      this.ingredients.push(...recipe.ingredients)
    );
  }

  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-recipes`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-recipes/${id}`);
  }

  addRecipes(recipe: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add-recipe`, recipe);
  }
  addRecipeIngredient(recipeIngredient:Object):Observable<Object>{
    return this.http.post(`${this.baseUrl}/all-recipe-ingredient`,recipeIngredient)
  }
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-recipe/${id}`, { responseType: 'text' });
  }

  /**
   * WITHOUT BACKEND FUNCTIONS BELOW
   **/

  getRecipes() {
    return this.recipes.slice();
    // slice() is to return a copy of an array, since it is set private
  }

  getAllRecipesByList(id: number) {
    return this.recipes[id];
  }

  getIngredients() {
    return this.ingredients;
  }
  getIngredient(index) {
    return this.ingredients[index];
  }

  getName(name: string) {
    var recipeName;
    for (var recipe of this.recipes) {
      for (var ingredient of recipe.ingredients) {
        if (ingredient.name == name) {
          recipeName = recipe.recipeName;
          break;
        }
      }
    }
    console.log('recipeName: ' + recipeName);
    // return this.recipes[name];
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
}
