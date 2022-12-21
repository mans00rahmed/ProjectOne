import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from '../../../models/recipe-model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
}
