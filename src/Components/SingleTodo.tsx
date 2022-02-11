import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import "./style.css";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(todo.todo);

  const handleDone = (id: number) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );

  const handleDelete = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: value } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <PencilIcon width={24} height={24} />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <TrashIcon width={24} height={24} />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <CheckIcon width={24} height={24} />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
