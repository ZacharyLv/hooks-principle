import React from "react";
import ReactDOM from "react-dom";

/**

  到现在为止，我们已经实现了可以工作的 useState 和 useEffect。
  但是有一个很大的问题：它俩都只能使用一次。

 */

let _state, _deps; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state || initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 如果 dependencies 不存在
  const hasChangedDeps = _deps
    ? !depArray.every((el, i) => el === _deps[i]) // 两次的 dependencies 是否完全相等
    : true;
  /* 如果 dependencies 不存在，或者 dependencies 有变化*/
  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
}

function App() {

  /**

    count 和 username 是互相干扰的。
  
   */
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("fan");

  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>点击</button>
      <div>{username}</div>
      <button onClick={() => setUsername(username + " hello")}>点击</button>
    </>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
