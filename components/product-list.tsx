import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";
import { ProductCard } from "./product-card";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Search products" />
      </div>
      <ul>
        {products.map((product) => {
          return (
            <li>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
