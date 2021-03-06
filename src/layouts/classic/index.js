import './index.css';

$.widget("layout.classicLayout", {
  options: {
    $rootScope: undefined,
    template: require('./index.html')
  },
  _create: function () {

    //route
    let routes = [{
      key: "home",
      title: "Home",
      path: "/",
      component: "simpleTableView"
    }, {
      key: "about",
      title: "About",
      path: "/about",
      component: "complexTableView"
    }, {
      key: "about",
      title: "About",
      path: "/about",
      component: "masterTableView"
    }, {
      key: "contact",
      title: "Contact",
      path: "/contact",
      component: "gridView"
    }];
    this.options.$rootScope.$router.addRange(routes);

    this.element
      .append(this.options.template);
  }
});