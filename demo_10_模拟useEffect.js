import React, { useEffect } from "react";
import ReactDOM from "react-dom";

/**
 * 
  useEffect 是另外一个基础的 Hook，用来处理副作用，也可以模拟一些生命周期
  
  useEffect 有几个特点：

  有两个参数 callback 和 dependencies 数组
  如果 dependencies 不存在，那么 callback 每次 render 都会执行
  如果 dependencies 存在，只有当它发生了变化， callback 才会执行

  
  基础用法如下

*/

let _state; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state || initialValue;
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);

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
