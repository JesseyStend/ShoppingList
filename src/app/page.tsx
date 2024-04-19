"use client";
import AddItemFrom from "@/components/AddItemForm";
import EditItemFrom from "@/components/EditItemForm";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";
import { useProduct } from "./hooks/useProjects";
import { Product } from "@/types/product";
import RecipeList from "@/components/RecipeList";

const ProductItem: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & Product
> = (product) => {
  const { name, quantity, units: unit } = product;
  return (
    <div className="w-full flex gap-4 p-2">
      <Checkbox /> <p className="flex-1">{name}</p>
      <Popover>
        <PopoverTrigger>
          <Badge>
            {quantity} {unit != "Units" && unit}
          </Badge>
        </PopoverTrigger>
        <PopoverContent>
          <EditItemFrom {...product} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default function Home() {
  const { products } = useProduct();

  return (
    <main className="flex lg:container">
      <div className="col-span-2 p-4 flex-1 flex flex-col gap-4 lg:col-span-1">
        <AddItemFrom />
        <ScrollArea className="flex-1 gap-4">
          {products.map((product) => (
            <ProductItem
              className=""
              key={`${product.name}-${product.quantity}${product.units}`}
              {...product}
            />
          ))}
        </ScrollArea>
      </div>
      <RecipeList />
    </main>
  );
}
