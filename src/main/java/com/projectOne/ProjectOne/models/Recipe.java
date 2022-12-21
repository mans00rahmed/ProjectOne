package com.projectOne.ProjectOne.models;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Recipe {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer RecipeId;	
	private String RecipeName;
	private String Description;
	private String ImageUrl;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "Recipe")
	@JsonIgnore
	private List<RecipeIngredient> ingredients;
}
