/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 11:08:40
 */
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from '@/serviceWorker';
import configureStore from "./store";
import Home from  './pages/Home';
const store = configureStore();

class Admin extends Component {
  render() {
      return (
            <Provider store={store}>
            <Router>
                  <Switch>
                     <Route exact path="/" component={Home} />
                      <Route path="/client/" component={Home} />
                  </Switch>
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
