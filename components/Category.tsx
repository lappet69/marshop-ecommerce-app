import Card from "./Card";

interface Props {
  title: string;
  categories: string[];
}

const Category = ({ title, categories }: Props) => {
  const imgDummy = [
    "https://i.pinimg.com/564x/d4/82/40/d482401bd08c4653feee6578689ad385.jpg",
    "https://i.pinimg.com/564x/a0/29/6e/a0296e6bb6df0d833eff1c7f277936b2.jpg",
    "https://i.pinimg.com/564x/2d/55/22/2d55224c62a17fce74f43e4916844030.jpg",
    "https://i.pinimg.com/564x/5d/51/a4/5d51a499568c5dbf0dd3149537577870.jpg",
  ];
  const newData = categories.map((c, idx) => {
    return { id: idx, name: c, thumbnail: imgDummy[idx] };
  });

  return (
    <div className="max-w-sm md:max-w-none  px-4 md:px-44 overflow-hidden   ">
      <h2 className="text-lg md:text-2xl font-semibold md:px-2">{title}</h2>
      <div className="w-full flex flex-wrap  gap-4 justify-around md:justify-center">
        {newData && newData.map((el, idx) => <Card key={idx} data={el} />)}
      </div>
    </div>
  );
};

export default Category;
