import React, { useState, useRef, useReducer } from 'react';

/**

  在需要大量state的时候

  如果按照标准的每一个状态对应一个useState的做法，自然是逻辑上正确的，但它容易造成状态粒度过细的问题。

  如下，是项目中真实产生的代码

  不否认class时代状态的集中管理是过于粗放的，但那个时代的状态更新粒度基本是没有问题.
  所以在使用hook的时候千万不要太过暴力的拆分状态。
  过于细粒度的拆分状态会导致代码阅读者难以理解状态间的关系，
  无形提升代码维护的难度。

 */
function ReceiveMask(props) {
  const [configs, setConfigs] = useState({ recProcess: [], address: [] }); // 页面配置项，包括领取流程的文案、城市列表数据
  const [showAllProcess, setShowAllProcess] = useState(false); // 是否展示全部的领取流程
  const [sendSmsTime, setSendSmsTime] = useState(0); // 发短信倒计时
  const [needCaptcha, setNeedCaptcha] = useState(false); // 是否需要显示图形验证码
  const [captchaImg, setCaptchaImg] = useState(''); // 图形验证码的图片的链接
  const [modalType, setModalType] = useState(); // 弹什么框: err(领取失败),ok(领取成功),refuse(已经领过了),mobile(输入手机号)
  const [errMsg, setErrMsg] = useState(); // 领取失败，错误原因
  const [currentCity, setCurrentCity] = useState({ cityName: '', cityCode: '', stores: [] }); // 当前用户选中的城市

  const cityName = decodeURIComponent(props.match.params.cityName); // 前置页面带过来的城市名称
  const userMobile = useRef(''); // 用户手机号
  const captchaKey = useRef(); // 图形验证码的key
  let mobileRef; // 手机号的ref
  let captchaRef; // 图形验证码的ref
  let smsCodeRef; // 短信验证码的ref

  return null;
}

/**

  方案一：使用reducer管理状态更新

  通过useReducer我们传递一个函数，
  这个函数清晰地表达了'select'这个类型的操作，以及对应的状态更新。
  useReducer的第二个参数也很好地说明了状态的结构。

 */
function SelectableList() {
  const [selectionState, dispatchSelectionState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'select':
          return {
            selection: state.selection.concat(action.payload),
            lastSelected: action.payload,
          };
        default:
          return state;
      }
    },
    {selection: [], lastSelected: 0}
  );

  return null;
}

/**

  方案二：封装一个setState方法

  接近于原来的class的state的使用方式。

  这是在state数量可控的情况下，
  当在组件过分复杂的时候，建议拆分力度不要太粗旷，需要自己来评估
  代码过分精简并不好

 */
function Navigation(props) {
  const initState = {
    mapIsOk: false, // 地图是否初始化完成
    lineIsLoading: true, // 路线是否正在加载
    trafficType: 'drive', // 当前选中的交通类型
    trafficInfo: { // 各个交通类型的数据，距离和时间
      drive: { length: '', duration: '' },
      bus: { length: '', duration: '' },
      ride: { length: '', duration: '' },
      walk: { length: '', duration: '' },
    }
  };

  const [state, updateState] = useState(initState);

  function setState(newState) {
    updateState((oldState) => ({ ...oldState, ...newState }));
  }

  return null;
}
