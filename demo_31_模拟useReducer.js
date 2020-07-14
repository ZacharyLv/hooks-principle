import React from "react";
import ReactDOM from "react-dom";

/**

  从功能可以看出来
  只需要结合 useState 和 reducer 就可以实现useReducer

  但是在react的源码中，其实是反着的，useState是依赖useReducer实现的

 */

let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const update = (state, action) => {
    const result = reducer(state, action);
    setState(result);
  }

  const dispatch = update.bind(null, state);
  
  return [state, dispatch];
}

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {total: state.total + 1};
      case 'decrement':
        return {total: state.total - 1};
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, { total: 0});
  const [state2, dispatch2] = useReducer(reducer, { total: 100});

  return (
    <>
      <div>{state.total}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>点击</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>点击</button>
      <div>{state2.total}</div>
      <button onClick={() => dispatch2({ type: 'increment' })}>点击</button>
      <button onClick={() => dispatch2({ type: 'decrement' })}>点击</button>
    </>
  );
}

function render() {
  cursor = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
