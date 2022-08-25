import { ChangeEvent, DragEvent } from "react";
import { ICard, ITask } from "./App";
import Task from "./Task";

export interface CardProps {
  card: ICard;
  setListCard: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const Card: React.FC<CardProps> = ({ card, setListCard }) => {
  const handleDelete = () => {
    setListCard((cardList) => cardList.filter((item) => card.id !== item.id));
  };

  const handleDoubleClickTitle = () => {
    setListCard((cardList) =>
      cardList.map((item) => {
        if (item.id === card.id) {
          return {
            ...card,
            editingTitle: !card.editingTitle,
          };
        }
        return item;
      })
    );
  };

  const handleChangeCardTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setListCard((cardList) =>
      cardList.map((item) => {
        if (item.id === card.id) {
          return {
            ...card,
            title: e.target.value,
          };
        }
        return item;
      })
    );
  };

  const handleDeleteTask = (id: number) => () => {
    setListCard((cardList) =>
      cardList.map((item) => {
        if (item.id === card.id) {
          return {
            ...card,
            tasks: card.tasks.filter((task) => task.id !== id),
          };
        }
        return item;
      })
    );
  };

  const handleChangeTask =
    (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setListCard((cardList) =>
        cardList.map((item) => {
          if (item.id === card.id) {
            return {
              ...card,
              tasks: card.tasks.map((task) => {
                if (task.id === id) return { ...task, text: e.target.value };

                return task;
              }),
            };
          }
          return item;
        })
      );
    };

  const handleToggleEditing = (id: number) => () => {
    setListCard((cardList) =>
      cardList.map((item) => {
        if (item.id === card.id) {
          return {
            ...card,
            tasks: card.tasks.map((task) => {
              if (task.id === id) return { ...task, editing: !task.editing };

              return task;
            }),
          };
        }
        return item;
      })
    );
  };

  const handleDrop = (e: DragEvent) => {
    const draggedCardID = parseInt(e.dataTransfer.getData("cardId"));
    const draggedID = parseInt(e.dataTransfer.getData("taskId"));
    const draggedText = e.dataTransfer.getData("text");

    setListCard((cardList) =>
      cardList.map((item) => {
        if (item.id === card.id) {
          return {
            ...item,
            tasks: [...item.tasks, { id: draggedID, text: draggedText }],
          };
        }
        if (item.id === draggedCardID) {
          return {
            ...item,
            tasks: item.tasks.filter((task) => task.id !== draggedID),
          };
        }
        return item;
      })
    );
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragStart = (task: ITask) => (e: DragEvent) => {
    e.dataTransfer.setData("cardId", card.id.toString());
    e.dataTransfer.setData("taskId", task.id.toString());
    e.dataTransfer.setData("text", task.text.toString());
  };

  return (
    <div className="card" onDrop={handleDrop} onDragOver={handleDragOver}>
      {card.editingTitle ? (
        <div className="title-editing">
          <input value={card.title} onChange={handleChangeCardTitle} />
          <button onClick={handleDoubleClickTitle}>Done</button>
        </div>
      ) : (
        <h4 onDoubleClick={handleDoubleClickTitle} className="title">
          {card?.title}
        </h4>
      )}
      {card.tasks?.map((task) => (
        <div
          className="card-item"
          key={task.id}
          draggable={true}
          onDragStart={handleDragStart(task)}
        >
          {task.editing ? (
            <input
              data-testid="task-editing"
              value={task.text}
              onChange={handleChangeTask(task.id)}
            />
          ) : (
            <span data-testid="task-text">{task.text}</span>
          )}
          {task.editing ? (
            <button onClick={handleToggleEditing(task.id)}>Done</button>
          ) : (
            <div className="actions">
              <button
                data-testid="edit-task"
                onClick={handleToggleEditing(task.id)}
              >
                Edit
              </button>
              <button
                data-testid="delete-task"
                onClick={handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      <Task card={card} setListCard={setListCard} />
      <div className="delete-card">
        <button data-testid="delete-card" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
