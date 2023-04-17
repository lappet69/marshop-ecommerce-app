import { Barlow_Condensed } from "next/font/google";
import React from "react";
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: "400",
});

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div
      className={`${barlow.className} w-full max-w-sm md:max-w-none min-h-screen  shadow-2xl`}
    >
      <main className="">{children}</main>
      {/* Footer */}
    </div>
  );
};

export default Layout;
