import { Card } from "@/components/ui/card";
import {
  CartState,
  decreaseQuantity,
  deleteItem,
  getTotalCartItems,
  getTotalQuantityById,
  increaseQuantity,
} from "@/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

function CartItem({ cartItem }: { cartItem: CartState }) {
  const {
    id,
    name,
    data_quantity,
    data_unit,
    package_validity,
    package_validity_unit,
    image_url,
    total_price,
    unlimited,
  } = cartItem;

  const totalQuantityById = useAppSelector((state) =>
    getTotalQuantityById(state.cart, id)
  );

  const totalCartQuantity = useAppSelector((state) =>
    getTotalCartItems(state.cart)
  );

  const dispatch = useAppDispatch();

  return (
    <Card className="flex flex-row justify-between gap-[20px] rounded-none  px-[26px] py-[19px] !shadow-cart-item border-0">
      {/* country flag  */}
      <div className="relative h-[45px] w-[45px] shrink-0 sm:h-[55px] sm:w-[55px]">
        {image_url ? (
          <Image
            src={image_url}
            alt="country flag"
            fill
            sizes="auto"
            className="shrink-0 rounded-full object-cover shadow-md"
          />
        ) : null}
      </div>

      {/* country name and inc and dec btns  */}
      <div className="flex flex-grow justify-between gap-[15px]">
        <div className="flex flex-col gap-[15px] leading-none">
          {/* country name and package detail  */}
          <div className="flex flex-col gap-1">
            <p className="font-montserrat text-[14px] font-600 xs:text-[16px]">
              {name}
            </p>

            <p className="flex items-center gap-1 text-[14.2px]">
              <span className="text-primary">Data:</span>
              <span className="text-foreground-light">
                {unlimited ? "Unlimited" : `${data_quantity} ${data_unit}`}
              </span>
            </p>

            <p className="flex items-center gap-1 text-[14.2px]">
              <span className="text-primary">Duration:</span>
              <span className="text-foreground-light">
                {package_validity} {package_validity_unit}
              </span>
            </p>
          </div>

          {/* increament and decreament buttons  */}
          <div className="flex w-[105px] items-center justify-between rounded-full bg-primary px-2.5 py-1 text-background">
            <span
              role="button"
              className="rounded-pill px-1.5 transition-all hover:bg-background/40"
              onClick={() => dispatch(decreaseQuantity(id))}
            >
              <Minus size={18} />
            </span>
            <p className="text-[14.2px]">{totalQuantityById}</p>
            <span
              role="button"
              className="rounded-pill px-1.5 transition-all hover:bg-background/40"
              onClick={() => {
                if (totalCartQuantity >= 5) {
                  toast.error(
                    "You can only add up to 5 eSIM packages to your cart."
                  );
                }
                dispatch(increaseQuantity(id));
              }}
            >
              <Plus size={18} />
            </span>
          </div>
        </div>

        {/* pricing  */}
        <div className="flex shrink-0 flex-col justify-between">
          <span className="flex shrink-0 items-center justify-center rounded-[6px] bg-primary/15 px-[10px] py-[6px] text-base font-500 leading-none text-primary">
            ${total_price}
          </span>

          <div className="flex w-full justify-end">
            <span
              className="flex w-max shrink-0 items-center justify-center rounded-[6px] bg-destructive/15 px-[12px] py-[4px] text-base font-500 text-destructive transition-all hover:!bg-destructive/80 hover:text-background/90"
              onClick={() => dispatch(deleteItem(id))}
            >
              <Trash2 size={20} className="shrink-0" />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
