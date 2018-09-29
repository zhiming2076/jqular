import * as $ from "jquery";
window.jQuery = $;

import './plugins/bootstrap-v3.3.7/css/bootstrap.css';
import './plugins/bootstrap-v3.3.7/js/bootstrap';

import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui';

import './src/app.css';

import { App } from './src/app';
import { Router } from "./route";


let app = new App({
  element: $("#app"),
  router: new Router(),
  layout: "classicLayout"//<router-link>{{menu.name}}</router-link><router-view/>
});

//jquery $()
$(() => {

  app.init();


});