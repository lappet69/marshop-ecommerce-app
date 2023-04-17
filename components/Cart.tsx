import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { toastType } from "@/utils/toast";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef(null);
  const {
    setShowCart,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
    totalPrice,
    totalQuantities,
  } = useAuth();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toastType.default("Redirecting...");
    stripe!.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="h-screen float-right bg-white max-w-lg w-full relative overflow-auto scrollbar-none">
        <button
          type="button"
          className="ml-3 "
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <div className="absolute right-3">
            <span className="heading">Your Cart</span>
            <span className="cart-num-items"> ({totalQuantities} items)</span>
          </div>
        </button>

        {cartItems.length < 1 && (
          <div className="my-10 flex flex-col justify-center items-center w-full space-y-3 ">
            <AiOutlineShopping size={150} className="text-center" />
            <h3 className="text-2xl">Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="bg-pink px-4 py-2 rounded  text-white tracking-wider"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="mt-4 scrollbar-none max-w-[70vh] px-3 py-5">
          {cartItems.length >= 1 &&
            cartItems.map((item: any) => (
              <div className="flex gap-8 p-5" key={item.id}>
                <div className="relative h-20 w-20 bg-red-300">
                  <Link href={`/product/${item.title}${item.id}`}>
                    <Image
                      src={item?.image}
                      height={75}
                      width={75}
                      className="w-full h-full absolute rounded bg-[#ebebeb]"
                      alt=""
                    />
                  </Link>
                </div>
                <div className=" w-full">
                  <div className="flex justify-between top">
                    <h5>{item?.title}</h5>
                    <h4 className="text-orange">${item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div className="flex ">
                      <p className="flex border  items-center gap-2 py-1 ">
                        <span
                          className="border-r py-1 px-2 cursor-pointer"
                          onClick={() =>
                            toggleCartItemQuantity(item?.id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="px-2">{item?.quantity}</span>
                        <span
                          className="border-l py-1 px-2 cursor-pointer"
                          onClick={() =>
                            toggleCartItemQuantity(item?.id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ml-2 text-xl"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className=" space-y-3 px-6 py-4 bg-bgLightGray">
            <div className="border-b py-3 ">
              <h3>Subtotal:</h3>
              <h3 className="text-orange">${totalPrice}</h3>
            </div>
            <div className=" items-center text-center ">
              <button
                type="button"
                className=" bg-pink rounded px-7 py-1 text-white"
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
