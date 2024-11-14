"use client"
import { getAllCartItemsByUser } from "@/actions/cart.actions";
import Modal from "@/components/Modal";
import { RecipeGrid } from "@/components/Recipes/RecipesGrid";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/providers/AuthProvider";
import { useCartContext } from "@/providers/CartProvider";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Cart = () => {
  const { cartState } = useCartContext();
  const { user, authLoading } = useAuth();
  const { data: userCart, isLoading: isUserCartLoading, error } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: () => getAllCartItemsByUser(user?.email),
    enabled: !!user
  });

  const isLoading = isUserCartLoading || authLoading
  const recipesToDisplay = user?.email ? userCart : cartState?.cart ?? []


  const { isModalOpen, modalData, handleCloseModal, handleOpenModal } = useModal()
  return (
    <div className="bg-gray-50 min-h-screen flex items-center py12 md:py-28">
      <div className="container mx-auto">
        {/* Cart page */}
        {isLoading ? <>Loading...</> : <RecipeGrid recipes={recipesToDisplay} onRecipeClick={handleOpenModal} />}
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={handleCloseModal}>
        <SingleRecipe id={modalData} setIsOpen={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Cart;
