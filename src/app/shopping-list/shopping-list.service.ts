import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  selectedOption: string;
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

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
