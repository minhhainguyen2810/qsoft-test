import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("renders", () => {
  it("should render without crash", () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
  it("should have default card", () => {
    const { container } = render(<App />);

    expect(screen.getByText(/First Card/)).toBeInTheDocument();
  });
});

describe("Integration test - actions", () => {
  it("should add new card successfully", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.click(screen.getByTestId("add-card"));

    expect(screen.getByText(/Another Card/)).toBeInTheDocument();
  });
  it("should delete card successfully", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.click(screen.getByTestId("add-card"));
    await user.click(screen.getAllByTestId("delete-card")[1]);

    expect(screen.queryByText(/Another Card/)).not.toBeInTheDocument();
  });
  it("should add new task successfully", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.type(screen.getByTestId("add-task"), "my task");
    await user.click(screen.getByTestId("add-task-btn"));

    expect(screen.getByTestId("task-text")).toHaveTextContent("my task");
  });
  it("should edit task successfully", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.type(screen.getByTestId("add-task"), "my task");
    await user.click(screen.getByTestId("add-task-btn"));
    await user.click(screen.getByTestId("edit-task"));
    await user.type(screen.getByTestId("task-editing"), "my task updated");
    await user.click(screen.getByText("Done"));

    expect(screen.getByTestId("task-text")).toHaveTextContent(
      "my task updated"
    );
  });
  it("should delete task successfully", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.type(screen.getByTestId("add-task"), "my task");
    await user.click(screen.getByTestId("add-task-btn"));
    await user.click(screen.getByTestId("delete-task"));

    expect(screen.queryByText("my task")).not.toBeInTheDocument();
  });
});
