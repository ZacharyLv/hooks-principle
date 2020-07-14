import React from 'react';
import ReactDOM from 'react-dom';

/**
  
  基于 useState 的用法，这里有一个基础版的例子
  
  声明一个state，返回state和改变这个state的方法
  
  但是发现，点击 Button 的时候，count 并不会变化
  
 */

function useState(initialValue) {
  let state = initialValue;

  function setState(newState) {
    state = newState;
    render();
  }

  return [state, setState];
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
