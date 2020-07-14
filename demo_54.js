import React, { Component, useState, useRef, useCallback, useReducer } from 'react';
import ReactDOM from "react-dom";

/**

  useRef的其他用法

  前一次值
  
 */

// 在class组件的时代，我们有不少方法是能拿到“前一次更新的值”的，比如：
class MyClass extends Component {

  // 前一次的属性和状态全给了
  componentDidUpdate(prevProps, prevState, snapshot) {}

  // 这个反过来，给你下一次的，但this.props就是当前的了
  componentWillReceiveProps(nextProps) {}
}

// 函数组件的时候，这些方法无法使用了，下面是通过useRef实现的方法
const usePreviousValue = value => {
  const previous = useRef(undefined);
  const previousValue = previous.current;
  previous.current = value;
  return previousValue;
};

const Foo = (props) => {
  // const preValue = usePreviousValue(props.count);

  // console.log('preValue', preValue);

  console.log('props.count', props.count, props.count.a);


  return (
    <div>
      {props.count.a}
      <button onClick={() => props.setCount(c => c + 1)}>click</button>
    </div>
  );
};

function App() {

  const [count, setCount] = useState({ a: 1 });

  console.log('count', count);

  return (
    <>
      <Foo count={JSON.parse(JSON.stringify(count))} setCount={setCount}/>
      <button onClick={() => setCount(c => ({ a: c.a + 1 }))}>Add</button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
