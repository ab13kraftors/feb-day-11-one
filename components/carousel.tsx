"use client";
import Stripe from "stripe";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props{
    products: Stripe.Product[];

}

export const Carousel = ({products}:Props) => {
  const[current, setCurrent] = useState(0);
  
  if (!products || products.length === 0) {
    return <Card>No products available</Card>;
  }
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrent((e) => (e + 1) % products.length)}, 3000)
        return () => clearInterval(interval);
  }, [products.length])
  
    const currProduct = products[current];
    if(!currProduct){
        return <Card>Product not found</Card>;
    }
    const price = currProduct.default_price as Stripe.Price;
    return <Card>{currProduct.images && currProduct.images[0] && (
        <div>
            <Image alt={currProduct.name} src={currProduct.images[0]}layout="fill" objectFit="cover" />
            </div>
    )}
    <CardContent>
        <CardTitle>{currProduct.name}</CardTitle>
        {price && <p>{(price.unit_amount || 0) / 100} {price.currency.toUpperCase()}</p>}
    </CardContent>
    
    </Card>;
};
