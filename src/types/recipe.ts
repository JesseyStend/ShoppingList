import { Product } from "./product";

export type Recipe = {
  title: string;
  description: string;
  ingredients: Product[];
};

export function isRecipe(recipe: any): recipe is Recipe {
  return (
    recipe.title !== undefined &&
    recipe.description !== undefined &&
    recipe.ingredients !== undefined
  );
}
