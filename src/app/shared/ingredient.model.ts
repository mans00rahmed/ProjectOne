import { Recipe } from '../recipes/recipe-model';

export class Ingredient {
  constructor(
    public name: string,
    public amount: number
  ) {}
}
