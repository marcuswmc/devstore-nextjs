'use client'

import { useCart } from "@/contexts/cart-context";

export interface AddToCartBtnProps {
  productId: number;
}

export function AddToCartBtn({ productId }: AddToCartBtnProps) {
  const { addToCart } = useCart();

  function handleAddProductToCart() {
    addToCart(productId);
  }

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold"
      onClick={handleAddProductToCart}
    >
      Add to cart
    </button>
  );
}
