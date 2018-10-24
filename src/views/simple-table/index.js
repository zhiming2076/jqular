import '../../../plugins/DataTables-1.10.18/css/jquery.dataTables.css';
import '../../../plugins/DataTables-1.10.18/js/jquery.dataTables';

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
      .append($wapper.children());

    $('#table_id', this.element).DataTable();
  }
});