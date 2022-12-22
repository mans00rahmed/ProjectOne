package com.projectOne.ProjectOne.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectOne.ProjectOne.Dto.RecipeIngredientDto;
import com.projectOne.ProjectOne.Repository.IngredientsRepo;
import com.projectOne.ProjectOne.Repository.RecipeIngredientRepo;
import com.projectOne.ProjectOne.Repository.RecipeRepo;
import com.projectOne.ProjectOne.models.Ingredient;
import com.projectOne.ProjectOne.models.Recipe;
import com.projectOne.ProjectOne.models.RecipeIngredient;

@Service
public class RecipeIngredientService {

	@Autowired
	private RecipeIngredientRepo recipeIngredientRepo;

	@Autowired
	private RecipeRepo recipeRepo;

	@Autowired
	private IngredientsRepo ingRepo;

	private RecipeIngredientDto convertEntityToDto(RecipeIngredient recipeIngredient) {
		RecipeIngredientDto RecipeIngredinetDTO = new RecipeIngredientDto();
		RecipeIngredinetDTO.setRecipeId(recipeIngredient.getRecipe().getRecipeId());
		RecipeIngredinetDTO.setIngredientId(recipeIngredient.getIngredient().getIngredientId());
		return RecipeIngredinetDTO;
	}

	private RecipeIngredient convertEntityToDto(Recipe recipe, Ingredient ingredient) {
		RecipeIngredient recipeIngredient = new RecipeIngredient();
		recipeIngredient.setRecipe(recipe);
		recipeIngredient.setIngredient(ingredient);
		RecipeIngredient resp = recipeIngredientRepo.save(recipeIngredient);
		return resp;
	}

	public RecipeIngredient AddRecipeIngredient(RecipeIngredientDto recipeIngredientDto) {
		Optional<Recipe> optRecipe = recipeRepo.findById(recipeIngredientDto.getRecipeId());
		Optional<Ingredient> optIng = ingRepo.findById(recipeIngredientDto.getIngredientId());
		if (optRecipe.isPresent() && optIng.isPresent()) {
			return convertEntityToDto(optRecipe.get(),optIng.get());
		}
		return null;
	}

	public List<RecipeIngredientDto> AllRecipeIngredient() {
		return recipeIngredientRepo.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
	}
	
	public void deleteRecipeIngredientById(int id) {
		recipeIngredientRepo.deleteById(id);
	}
}