// import * as $ from "jquery";
// import '../../../plugins/bootstrap-v3.3.7/js/bootstrap';
// import 'jquery-ui-dist/jquery-ui';
// import _ from 'lodash';

$.widget("layout.classicLayout", {
  options: {
    template: require('./index.html')
  },
  _create: function () {
    this.element
      .append(this.options.template);
  }
});