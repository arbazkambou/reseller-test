"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hooks";
import { getTotalCartItems } from "@/redux/slices/cartSlice";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartSheet from "./CartSheet";

function CartQuantityButton() {
  const [isCartQuantityLoading, setIsCartQuantityLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const pathname = usePathname();

  const isAffiliate = pathname.startsWith("/affiliate");

  const totalCartQuantity = useAppSelector((state) =>
    getTotalCartItems(state.cart)
  );

  useEffect(function () {
    if (typeof window !== "undefined") {
      setIsCartQuantityLoading(false);
    }
  }, []);

  function handleClick() {
    setShowCart(true);
  }

  if (isAffiliate) return null;

  return (
    <>
      <Button
        className={`relative rounded-full border-0 bg-secondary px-3 py-2 font-sans text-sm font-500 shadow-none transition-all duration-200 hover:bg-primary hover:text-background`}
        size={"sm"}
        variant={"outline"}
        onClick={handleClick}
      >
        {isCartQuantityLoading ? (
          <Skeleton className="h-[20px] w-[20px] rounded-full" />
        ) : (
          <>
            <ShoppingCart size={20} />
            <Badge className="absolute -top-2 right-[5px] flex h-4 w-4 items-center justify-center rounded-[50%] text-[10px]">
              {totalCartQuantity}
            </Badge>
          </>
        )}
      </Button>
      <CartSheet setShowCart={setShowCart} showCart={showCart} />
    </>
  );
}

export default CartQuantityButton;
