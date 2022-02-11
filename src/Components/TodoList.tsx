import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./style.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos.map((item) => (
        <SingleTodo
          todos={todos}
          setTodos={setTodos}
          key={item.id}
          todo={item}
        />
      ))}
    </div>
  );
};

export default TodoList;
