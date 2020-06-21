/*
 * 公共库 路由链接 权限
 * @Author: mikey.liuhai 
 * @Date: 2018-08-14 15:32:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-15 17:19:06
 */
import Vue from 'vue';

const app = {
    state: {
        menuList: [],
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'index'
            }
        ],
        currentPageName: '',
        menuListAll:[],
        powerList:[] //权限列表
    },
    mutations: {
        updateMenulistFirst(state){
            let firstList = firstRouter;
            let powerList = JSON.parse(localStorage.getItem('powerList'));
            // console.log(powerList);
            let powerListFirst = powerList.first;
            let returnFirstList = [];
            for (const i of firstList) {
                for (const s of powerListFirst) {
                    if (i.name == s.name) {
                        i.access = 1;
                    }
                }
            }
            for (const i of firstList) {
                if (i.access == 1) {
                    returnFirstList.push(i);
                }
            }
            state.menuListFirst = returnFirstList;
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        updateMenulist (state,vm) {
            if (vm == undefined) {
                return
            }
            let now = vm.$route.path;
            let nowName = now.split('/')[1];
            if (nowName =='' || nowName == 'index') {
                return
            }
            let list;
            for (let i of state.menuListAll) {
                if (i.name == nowName) {
                    list = i.data;
                }
            }
            //根路径下一级数据
            list = list;
            let powerList = JSON.parse(localStorage.getItem('powerList'));
            let second = powerList.second;
            let returnList = [];
            for (const i of list) {//循环二级
                for (const s of second) {
                    if (i.name == s.name || i.name.indexOf("task") != -1) {
                        i.access = 1;
                        for (const i_child of i.children) {//循环三级
                            for (const s_child of s.children) {
                                if (i_child.path == s_child.name) {
                                    i_child.access = 1;
                                    i_child.function = s_child.function;
                                    i_child.moduleId = s_child.id;
                                }
                            }
                        }
                    }
                }
            }
            for (const i of list) {
                if (i.access == 1) {
                    let child = [];
                    for (const s of i.children) {
                        if (s.access == 1) {
                            child.push(s);
                        }else{
                            s.access = 0;
                            child.push(s);
                        }
                    }
                    i.children = child;
                    returnList.push(i);
                }
            }
            state.menuList = returnList;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setPower (state, data) {
            state.powerList = data;
        }
    },
    actions:{
        setPower (context,list) {
            context.commit('setPower', list);
        },
        updataPower (context) {
            context.commit('updateMenulistFirst');
            // context.commit('updateMenulist',list);
        }
    }
};

export default app;
