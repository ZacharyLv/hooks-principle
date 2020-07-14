import React from "react";
import ReactDOM from "react-dom";

/**

  如下，实现了一个可用的 useEffect

  那么为什么第二个参数是空数组，相当于 componentDidMount 
  因为依赖一直不变化，callback 不会二次执行

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

/**

  实际在Hooks内部使用的是 Object.is 来比较新/旧 state 是否相等

  根据 mdn 描述：
  Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

  两个值都是 undefined
  两个值都是 null
  两个值都是 true 或者都是 false
  两个值是由相同个数的字符按照相同的顺序组成的字符串
  两个值指向同一个对象
  两个值都是数字并且
  都是正零 +0
  都是负零 -0
  都是 NaN
  都是除零和 NaN 外的其它同一个数字

*/
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
