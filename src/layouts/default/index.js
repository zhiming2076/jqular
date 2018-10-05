import './index.css';

$.widget("layout.defaultLayout", {
  options: {
    $rootScope: undefined,
    template: require('./index.html'),
    accordion: true,
    followLink: false
  },
  _create: function () {

    //route
    let routes = [{
      key: "dashboard",
      title: "Dashboard",
      path: "/",
      component: "simpleTableView"
    }, {
      key: "domain",
      title: "Domain",
      path: "/domain",
      component: "complexTableView"
    }, {
      key: "document",
      title: "Document",
      path: "/document",
      component: "masterTableView"
    }, {
      key: "auth",
      title: "Auth",
      path: "/auth",
      component: "gridView"
    }];
    this.options.$rootScope.$router.addRange(routes);

    this.element
      .append(this.options.template);

    this._setUpListeners();
  },
  expand: function (tree, parent) {
    var expandedEvent = $.Event('expanded.sidebar');

    if (this.options.accordion) {
      var openMenuLi = parent.siblings('.menu-open, .active');
      var openTree = openMenuLi.children('.treeview-menu');
      this.collapse(openTree, openMenuLi);
    }

    parent.addClass('menu-open');
    tree.slideDown(500, function () {
      $(this.element).trigger(expandedEvent);
    }.bind(this));
  },
  collapse: function (tree, parentLi) {
    var collapsedEvent = $.Event('collapsed.sidebar');
    parentLi.removeClass('menu-open');
    tree.slideUp(500, function () {
      $(this.element).trigger(collapsedEvent);
    }.bind(this));
  },
  toggle: function (link, event) {
    var treeviewMenu = link.next('.treeview-menu');
    var parentLi = link.parent();
    var isOpen = parentLi.hasClass('menu-open');

    if (!parentLi.is('.treeview')) {
      return;
    }

    //只有一层
    if (!treeviewMenu.length) {
      return;
    }

    if (!this.options.followLink || link.attr('href') === '#') {
      event.preventDefault();
    }

    if (isOpen) {
      this.collapse(treeviewMenu, parentLi);
    } else {
      this.expand(treeviewMenu, parentLi);
    }
  },
  _setUpListeners: function () {
    var that = this;

    $(this.element).on('click', '.treeview a', function (event) {
      that.toggle($(this), event);
    });
  }
});