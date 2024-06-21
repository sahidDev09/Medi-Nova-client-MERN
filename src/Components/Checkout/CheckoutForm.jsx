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
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, testsDetails, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

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
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    try {
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
        try {
          const res = await axiosSecure.patch(
            `/tests/update/${testsDetails._id}`,
            {
              test_slots: testsDetails.test_slots - 1,
            }
          );

          if (res.data.modifiedCount > 0) {
            const reservationData = {
              test_name: testsDetails?.test_name,
              test_date: testsDetails?.test_date,
              test_image: testsDetails?.image,
              test_id: testsDetails?._id,
              email: user?.email,
              report_status: "pending",
            };

            axiosSecure.post("/bookings", reservationData).then((res) => {
              if (res.data.insertedId) {
                refetch();
                toast.success(
                  "Your appointment is booked for the selected date"
                );
                navigate("");
                setError("");
              }
            });
          } else {
            toast.error("Failed to update slots data");
          }
        } catch (error) {
          toast.error("Failed to update slots data");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Failed to process payment due to an unexpected error");
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
        <h1>{error && <p className="text-red-600">{error}</p>}</h1>
        <div className="modal-action flex justify-between items-center">
          <button
            type="button"
            className="btn"
            onClick={() => document.getElementById("my_modal_1").close()}>
            Close
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="btn bg-blue-600 text-white">
            {processing ? (
              <div className="w-full flex justify-center">
                <ThreeDots
                  visible={true}
                  width="50"
                  height="25"
                  color="blue"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Payment"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
