import React, { useEffect, useState } from "react";

const TodosContext = React.createContext({
  todos: [], fetchTodos: () => {}
})

export default function Todos() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8001/api/v1/recipes/hello")
    const todos = await response.json()
    console.log(todos.message)
    setTodos(todos.message)
  }
  useEffect(() => {
    fetchTodos()
  }, [])
  return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
      <ul spacing={5}>
        <li>{todos}</li>
      </ul>
    </TodosContext.Provider>
  )
}