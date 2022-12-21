import { Ingredient } from './ingredient.model';

export class Recipe {
  public recipeName: string;
  public description: string;
  public imageUrl: string;
  public ingredients: Ingredient[];
  public recipeId:number;

  constructor(
    recipeName: string,
    description: string,
    imageUrl: string,
    ingredients: Ingredient[],
    recipeId:number
  ) {
    this.recipeName = recipeName;
    this.description = description;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.recipeId = recipeId;
  }
}
