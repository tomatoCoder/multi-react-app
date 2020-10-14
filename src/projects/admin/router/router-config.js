/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-23 17:38:04
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-14 17:24:57
 */

import {  Redirect  } from "react-router-dom";

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactRouter = require('react-router');
var React = _interopDefault(require('react'));

function matchRoutes(routes, pathname,
  /*not public API*/
  branch) {
    if (branch === void 0) {
      branch = [];
    }
  
    routes.some(function (route) {
      var match = route.path ? reactRouter.matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
      : reactRouter.Router.computeRootMatch(pathname); // use default "root" match
  
      if (match) {
        branch.push({
          route: route,
          match: match
        });
  
        if (route.routes) {
          matchRoutes(route.routes, pathname, branch);
        }
      }
  
      return match;
    });
    return branch;
  }

function _extends() {
 var _extends = Object.assign || function (target) {
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

 function renderRoutes(routes, extraProps, switchProps) {
  if (extraProps === void 0) {
    extraProps = {};
  }

  if (switchProps === void 0) {
    switchProps = {};
  }

  return routes ? React.createElement(reactRouter.Switch, switchProps, routes.map(function (route, i) {
    if(route.redirect) {
      return  <Redirect exact={route.exact} from={route.path} to={route.redirect} key={route.key || i}/> 
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
          route: route,
          name: route.breadcrumbName
        }));
      }
    });
  })) : null;
}

export  {renderRoutes, matchRoutes}