import * as $ from "jquery";

import { App } from './src/app';
import { Router } from "./route/router";


let app = new App({
  element: $("#app"),
  router: new Router(),
  layout: "<router-link>{{menu.name}}</router-link><router-view/>"
});

//jquery $()
$(() => {

  app.init();


});