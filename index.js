/*
* jqular entery point
*/

import * as $ from "jquery";
import * as _ from "lodash";

import './plugins/bootstrap-v3.3.7/css/bootstrap.css';
import './plugins/bootstrap-v3.3.7/js/bootstrap';

import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui';

import './node_modules/font-awesome/css/font-awesome.min.css';
import './node_modules/ionicons/dist/css/ionicons.min.css';

import './src/app.css';

import { App } from './src/app';

let app = new App({
  element: $("#app"),
  layout: "defaultLayout"
});

//jquery $()
$(() => {

  app.init();


});