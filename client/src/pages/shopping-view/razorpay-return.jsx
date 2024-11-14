import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function RazorPayReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const razorpayOrderId = params.get("razorpay_order_id");
  const razorpayPaymentId = params.get("razorpay_payment_id");

  console.log(razorpayOrderId);
  console.log(razorpayPaymentId);

  useEffect(() => {
    if (razorpayOrderId && razorpayPaymentId) {
      const orderID = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(
        capturePayment({ paymentId: razorpayPaymentId, orderId: orderID })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [razorpayOrderId, razorpayPaymentId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default RazorPayReturnPage;
