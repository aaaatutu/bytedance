import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

//1.类组件和生命周期
class ComponentClass extends React.Component{//组件名首字母一定要大写！！！
  constructor(props){
    super(props);
    this.state={value:0};//设置state
  }
  //挂载生命周期函数
  componentDidMount(){
    console.log("挂载");
  }
  //更新生命周期函数
  componentDidUpdate(){
    console.log("更新");
    
  }
  //卸载生命周期函数
  componentWillUnmount(){
    console.log("卸载");
    
  }
  render(){// 渲染函数
      return(
        <div>
          <p>value为:{this.state.value}</p>
          {/**通过value值是否为偶数进行子组件的加载和挂载生命周期函数的使用 */}
          {this.state.value%2?<SubComponent />:""}
          {/**更改state的value值 */}
          <button onClick={()=>{this.setState({value:this.state.value+1})}}>点击+1</button>
        </div>
      )
      }
}
class SubComponent extends React.Component{
  componentDidMount(){
    console.log("子组件挂载");
  }
  //更新生命周期函数
  componentDidUpdate(){
    console.log("子组件更新");
  }
  //卸载生命周期函数
  componentWillUnmount(){
    console.log("子组件卸载"); 
  }
  render(){
    return(
      <div>
        <p>子组件</p>
      </div>
    )
  }
}
// ReactDOM.render(<ComponentClass />,document.getElementById("root"));
//2.函数组件和hook
function HookCom(){
  const [value,setValue]=useState(0);//等同于类组件中的this.state={value:0}

  {/**useEffect实现了componentDidMount,componetDidUpdate,componentDidUnmount三个生命周期周期函数 */}
  useEffect(()=>{
    console.log("useEffect");
  })
  return(
    <div>
      {/**hook中可以直接获取值，类组件中通过this.state.value获取 */}
    <p>value为:{value}</p>
    {value%2?<SubComHook />:""}
    {/**通过useState声明的setValue改变value值 */}
    <button onClick={()=>{setValue(value+1)}}>点击+1</button>
  </div>
  )
}
function SubComHook(){
  useEffect(()=>{
    console.log("subhook");
    //hook中componentDidUnmount函数可以放在返回值中，在卸载时执行！！！
    return ()=>{
      console.log("sunhook unMount");
    }
  });
  return(
    <div>
      <p>子组件</p>
    </div>
  )
}
ReactDOM.render(<HookCom />,document.getElementById("root"));
serviceWorker.unregister();
