import SpinnerMini from "@/components/shared/skeltons/SpinnerMini";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, getTotalCartPrice } from "@/redux/slices/cartSlice";
import { purchasePackages } from "@/services/packages.services";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import CartItem from "./CartItem";
import FooterLink from "./FooterLink";
import { usePathname } from "next/navigation";

export interface PropsType {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartDetail({ setShowCart }: PropsType) {
  // const { promoCodeData, setPromoCodeData } = usePromoCode();
  // const [isPromoApplying, setIsPromoApplying] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart);
  const totalCartPrice = useAppSelector((state) =>
    getTotalCartPrice(state.cart)
  );
  const dispatch = useAppDispatch();
  const { mutate: packagesPurchaseApi, isPending: isPackagesPurchasing } =
    useMutation({
      mutationFn: purchasePackages,
      mutationKey: ["purchase-packages"],

      onSuccess: (data) => {
        if (!data.status) {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
        dispatch(clearCart());
        setShowCart(false);
        router.push(
          `${
            pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
          }/my-esims`
        );
      },
      onError: (error) => {
        toast.error(error.message);
        router.push(
          `${pathname.startsWith("/reseller") ? "/reseller" : "/dealer"}/topup`
        );
      },
    });

  function handleCheckoutClick() {
    // if (cartItems.length !== 0) {
    //   const items = cartItems.map((item) => ({
    //     item_id: item.id,
    //     item_name: item.name,
    //     price: item.price,
    //     quantity: item.quantity,
    //     affiliation: "eSIM Card Web",
    //     item_brand: item.provider,
    //     item_category: item.package_type,
    //     // coupon: promoCodeData ? promoCodeData.promo_code : "",
    //   }));
    // sendGTMEvent({
    //   event: "begin_checkout",
    //   ecommerce: {
    //     currency: "USD",
    //     value: promoCodeData ? promoCodeData.total_amount : totalCartPrice,
    //     items: items,
    //   },
    // });
    // }
    // router.push("/checkout");

    packagesPurchaseApi({ cartItems });
  }

  const urlPrefix = pathname.startsWith("/reseller") ? "/reseller" : "/dealer";

  return cartItems.length !== 0 ? (
    <>
      <SheetHeader className="!h-max border-b px-6 pb-4 pt-6">
        <SheetTitle className="flex items-center gap-2.5 font-montserrat">
          <ShoppingCart size={24} />
          Review Your Cart
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="flex flex-grow flex-col justify-start gap-4 overflow-auto py-4 scrollbar-thin">
        {cartItems.map((item, index) => (
          <CartItem cartItem={item} key={index} />
        ))}
      </div>

      {/* Coupon and Checkout */}
      <div className="border-t px-4 pb-3 pt-3 sm:px-6">
        {/* <ApplyCouponCode
          promoCodeData={promoCodeData}
          setPromoCodeData={setPromoCodeData}
          setIsPromoApplying={setIsPromoApplying}
        /> */}

        {/* Subtotal */}
        <div className="mb-2 flex items-center justify-between">
          <p className="font-montserrat text-lg font-semibold">Sub Total</p>
          <span className="flex items-center justify-center rounded-[6px] bg-primary/15 px-[12px] py-[4px] text-base font-medium text-primary">
            ${totalCartPrice}
          </span>
        </div>

        {/* Checkout Button */}
        <div className="flex flex-col gap-2">
          <Button
            className="group flex h-full w-full items-center justify-center gap-2 text-base lg:py-3.5"
            onClick={handleCheckoutClick}
            disabled={isPackagesPurchasing}
          >
            {isPackagesPurchasing ? (
              <>
                <SpinnerMini />
              </>
            ) : (
              <>
                Purchase Now
                <ArrowUpRight
                  className="transition-transform group-hover:rotate-[45deg]"
                  size={18}
                />
              </>
            )}
          </Button>
          <Button
            variant={"ghost"}
            className="text-base hover:text-primary hover:bg-secondary"
            onClick={() => {
              setShowCart(false);
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </>
  ) : (
    <div className="ms-6 mt-4 flex flex-col gap-2 px-2">
      <h2 className="text-lg font-semibold">Your cart is empty</h2>
      <p className="mt-2 text-sm">
        You haven&apos;t added any eSIM packages yet. Start exploring our plans
        to get connected!
      </p>

      <FooterLink
        href={`${urlPrefix}/data-only-esim`}
        className="text-primary underline underline-offset-4"
        onClick={() => setShowCart(false)}
      >
        Browse our eSIM Packages
      </FooterLink>
    </div>
  );
}

export default CartDetail;
