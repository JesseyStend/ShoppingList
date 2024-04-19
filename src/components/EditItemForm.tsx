"use client";

import * as React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Product } from "@/types/product";
import { Trash2 } from "lucide-react";
import { useProduct } from "@/app/hooks/useProjects";
import { zUnits } from "@/types/units";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  quantity: z.coerce.number(),
  units: zUnits.default("Units"),
});

export default function EditItemFrom(props: Product) {
  const { editProduct, removeProduct } = useProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editProduct)}
        className="flex flex-col gap-4"
        name="edit-item-form"
      >
        <h3 className="flex-1 text-center">Edit item</h3>
        <FormField
          control={form.control}
          name="name"
          defaultValue={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Product Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full border flex rounded divide-x">
          <FormField
            control={form.control}
            name="quantity"
            defaultValue={props.quantity}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Amount"
                    type="number"
                    className="border-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="units"
            defaultValue={props.units}
            render={({ field }) => (
              <FormItem className=" flex-none">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-none">
                        <SelectValue defaultValue="Units" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Units">Units</SelectItem>
                      <SelectItem value="g">Grams</SelectItem>
                      <SelectItem value="ml">Milliliter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            Save
          </Button>
          <Button
            type="reset"
            variant="ghost"
            onClick={() => removeProduct(props.name)}
          >
            <Trash2 className=" stroke-destructive" />
            <span className=" sr-only">Delete</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
