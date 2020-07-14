import React, { useState, useRef } from 'react';
import ReactDOM from "react-dom";

/**
 * 
 * 当出现莫名其妙的问题的时候，往闭包上面想准没错
 * 
 */
function App() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => alert(count), 3000);
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </>
  );
}

/**
 * 
 * 解决闭包的问题，可以使用useRef
 * 
 */
function Add() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  countRef.current = count;

  function handleAlertClick() {
    setTimeout(() => alert(countRef.current), 3000);
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </>
  );
}

ReactDOM.render(<Add />, document.getElementById("root"));
