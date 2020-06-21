import Vue from 'vue'
import VueRouter from 'vue-router'
import { ToastPlugin } from 'vux'
import axios from 'axios'
import qs from 'qs';
import routers from '../router';
import { dateFormat } from "vux";
//storejs
import storejs from 'storejs'

Vue.use(VueRouter);
Vue.use(ToastPlugin)

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};
const router = new VueRouter(RouterConfig);

let util = {};
util.title = function(title) {
  title = title ? title + ' - OA系统' : '办公自动系统';
  window.document.title = title;
};
//yu
//const ajaxUrl = 'http://192.31.10.62:8002/';
//const ajaxUrl = 'http://localhost:8002/';
// const ajaxUrl = 'http://192.31.10.47:8002/';
// const ajaxUrl = 'http://192.31.10.197:8002/';
const ajaxUrl = 'http://mobile-api.zk9h.com/';
// const ajaxUrl = 'https://www.jhydls.cn/drugapi/';
//const ajaxUrl = 'http://192.31.10.58:8002/';
//const ajaxUrl = 'http://192.31.10.29:8002/';
//const ajaxUrl = 'http://localhost:3000/sys/user/';
//const ajaxUrl = 'http://alh.mwckj.com/nis-service';
//const ajaxUrl = 'http://47.94.91.124/nis-service';

//const ajaxUrl = 'http://192.31.10.166:8002/';
// const ajaxUrl = 'http://192.31.10.47:8002/';

//const ajaxUrl = 'http://60.29.103.178:8002/';

/**
 * 获取当前模块的id
 *
 * @returns 当前模块的id
 */
util.moduleId = function() {
  let id = storejs.get('moduleId');
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
util.updataFunction = function(vm) {
  let now = vm.$route.path;
  let firName = now.split('/')[1];
  let secName = now.split('/')[2];
  if (firName == 'task') {
    firName = 'task';
    secName = 'task';
  }
  let menuList = vm.$store.state.app.menuList;
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
util.get = function(url, code) {
  //读取数据Loading
  Vue.$vux.loading.show({
    text: '读取中...'
  })
  code = code ? code : 4;
  return util.ajax({
    url,
    method: 'get',
    headers: {
      // 'moduleId': storejs.get('moduleId'),
      // "Authorization": storejs.get('Authorization'),
      // 'functionId': code
      "Authorization": JSON.parse(storejs.get('loginUserInfo')).token,
    }
  })
    .then(response => {
      //读取完毕
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;

      let msg = msg || '获取信息成功！';
      let sessionExpired = response.data.success ? response.data.success : false;
      console.log("hiahia",sessionExpired);
      console.log("hahaha",response.data.msg);
      // if (!sessionExpired || "登出成功！" == response.data.msg) {
      //     Vue.$vux.toast.show({
      //         text: msg
      //     })
      //     msg = '登录超时'
      //     setTimeout(() => {
      //         storejs.set('login', 0)
      //         router.replace({
      //             path: 'login'
      //         });
      //         router.go(0);
      //     }, 1000);
      // }
      return response;
    })
    .catch(error => {
      let msg = msg || '获取信息失败！';
      Vue.$vux.toast.text("服务器错误", "middle");
      Vue.$vux.loading.hide();
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
util.login = function(url, data, code) {
  //读取数据Loading
  Vue.$vux.loading.show({
    text: '读取中...'
  })
  code = code ? code : 1;
  return util.ajax({
    url,
    method: 'post',
    // headers: {
    //   'moduleId': storejs.get('moduleId'),
    //   'functionId': code
    // },
    data: qs.stringify(data, {
      arrayFormat: 'repeat'
    })
  })
    .then(response => {
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;

      let msg = response.data.msg ? response.data.msg : '保存信息失败！';
      if (!response.data.success) {
        let sessionExpired = response.data.success ? response.data.success : false;
        if (!sessionExpired) {
          Vue.$vux.toast.show({
            text: msg
          })
          msg = '登录超时'
          //Message.error(msg);
          setTimeout(() => {
            storejs.set('login', 0)
            router.replace({
              path: 'login'
            });
          }, 1000);
        } else {
          // Message.success(msg);
        }
      } else {
        //Message.error(msg);
      }
      return response;
    })
    .catch(error => {
      Vue.$vux.toast.text("服务器错误", "middle");
      Vue.$vux.loading.hide();
      return error;
    });
};
/**
 * ajax读取list方法
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数
 * @param {number} code 请求方法code
 * @returns 结果函数
 */
util.getList = function(url, data, code) {
  //读取数据Loading
  // Vue.$vux.loading.show({
  //   text: JSON.parse(storejs.get('loginUserInfo')).token
  // })
  code = code ? code : 1;
  return util.ajax({
    url,
    method: 'post',
    async:true,
    headers: {
      // 'moduleId': storejs.get('moduleId'),
      // 'functionId': code,
      "Authorization": JSON.parse(storejs.get('loginUserInfo')).token,
    },
    data: qs.stringify(data, {
      arrayFormat: 'repeat'
    })
  })
    .then(response => {
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;

      let msg = response.data.msg ? response.data.msg : '列表信息读取失败！';
      // if (!response.data.success) {
      //   let sessionExpired = response.data.success ? response.data.success : false;
      //   if (!sessionExpired) {
      //     Vue.$vux.toast.show({
      //       text: msg
      //     })
      //     msg = '登录超时'
      //     //Message.error(msg);
      //     setTimeout(() => {
      //       storejs.set('login', 0)
      //       router.replace({
      //         path: 'login'
      //       });
      //     }, 1000);
      //   } else {
      //     // Message.success(msg);
      //   }
      // } else {
      //   //Message.error(msg);
      // }
      return response;
    })
    .catch(error => {
      Vue.$vux.toast.text("服务器错误", "middle");
      Vue.$vux.loading.hide();
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
util.post = function(url, data, code) {
  //读取数据Loading
  Vue.$vux.loading.show({
    text: '读取中...'
  })
  code = code ? code : 1;
  return util.ajax({
    url,
    method: 'post',
    headers: {
      // 'moduleId': storejs.get('moduleId'),
      // "Authorization": storejs.get('Authorization'),
      // 'functionId': code
      "Authorization": JSON.parse(storejs.get('loginUserInfo')).token,
    },
    data: qs.stringify(data, {
      arrayFormat: 'repeat'
    })
  })
    .then(response => {
      //读取完毕
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;

      let msg = response.data.msg ? response.data.msg : '保存成功！';
      // if (!response.data.success) {
      //   let sessionExpired = response.data.success ? response.data.success : false;
      //   if (!sessionExpired) {
      //     Vue.$vux.toast.show({
      //       text: msg
      //     })
      //     msg = '登录超时'
      //     //Message.error(msg);
      //     setTimeout(() => {
      //       storejs.set('login', 0)
      //       router.replace({
      //         path: 'login'
      //       });
      //     }, 1000);
      //   } else {
      //     // Message.success(msg);
      //   }
      // } else {
      //   //Message.error(msg);
      // }
      return response;
    })
    .catch(error => {
      Vue.$vux.toast.text("服务器错误", "middle");
      Vue.$vux.loading.hide();
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
util.put = function(url, data, code) {
  //读取数据Loading
  Vue.$vux.loading.show({
    text: '读取中...'
  })
  code = code ? code : 3;
  return util.ajax({
    url,
    method: 'put',
    headers: {
      // 'moduleId': storejs.get('moduleId'),
      // "token": storejs.get('token'),
      // 'functionId': code
      "Authorization": JSON.parse(storejs.get('loginUserInfo')).token,
    },
    data: qs.stringify(data, {
      arrayFormat: 'repeat'
    })
  })
    .then(response => {
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;

      let msg = response.data.msg ? response.data.msg : '修改信息失败！';
      if (response.data.success) {
        let sessionExpired = response.data.map ? response.data.map.sessionExpired ? response.data.map.sessionExpired : false : false;
        if (sessionExpired) {
          Vue.$vux.toast.show({
            text: msg
          })
          Cookies.remove('user');
          Cookies.remove('password');
          Cookies.remove('access');
          msg = '登录超时'
          //Message.error(msg);
          setTimeout(() => {
            router.replace({
              name: 'login'
            });
            router.go(0);
          }, 1000);
        } else {
          //Message.success(msg);
        }
      } else {
        //Message.error(msg);
      }
      return response;
    })
    .catch(error => {
      //Message.error('修改信息失败！');
      Vue.$vux.toast.text("服务器错误", "middle");
      Vue.$vux.loading.hide();
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
util.delete = function(url, data, code) {
  //读取数据Loading
  Vue.$vux.loading.show({
    text: '读取中...'
  })
  code = code ? code : 2;
  return util.ajax({
    url,
    method: 'delete',
    headers: {
      // 'moduleId': storejs.get('moduleId'),
      // 'functionId': code
      "Authorization": JSON.parse(storejs.get('loginUserInfo')).token,
    },
    data: qs.stringify(data, {
      arrayFormat: 'repeat'
    })
  })
    .then(response => {
      //读取完毕
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;

      let msg = response.data.msg ? response.data.msg : '删除信息失败！';
      if (response.data.success) {
        let sessionExpired = response.data.map ? response.data.map.sessionExpired ? response.data.map.sessionExpired : false : false;
        if (sessionExpired) {
          Vue.$vux.toast.show({
            text: msg
          })
          Cookies.remove('user');
          Cookies.remove('password');
          Cookies.remove('access');
          msg = '登录超时'
          //Message.error(msg);
          setTimeout(() => {
            router.replace({
              path: 'login'
            });
            router.go(0);
          }, 1000);
        } else {
          //Message.success(msg);
        }
      } else {
        //Message.error(msg);
      }
      return response;
    })
    .catch(error => {
      //Message.error('删除信息失败！');
      Vue.$vux.toast.text("服务器错误", "middle");
      Vue.$vux.loading.hide();
      return error;
    });
};

//key value转化
util.keyValueCv = function(key, value, arr) {
  let array = [];

  if (arr.length != 0) {
    arr.forEach(function(item) {
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
util.isGender = function(gender) {
  if (gender == 1) {
    return '男';
  } else {
    return '女';
  }
}
//标题合并--护理任务
util.totitle = function(item) {
  let title = "";
  if (item.executionTime) {
    let time = dateFormat(new Date(item.executionTime), "HH:mm:ss")
    title += "  (" + time;
    title += ")  " + item.employeeName;
  }

  return title;
}
//标题合并--监测任务
util.monitortitle = function(item) {
  let title = "";
  if (item.recordTime) {
    let time = dateFormat(new Date(item.recordTime), "HH:mm:ss")
    title += "  (" + time;
    title += ")  " + item.employeeName;
  }

  return title;
}
util.medicinetitle = function(item) {
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
util.medicnestitle = function(item) {
  let title = item.medicinesName;
  if (item.actualUseTime) {
    let time = new Date(item.useDate);
    title += "  " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds();
    title += "  " + item.employeeName;
  } else if (item.useDate) {
    let time = new Date(item.useDate);
    title += "  " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds();
    title += "  " + item.employeeName;
  }

  return title;
}

util.formatDate = function(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

//获取时间段
util.getPeriod = function(periods, index) {
  for (let i = 0; i < periods.length; i++) {
    let period = periods[i]
    if (period.periodId == index) {
      return period.periodName;
    }
  }
}
// 上传图片或文件
util.postFile= function(url, data, code) {
  //读取数据Loading
  Vue.$vux.loading.show({
    text: '文件上传中...'
  })
  code = code ? code : 1;
  return util.ajax({
    url,
    method: 'post',
    headers:{
      "Authorization": JSON.parse(storejs.get('loginUserInfo')).token,
    },
    data: data
  })
    .then(response => {
      //读取完毕
      Vue.$vux.loading.hide();
      //转换数据
      response.data.success = response.data.status == "1" ? true : false;
      response.data.msg = response.data.message;
      return response;
    })
    .catch(error => {
      // Message.error('保存信息失败！');
      Vue.$vux.toast.text("上传失败", "middle");
      Vue.$vux.loading.hide();
      return error;
    });
};
export default util;
