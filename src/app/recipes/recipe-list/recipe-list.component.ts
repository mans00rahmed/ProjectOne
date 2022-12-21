import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../../models/recipe-model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  ingredients:Observable<Ingredient[]>
  
  constructor(
    private recipeService: RecipeService,
    private shoppingListService:ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    this.ingredients = this.shoppingListService.getAllIngredients();

  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
