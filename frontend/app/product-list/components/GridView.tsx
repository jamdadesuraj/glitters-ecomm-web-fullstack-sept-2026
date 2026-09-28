"use client";

import React from "react";
import ProductCard from "@/app/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Apple iPhone 16 Pro Max 256GB",
    image: "/img/products/iphone.png",
    href: "/product/iphone-16-pro-max",
    brand: "Apple",
    price: 4899,
    oldPrice: 5299,
    rating: 4.9,
    reviews: 186,
    discount: 8,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra 512GB",
    image: "/img/products/samsung.png",
    href: "/product/samsung-s25-ultra",
    brand: "Samsung",
    price: 4499,
    oldPrice: 4999,
    rating: 4.8,
    reviews: 143,
    discount: 10,
  },
  {
    id: 3,
    name: "Apple Watch Series 10 GPS",
    image: "/img/products/apple-watch.png",
    href: "/product/apple-watch-series-10",
    brand: "Apple",
    price: 1599,
    oldPrice: 1799,
    rating: 4.7,
    reviews: 98,
    discount: 11,
  },
  {
    id: 4,
    name: "AirPods Pro 2nd Generation",
    image: "/img/products/airpods.png",
    href: "/product/airpods-pro-2",
    brand: "Apple",
    price: 899,
    oldPrice: 1099,
    rating: 4.8,
    reviews: 215,
    discount: 18,
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch Ultra",
    image: "/img/products/galaxy-watch.png",
    href: "/product/galaxy-watch-ultra",
    brand: "Samsung",
    price: 1299,
    oldPrice: 1499,
    rating: 4.6,
    reviews: 76,
    discount: 13,
  },
  {
    id: 6,
    name: "Sony Wireless Noise Cancelling Headphones",
    image: "/img/products/sony-headphone.png",
    href: "/product/sony-headphone",
    brand: "Sony",
    price: 1199,
    oldPrice: 1399,
    rating: 4.7,
    reviews: 122,
    discount: 14,
  },
  {
    id: 7,
    name: "Anker 20000mAh Power Bank",
    image: "/img/products/powerbank.png",
    href: "/product/anker-powerbank",
    brand: "Anker",
    price: 249,
    oldPrice: 299,
    rating: 4.5,
    reviews: 310,
    discount: 17,
  },
  {
    id: 8,
    name: "JBL Portable Bluetooth Speaker",
    image: "/img/products/jbl-speaker.png",
    href: "/product/jbl-speaker",
    brand: "JBL",
    price: 399,
    oldPrice: 499,
    rating: 4.6,
    reviews: 167,
    discount: 20,
  },
];

const GridView = () => {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2

        sm:gap-3

        md:grid-cols-3

        xl:grid-cols-4
        xl:gap-4
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default GridView;
