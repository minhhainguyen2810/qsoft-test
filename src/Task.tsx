import { ChangeEvent, useState } from "react";
import { ICard } from "./App";

export interface CardProps {
  card: ICard;
  setListCard: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const Task: React.FC<CardProps> = ({ card, setListCard }) => {
  const [value, setValue] = useState("");
  const handleAdd = () => {
    setListCard((cardList) =>
      cardList.map((item) => {
        if (card.id === item.id) {
          return {
            ...item,
            tasks: [...item.tasks, { id: new Date().getTime(), text: value }],
          };
        }
        return item;
      })
    );
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="task">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Add task"
        data-testid="add-task"
      />
      <button data-testid="add-task-btn" onClick={handleAdd}>
        +
      </button>
    </div>
  );
};

export default Task;
