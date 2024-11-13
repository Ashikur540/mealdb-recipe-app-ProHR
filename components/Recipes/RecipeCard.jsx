import { addToCart } from "@/features/cart/cartActions";
import { useCartContext } from "@/providers/CartProvider";
import { Button } from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";


const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const { cartState, dispatch } = useCartContext();
  const path = usePathname()
  const isCartPage = path.includes("/cart")

  const handleAddToCart = () => {
    dispatch(addToCart({ idMeal: recipe?.idMeal, strMealThumb: recipe?.strMealThumb, strMeal: recipe?.strMeal }))
    toast.success("Recipe added to cart")
  }
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
      {!isCartPage && <Button onClick={handleAddToCart} className={"block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"}>
        Add to cart
      </Button>}
      <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
        <button className="text-primary">Click to see details</button>
      </div>
    </div>
  );
};

export default RecipeCard;
