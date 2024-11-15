"use client"
import { getAllCartItemsByUser } from "@/actions/cart.actions";
import AlertBanner from "@/components/AlertBanner";
import LoadingSpinner from "@/components/LoadingSpinner";
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
  // console.log("✨ ~ file: page.jsx:14 ~ Cart ~ cartState:", cartState)
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
        {/* alert */}
        {!authLoading && !user && cartState.cart?.length && <AlertBanner title="SignIn Required" desc="Please sign in or sign up to never lost your cart items " />}

        {/* Cart page */}
        {isLoading ? <LoadingSpinner /> : <RecipeGrid recipes={recipesToDisplay} onRecipeClick={handleOpenModal} emptyStateMsg="No recipes found in you cart. Try adding some!" />}
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={handleCloseModal}>
        <SingleRecipe id={modalData} setIsOpen={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Cart;
