import React from 'react';
import ReactDOM from 'react-dom';

/**

  虽然我们用数组基本实现了一个可用的 Hooks。

  React 中是通过类似单链表的形式来代替数组的。通过 next 按顺序串联所有的 hook。

 */

let firstWorkInProgressHook = {memoizedState: null, next: null};
let workInProgressHook;

function useState(initState) {
  let currentHook = workInProgressHook.next ? workInProgressHook.next : {memoizedState: initState, next: null};

  function setState(newState) {
    currentHook.memoizedState = newState;
    render();
  }
  // 这就是为什么 useState 书写顺序很重要的原因
  // 假如某个 useState 没有执行，会导致指针移动出错，数据存取出错
  if (workInProgressHook.next) {
    // 这里只有组件刷新的时候，才会进入
    // 根据书写顺序来取对应的值
    workInProgressHook = workInProgressHook.next;
  } else {
    // 只有在组件初始化加载时，才会进入
    // 根据书写顺序，存储对应的数据
    // 将 firstWorkInProgressHook 变成一个链表结构
    workInProgressHook.next = currentHook;
    // 将 workInProgressHook 指向 {memoizedState: initState, next: null}
    workInProgressHook = currentHook;
  }
  return [currentHook.memoizedState, setState];
}

function Counter() {
  // 每次组件重新渲染的时候，这里的 useState 都会重新执行
  const [name, setName] = useState('时间戳');
  const [number, setNumber] = useState(0);
  return (
    <>
      <p>当前时间戳：{name}</p>
      <p>计数：{number}</p>
      <button onClick={() => setName(Date.now())}>更新时间戳</button>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  )
}

function render() {
  // 每次重新渲染的时候，都将 workInProgressHook 指向 firstWorkInProgressHook
  workInProgressHook = firstWorkInProgressHook;
  ReactDOM.render(<Counter/>, document.getElementById('root'));
}

render();
