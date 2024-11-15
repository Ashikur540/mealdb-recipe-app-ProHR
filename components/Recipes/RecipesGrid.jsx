import RecipeCard from "./RecipeCard";

export const RecipeGrid = ({ recipes, onRecipeClick, emptyStateMsg }) => (
  <div className="relative py-16">
    <div className="container relative m-auto px-6 text-gray-500 md:px-12">
      <div className="grid gap-6 md:mx-auto  md:grid-cols-2 lg:w-full lg:grid-cols-3">
        {recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe?.idMeal}
              recipe={recipe}
              handleDetailsOpen={() => onRecipeClick(recipe?.idMeal)}
            />
          ))
        ) : (
          <div className="col-span-3">
            <h3 className="text-center text-4xl font-semibold text-yellow-800">
              {emptyStateMsg}
            </h3>
          </div>
        )}
      </div>
    </div>
  </div>
);
