package com.projectOne.ProjectOne.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectOne.ProjectOne.Dto.IngredientDto;
import com.projectOne.ProjectOne.Dto.RecipeDto;
import com.projectOne.ProjectOne.Dto.RecipeIngredientDto;
import com.projectOne.ProjectOne.Service.IngredientService;
import com.projectOne.ProjectOne.Service.RecipeIngredientService;
import com.projectOne.ProjectOne.Service.RecipeService;
import com.projectOne.ProjectOne.models.Ingredient;
import com.projectOne.ProjectOne.models.Recipe;
import com.projectOne.ProjectOne.models.RecipeIngredient;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class Controller {
	@Autowired
	private RecipeService recipeService;

	@Autowired
	private IngredientService ingredientService;

	@Autowired
	private RecipeIngredientService recipeIngredientService;

	@GetMapping("/all-recipes")
	public List<RecipeDto> retrieveAllRecipes() {
		return recipeService.retriveAllRecipes();
	};

	@GetMapping("/all-ingredients")
	public List<IngredientDto> retrieveAllIngredients() {
		return ingredientService.retriveAllIngredients();
	};

	@GetMapping("/all-recipes/{id}")
	public RecipeDto retrieveRecipeById(@PathVariable int id) {
		return recipeService.findById(id);
	};

	@GetMapping("/all-ingredients/{id}")
	public IngredientDto retrieveIngredientById(@PathVariable int id) {
		return ingredientService.findById(id);
	};

	@GetMapping("/all-recipe-ingredient")
	public List<RecipeIngredientDto> AllRecipeIngredient() {
		return recipeIngredientService.AllRecipeIngredient();
	};

	@PostMapping("/add-recipe")
	public RecipeDto AddRecipe(@RequestBody Recipe recipeDto) {
		return recipeService.AddRecipe(recipeDto);
	};

	@PostMapping("/add-ingredient")
	public IngredientDto AddIngredient(@RequestBody Ingredient ingredientDto) {
		return ingredientService.AddIngredient(ingredientDto);
	};

	@PostMapping("/add-recipe-ingredient")
	public RecipeIngredient AddRecipeIngredient(@RequestBody RecipeIngredientDto recipeIngredientDto) {
		return recipeIngredientService.AddRecipeIngredient(recipeIngredientDto);
	};

	@DeleteMapping("/delete-recipe/{id}")
	public Map<String, Boolean> deleteRecipe(@PathVariable int id) {
		recipeService.deleteRecipeById(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	@DeleteMapping("/delete-ingredient/{id}")
	public Map<String, Boolean> deleteIngredient(@PathVariable int id) {
		ingredientService.deleteIngredientById(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	@DeleteMapping("/delete-recipe-ingredient/{id}")
	public Map<String, Boolean> deleteRecipeIngredient(@PathVariable int id) {
		recipeIngredientService.deleteRecipeIngredientById(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
};