import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helpers";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { itemsPrice, shippingPrice, totalPrice } =
      calculateOrderCost(cartItems);
    if (method === "COD") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        totalAmount: totalPrice,
        taxAmount: 0,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      await createNewOrder(orderData);
    }
    if (method === "Card") {
      // Stripe Checkout
    }
  };
  return (
    <>
      <MetaData title={"Payment Method"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form class="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 class="mb-4">Select Payment Method</h2>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label class="form-check-label" for="codradio">
                Cash on Delivery
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label class="form-check-label" for="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button id="shipping_btn" type="submit" class="btn py-2 w-100">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
