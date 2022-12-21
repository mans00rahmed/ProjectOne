package com.projectOne.ProjectOne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectOne.ProjectOne.models.Recipe;

import jakarta.transaction.Transactional;

@Transactional
public interface RecipeRepo extends JpaRepository<Recipe, Integer> {
}