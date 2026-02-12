"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
interface Props {
  product: Stripe.Product;
}

export const ProductDetails = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images && product.images[0] ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-60 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="full"
            objectFit="cover"
            className="group-hover: opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}
      <div>
        <h1>{product.name}</h1>
        {product.description && <p>{product.description}</p>}

        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-9000.">
            Rs{(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => removeItem(product.id)}>
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button variant="outline" onClick={onAddItem}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
