import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Recipe } from "@/types/recipe";
import React from "react";
import { chiliConCarne, spanishDish } from "@/fixtures/recipes";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useProduct } from "@/app/hooks/useProjects";
import useMediaQuery from "@/lib/useMediaQuery";

export default function RecipeList() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([
    spanishDish,
    chiliConCarne,
  ]);
  const { addRecipe } = useProduct();
  const isDesktop = useMediaQuery("(min-width: 960px)");

  return (
    <div className="fixed bottom-0 lg:relative col-span-1 lg:w-[650px]">
      <ScrollArea className="w-screen flex-none lg:w-full">
        <div className="flex w-max p-4 lg:flex-col gap-4 lg:w-full">
          {recipes.map((recipe, index) => (
            <Popover key={index}>
              <PopoverTrigger>
                <Card className="flex">
                  <CardContent className="p-4">
                    <div className="bg-gray-200 rounded p-4 aspect-square">
                      <ImageIcon className="size-12" />
                    </div>
                  </CardContent>
                  <CardHeader className="pl-0 py-8 text-left">
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardHeader>
                </Card>
              </PopoverTrigger>
              <PopoverContent>
                <ScrollArea className="h-96">
                  {recipe.ingredients.map((ingredient, index) => (
                    <ScrollArea
                      className="p-2"
                      key={`${recipe.title}-${ingredient.name}-${index}`}
                    >
                      <CardTitle className=" text-md">
                        {ingredient.name}
                      </CardTitle>
                      <CardDescription>
                        {ingredient.quantity}{" "}
                        {ingredient.units === "Units" ? "x" : ingredient.units}
                      </CardDescription>
                    </ScrollArea>
                  ))}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
                <div className="pt-2">
                  <Button className="w-full" onClick={() => addRecipe(recipe)}>
                    Add to shopping list
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
        <ScrollBar orientation={isDesktop ? "vertical" : "horizontal"} />
      </ScrollArea>
    </div>
  );
}
