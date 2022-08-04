import React from "react";
import { v4 as uuidv4 } from "uuid";

import TodosList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";

class TodoContainer extends React.Component {
  constructor() {
    super();

    // console.log("localstorage:", window.localStorage.getItem("todos"));
    const todos = JSON.parse(window.localStorage.getItem("todos"));

    this.state = { todos: todos ?? [] };
  }

  handleChange = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        }),
      };
    });
  };

  delTodo = (id) => {
    const nextState = [
      ...this.state.todos.filter((todo) => {
        return todo.id !== id;
      }),
    ];
    this.setState({
      todos: nextState,
    });
    if (nextState == "") {
      window.localStorage.removeItem("todos");
    } else {
      window.localStorage.setItem("todos", JSON.stringify(nextState));
    }
  };

  addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    const nextState = [...this.state.todos, newTodo];
    this.setState({
      todos: nextState,
    });
    window.localStorage.setItem("todos", JSON.stringify(nextState));
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    });
  };

  componentDidMount() {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem("todos", temp);
    }
  }

  render() {
    // console.log("localstorage:", window.localStorage.getItem("todos"));

    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
export default TodoContainer;
