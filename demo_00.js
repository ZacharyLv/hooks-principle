import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/**

  useState的基础用法

  惰性初始化 state
  1、入参可以是一个函数
  2、作为参数的函数只会在组件的初始化渲染中起作用，后续渲染时会被忽略


  如果新的 state 需要通过使用先前的 state 计算得出，
  那么可以将回调函数当做参数传递给 setState。
  该回调函数将接收先前的 state，
  并返回一个更新后的值。

 */
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
