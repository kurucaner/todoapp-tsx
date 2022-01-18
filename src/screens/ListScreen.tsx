import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { nanoid } from "nanoid";

type Props = {};

type Task = {
  id: string;
  label: string;
  isComplete: boolean;
};

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { label: "Test1", isComplete: false, id: nanoid() },
    { label: "Test2", isComplete: false, id: nanoid() },
  ]);
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
    console.log(setTasks);
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
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleClearClick}>Clear Completed</button>
      </div>
    </div>
  );
};

export default ListScreen;
