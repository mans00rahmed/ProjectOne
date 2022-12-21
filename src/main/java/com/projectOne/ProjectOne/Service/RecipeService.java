package com.projectOne.ProjectOne.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectOne.ProjectOne.Dto.IngredientDto;
import com.projectOne.ProjectOne.Dto.RecipeDto;
import com.projectOne.ProjectOne.Repository.RecipeRepo;
import com.projectOne.ProjectOne.models.Recipe;
import com.projectOne.ProjectOne.models.RecipeIngredient;

@Service
public class RecipeService {

	@Autowired
	private RecipeRepo recipeRepo;

	private RecipeDto convertEntityToDto(Recipe recipe) {
		RecipeDto RecipeDTO = new RecipeDto();
		RecipeDTO.setRecipeId(recipe.getRecipeId());
		RecipeDTO.setRecipeName(recipe.getRecipeName());
		RecipeDTO.setImageUrl(recipe.getImageUrl());
		RecipeDTO.setDescription(recipe.getDescription());

		/**
		 * There was no exact mapping on ingDTO of ing array, we made new array and by
		 * for each mapped all of the elements on array, which was exact mappable to the
		 * ingDTO.
		 */

		List<IngredientDto> ingredientsList = new ArrayList<>();
		if (!Objects.isNull(recipe.getIngredients())) {
			for (RecipeIngredient ingredient : recipe.getIngredients()) {
				IngredientDto ing = new IngredientDto();
				ing.setName(ingredient.getIngredient().getName());
				ing.setAmount(ingredient.getIngredient().getAmount());
				ingredientsList.add(ing);
			}
		}
		RecipeDTO.setIngredients(ingredientsList);
		return RecipeDTO;
	}

	public RecipeDto AddRecipe(Recipe recipe) {
		return convertEntityToDto(recipeRepo.save(recipe));
	}

	public List<RecipeDto> retriveAllRecipes() {
		return recipeRepo.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
	}

	public RecipeDto findById(int id) {
		Optional<Recipe> recipeOpt = recipeRepo.findById(id);
		if (recipeOpt.isPresent()) {
			return convertEntityToDto(recipeOpt.get());
		}
		return null;
	}
}
