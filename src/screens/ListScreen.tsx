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
      <input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleCompleteChange(task)}
            />
            {task.label}
            <button onClick={handleTaskDeleteClick(task)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        {tasks.length <= 0 ? (
          <span>No tasks at all</span>
        ) : (
          <span>{tasks.length} Items left</span>
        )}
        <button onClick={handleClearClick}>Clear Completed</button>
      </div>
    </div>
  );
};

export default ListScreen;
