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
// import { getDatabase, ref, push, set } from "firebase/database";


const RecipeCard = ({ recipe, handleDetailsOpen }) => {
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
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
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
      {/* <button onClick={addData}>hello</button> */}
      {!isCartPage && <Button onClick={handleAddToCart} className={"block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"}>
        Add to cart
      </Button>}
      {isCartPage && <Button onClick={handleDeleteFromCart} className={"block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"}>
        Delete
      </Button>}
      <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
        <button className="text-primary">Click to see details</button>
      </div>
    </div>
  );
};

export default RecipeCard;
