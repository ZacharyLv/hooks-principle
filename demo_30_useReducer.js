import React, { useReducer } from "react";
import ReactDOM from "react-dom";

/**

  useReducer的基础用法

  能够替代一部分redux的功能

  useReducer接收两个参数，
  一个是reducer函数，跟redux中的reducer是一样的；
  另外一个是初始的状态值。
  返回的是一个数组，数组中的第一个元素是状态值，第二个元素是dispatch函数，
  可以调用dispatch函数，来触发state的更新。
  
 */

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

  return (
    <>
      <div>{state.total}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>点击</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>点击</button>
    </>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
