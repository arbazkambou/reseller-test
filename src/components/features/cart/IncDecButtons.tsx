"use client";

import { Card } from "@/components/ui/card";
import { getTotalCartItems } from "@/redux/slices/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

interface PropsType {
  cartQuantity: number;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
}
function IncDecButtons({ cartQuantity, setCartQuantity }: PropsType) {
  const totalCartQuantity = useAppSelector((state) =>
    getTotalCartItems(state.cart)
  );
  const isCartFull = totalCartQuantity + cartQuantity >= 5;

  return (
    <Card className="flex flex-row w-max items-center gap-3  px-2 text-[1.25rem] xl:gap-4 p-2 rounded-xl">
      <button
        className="rounded-sm p-1 hover:bg-muted xl:p-2"
        onClick={() => {
          if (cartQuantity === 1) {
            return;
          }
          setCartQuantity((quantity) => quantity - 1);
        }}
      >
        <Minus />
      </button>
      <div className="h-[50%] w-[0.1px] bg-muted-foreground"></div>

      <p>{cartQuantity}</p>
      <div className="h-[50%] w-[0.1px] bg-muted-foreground opacity-60"></div>

      <button
        className="rounded-sm p-1 hover:bg-muted xl:p-2"
        onClick={() => {
          if (isCartFull) {
            toast.error("You can only add up to 5 eSIM packages to your cart.");
            return;
          }
          setCartQuantity((quantity) => quantity + 1);
        }}
      >
        <Plus />
      </button>
    </Card>
  );
}

export default IncDecButtons;
