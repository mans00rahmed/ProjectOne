import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}
  ingredients: Ingredient[] = this.recipeService.getIngredients();
  selectedOption = this.shoppingListService.selectedOption;

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  /**  This is the list which will be mappped on the recipeService's method getIngerdiets,
   * which is returning the list of ingredient s from the main object of recipeService
   *
   * This is taking accessing data directly from recipeService Service.
   **/
}
