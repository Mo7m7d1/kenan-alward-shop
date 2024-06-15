"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "./product-card";
import { Product } from "@prisma/client";

export default function ProductsCarousel({
  products,
}: {
  products: Product[];
}) {
  return (
    <Carousel
      className="mt-0 w-full pt-0"
      plugins={[Autoplay({ delay: 4000 })]}
    >
      <CarouselContent className="">
        {products.map((p, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
            <ProductCard {...p} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
