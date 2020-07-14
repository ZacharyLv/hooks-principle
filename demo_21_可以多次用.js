import React from "react";
import ReactDOM from "react-dom";

/**

  因为只有一个 _state 和 一个 _deps。
  我们需要可以存储多个 _state 和 _deps。

  一下用数组来模拟，关键在于：

  初次渲染的时候，按照 useState，useEffect 的顺序，把 state，deps 等按顺序塞到 memoizedState 数组中。
  更新的时候，按照顺序，从 memoizedState 中把上次记录的值拿出来。

 */

/**

  到这里，我们实现了一个可以任意复用的 useState 和 useEffect。

  同时可以知道以下的问题

  为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或者子函数中调用。
  因为，memoizedState 数组是按 hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。
  
  关于useLayoutEffect：

  useEffect 在全部渲染完毕后才会执行
  useLayoutEffect 会在 浏览器 layout 之后，painting 之前执行
  其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect
  可以使用它来读取 DOM 布局并同步触发重渲染
  在浏览器执行绘制之前 useLayoutEffect 内部的更新计划将被同步刷新
  尽可能使用标准的 useEffect 以避免阻塞视图更新。

  关于useEffect如何清除副作用.

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

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;

  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }

  cursor++;
}

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("fan");

  useEffect(() => console.log(count), [count]);
  useEffect(() => console.log(username), [username]);

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
  cursor = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
