"use client"
import HttpKit from "@/common/helpers/HttpKit";
import Modal from "@/components/Modal";
import RecipeCard from "@/components/Recipes/RecipeCard";
import { RecipeGrid } from "@/components/Recipes/RecipesGrid";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useModal } from "@/hooks/useModal";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const AllRecipes = () => {
  const { handleOpenModal, isModalOpen, modalData, handleCloseModal } = useModal()
  const [selectedCategory, setSelectedCategory] = useState("Seafood");

  const { data: allCategories, isLoading, } = useQuery({
    queryKey: ["categories"],
    queryFn: HttpKit.getCategories,
  });
  const { data: recipes, isLoading: isRecipesLoading, } = useQuery({
    queryKey: ["recipes", selectedCategory],
    queryFn: () => HttpKit.filterByCategory(selectedCategory),
  });


  return (
    <div className="bg-gray-50">
      <div className="bg-[#FEFCE8] py-8 flex flex-col justify-center items-center text-center w-full h-[620px] sm:h-[480px]">
        <h1 className="text-4xl font-bold mb-12 text-yellow-800">All recipes</h1>
        <nav className="text-sm text-gray-500 flex justify-center flex-wrap items-center gap-5 py-4 max-w-screen-lg">
          {
            allCategories?.map((category, index) => <Button
              onClick={() => setSelectedCategory(category?.strCategory)}
              className={
                `rounded-2xl  py-2.5 px-8 text-lg font-semibold  data-[hover]:bg-white/60 data-[active]:bg-white/90 border-yellow-500  border-2 hover:border-yellow-800 hover:text-yellow-600 transition-all duration-300 ${category?.strCategory === selectedCategory ? 'bg-white text-yellow-600 border-yellow-800' : "bg-transparent text-yellow-900 "}
                `
              }
              key={index}>
              {category?.strCategory}
            </Button>)
          }
        </nav>
      </div>
      {isRecipesLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <RecipeGrid recipes={recipes} onRecipeClick={handleOpenModal} />
      )}

      {/* Modal*/}
      <Modal isOpen={isModalOpen} >
        {/*  modalData contains the id because we pass it in through onRecipeClick */}
        <SingleRecipe id={modalData} setIsOpen={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default AllRecipes;






