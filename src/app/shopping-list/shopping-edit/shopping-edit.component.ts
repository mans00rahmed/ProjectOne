import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe-model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  name: string; //this name and
  amount: number; //this amount
  editMode: boolean = false;
  editedItemIndex: number;
  ingredientsChanges: any;
  // Should be sent on
  selectedOption: string; //this selected option
  @ViewChild('f', { static: false }) slForm: NgForm;

  recipes = this.recipeService.getRecipes();
  recipe: string;
  editedItem: Ingredient;

  changeOfData(form: NgForm) {
    if (!this.editMode) {
      if (this.name !== undefined && this.amount > 0) {
        // console.log(this.name, this.amount);
        this.recipeService.ingredients.push({
          name: this.name,
          amount: this.amount,
        });
      }
    } else {
      this.recipeService.getIngredients()[this.editedItemIndex] = {
        name: this.name,
        amount: this.amount,
      };
    }

    console.log('My input: ', this.selectedOption);
    this.shoppingListService.selectedOption = this.selectedOption;
    console.log('My Service: ', this.selectedOption);
    form.reset();

    // const value = form.value;
    // const newIngredient = new Ingredient(value.name, value.amount);
    // if (this.editMode) {
    //   this.updateIngredient(this.editedItemIndex, newIngredient);
    // }else{

    // }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.recipeService.ingredients[index] = newIngredient;
    this.ingredientsChanges.next(this.recipeService.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.recipeService.ingredients.splice(index, 1);
    this.shoppingListService.ingredientsChanged.next(
      this.recipeService.ingredients.slice()
    );
  }

  onDelete() {
    this.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.recipeService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
