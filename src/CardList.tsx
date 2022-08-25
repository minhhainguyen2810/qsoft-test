import { ICard } from "./App";
import Card from "./Card";

export interface CardListProps {
  list: ICard[];
  setListCard: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const CardList: React.FC<CardListProps> = ({ list, setListCard }) => {
  return (
    <>
      {list.map((card, index) => (
        <Card key={index} card={card} setListCard={setListCard} />
      ))}
    </>
  );
};

export default CardList;
