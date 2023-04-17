import Image from "next/image";

type Props = {
  data?: any;
};

const Card = ({ data }: Props) => {
  const imgDummy = [
    "https://i.pinimg.com/564x/d4/82/40/d482401bd08c4653feee6578689ad385.jpg",
    "https://i.pinimg.com/564x/a0/29/6e/a0296e6bb6df0d833eff1c7f277936b2.jpg",
    "https://i.pinimg.com/564x/2d/55/22/2d55224c62a17fce74f43e4916844030.jpg",
    "https://i.pinimg.com/564x/5d/51/a4/5d51a499568c5dbf0dd3149537577870.jpg",
  ];

  return (
    <div className="max-w-sm w-[168px]  items-center cursor-pointer">
      <div className=" flex justify-center  bg-white relative h-[240px]">
        <h2 className="md:text-xl font-semibold capitalize z-[1] absolute">
          {data.name}
        </h2>
        <Image src={data.thumbnail} alt="" fill className="rounded " />
        <Image
          src={data.thumbnail}
          alt=""
          fill
          className=" scale-95 hover:scale-100 rounded transition duration-300  z-0"
        />
      </div>
    </div>
  );
};

export default Card;
