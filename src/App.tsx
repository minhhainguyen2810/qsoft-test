import { useState } from "react";
import "./App.scss";
import CardList from "./CardList";

export interface ITask {
  id: number;
  text: string;
  editing?: boolean;
}
export interface ICard {
  editingTitle?: boolean;
  id: number;
  title: string;
  tasks: ITask[];
}

function App() {
  const [listCard, setListCard] = useState<ICard[]>([
    { title: "First Card", id: 1, tasks: [] },
  ]);

  const handleClick = () => {
    setListCard([
      ...listCard,
      { title: "Another Card", id: new Date().getTime(), tasks: [] },
    ]);
  };

  return (
    <>
      <div className="wrapper">
        <CardList list={listCard} setListCard={setListCard} />
        <button
          data-testid="add-card"
          className="add-btn"
          onClick={handleClick}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
