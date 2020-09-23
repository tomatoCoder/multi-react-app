


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-23 16:50:03
 */
import React, { Suspense, lazy }from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import configureStore from "../store";
const store = configureStore();

const loadRouter = (name: string) => {
    return lazy(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}

const Login = loadRouter('Login');
const Home = loadRouter('Home');
const Order = loadRouter('Order');
const OrderDetail = loadRouter('OrderDetail');
const Notfound = loadRouter('Notfound');
const MainLayout = loadRouter('MainLayout');


export const RouterView =
  <Suspense fallback={<div>loading...</div>}>
    <Provider store={store}>
        <Router>
        <Switch>
            <Route exact path="/"  render={() =>
                <MainLayout>
                    {/* <Route  path='/admin' component={Home}/>
                    <Route  path='/order/:id' component={Order}/>
                    <Route path='/admin/order/order-detail' component={OrderDetail}/>  */}
                </MainLayout>
            }/>
                {/* <Route  path='/admin' component={Home}/> */}
                {/* <Route  path='/admin/order/:id' component={Order}/>
                <Route path='/admin/order/order-detail' component={OrderDetail}/>  */}
            <Route exact path='/admin' component={MainLayout}/>
            <Route path='/login' component={Login}/>
            <Route path="*" component={Notfound} />
        </Switch>
        </Router>
    </Provider>
  </Suspense>

