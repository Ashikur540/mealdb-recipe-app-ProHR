import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  if (isLoading) return <LoadingSpinner size="small"/>;
  if (error) return "An error occurred.";

  // Collect ingredients dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }

  return (
    <div className=" bg-white rounded-lg w-full mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsOpen(false)}
          className="text-red-500 font-bold hover:underline"
        >
          <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-8">
        {/* Left Column - Image */}
        <div className="w-1/2">
          <Image
            src={data?.strMealThumb}
            width={500}
            height={500}
            alt="Recipe Image"
            className="rounded-md"
          />
        </div>

        {/* Right Column - Text Content */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Recipe Title */}
          <h2 className="text-2xl font-semibold text-orange-600">
            {data?.strMeal}
          </h2>

          {/* Category and Source */}
          <div>
            <p className="text-sm text-gray-500 font-bold">
              CATEGORY: <span className="text-gray-700 font-normal">{data?.strCategory}</span>
            </p>
            {data?.strSource && (
              <p className="text-sm text-gray-500 break-words">
                Source: <a href={data?.strSource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{data?.strSource}</a>
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {data?.strTags?.split(",").map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-200 rounded-full text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mt-6 border">
        <h3 className="text-md font-semibold text-white bg-orange-500 px-2 py-1 rounded-t-md">
          Ingredients:
        </h3>
        <div className=" text-black p-2 rounded-b-md grid grid-cols-2 gap-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="bg-orange-100 text-yellow-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bol">
                {index + 1}
              </span>
              <span>{ingredient}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm">{data?.strInstructions}</p>
    </div>
  );
};

export default SingleRecipe;
