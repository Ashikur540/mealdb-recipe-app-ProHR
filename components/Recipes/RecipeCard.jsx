import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@headlessui/react";

import { deleteCartItemFromDB, saveCartItemToDB } from "@/actions/cart.actions";
import { addToCart, removeFromCart } from "@/features/cart/cartActions";
import { useAuth } from "@/providers/AuthProvider";
import { useCartContext } from "@/providers/CartProvider";
import { useModal } from "@/hooks/useModal";
// import { getDatabase, ref, push, set } from "firebase/database";


const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const { handleCloseModal, handleOpenModal, isModalOpen, modalData } = useModal()
  const { dispatch } = useCartContext();
  const queryClient = useQueryClient();
  const { user } = useAuth()
  const path = usePathname()
  const isCartPage = path.includes("/cart");

  const handleAddToCart = async () => {
    const item = {
      idMeal: recipe?.idMeal,
      strMealThumb: recipe?.strMealThumb,
      strMeal: recipe?.strMeal
    };

    dispatch(addToCart(item));
    toast.success("Recipe added to cart");
    try {
      // If user is logged in, save to Firebase 
      if (user?.email) {
        item.userMail = user?.email;
        await saveCartItemToDB(item);
        await queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
      }

    } catch (error) {
      toast.error("Failed to add recipe to cart");
      console.error(error);
    }
  };


  const handleDeleteFromCart = async () => {
    const id = recipe?.idMeal;

    try {
      dispatch(removeFromCart({ id }));

      if (user?.email) {
        console.log(user?.email)
        await deleteCartItemFromDB(user?.email, id);
        await queryClient.invalidateQueries({ queryKey: ["cart", user?.email] });
      }

      toast.success("Recipe removed from cart");
    } catch (error) {
      toast.error("Failed to remove recipe");
      console.error(error);
    }
  };

  return (
    <div
      // onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
    >
      <Image
        className="mx-auto rounded-2xl"
        src={recipe?.strMealThumb}
        alt="Web Development"
        loading="lazy"
        width={500}
        height={500}
      />
      <h3 className="text-2xl font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p>
        Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
        consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
        animi officiis.
      </p>

      <div class="mt-4 grid grid-cols-2 gap-4">
        {!isCartPage &&
          <button className="CartBtn" onClick={handleAddToCart}>
            <span className="IconContainer">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
            </span>
            <p class="text">Add to Cart</p>
          </button>}

        <button
          className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
          onClick={() => handleDetailsOpen(recipe?.idMeal)}
        >
          view
        </button>
        {isCartPage && <Button onClick={handleDeleteFromCart} className={"block w-full rounded bg-rose-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"}>
          Delete
        </Button>}
      </div>
      {/* <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
        <button className="text-primary">Click to see details</button>
      </div> */}
    </div>
  );
};

export default RecipeCard;
