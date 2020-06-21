/*
 * @Author: hai.L 
 * @Date: 2019-02-25 17:21:09 
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-02-26 10:42:50
 */
import Vue from 'vue'

let cAPI = {};

//局部通知API
cAPI.localNotification = function () {

}

//设备信息
cAPI.deviceInfo = function () {
  if (!Vue.cordova.device) {
    window.alert('FAILED : device information not found')
  } else {
    window.alert('Device : ' + Vue.cordova.device.manufacturer + ' ' + Vue.cordova.device.platform + ' ' + Vue.cordova.device.version)
  }
}

//网络连接信息--未开放
cAPI.networkInfo = function () {
  // if (!Vue.cordova.) {
  //   window.alert('FAILED : device information not found')
  // } else {
  //   window.alert('Device : ' + Vue.cordova.device.manufacturer + ' ' + Vue.cordova.device.platform + ' ' + Vue.cordova.device.version)
  // }
}

//相机
cAPI.camera = function () {
  Vue.cordova.camera.getPicture((imageURI) => {
    window.alert('Photo URI : ' + imageURI)
  }, (message) => {
    window.alert('FAILED : ' + message)
  }, {
    quality: 50,
    destinationType: Vue.cordova.camera.DestinationType.FILE_URI
  })
}

//地理信息
cAPI.geolocation = function () {
  if (!Vue.cordova.geolocation) {
    window.alert('Vue.cordova.geolocation not found !')
    return
  }
  Vue.cordova.geolocation.getCurrentPosition((position) => {
    window.alert('Current position : ' + position.coords.latitude + ',' + position.coords.longitude)
  }, (error) => {
    window.alert('FAILED Error #' + error.code + ' ' + error.message)
  }, {
    timeout: 1000,
    enableHighAccuracy: true
  })
}

//联系人
cAPI.contacts = function () {
  if (!Vue.cordova.contacts) {
    window.alert('Vue.cordova.contacts not found !')
    return
  }
  const ContactFindOptions = ContactFindOptions || function () {}
  Vue.cordova.contacts.find(['displayName'], (contacts) => {
    window.alert('Contacts found : ' + contacts.length)
  }, (error) => {
    window.alert('FAILED : ' + error.code)
  })
}

//音频获得--未启用
cAPI.capture = function(){
  var captureSuccess = function(mediaFiles) {
  }
  var captureError = function(error) {
    window.alert('Error code: ' + error.code, null, 'Capture Error');
  };
  window.alert(navigator.device.capture);
  Vue.cordova.capture.captureAudio(captureSuccess, captureError, {limit:18});
}

export default cAPI;
