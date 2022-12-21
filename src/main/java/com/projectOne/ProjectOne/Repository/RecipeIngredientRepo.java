package com.projectOne.ProjectOne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectOne.ProjectOne.models.RecipeIngredient;

import jakarta.transaction.Transactional;

@Transactional
public interface RecipeIngredientRepo extends JpaRepository<RecipeIngredient, Integer> {}
