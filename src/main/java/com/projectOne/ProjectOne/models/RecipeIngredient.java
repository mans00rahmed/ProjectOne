package com.projectOne.ProjectOne.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class RecipeIngredient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer RecipeIngredientId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RecipeId")
	@JsonIgnore
	Recipe Recipe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "IngredientId")
	@JsonIgnore
	Ingredient Ingredient;
}