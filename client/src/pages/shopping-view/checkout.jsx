import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart); //Power of Redux store

  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? // eslint-disable-next-line react/prop-types
        cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiateRazorpayPayment() {
    if (!cartItems.items || cartItems.items.length === 0) {
      toast({
        title: "Your Cart is empty. Please add items to Checkout",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please Select an Address !!!",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        state: currentSelectedAddress?.state,
        country: currentSelectedAddress?.country,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        const { successUrl, razorpayOrderId } = data.payload;
        // Redirect to the Razorpay payment page
        const options = {
          key: "rzp_test_ASYtpAhI1QzSCl",
          amount: totalCartAmount * 100, // Amount in paise
          currency: "INR",
          name: "Avaran",
          description: "Order ID: " + razorpayOrderId,
          order_id: razorpayOrderId,
          handler: function (response) {
            // Handle success

            const redirectUrl = `${successUrl}?razorpay_order_id=${razorpayOrderId}&razorpay_payment_id=${response.razorpay_payment_id}`;
            window.location.href = redirectUrl; // Redirect to success URL
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: currentSelectedAddress?.phone,
          },
          notes: {
            address: currentSelectedAddress?.address,
          },
          theme: {
            color: "#F37254",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on("payment.failed", function (response) {
          // Handle payment failure
          console.error("Payment failed:", response);
          window.location.href = data.payload.cancelUrl; // Redirect to cancel URL
        });
      } else {
        setIsPaymentStart(false);
      }
    });
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.id} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">{totalCartAmount}</span>
            </div>
          </div>
          <div>
            <Button
              onClick={handleInitiateRazorpayPayment}
              className="mt-4 w-full"
            >
              {isPaymentStart
                ? "Processing Payment with Razorpay..."
                : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
