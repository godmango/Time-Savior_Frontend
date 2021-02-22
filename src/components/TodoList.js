import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "pretty-checkbox-react";
import authActions from "../redux/actions/auth.actions";

const TodoList = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentAuth = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth.user);
  const loginWithLocalStorage = useSelector(
    (state) => state.auth.loggedInWithLocalStorage
  );
  const [fullList, setFullList] = useState([]);
  const [errors, setErrors] = useState("");
  const renderCount = useRef(0);
  const singleTodo = useRef("");

  renderCount.current = renderCount.current + 1;

  useEffect(() => {
    if (currentAuth && currentUser !== null && isAuthenticated) {
      setFullList(currentUser.settings.todoList);
    }
  }, [isAuthenticated]);

  const handleInput = (e) => {
    singleTodo.current = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (singleTodo.current === "") {
      setErrors("Your input is empty");
      return;
    }
    setErrors("");
    setFullList(fullList.concat([singleTodo.current]));
    singleTodo.current = "";
    e.target.reset();
  };
  const handleClick = (e) => {
    e.target.parentNode[0].focus();
  };

  const handleDelButton = (index) => {
    let newList = Object.assign([], fullList);
    newList.splice(index, 1);

    setFullList(newList);
  };

  useEffect(() => {
    if (
      (renderCount.current > 1 &&
        loginWithLocalStorage === false &&
        isAuthenticated) ||
      (renderCount.current > 4 &&
        isAuthenticated &&
        loginWithLocalStorage === true)
    ) {
      dispatch(authActions.addTodos(fullList, currentUser._id));
    } else {
      return;
    }
  }, [fullList]);
  useEffect(() => {
    if (currentUser === null) {
      setFullList([]);
    }
  }, [isAuthenticated]);

  return (
    <div className="todoBig">
      <form onSubmit={handleSubmit}>
        <input
          className={`todoInput${currentTheme}`}
          type="text"
          placeholder="What to do?"
          onInput={handleInput}
        />
        <button
          className={`todoAddButton${currentTheme}`}
          type="submit"
          onClick={handleClick}
        >
          add
        </button>
      </form>
      {errors && <small className="form-text text-danger">{errors}</small>}
      <div className={`todoListSize${currentTheme}`}>
        {currentUser !== null ? (
          currentUser.settings.todoList.map((todos, index) => (
            <div key={index}>
              <Checkbox> {todos}</Checkbox>
              <button
                className={`todoDelete${currentTheme}`}
                onClick={() => handleDelButton(index)}
              >
                delete
              </button>
            </div>
          ))
        ) : fullList && fullList !== [] ? (
          fullList.map((todos, index) => (
            <div key={index}>
              <Checkbox> {todos}</Checkbox>
              <button
                className={`todoDelete${currentTheme}`}
                onClick={() => handleDelButton(index)}
              >
                delete
              </button>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
