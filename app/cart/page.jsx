"use client"
import Modal from "@/components/Modal";
import { RecipeGrid } from "@/components/Recipes/RecipesGrid";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useModal } from "@/hooks/useModal";
import { useCartContext } from "@/providers/CartProvider";
import React from "react";

const Cart = () => {
  const { cartState } = useCartContext();

  const { isModalOpen, modalData, handleCloseModal , handleOpenModal} = useModal()
  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        {/* Cart page */}
        <RecipeGrid recipes={cartState?.cart} onRecipeClick={handleOpenModal}/>
      </div>
      <Modal isOpen={isModalOpen} >
        <SingleRecipe id={modalData} setIsOpen={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Cart;
