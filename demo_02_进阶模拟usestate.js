import React from 'react';
import ReactDOM from 'react-dom';

/**
  
  为什么呢
  
  因为没有存储 state，每次渲染 Counter 组件的时候，state 都是新重置的。

  自然想到，把 state 提取出来，存在 useState 外面。
  
  这样，就有一个可以工作的 useState了
  
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
