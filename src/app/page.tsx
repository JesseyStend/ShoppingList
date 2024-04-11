import AddItemFrom from "@/components/AddItemForm";
import EditItemFrom from "@/components/EditItemForm";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

function ProductItem() {
  return (
    <div className="w-full flex gap-4">
      <Checkbox /> <p className="flex-1">product name</p>
      <Popover>
        <PopoverTrigger>
          <Badge>500 gram</Badge>
        </PopoverTrigger>
        <PopoverContent>
          <EditItemFrom />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container py-4 flex-1 flex flex-col gap-4">
      <AddItemFrom />
      <ScrollArea className="flex-1">
        <ProductItem />
      </ScrollArea>
    </main>
  );
}
