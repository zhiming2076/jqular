/*
* jqular app script
*/

import { Router } from "../route/index";
import './layouts/index';
import './views/index';

export class App {
    constructor(options) {
        let { element, layout } = options;
        this.element = element;
        this.layout = layout;

        this.$scope = this;
        this.$router = new Router({ $rootScope: this.$scope });
    }

    preInit() {

    };

    init() {
        this.preInit();

        // 初始化显示布局
        if (!!this.layout) {
            if (this.element[this.layout]) {
                this.element.empty()[this.layout]({
                    $rootScope: this.$scope
                });
            } else {
                console.error(`layout '${this.layout}'未定义。`);
            }
        }

        // initial route: 必须在layout加载之后，通常路由tag都在layout中设置
        this.$router.init();

        this.afterInit();
    };

    afterInit() {

    };
};