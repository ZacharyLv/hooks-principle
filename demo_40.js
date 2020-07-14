import React from "react";
import ReactDOM from "react-dom";

/**

  useMemo和useCallback


  useCallback：
  接收一个内联回调函数参数和一个依赖项数组
  useCallback 会返回该回调函数的 memoized 版本，
  该回调函数仅在某个依赖项改变时才会更新

  useMemo：
  把创建函数和依赖项数组作为参数传入 useMemo，
  它仅会在某个依赖项改变时才重新计算 memoized 值。
  这种优化有助于避免在每次渲染时都进行高开销的计算

 */

/**

  但是，useMemo，需要比较依赖数组，所以本身也有开销
  
  1、在使用 useMemo 前，应该先思考传递给 useMemo 的函数开销大不大？ 
  有些计算开销很大，我们就需要「记住」它的返回值
  对于简单的js运算就不需要使用useMemo了

  2、返回的值是原始值吗？
  如果计算出来的是原始值(string, boolean等)，不会导致下游组件重新渲染
  如果计算出来的是复杂类型的值（object、array），由于引用地址改变，会导致下游组件重新渲染
  所以，这个情况需要使用useMemo记住这个值

  3、在编写自定义 Hook 时，返回值一定要保持引用的一致性
  如果自定义hook的返回值，被当成了其他hook的依赖，如果引用值的地址发生变化，很可能会产生bug
  所以，自定义 Hook 中暴露出来的值是 object、array、函数等，都应该使用 useMemo。

 */

let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useMemo(fn, deps) {
  // 已经存过值的hook对象
  const hook = memoizedState[cursor];

  // 已经存过的值的依赖
  const _deps = hook && hook._deps;

  // 依赖是否改变
  const hasChange = _deps ? !deps.every((v, i) => _deps[i] === v) : true;

  // 获得返回值
  const memo = hasChange ? fn() : hook.memo;

  // 更新hook对象，并且指针加一
  memoizedState[cursor++] = { _deps: deps, memo };

  return memo;
}

/**
  useCallback依赖useMemo来模拟实现
 */
function useCallback(fn, deps) {
  return useMemo(() => fn, deps);
}

function App() {

  const state = useMemo(() => 1, []);

  const fn = useCallback(() => console.log('useCallback...'), []);

  return (
    <>
      <div>{state}</div>
      <button onClick={fn}>点击</button>
    </>
  );
}

function render() {
  cursor = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
