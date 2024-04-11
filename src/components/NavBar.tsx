import * as React from "react";
import { useState } from "react";

export default function NavBar() {
  return (
    <nav className=" bg-card w-full p-4 flex border-b text-card-foreground">
      <h1 className="font-bold text-2xl">
        Amazing shopping list app
      </h1>
    </nav>
  );
}
