/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 18:04:49
 */
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from '@/serviceWorker';
import configureStore from "./store";
import Home from  './pages/Home/index';
import Order from  './pages/Order/index';
import OrderDetail from  './pages/OrderDetail/index';

const store = configureStore();
class Admin extends Component {
  render() {
      return (
          <Provider store={store}>
              <Router>
                     {/* <Redirect to={"/admin"} /> */}
                     <Redirect path="/" to="/admin" exact />
                    <Route exact path='/admin' component={Home}/>
					{/* <Route exact path='/'  component={Home}/> */}
					<Route exact path='/admin/order' component={Order}/>
                    <Route path='/admin/order/order-detail' component={OrderDetail}/>
              </Router>
          </Provider>
      );
  }
}

ReactDOM.render(<Admin />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
