package com.projectOne.ProjectOne.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectOne.ProjectOne.models.Ingredient;

import jakarta.transaction.Transactional;

@Transactional
public interface IngredientsRepo extends JpaRepository<Ingredient, Integer> {}
