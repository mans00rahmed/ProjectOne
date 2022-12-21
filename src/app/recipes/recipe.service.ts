import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe-model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe(
      'React Recipe',
      'CookBook For ReactJs',
      'https://learning.oreilly.com/library/cover/9781492085836/250w/',
      [new Ingredient('npm', 11), new Ingredient('ngRx', 4.2)]
    ),
    new Recipe(
      'Node Recipe',
      'CookBook For NodeJs',
      'https://static.packt-cdn.com/products/9781838558758/cover/smaller',
      [new Ingredient('ngnix', 2.1), new Ingredient('pyttsx3', 2.1)]
    ),
    new Recipe(
      'Python Recipe',
      'CookBook for Python.',
      'https://books.google.com.pk/books/content?id=1Shx_VXS6ioC&pg=PP1&img=1&zoom=3&hl=en&sig=ACfU3U1iko6DI_NnXwNgPw_UP-AVijll3w&w=1280',
      [new Ingredient('pip', 12.1)]
    ),
    new Recipe(
      'Angular Recipe',
      'Angular Cookbook',
      'https://books.google.com.pk/books/publisher/content?id=Mkw5EAAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&sig=ACfU3U06PDkpoV-Vq7Bo2Ttp7SIQ9_ryfg&w=1280',
      [new Ingredient('ng', 3.2)]
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

  constructor() {
    this.recipes.forEach((recipe) =>
      this.ingredients.push(...recipe.ingredients)
    );
  }

  getRecipes() {
    return this.recipes.slice();
    // slice() is to return a copy of an array, since it is set private
  }

  getRecipe(index: number) {
    return this.recipes[index];
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
          recipeName = recipe.name;
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
