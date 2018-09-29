import * as $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import { Router } from "../route";
import './layouts/index';

export class App {
    constructor(props) {
        let { element, router, layout } = props;
        this.element = element;
        this.router = router;
        this.layout = layout;
    }

    preInit() {
        let routes = [{
            key: "home",
            title: "Home",
            path: "/home",
            component: "table/simpleTableView"
        }, {
            key: "about",
            title: "About",
            path: "/about",
            component: ""
        }];

        this.router.addRange(routes);
    };

    init() {
        this.preInit();

        // 初始化显示布局
        if (!!this.layout) {
            this.element.empty().classicLayout();
        }

        // router
        if (!!this.router) {
            this.router.init();
        }

        this.afterInit();
    };

    afterInit() {

    };
};