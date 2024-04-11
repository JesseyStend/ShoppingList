"use client";

import * as React from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  quantity: z.number().int().min(1, {
    message: "quantity must be at least 1.",
  }),
  units: z.string().default("Units"),
});

export default function AddItemFrom() {
  const [isOpen, setIsOpen] = React.useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card>
      <Form {...form}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="link" size="sm" className="flex gap-2 w-full py-6">
              <h3 className="flex-1">Add item</h3>
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Product Name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="w-full border flex rounded divide-x">
                  <FormField
                    control={form.control}
                    name="quantity"
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
                              <SelectItem value="Gram">Grams</SelectItem>
                              <SelectItem value="Milliliter">
                                Milliliter
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Add Item</Button>
              </form>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Form>
    </Card>
  );
}
