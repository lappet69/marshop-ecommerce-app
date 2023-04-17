import useAuth from "@/hooks/useAuth";
import { ICart } from "@/interface";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  product: ICart;
}

const Product = ({ product }: Props) => {
  const { id, title, price, category, image, rating, description } = product;
  const router = useRouter();

  const { onAdd } = useAuth();
  return (
    <div className="max-w-sm h-[280px] bg-white shadow-2xl rounded px-1 flex flex-col justify-between py-3 ">
      <div className="h-40 w-40 relative ">
        <button onClick={() => router.push(`/product/${id}`)}>
          <Image
            src={image}
            alt={image}
            fill
            className="w-full h-full absolute object-contain hover:scale-110 transition duration-300"
          />
        </button>
      </div>
      <div className="relative self-end">
        <p className="flex flex-wrap w-[160px] text-sm">{title}</p>
        <span className="font-semibold">${price}</span>
        <div className="flex items-center">
          <StarIcon className="w-5 h-5 text-orange" />
          <StarIcon className="w-5 h-5 text-orange" />
          <StarIcon className="w-5 h-5 text-orange" />
          <StarIcon className="w-5 h-5 text-orange" />
          <StarIcon className="w-5 h-5 text-orange" />
          <span>({rating.count})</span>
        </div>
        <button
          className="self-center py-2 w-full rounded hover:bg-skyBlue bg-blue-600/50 text-white font-semibold"
          onClick={() => onAdd(product, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
