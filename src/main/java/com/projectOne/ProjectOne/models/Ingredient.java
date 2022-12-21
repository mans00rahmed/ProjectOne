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
public class Ingredient {
	@Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer IngredientId;
	private String Name;
	private Integer Amount;


	@OneToMany(fetch = FetchType.LAZY, mappedBy = "Ingredient")
	@JsonIgnore
	private List<RecipeIngredient> recipes;
}