import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID; // Replace with your Razorpay Key ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET; // Replace with your Razorpay Key Secret

// Function to create a Razorpay order
const createRazorpayOrder = async (amount) => {
  try {
    const response = await axios.post(
      "https://api.razorpay.com/v1/orders",
      {
        amount, // amount in paise (e.g., ₹500 = 50000)
        currency: "INR",
        receipt: "receipt#1",
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${razorpayKeyId}:${razorpayKeySecret}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return {
      orderId: response.data.id,
      successUrl: `${process.env.CLIENT_BASE_URL}/shop/razorpay-return`, // Your success URL
      cancelUrl: `${process.env.CLIENT_BASE_URL}/shop/razorpay-cancel`, // Your cancel URL
    };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create Razorpay order");
  }
};

export { createRazorpayOrder };
