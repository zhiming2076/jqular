/*
* jqular route
*/

export class Route {
  constructor() {
    // init
    this.key = "";
    this.path = "";
    this.title = "";
    this.component = "";
    this.props = {};
  }
}

export class Router {
  constructor({ $rootScope }) {
    // options
    this.$rootScope = $rootScope;
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
    // router-view
    this.viewHolder = $("#app router-view");
    if (!this.viewHolder || !this.viewHolder.length) {
      console.error("模板中没有找到<router-view />标记.");
      return;
    }

    // route-link
    this.routeHolder = $("#app [router-link]");
    if (!this.routeHolder || !this.routeHolder.length) {
      console.error("模板中没有找到[router-link]标记.");
      return;
    }

    // register event
    this.bindEvents();

    // first go
    this.go(window.location.hash);
  };

  go(path) {
    path = !path ? window.location.hash : path;
    path = this.parseUrl(window.location.hash)

    let one = _.find(this.routes, ["path", path]);

    if (one && !!one.component) {
      let div = $("<div>");
      this.viewHolder
        .empty()
        .append(div[one.component]({
          $rootScope: this.$rootScope
        }));

      //active by key
      $("[router-item].active", this.routeHolder).removeClass("active");
      $(`[router-item][key='${one.key}']`, this.routeHolder).addClass("active");
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
    } else if (location.hash.indexOf("#") === 0) {
      currentUrl = location.hash.substring(1);
    }
    else {
      return '/';
    }
    // and if the last character is a slash, we just remove it
    currentUrl = currentUrl.replace(/\/$/, "");

    return "/" + currentUrl;
  }
}