/*
    写在前面：
    为了保持在功能演示方面的简洁， demo不会做任何合法性校验
*/

// 本demo用到的唯一一个CGI，获取usersig （什么是usersig? 请看 https://www.qcloudtrtc.com/webrtcapi/ )
// 如果您不了解非对称加密，可以这样简单理解：
// 你有公钥 和 私钥 两把钥匙，腾讯云有一把钥匙（公玥）
// 你把数据丢盒子里，并且用私钥上锁，然后把上了锁的盒子给到腾讯云
// 腾讯云可以用公钥这把钥匙来解开这把锁，拿到里面的数据。
// 所以你需要的是
// 去控制台把私钥下载下来，用TLS工具算一个签名（usersig)

//不要把您的sdkappid填进来就用这个cgi去测，测试demo的cgi没有您的私钥，臣妾做不到啊
var FetchSigCgi = 'https://www.qcloudtrtc.com/sxb_dev/?svc=account&cmd=authPrivMap';
var sdkappid,
    accountType = 14418, // accounttype 还是在文档中会找到
    userSig,
    username;
var user = JSON.parse(sessionStorage.getItem('user'));
console.log('video-login-user:::',user);

function onKickout() {
    alert("on kick out!");
}

function quitRTC() {
    if (typeof(RTC) != "undefined") {
        RTC.quit();
    }
    $("#video-section").hide();
    $('#audience_back').show();

    $("#input-container").show();
    $("#remote-video-wrap").html("");
}

function onRelayTimeout(msg) {
    alert("onRelayTimeout!" + (msg ? JSON.stringify(msg) : ""));
}

function createVideoElement(id, isLocal, isben = false) {
    var videoDiv = document.createElement("div");
    if (isben) {
        videoDiv.innerHTML = '<video  class="videoLocal" name="' + user.id + '" id="' + id + '" autoplay ' + (isLocal ? 'muted' : '') + ' playsinline  style="height:120px;width: 150px;"></video>';
    } else {
        videoDiv.innerHTML = '<video  id="' + id + '" autoplay ' + (isLocal ? 'muted' : '') + ' playsinline  ></video>';
    }
    document.querySelector("#remote-video-wrap").appendChild(videoDiv);

    return document.getElementById(id);
}

function onLocalStreamAdd(info) {
    if (info.stream && info.stream.active === true) {
        var id = "local";
        var video = document.getElementById(id);
        if (!video) {
            createVideoElement(id, true, true);
        }
        var video = document.getElementById(id);
        video.srcObject = info.stream;
        video.muted = true;
        video.autoplay = true;
        video.playsinline = true;
        /*$('#local').css("height", '120px');
        $('#local').css("width", '150px');
        $('#local').removeClass('videoDiv');
        $('#local').addClass('videoLocal');*/
    }
}


function onRemoteStreamUpdate(info) {
    //console.debug(info)
    // console.debug(info)
    if (info.stream && info.stream.active === true) {

        var id = info.videoId;
        var video = document.getElementById(id);

        if (!video) {
            video = createVideoElement(id);
        }
        setTimeout(function () {
            video.srcObject = info.stream;
        }, 50)
    } else {
         console.log('欢迎用户' + info.userId + '加入房间');
    }
}


function onRemoteStreamRemove(info) {
    // console.log(info.userId + ' 断开了连接');
    var videoNode = document.getElementById(info.videoId);
    if (videoNode) {
        videoNode.srcObject = null;
        document.getElementById(info.videoId).parentElement.removeChild(videoNode);
    }
}

function onWebSocketClose() {
    RTC.quit();
}


Bom = {
    /**
     * @description 读取location.search
     *
     * @param {String} n 名称
     * @return {String} search值
     * @example
     *        $.bom.query('mod');
     */
    query: function (n) {
        var m = window.location.search.match(new RegExp("(\\?|&)" + n + "=([^&]*)(&|$)"));
        return !m ? "" : decodeURIComponent(m[2]);
    },
    getHash: function (n) {
        var m = window.location.hash.match(new RegExp("(#|&)" + n + "=([^&]*)(&|$)"));
        return !m ? "" : decodeURIComponent(m[2]);
    }
};

$("#userId").val("video_" + parseInt(Math.random() * 100000000));
var phonenum = Bom.query("phonenum")
var pstntype = Bom.query("pstntype")
var roomid = Bom.query("roomid")
var sdkappid = Bom.query("sdkappid")
var userId = Bom.query("userId")
var useCloud = Bom.query("useCloud") ? parseInt(Bom.query("useCloud")) : 1;
var privmap = Bom.query("privmap") ? parseInt(Bom.query("privmap")) : 255;
console.error('useCloud', useCloud)
if (phonenum) {
    $("#phonenum").val(phonenum)
}
if (pstntype) {
    $("#pstnBizType").val(pstntype)
}
if (roomid) {
    $("#roomid").val(roomid)
}
if (sdkappid) {
    $("#sdkappid").val(sdkappid)
}
if (userId) {
    $("#userId").val(userId)
}
if (privmap) {
    $("#privmap").val(privmap)
}

function gotStream(opt, succ) {
    RTC.getLocalStream({
        video: true,
        audio: true,
        videoDevice: opt.videoDevice
    }, function (info) {
        var stream = info.stream;
        succ(stream)
    });
}


function initRTC(opts) {
    // 初始化
    window.RTC = new WebRTCAPI({
        "debug": {
            log: true
        },
        "userId": opts.userId,
        "userSig": opts.userSig,
        "sdkAppId": opts.sdkappid
    });


    RTC.createRoom({
        roomid: opts.roomid * 1,
        privMap: 255
    }, function () {
        gotStream({
            audio: true,
            video: true
        }, function (stream) {
            RTC.startRTC({
                stream: stream,
                role: 'user'
            });
        })
    });

    // 远端流新增/更新
    RTC.on("onRemoteStreamUpdate", onRemoteStreamUpdate);
    // 本地流新增
    RTC.on("onLocalStreamAdd", onLocalStreamAdd);
    // 远端流断开
    RTC.on("onRemoteStreamRemove", onRemoteStreamRemove);
    // 重复登录被T
    RTC.on("onKickout", onKickout);
    // 服务器超时
    RTC.on("onRelayTimeout", onRelayTimeout);
    // just for debugging
    // RTC.on("*",function(e){
    // console.debug(e)
    // });
    RTC.on("onErrorNotify", function (info) {
        console.error(info);
        if (info.errorCode === RTC.getErrorCode().GET_LOCAL_CANDIDATE_FAILED) {
            // alert( info.errorMsg )
        }
    });
    RTC.on("onStreamNotify", function (info) {
        // console.warn('onStreamNotify', info)
    });
    RTC.on("onWebSocketNotify", function (info) {
        // console.warn('onWebSocketNotify', info)
    });
    RTC.on("onUserDefinedWebRTCEventNotice", function (info) {
        // console.error( 'onUserDefinedWebRTCEventNotice',info )
    });

    RTC.on('onQualityReport', function (data) {
        //数据上报
        console.debug(data)
    });

}

function push(roomId) {
    $('#audience_back').hide();
    login(false, roomId);
}

function audience(roomId) {
    login(true, roomId);
}

function stopRTC() {
    RTC.stopRTC(0, function (info) {
        // console.debug(info)
    }, function (info) {
        // console.debug(info)
    });
}

function stopWs() {
    RTC.global.websocket.close();
}

function startRTC() {
    RTC.startRTC(0, function (info) {
        // console.debug(info)
    }, function (info) {
        // console.debug(info)
    });
}

function chooseVideo(index) {
    //获取设备重新推流
    RTC.getVideoDevices(function (videoDevices) {
        window.videoDevices = videoDevices;
        RTC.chooseVideoDevice(videoDevices[index]);
    });
}

function chooseAudio(index) {
    //获取设备重新推流
    RTC.getAudioDevices(function (audioDevices) {
        window.audioDevices = audioDevices;
        // console.info('choose audio', audioDevices[index])
        RTC.chooseAudioDevice(audioDevices[index]);
    });
}

function login(closeLocalMedia, roomId) {

    sdkappid = Bom.query("sdkappid") || $("#sdkappid").val();
    //请使用英文半角/数字作为用户名
    var data = {
        roomId: roomId != null ? roomId : user.id,
        userId: user.id,
    };
    ajaxGet('/video/getKeyInfo', data, function (resData) {
        var resDataNew = resData.resultMap;
        if (resData.status == 1) {
            // 页面处理，显示视频流页面
            $("#video-section").show();
            $("#input-container").hide();
            var rtdData={
                "userId": resDataNew.userId,
                "userSig": resDataNew.userSig,
                "privateMapKey": resDataNew.privateMapKey,
                "sdkappid": resDataNew.sdkappid,//resDataNew.sdkappid,
                "accountType": resDataNew.accountType,
                "closeLocalMedia": false,
                "roomid": resDataNew.roomId,//resDataNew.roomId
            };
            console.log('/video/getKeyInfo--initRTCData:::007:::',rtdData);
            initRTC(rtdData);

        } else {
            console.log('else:::login-getKeyInfo');
        }
    });
}

