import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe-model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  ingredientsForm: FormGroup;
  @Output() recipetInserted: EventEmitter<any> = new EventEmitter<any>();
  arrayOfIngredients = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private sLService: ShoppingListService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.sLService.getAllIngredients().subscribe((response) => {
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        this.arrayOfIngredients.push(element['name']);
      }
    });

    console.log(this.arrayOfIngredients[1]);
  }

  onSave() {}

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    if (this.editMode) {
      const recipe: Observable<Recipe> = this.recipeService.getRecipeById(
        this.id
      );
      recipe.subscribe({
        next: (recipe) => {
          console.log(recipe);

          this.recipeForm.controls['name'].setValue(recipe.recipeName);
          this.recipeForm.controls['imagePath'].setValue(recipe.imageUrl);
          this.recipeForm.controls['description'].setValue(recipe.description);
          const ingFormArray = <FormArray>this.recipeForm.get('ingredients');

          for (let ingredient of recipe.ingredients) {
            ingFormArray.push(
              new FormGroup({
                name: new FormControl(ingredient.name),
                amount: new FormControl(ingredient.amount),
              })
            );
          }
        },
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: new FormArray([]),
    });
  }

  onSubmit() {
    let value = this.recipeForm.value;
    value.imageUrl = value.imagePath;
    delete value.imagePath;
    value.recipeName = value.name;
    delete value.name;

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipes(value).subscribe((response) => {
        console.log(response);
      });
      console.log(this.recipeForm.value);
    }
    this.onCancel();
  }

  get controls() {
    // a getter
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
