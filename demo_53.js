import React, { useState, useRef, useCallback, useReducer } from 'react';
import ReactDOM from "react-dom";

/**

  useRef的其他用法

  渲染计数

  查看一个组件到底渲染不渲染，渲染了几次，大致对性能有一个了解；
  
 */

const useRenderTimes = () => {
  const times = useRef(0);
  times.current++;
  return times.current;
};

const Foo = (props) => {
  const renderTimes = useRenderTimes();

  console.log('renderTimes', renderTimes);

  return (
    <div>
      {props.count}
    </div>
  );
};

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      <Foo count={count} />
      <button onClick={() => setCount(c => c + 1)}>Add</button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
