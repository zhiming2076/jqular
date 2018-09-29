import * as $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import _ from 'lodash';

//var template = require('index.html');
$.widget("layout.defaultLayout", {
  _create: function () {
    var progress = this.options.value + "%";
    this.element
      .addClass("progressbar")
      .text(progress);
  }
});