/* eslint-disable react/prop-types */
// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (price && price > 1) {
      getClientSecret(price);
    }
  }, [price]);

  const getClientSecret = async (price) => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price,
      });
      console.log(data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error getting client secret:", error);
    }
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    setProcessing(true);
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    try {
      // Use your card Element with other Stripe.js APIs
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        setProcessing(false);
        return;
      }

      console.log("[PaymentMethod]", paymentMethod);

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email,
              name: user?.displayName,
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      console.log("[PaymentIntent]", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful");
        setError("");
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      console.error("Payment failed", error);
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <h1>{error && <p className=" text-red-600">{error}</p>}</h1>
        <div className="modal-action flex justify-between items-center">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").close()}>
            Close
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="btn bg-blue-600 text-white">
            {processing ? "Processing" : "Payment"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
