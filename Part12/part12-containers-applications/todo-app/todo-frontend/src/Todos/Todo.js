const Todo = ({ todo, onDelete, onClick }) => {
  const doneInfo = (
    <>
      <span id="todo-done">This todo is done</span>
      <span>
        <button onClick={onDelete(todo)}>Delete</button>
      </span>
    </>
  );

  const notDoneInfo = (
    <>
      <span id="todo-notdone">This todo is not done</span>
      <span>
        <button onClick={onDelete(todo)}>Delete </button>
        <button onClick={onClick(todo)}>Set as done </button>
      </span>
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span>{todo.text}</span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  );
};

export default Todo;
