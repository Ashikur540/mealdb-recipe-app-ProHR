"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

import HttpKit from "@/common/helpers/HttpKit";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";
import { RecipeGrid } from "./RecipesGrid";
import { useModal } from "@/hooks/useModal";

const RecipesList = () => {
  const { handleCloseModal, handleOpenModal, isModalOpen, modalData } = useModal()

  // const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);

  const { data: topMeals, isLoading: isRecipesLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getTopRecipes,
  });
  const queryRes = useQueries({
    queries: [
      {
        queryKey: ["recipes-by-name", searchQuery],
        queryFn: () => HttpKit.searchRecipesByName(searchQuery),
        enabled: searchQuery !== null
      },
      {
        queryKey: ["recipes-by-ingredient", searchQuery],
        queryFn: () => HttpKit.searchRecipesByIngredient(searchQuery),
        enabled: searchQuery !== null
      }
    ],
    // combining results because in some cases keyword data founds for both queries so user can see all meals her searched for
    combine: useCallback((results) => {
      const nameResults = results[0]?.data || [];
      const ingredientResults = results[1]?.data || [];

      // remove duplicates
      const uniqueMeals = new Map();
      [...nameResults, ...ingredientResults].forEach(meal => {
        if (meal?.idMeal) {
          uniqueMeals.set(meal.idMeal, meal);
        }
      });

      return {
        data: [...uniqueMeals.values()],
        isLoading: results.some(result => result.isLoading),
        error: results.find(result => result.error)?.error
      };
    }, [])
  })

  console.log("✨ ~ file: RecipesList.jsx:43 ~ RecipesList ~ queryRes:", queryRes)


  const isLoading = isRecipesLoading || queryRes?.isLoading
  const searchedMeals = queryRes?.data


  const handleSearch = () => setSearchQuery(searchInput);


  const mealsToDisplay = searchQuery ? searchedMeals : topMeals

  // if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">{!searchQuery ? "Top Recipes" : `${searchedMeals?.length} meals found by ${searchQuery}`}</h1>
        {/* Search form */}
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }} className="w-full mt-12">
            <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder="Your favorite food"
                className="w-full p-4 rounded-full outline-none bg-transparent "
                type="text"
                onChange={(e) => {
                  setSearchInput(e.target.value)
                  if (!e.target.value) {
                    setSearchQuery(null)
                  }
                }}
                value={searchInput}
              />
              <button
                onClick={() => handleSearch()}
                type="button"
                title="Search meal by name"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">
                  Search
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <RecipeGrid recipes={mealsToDisplay} onRecipeClick={handleOpenModal} />
        )}
      </div>

      {/* Modal*/}
      <Modal isOpen={isModalOpen} >
        <SingleRecipe id={modalData} setIsOpen={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default RecipesList;
