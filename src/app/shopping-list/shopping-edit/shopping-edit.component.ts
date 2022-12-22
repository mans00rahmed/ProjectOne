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
import { Observable, Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe-model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Ingredient } from 'src/app/models/ingredient.model';
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

  name: string;
  amount: number;
  editMode: boolean = false;
  editedItemIndex: number;
  ingredientsChanges: any;
  // Should be sent on
  selectedOption: string; //this selected option
  @ViewChild('f', { static: false }) slForm: NgForm;
  @Output() ingredientInserted: EventEmitter<any> = new EventEmitter<any>();

  recipes = this.recipeService.getAllRecipes();
  recipe: string;
  editedItem: Observable<Ingredient>;

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredientById(
        this.editedItemIndex
      );
      this.editedItem.subscribe((response) => {
        (this.name = response.name), (this.amount = response.amount);
        console.log(this.editedItemIndex);
      });
    });
  }

  changeOfData(form: NgForm) {
    if (!this.editMode) {
      if (this.name !== undefined && this.amount > 0) {
        this.shoppingListService
          .addIngredient({
            name: this.name,
            amount: this.amount,
          })
          .subscribe((response) => {
            this.ingredientInserted.emit();
            console.log(response);
          });
      }
    } else {
      this.recipeService.getIngredients()[this.editedItemIndex] = {
        name: this.name,
        amount: this.amount,
      };
    }
    console.log('My Name: ', this.name);
    console.log('My Amount: ', this.amount);
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
    this.shoppingListService.deleteIngredient(index).subscribe((response) => {
      console.log(response);
    });
  }

  onDelete() {
    this.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
