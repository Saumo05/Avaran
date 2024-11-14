import axios from "axios";

// PayPal API credentials
const clientId =
  "ASQQy9fr9DQCsEB9yhMMgThiC6MhOKWIGM9wn5ryvgc_GgNhXIg8wdDlRcnQNXxs3E6FiyjUO0umArWI";
const clientSecret =
  "EI0kpBhEH3GMtPt-WYGegc1HsHuRjTF57yP8Jh_iDNrZgfzUkZ_oi9lCH3ovTSm6QMAXrQGVlfyNnLql";
const baseUrl = "https://api-m.sandbox.paypal.com"; // Use live URL for production

// Function to get the PayPal access token
const getPayPalAccessToken = async () => {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      `${baseUrl}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw new Error("Failed to authenticate with PayPal");
  }
};

// Function to create a PayPal payment
const createPayPalPayment = async (paymentData) => {
  const accessToken = await getPayPalAccessToken();

  try {
    const response = await axios.post(
      `${baseUrl}/v2/checkout/orders`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return the entire PayPal payment object
  } catch (error) {
    console.error("Error creating PayPal payment:", error);
    throw new Error("Failed to create PayPal payment");
  }
};

// Removed executePayPalPayment function

export { createPayPalPayment };
