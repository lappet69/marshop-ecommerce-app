import useAuth from "@/hooks/useAuth";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cart from "./Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const { user, setShowCart, showCart, logout, totalQuantities } = useAuth();
  const router = useRouter();
  const navMenu = ["Promo", "Category"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(user);
  return (
    <header className={`${isScroll && "bg-[#3498db]"}`}>
      <div className="max-w-sm md:max-w-none w-full flex justify-between relative">
        <Link href={"/"}>
          <Image
            src={isScroll ? "/assets/logo.png" : "/assets/marshop.png"}
            alt="logo"
            className=""
            height={100}
            width={100}
          />
        </Link>
        <div className="flex items-center justify-center gap-2">
          <div className=" relative">
            {user ? (
              <>
                <ShoppingCartIcon
                  className="icon "
                  onClick={() => setShowCart(!showCart)}
                />
                <p className="absolute  w-5 h-5 -top-1.5 -right-1.5 text-sm text-white bg-pink rounded-full flex items-center justify-center">
                  {totalQuantities}
                </p>
              </>
            ) : (
              <>
                <ShoppingCartIcon
                  className="icon "
                  onClick={() => router.push("/login")}
                />
                <p className="absolute  w-5 h-5 -top-1.5 -right-1.5 text-sm text-white bg-pink rounded-full flex items-center justify-center">
                  0
                </p>
              </>
            )}
          </div>
          {user ? (
            user?.photoURL ? (
              <Image
                src={user?.photoURL}
                alt=""
                height={50}
                width={50}
                className="w-8 h-8 rounded-full ml-2 -mt-1 cursor-pointer"
                onClick={logout}
              />
            ) : (
              <UserCircleIcon className="icon " onClick={logout} />
            )
          ) : (
            <UserCircleIcon
              className="icon "
              onClick={() => router.push("/login")}
            />
          )}
        </div>
        <div className="w-full max-w-sm flex justify-between fixed bottom-8 right-0  bg-red-300 !z-20  md:hidden  ">
          <Bars3Icon
            className="text-pink h-8 w-8 cursor-pointer fixed bottom-0 right-7"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute bottom-0 right-0">
              <ul className="px-5 py-2 min-w-[10em] bg-[gray]  rounded  space-y-2  flex flex-col justify-center">
                {navMenu.map((menu, idx) => (
                  <li key={idx} className="navLink capitalize ">
                    {menu}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {showCart && <Cart />}
      {/* <Cart /> */}
    </header>
  );
};

export default Navbar;
