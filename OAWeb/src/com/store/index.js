/*
 * 设置全局库 权限
 * @Author: mikey.liuhai 
 * @Date: 2018-08-14 15:32:32 
 * @Last Modified by:   mikey.liuhai 
 * @Last Modified time: 2018-08-14 15:32:32 
 */
import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import logData from './logData/logData';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        logData
    }
});

export default store;
