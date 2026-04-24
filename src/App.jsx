import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./component/NavBar.jsx";
import Footer from "./component/Footer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const toggleshowfinished = (e) => {
    setshowFinished(!showFinished);
  };

  // when page refreshed get the items from localstorage
  useEffect(() => {
    let todo_task = localStorage.getItem("Tasks");
    if (todo_task) {
      let todos = JSON.parse(localStorage.getItem("Tasks"));
      // Converts stored string from key Tasks  back into an array
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(todos));
    // Converts your todos array (JavaScript object) into a string
  }, [todos]);

  const handleAdd = () => {
    // creating a new updated array
    setTodos([...todos, { id: uuidv4(), Task: input, iscompleted: false }]);
    // ...todos (spread operator) ,Copies all existing todos into a new array
    // { id: uuidv4(), Task: todo, iscompleted: false } → new todo object
    setInput("");
    // Resets input field after adding the task
    saveTodo_local_storage();
  };
  const handleEdit = (e, id) => {
    if (confirm(`Are you sure to edit your task!`)) {
      let t = todos.filter((i) => i.id === id);
      // catching the exact obj which key has same id
      setInput(t[0].Task);
      let newtodos = todos.filter((item) => {
        return item.id !== id;
      });
      // catches the other obj which key's id does not match
      setTodos(newtodos);
      saveTodo_local_storage();
    }
  };
  const handleDelete = (e, id) => {
    if (confirm(`Are you sure to delete your task!`)) {
      let newtodos = todos.filter((item) => {
        return item.id !== id;
      });
      // It creates a new array by removing the todo whose id matches the given id.
      setTodos(newtodos);
      // updating your current todo
    }
  };

  // whenever the input changes this fn updates the value
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(e, e.target, id);
    // find the index of todo obj which id will match
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    // first copy the all obj into newtodos array then select the specific todo obj by its index
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    // toggle the key's value true/false
    setTodos(newtodos);
  };

  return (
    <>
      <section>
        <NavBar />
      </section>
      <section>
        <div className="container w-[89vw] max-md:w-[90vw] mx-auto mt-10 mb-6 rounded-xl p-5 bg-blue-200 h-[73vh] sm:h-[80vh] overflow-y-auto">
          <div className="addTodo flex flex-col my-2 gap-5.5 ">
            <h2 className=" text-lg font-bold">Add A Todo</h2>
            <input
              onChange={handleChange}
              value={input}
              type="text"
              className="bg-white py-1 "
            />
            <button
              disabled={input.length < 2}
              onClick={handleAdd}
              className="  bg-blue-300 hover:bg-blue-500 py-1  px-2  text-white rounded-md mx-6 hover:scale-104 hover:font-bold"
            >
              Add
            </button>
          </div>
          <input
            onChange={toggleshowfinished}
            type="checkbox"
            checked={showFinished}
            className="my-5 hover:cursor-pointer"
          />
          Show Finished
          <h2 className="text-lg font-bold my-6">Your Todos</h2>

          <div className="todos w-full">
            {/* if the todos array is empty */}
            {todos.length === 0 && (
              <div className="m-auto ">There are no tasks </div>
            )}
            {/* conditional rendering using &&, if use || the both condition will apply  */}
            {todos.map((item) => {
              return (
                (showFinished || !item.iscompleted) && (
                  <div
                    key={item.id}
                    className="todo border border-black flex w-full my-4 py-4 px-2 md:px-10 justify-around sm:justify-between items-center"
                  >
                    <div className="  flex  w-[52%]  md:gap-15 ">
                      <input
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.iscompleted}
                        name={item.id}
                        id=""
                      />
                      <div className={` ${item.iscompleted ? "line-through" : ""} w-[80%]  truncate overflow-hidden  ml-1 ` } >
                        {item.Task}
                      </div>
                    </div>

                    <div className="buttons w-[40%] flex justify-around gap-0.5 max-h-6 ">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className=" bg-blue-300 hover:bg-blue-500 px-2 text-white rounded-md "
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className=" bg-blue-300 hover:bg-blue-500  px-2 text-white rounded-md "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

export default App;
