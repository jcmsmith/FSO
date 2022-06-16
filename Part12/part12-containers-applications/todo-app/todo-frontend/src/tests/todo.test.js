import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Todo from "../Todos/Todo";

beforeEach(() => {});

describe("Todos", () => {
  it("should have proper text", () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();

    const todo = {
      text: "Something",
      done: true,
    };

    const { container } = render(
      <Todo todo={todo} onClick={onClick} onDelete={onDelete} />
    );

    const notDone = container.querySelector("#todo-notdone");
    const done = container.querySelector("#todo-done");

    expect(notDone).toBeNull();
    expect(done).not.toBeNull();
  });

  it("should always have delete buttons", () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();

    const todo1 = {
      text: "Something",
      done: true,
    };

    const todo2 = {
      text: "Something else",
      done: false,
    };

    render(
      <>
        <Todo todo={todo1} onClick={onClick} onDelete={onDelete} />
        <Todo todo={todo2} onClick={onClick} onDelete={onDelete} />
      </>
    );

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });

    expect(deleteButtons).toBeDefined();
    expect(deleteButtons).toHaveLength(2);
  });
});
