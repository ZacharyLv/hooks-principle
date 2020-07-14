import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**

  自定义 Hook

  自定义 Hook 更像是一种约定，而不是一种功能。如果函数的名字以 use 开头，并且调用了其他的 Hook，则就称其为一个自定义 Hook

  1、Hook 是一种复用状态逻辑的方式，它不复用 state 本身
  事实上 Hook 的每次调用都有一个完全独立的 state

  2、自定义 Hook 必须以 use 开头
  这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则

 */

function useNumber(){
  const [number,setNumber] = useState(0);

  useEffect(()=>{
    setInterval(()=>{
      setNumber(number=>number+1);
    },1000);
  },[]);

  return [number,setNumber];
}

// 每个组件调用同一个 hook，只是复用 hook 的状态逻辑，并不会共用一个状态
function Counter1(){
  const [number,setNumber] = useNumber();
  return (
    <div>
      <button onClick={() => setNumber(number+1)}>{number}</button>
    </div>
  )
}

function Counter2(){
  const [number,setNumber] = useNumber();
  return (
    <div>
      <button onClick={() => setNumber(number+1)}>{number}</button>
    </div>
  )
}

ReactDOM.render(<><Counter1 /><Counter2 /></>, document.getElementById('root'));
