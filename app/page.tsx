import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 3,
  });

  const bannerImage =
    products.data.length > 0 && products.data[0].images.length > 0
      ? products.data[0].images[0]
      : "/next.svg";

  return (
    <div>
      <section>
        <h2>My Ecom Welcome</h2>
        <p>Check out our products</p>

        <Button asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>

        <Image
          src={bannerImage}
          alt="Banner Image"
          width={500}
          height={300}
          className="rounded"
        />
      </section>

      <section>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
