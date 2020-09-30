/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-23 17:38:04
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-30 17:34:01
 */
'use strict';
import {  Redirect  } from "react-router-dom";

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactRouter = require('react-router');
var React = _interopDefault(require('react'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

export function renderRoutes(routes, extraProps, switchProps) {
  if (extraProps === void 0) {
    extraProps = {};
  }

  if (switchProps === void 0) {
    switchProps = {};
  }

  return routes ? React.createElement(reactRouter.Switch, switchProps, routes.map(function (route, i) {
    if(route.redirect) {
      return  <Redirect exact={route.exact} from={route.path} to={route.redirect} /> 
    }
    return React.createElement(reactRouter.Route, {
      key: route.key || i,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        return route.render ? route.render(_extends({}, props, {}, extraProps, {
          route: route
        })) : React.createElement(route.component, _extends({}, props, extraProps, {
          route: route
        }));
      }
    });
  })) : null;
}
