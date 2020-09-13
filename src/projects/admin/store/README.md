# redux 的使用
1.定义规则 
```javascript
function counter(state = 0, action: any) {
    switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
    }
}
```

2.创建 Redux store 来存放应用的状态。
```javascript
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);
```

3.可以手动订阅更新，也可以事件绑定到视图层。
```javascript
store.subscribe(() =>
  console.log(store.getState())
);
```

4.改变内部 state 惟一方法是 dispatch 一个 action。
```javascript
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
```