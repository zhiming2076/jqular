
$.widget("view.simpleTableView", {
  options: {
    $rootScope: undefined,
    template: require('./index.html'),
  },
  _create: function () {
    let $wapper = $("<div>");
    let html = $.parseHTML(this.options.template);

    $wapper.append(html[0].content.children);

    $("jq-former", $wapper).formerComp();

    this.element
      .append($wapper);
  }
});