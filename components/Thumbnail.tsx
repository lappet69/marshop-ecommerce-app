import Image from "next/image";

interface Props {
  image: string;
}

const Thumbnail = ({ image }: Props) => {
  // const [showModal, setShowModal] = useRecoilState(modalState);
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className="relative h-40 min-w-[180px] cursor-pointer transition duration-200 ease-in-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      // onClick={() => {
      //   setCurrentMovie(image);
      //   setShowModal(true);
      // }}
    >
      <Image
        src={`${image}`}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        fill
        alt=""
        className="object-cover rounded-sm md:rounded "
      />
      <p className="px-2 absolute z-50 w-full bg-cardOverlay h-full hover:bg-[gray]/10">
        {image}
      </p>
    </div>
  );
};

export default Thumbnail;
