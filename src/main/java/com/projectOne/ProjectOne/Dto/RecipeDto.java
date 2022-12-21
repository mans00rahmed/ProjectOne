package com.projectOne.ProjectOne.Dto;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(includeFieldNames = true)

public class RecipeDto {
	private Integer RecipeId;
	private String RecipeName;
	private String Description;
	private String ImageUrl;
	private List<IngredientDto> Ingredients;
}