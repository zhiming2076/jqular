// import * as $ from "jquery";
// import 'jquery-ui-dist/jquery-ui';
// import _ from 'lodash';

$.widget("view.simpleTableView", {
  option: {
    $rootScope: undefined
  },
  _create: function () {
    
    this.element
      .text("simpleTableView");
  }
});