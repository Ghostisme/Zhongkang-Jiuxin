import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Loading
} from 'vux'
import axios from 'axios'
import qs from 'qs';
import routers from '../router';
import { dateFormat } from "vux";

Vue.use(VueRouter);
Vue.use(Loading);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};
const router = new VueRouter(RouterConfig);

let util = {};
util.title = function (title) {
  title = title ? title + ' - OA系统' : '办公自动系统';
  window.document.title = title;
};

const ajaxUrl = 'http://localhost:3000/';
//const ajaxUrl = 'http://alh.mwckj.com/nis-service';
//const ajaxUrl = 'http://47.94.91.124/nis-service';

//const ajaxUrl = 'http://192.168.1.116:8080/nis';

/**
 * 获取当前模块的id
 *
 * @returns 当前模块的id
 */
util.moduleId = function () {
  let id = localStorage.getItem('moduleId');
  return id;
};

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
  },
  withCredentials: true,
});


/**
 * 处理当前模块的按钮权限
 *
 * @param {object} vm 当前vue实例 this
 * @returns 当前模块的按钮权限对象
 */
util.updataFunction = function (vm) {
  let now = vm.$route.path;
  let firName = now.split('/')[1];
  let secName = now.split('/')[2];
  if (firName == 'task') {
    firName = 'task';
    secName = 'task';
  }
  let menuList = vm.$store.state.app.menuList;console.log(menuList)
  let func = {};
  for (const i of menuList) {
    for (const s of i.children) {
      if ((s.path == secName) && (i.name == firName)) {
        func = s.function;
      }
    }
  }
  return func;
};

/**
 * ajax查询方法
 *
 * @param {string} url 请求路径
 * @param {number} code 请求方法code
 * @returns 结果函数
 */
util.get = function (url, code) {
  // Loading.show({text: 'Loading'});
  code = code ? code : 4;
  return util.ajax({
      url,
      method: 'get',
      headers: {
        'moduleId': localStorage.getItem('moduleId'),
        'functionId': code
      }
    })
    .then(response => {
      let msg = msg || '获取信息成功！';
      let sessionExpired = response.data.map ? response.data.map.sessionExpired ? response.data.map.sessionExpired : false : false;
      if (sessionExpired) {
        msg = '登录超时'
        setTimeout(() => {
          localStorage.setItem('login', 0)
          router.replace({
            path: 'login'
          });
          router.go(0);
        }, 1000);
      }
      // Loading.hide();
      return response;
    })
    .catch(error => {
      let msg = msg || '获取信息失败！';
      // Loading.hide();
      return error;
    });
};

/**
 * ajax保存方法
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数
 * @param {number} code 请求方法code
 * @returns 结果函数
 */
util.post = function (url, data, code) {
  code = code ? code : 1;
  return util.ajax({
      url,
      method: 'post',
      headers: {
        'moduleId': localStorage.getItem('moduleId'),
        'functionId': code
      },
      data: qs.stringify(data, {
        arrayFormat: 'repeat'
      })
    })
    .then(response => {
      let msg = response.data.msg ? response.data.msg : '保存信息失败！';
      if (response.data.success) {
        let sessionExpired = response.data.map ? response.data.map.sessionExpired ? response.data.map.sessionExpired : false : false;
        if (sessionExpired) {
          msg = '登录超时'
          // Message.error(msg);
          setTimeout(() => {
            localStorage.setItem('login', 0)
            router.replace({
              path: 'login'
            });
          }, 1000);
        } else {
          // Message.success(msg);
        }
      } else {
        // Message.error(msg);
      }
      return response;
    })
    .catch(error => {
      // Message.error('保存信息失败！');
      return error;
    });
};

/**
 * ajax修改方法
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数
 * @param {number} code 请求方法code
 * @returns 结果函数
 */
util.put = function (url, data, code) {
  code = code ? code : 3;
  return util.ajax({
      url,
      method: 'put',
      headers: {
        'moduleId': localStorage.getItem('moduleId'),
        'functionId': code
      },
      data: qs.stringify(data, {
        arrayFormat: 'repeat'
      })
    })
    .then(response => {
      let msg = response.data.msg ? response.data.msg : '修改信息失败！';
      if (response.data.success) {
        let sessionExpired = response.data.map ? response.data.map.sessionExpired ? response.data.map.sessionExpired : false : false;
        if (sessionExpired) {
          Cookies.remove('user');
          Cookies.remove('password');
          Cookies.remove('access');
          msg = '登录超时'
          // Message.error(msg);
          setTimeout(() => {
            router.replace({
              name: 'login'
            });
            router.go(0);
          }, 1000);
        } else {
          // Message.success(msg);
        }
      } else {
        // Message.error(msg);
      }
      return response;
    })
    .catch(error => {
      // Message.error('修改信息失败！');
      return error;
    });
};

/**
 * ajax删除方法
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数
 * @param {number} code 请求方法code
 * @returns 结果函数
 */
util.delete = function (url, data, code) {
  code = code ? code : 2;
  return util.ajax({
      url,
      method: 'delete',
      headers: {
        'moduleId': localStorage.getItem('moduleId'),
        'functionId': code
      },
      data: qs.stringify(data, {
        arrayFormat: 'repeat'
      })
    })
    .then(response => {
      let msg = response.data.msg ? response.data.msg : '删除信息失败！';
      if (response.data.success) {
        let sessionExpired = response.data.map ? response.data.map.sessionExpired ? response.data.map.sessionExpired : false : false;
        if (sessionExpired) {
          Cookies.remove('user');
          Cookies.remove('password');
          Cookies.remove('access');
          msg = '登录超时'
          // Message.error(msg);
          setTimeout(() => {
            router.replace({
              path: 'login'
            });
            router.go(0);
          }, 1000);
        } else {
          // Message.success(msg);
        }
      } else {
        // Message.error(msg);
      }
      return response;
    })
    .catch(error => {
      // Message.error('删除信息失败！');
      return error;
    });
};

//key value转化
util.keyValueCv = function (key, value, arr) {
  let array = [];

  if (arr.length != 0) {
    arr.forEach(function (item) {
      function obj(newkey, newvaule) {
        this.key = newkey;
        this.value = newvaule;
      }
      array.push(new obj(item[key], item[value]));
    });
  }

  return array;
}

//转换男女
util.isGender = function (gender) {
  if (gender == 1) {
    return '男';
  } else {
    return '女';
  }
}
//标题合并--护理任务
util.totitle = function (item) {
  let title = "";
  if (item.executionTime) {
    let time = dateFormat(new Date(item.executionTime), "HH:mm:ss")
    title += "  (" + time;
    title += ")  " + item.employeeName;
  }

  return title;
}
//标题合并--监测任务
util.monitortitle = function (item) {
  let title = "";
  if (item.recordTime) {
    let time = dateFormat(new Date(item.recordTime), "HH:mm:ss")
    title += "  (" + time;
    title += ")  " + item.employeeName;
  }

  return title;
}
util.medicinetitle = function (item) {
  let title = "";
  if (item.actualUseTime) {
    let time = dateFormat(new Date(item.actualUseTime), "HH:mm:ss")
    title += "  (" + time;
    title += ")  " + item.employeeName;
  }

  return title;
}
//标题合并--给药任务
//标题合并
util.medicnestitle = function (item) {
  let title = item.medicinesName;
  if (item.actualUseTime) {
    let time = new Date(item.useDate);
    title += "  " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds();
    title += "  " + item.employeeName;
  }else if(item.useDate){
    let time = new Date(item.useDate);
    title += "  " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds();
    title += "  " + item.employeeName;
  }

  return title;
}

//获取时间段
util.getPeriod = function (periods, index) {
  for (let i = 0; i < periods.length; i++) {
    let period = periods[i]
    if (period.periodId == index) {
      return period.periodName;
    }
  }
}
// 关闭方法
util.close = function (dom) {
  let oDom = document.querySelector(dom);
  oDom.style.display = "none";
}
export default util;
