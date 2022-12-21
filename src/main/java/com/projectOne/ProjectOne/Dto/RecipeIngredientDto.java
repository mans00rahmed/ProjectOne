package com.projectOne.ProjectOne.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(includeFieldNames = true)

public class RecipeIngredientDto {
	Integer RecipeId;
	Integer IngredientId;
	}