package com.projectOne.ProjectOne.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(includeFieldNames = true)

public class IngredientDto {
	private Integer IngredientId;
	private String Name;
	private Integer Amount;
}
