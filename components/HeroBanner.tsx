import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="relative h-96 md:h-[652px] flex flex-col justify-center px-4">
      <Image
        src={
          "https://i.pinimg.com/564x/ef/77/95/ef7795b690cbb619ee9975c4ab488b65.jpg"
        }
        alt=""
        fill
        loading="lazy"
        decoding="async"
        className="absoulte w-full h-full -z-10"
      />
      <div className="lg:px-28">
        <p className="text-white text-xl md:text-5xl flex flex-wrap-reverse font-semibold">
          Shop with ease, from anywhere in the world.
        </p>
        <p className="text-bgLightGray md:text-3xl">
          {` Shop the world's best selection of products with ease on our ecommerce
        platform.`}
        </p>
        <button className="flex items-center justify-center rounded px-3  bg-pink text-sm md:text-2xl text-bgLightGray mt-8">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
