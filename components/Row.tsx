import { ICart } from "@/interface";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import Product from "./Product";

interface Props {
  title: string;
  products?: ICart[];
}

const Row = ({ title, products }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 md:px-0 space-y-0.5 md:space-y-2 ">
      <h2 className="w-56 cursor-pointer text-lg font-semibold text-txtDarkerGray transition duration-200 hover:text-gray-600 md:text-2xl md:ml-4">
        {title}
      </h2>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 left-2 bottom-0 z-40 m-auto w-9 h-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        {/* Thumbnail */}
        <div className="flex scrollbar-hide  items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 gap-2 relative max-h-fit">
          {products?.map((product, idx) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <ChevronRightIcon
          className={`absolute top-0 right-2 bottom-0 z-40 m-auto w-9 h-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 `}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
