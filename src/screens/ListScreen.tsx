import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { nanoid } from "nanoid";
import useLocalStorage from "../hooks/use-local-storage";

type Props = {};

type Task = {
  id: string;
  label: string;
  isComplete: boolean;
};

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value);
  };

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel.length > 0) {
      setTasks((tasks) => [
        ...tasks,
        { id: nanoid(), label: newTaskLabel, isComplete: false },
      ]);
      setNewTaskLabel("");
    }
  };

  const handleCompleteChange =
    (handleTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === handleTask.id
            ? { ...task, isComplete: !task.isComplete }
            : task
        )
      );
    };

  const handleClearClick = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));
  };

  const handleTaskDeleteClick = (handleTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handleTask.id));
  };
  console.log(tasks);

  return (
    <div>
      <form className="add-task">
        <label htmlFor="task"></label>
        <input
          type="text"
          value={newTaskLabel}
          onChange={handleNewTaskLabelChange}
          onKeyPress={handleNewTaskKeyPress}
          placeholder="Create a new task..."
        />
      </form>
      <div className="list-task">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="checkbox-items">
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={handleCompleteChange(task)}
                  autoComplete="off"
                />
                <span
                  style={
                    task.isComplete
                      ? { textDecorationLine: "line-through", color: "gray" }
                      : { textDecorationLine: "none" }
                  }
                  className="todo-items"
                >
                  {task.label.toUpperCase()}
                </span>
              </div>
              <span
                onClick={handleTaskDeleteClick(task)}
                className="clear-button"
              >
                Delete
              </span>
            </div>
          ))
        ) : (
          <span className="no-items">
            No items found: You haven't added any task. Add one!
          </span>
        )}
      </div>
      <div className="config-task">
        <div className="counting-items">
          <div className="footer-items">
            {tasks.length <= 0 ? (
              <span>No tasks at all</span>
            ) : (
              <span>{tasks.length} Items left</span>
            )}
          </div>
          <span className="clear-button" onClick={handleClearClick}>
            Clear Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListScreen;
