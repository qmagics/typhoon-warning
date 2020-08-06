import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modals';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        HtmlFontSize: 100,
        Map3d_Max: false
    },
    mutations: {
        set_HtmlFontSize(state, val) {
            state.HtmlFontSize = val;
        },
        set_Map3d_Max(state, val) {
            state.Map3d_Max = val;
        }
    },
    actions: {
    },
    modules: {
        modal
    }
})
