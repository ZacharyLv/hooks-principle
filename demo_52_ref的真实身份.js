import React, { Component, createRef, useState, useRef, useCallback, useReducer } from 'react';
import ReactDOM from "react-dom";

/**

  ref的真实身份
  
*/

// 在class里面，看看createRef的用法：
class Foo extends Component {

  root = createRef();

  componentDidMount() {
    this.setState({ width: this.root.current.offsetWidth });
  }

  render() {
    return <div ref={this.root} />;
  }
}

/**

  随便一看就知道，createRef是被用在什么地方的：它被放在了类的实例属性上面。

  由此而得一个结论：

  ref是一个与组件对应的React节点生命周期相同的，可用于存放自定义内容的容器.

  在class时代，
  由于组件节点是通过class实例化而得，因此可以在类实例上存放内容，
  这些内容随着实例化产生，随着componentWillUnmount销毁。
  
  但是在hook的范围下，函数组件并没有this和对应的实例，
  因此useRef作为这一能力的弥补，扮演着跨多次渲染存放内容的角色。

*/
