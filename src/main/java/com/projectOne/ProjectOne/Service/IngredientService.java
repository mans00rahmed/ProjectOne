package com.projectOne.ProjectOne.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectOne.ProjectOne.Dto.IngredientDto;
import com.projectOne.ProjectOne.Repository.IngredientsRepo;
import com.projectOne.ProjectOne.models.Ingredient;

@Service
public class IngredientService {
	@Autowired
	private IngredientsRepo ingredientRepo;

	private IngredientDto convertEntityToDto(Ingredient ingredient) {
		IngredientDto IngredientDTO = new IngredientDto();
		IngredientDTO.setIngredientId(ingredient.getIngredientId());
		IngredientDTO.setName(ingredient.getName());
		IngredientDTO.setAmount(ingredient.getAmount());
		return IngredientDTO;
	}
	
	public IngredientDto AddIngredient(Ingredient ingredient) {
		return convertEntityToDto(ingredientRepo.save(ingredient));
	}

	public List<IngredientDto> retriveAllIngredients() {
		return ingredientRepo.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
	}

	public IngredientDto findById(int id) {
		Optional<Ingredient> ingredientOpt = ingredientRepo.findById(id);
		if (ingredientOpt.isPresent()) {
			return convertEntityToDto(ingredientOpt.get());
		}
		return null;
	}
}
