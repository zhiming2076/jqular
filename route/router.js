
import * as $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import _ from 'lodash';
import '../src/views/table/simple-table/index'

export class Route {
  constructor() {
    this.key = "";
    this.path = "";
    this.title = "";
    this.component = "";
    this.props = {};
  }
}

export class Router {

  constructor() {
    this.routeHolder = null;// route-linke
    this.viewHolder = null;// route-view
    this.routes = [];

    this.hasPushState = !!(history && history.pushState);
    this.hasHashState = !this.hasPushState && ("onhashchange" in window) && false;
  };

  add(route) {
    this.routes.push(route);
  };

  addRange(routes) {
    this.routes.push(...routes);
  };

  init() {
    // app init的时候，router-link尚未进入dom，故不能在constructor中初始化
    this.routeHolder = $("#app router-link");
    this.viewHolder = $("#app router-view");

    if (!!this.routes && this.routes.length) {
      let wapper = $("<ul>");
      this.routes.forEach((v, i) => {
        let link = $(`<li><a key='${v.key}' href='#${v.path}'>${v.title}</a></li>`)
        wapper.append(link);
      });

      $(this.routeHolder).append(wapper.children());
    }

    // register event
    this.bindEvents();
  };

  go() {
    let path = this.parseUrl(window.location.hash)
    let one = _.find(this.routes, ["path", path]);

    if (one && !!one.component) {
      let div = $("<div>");//.views.simpleTableView();
      //require('../src/views/');
      console.log(div.simpleTable());
      //this.viewHolder.append(div);
    }
  };

  bindEvents() {
    $(window).on("hashchange", this.go.bind(this));
  };

  parseUrl(url) {
    var currentUrl = url ? url : location.pathname;
    currentUrl = decodeURI(currentUrl);

    if (location.hash.indexOf("#!/") === 0) {
      currentUrl = location.hash.substring(2);
    } else if (location.hash.indexOf("#/") === 0) {
      currentUrl = location.hash.substring(1);
    }
    else {
      return '';
    }
    // and if the last character is a slash, we just remove it
    currentUrl = currentUrl.replace(/\/$/, "");

    return currentUrl;
  }
}