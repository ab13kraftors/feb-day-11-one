import { stripe } from "@/lib/stripe";
import { ProductDetails } from "@/components/product-details";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  return <ProductDetails product={product} />;
}
