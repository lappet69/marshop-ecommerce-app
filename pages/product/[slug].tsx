import Navbar from "@/components/Navbar";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { ICart } from "@/interface";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

interface Props {
  product: ICart;
  products: ICart[];
}

const ProductDetails = ({ product, products }: Props) => {
  const [index, setIndex] = useState(0);

  const { qty, onAdd, setShowCart, setQty } = useAuth();

  const decQty = () => {
    if (qty !== 1) {
      setQty(qty - 1);
    }
  };
  const incQty = () => {
    if (qty > 0) {
      setQty(qty + 1);
    }
  };
  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div className="xl:flex  lg:justify-center">
      <Head>
        <title>Marshop | {product?.title}</title>
      </Head>

      <Navbar />
      <section className="flex flex-col px-2 lg:px-10 md:px-1 mt-20">
        <div className="mt-16 md:flex gap-3 lg:max-w-7xl  ">
          <div className="">
            <div className="md:w-[420px] max-w-sm md:max-w-none relative h-[320px] w-full flex bg-white p-5">
              <Image
                src={product?.image}
                className=" absolute p-5 scale-95  hover:scale-100 hover:shadow-xl"
                alt=""
                loading="lazy"
                decoding="async"
                fill
              />
            </div>
            <div className="small-images-container">
              {/* {image?.map((item, i) => (
            <img
              key={i}
              src={urlFor(item)}
              className={
                i === index ? "small-image selected-image" : "small-image"
              }
              onMouseEnter={() => setIndex(i)}
            />
          ))} */}
            </div>
          </div>

          <div className="w-full flex flex-col  md:justify-between ">
            <h1 className="text-2xl text-blue-500">{product?.title}</h1>
            <div className=" flex justify-between mb-2">
              <div className="stars text-orange flex items-center">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <p> ({product?.rating.count})</p>
              </div>
              <p className="text-orange font-semibold mr-1">
                ${product?.price}
              </p>
            </div>
            <div className="bg-white px-2 py-2 rounded-sm mb-2 ">
              <h4>Details: </h4>
              <p>{product?.description}</p>
            </div>
            <div className="w-full bg-white px-2 py-4 rounded-sm flex items-center justify-between ">
              <div className="quantity flex gap-3  items-center md:flex-wrap">
                <h3>Quantity:</h3>
                <p className="flex border items-center  gap-2">
                  <span
                    className="cursor-pointer border-r px-2 py-1"
                    onClick={decQty}
                  >
                    <AiOutlineMinus className="hover:text-orange" />
                  </span>
                  <span className={`px-2 py-1 `}>{qty}</span>
                  <span
                    className="px-2 py-1 border-l cursor-pointer"
                    onClick={incQty}
                  >
                    <AiOutlinePlus className="hover:text-green-600" />
                  </span>
                </p>
              </div>
              <div className="flex  items-center gap-3  ">
                <button
                  type="button"
                  className=" bg-pink px-2 py-1 text-white rounded-sm transition duration-300 ease-in-out hover:bg-pink/90"
                  onClick={() => onAdd(product, qty)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className=" bg-pink px-2 py-1 text-white rounded-sm transition duration-300 ease-in-out hover:bg-pink/90"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mt-24 ">
          <Row title="You may also like" products={products} />

          {/* <div className="marquee">
            <div className="maylike-products-container track">
              {products &&
                products.map((item) => (
                  <Product key={item.id} product={item} />
                ))}
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths = async () => {
  const products = await fetch(`https://fakestoreapi.com/products`).then(
    (res) => res.json()
  );

  const paths = products.map((product: ICart) => ({
    params: {
      slug: product.title,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }: Params) => {
  const product = await fetch(`https://fakestoreapi.com/products/${slug}`).then(
    (response) => response.json()
  );

  const products = await fetch(
    `https://fakestoreapi.com/products?sort=desc`
  ).then((response) => response.json());
  return {
    props: { products, product },
  };
};

export default ProductDetails;
