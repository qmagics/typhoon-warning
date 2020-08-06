Date.prototype.format = function (fmt = 'yyyy-MM-dd') {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

String.prototype.toAlpha = function (n) {
    return `${this.substring(0, this.length - 1)},${n})`
}

import '@/style/reset.scss'
import '@/style/index.scss'
import '@/plugins/element-ui'
import '@/plugins/modal'
import '@/components'
import Vue from 'vue'
import store from './store'
import App from './App.vue'

// import '@/mocks';

Vue.config.productionTip = false

Vue.filter('time', (val, format) => {
    return new Date(val).format(format);
})

const app = new Vue({
    store,

    //router,

    render: h => h(App),

    created() {
        const app = this;

        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
                    app.$store.commit('set_HtmlFontSize', Number(100 * (clientWidth / 1920)));
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    },

    methods: {

        //查看锚点
        viewAnchor(id) {
            this.$modal({
                id: 'Bg1',
                data: {
                    id
                },
                component: 'Biz_M_01'
            })
        },

        //查看船
        viewShip(id) {
            this.$modal({
                id: 'Bg2',
                data: {
                    id
                },
                component: 'Biz_M_02'
            })
        },

        //查看监控
        viewMonitor(id) {
            this.$modal({
                id: 'Bg3',
                data: {
                    id
                },
                component: 'Biz_M_03'
            })
        },

        //查看详情
        view(type, id) {
            switch (type) {
                case 1:
                    this.viewAnchor(id);
                    break;

                case 2:
                    this.viewShip(id);
                    break;

                case 3:
                    this.viewMonitor(id);
                    break;

                default:
                    break;
            }
        }

    }

}).$mount('#app')

window.app = app;
