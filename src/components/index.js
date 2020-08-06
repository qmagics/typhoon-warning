import Vue from 'vue';

const requireComponents1 = require.context('./global', true, /\.vue/);
const requireComponents2 = require.context('./biz', true, /\.vue/);

// 遍历出每个组件的路径
requireComponents1.keys().forEach(fileName => {
    // 组件实例
    const comp = requireComponents1(fileName).default;

    // 截取路径作为组件名
    const compName = fileName.split('/')[1].split('.')[0];

    // 组件挂载
    Vue.component(comp.name || compName, comp)
})


// 遍历出每个组件的路径
requireComponents2.keys().forEach(fileName => {
    // 组件实例
    const comp = requireComponents2(fileName).default;

    // 截取路径作为组件名
    const compName = fileName.split('/')[1].split('.')[0];

    // 组件挂载
    Vue.component(comp.name || compName, comp)
})