"use client";

import ListViewCard from "@/app/components/ListViewCard";
import React from "react";

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
    inStock: true,
    description:
      "Powerful flagship smartphone with premium design, advanced camera system and excellent performance.",
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
    inStock: true,
    description:
      "Premium Galaxy smartphone with a large display, powerful camera setup and smooth performance.",
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
    inStock: true,
    description:
      "Advanced smartwatch with fitness tracking, notifications and a bright premium display.",
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
    inStock: true,
    description:
      "Premium wireless earbuds with active noise cancellation and immersive audio.",
  },
];

const ListView = () => {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-3
        sm:gap-4
      "
    >
      {products.map((product) => (
        <ListViewCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ListView;
