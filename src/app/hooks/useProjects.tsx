"use client";
import { Product } from "@/types/product";
import { createContext, useContext, useState, useEffect, use } from "react";

// Define the product context
interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => Product;
  removeProduct: (name: string) => void;
}

// Create the product context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Create a custom hook to access the product context
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

// Create a product provider component
export const ProductProvider: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const value = window.localStorage.getItem("products");
    if (value) {
      setProducts(JSON.parse(value));
    }
  }, []);

  const addProduct = (product: Product) => {
    let change = [...products];

    change.push(product);

    localStorage.setItem("products", JSON.stringify(change));

    setProducts(change);
  };

  const editProduct = (product: Product) => {
    let change = [...products];
    const indexOfProduct = change.findIndex((p) => p.name === product.name);

    change[indexOfProduct] = product;

    localStorage.setItem("products", JSON.stringify(change));
    setProducts(change);

    return product;
  };

  const removeProduct = (name: string) => {
    let change = products.filter((product) => product.name !== name);

    localStorage.setItem("products", JSON.stringify(change));
    setProducts(change);
  };

  const productContextValue: ProductContextType = {
    products,
    addProduct,
    editProduct,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};
