import * as $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import _ from 'lodash';

$.widget("view.simpleTableView", {
  _create: function () {
    var progress = this.options.value + "%";
    this.element
      .addClass("progressbar")
      .text(progress);
  }
});