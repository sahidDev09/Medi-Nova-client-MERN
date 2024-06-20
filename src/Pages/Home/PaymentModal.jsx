/* eslint-disable react/prop-types */

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/Checkout/CheckoutForm";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PaymentModal = ({ modal }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  const axiosPublic = useAxiosPublic();

  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(modal.test_price);
  const [couponApplied, setCouponApplied] = useState(false);

  // Fetch the banner data
  const { data: bannerData = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner");
      return res.data;
    },
  });
  const banner = bannerData.length > 0 ? bannerData[0] : {};

  const handleApplyCoupon = () => {
    if (banner.coupon_code === couponCode) {
      const discount =
        (modal.test_price * banner.discount_rate_for_coupon) / 100;
      setFinalPrice(modal.test_price - discount);
      setCouponApplied(true);
      Swal.fire({
        toast: true,
        position: 'top',
        title: 'Applied',
        text: `Congratulations! You got ${banner.discount_rate_for_coupon}% discount.`,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        title: 'Error!',
        text: 'Invalid coupon code',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="font-bold text-lg text-blue-400">Test Information</h3>
          <hr />
          <p className="font-semibold">{modal.test_name}</p>
          <p>{modal.test_details}</p>
          <div className="grid grid-cols-3 gap-2 my-4">
            <input
              type="text"
              className="input input-bordered col-span-2 focus:outline-none"
              placeholder="Enter valid Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={couponApplied}
            />
            <button
              onClick={handleApplyCoupon}
              className="btn bg-blue-500 text-white"
              disabled={couponApplied}>
              {couponApplied ? "Applied" : "Apply"}
            </button>
          </div>
          <div className="font-bold bg-green-500 p-2 rounded-md text-white text-center">
            <h1>Total Price: ${finalPrice}</h1>
          </div>
          <h1 className="font-lg my-2 text-gray-600">
            Make payment with stripe
          </h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm banner={banner} />
          </Elements>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentModal;
