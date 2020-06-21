/*socket开始*/
var websocket_connected_count = 0;

function newWebSocket() {
    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        var user = JSON.parse(sessionStorage.getItem('user'));
        if (user == null) {
            location.href = 'login.html';
        }
        console.log('useruseruser::::', user);
          var wsUrl = "ws://www.hzyypf.com:9000/wsApi/websocket/" + user.userSocket;
//      var wsUrl = "ws://192.31.10.197:8003/websocket/" + user.userSocket;
//        var wsUrl = "wss://www.zk9x.cn/wsApi/websocket/" + user.userSocket;
//       var wsUrl = "ws://192.31.10.166:8001/websocket/" + user.userSocket;
//		var wsUrl = "ws://192.31.10.62:8001/websocket/" + user.userSocket;
        console.log('wsUrl::::::', wsUrl);
        websocket = new WebSocket(wsUrl);
    } else {
        alert('Not support websocket')
    }
    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
        console.log('event：：：：：：：：：：：：：：：：：', event);
        var msg = event.data;
        msg = msg.split('?');
        if (msg[0] == "2") {
            // alert("对方拒绝了您的视频邀请");
            swal({title: "对方拒绝了您的视频邀请"});
            //断流
            quitRTC();
        } else if (msg[0] == "1") {
            //acceptMessage(msg);
            //确认收货
            var message = msg[1];
            var objMsg=JSON.parse(message);
            toastr.info(objMsg.content);
        }else if(msg[0] == "2"){
            //支付成功
            var message = msg[1];
            var objMsg=JSON.parse(message);
            toastr.info(objMsg.content);
        } else if (msg[0] == "3") {
            //物流
            // alert("用户已登录");
            //swal({title: "用户已登录"});
            //window.location.href = "login.html";
            var message = msg[1];
            var objMsg=JSON.parse(message);
            toastr.info(objMsg.content);
        }else if(msg[0] == "4"){
            //订单取消
            var message = msg[1];
                var objMsg=JSON.parse(message);
                //console.log(objMsg);
//              console.log(msg[1].split('%')[1].split(",")[0].split("=")[1]);
//              console.log(msg[2].split('=')[1]);
				// localStorage.setItem("msgType",objMsg.type);	
                // localStorage.setItem("currentTeamId",objMsg.teamId);	
                // localStorage.setItem("acceptApplicationId",objMsg.applyId);
            toastr.info(objMsg.content);
            // setTimeout(function(){
            // 	var msgType=localStorage.getItem("msgType");
            // 	console.log("msgType::::::",msgType);
            // 	if(msgType==1){//发起会诊
			//   		//getToken();
			//   	}else if(msgType==2){//申请方发起的结束会诊 
            //           //alert("对方已结束问诊！如有问题请重新预约");
            //           console.log("订单结束")
			//   		//closeIframe("page/remoteConsultation/videoAndReport.html");
			//   	}else if(msgType==3){//会诊医生发起结束信息，申请方接收到信息后 关闭会诊页面
			//   		//alert("对方已结束问诊！如有问题请重新预约");
            //           //closeIframe("page/remoteConsultation/acceptVideo.html");
            //           console.log("订单确认收货")
			//   	}
            // },2000);
        }
        //小
        
    };
    var userCode=JSON.parse(sessionStorage.getItem('user')).userCode;
	function getToken() {
				$.ajax({
					type: "get",
					url: config + "/sys/user/refreshToken",
					async: false,
					dataType: "JSON",
					data: {accid:userCode},
					success: function(data) {
						console.log(data);
						localStorage.setItem("currentToken",data.info.token);
						localStorage.setItem("currentAccid",data.info.accid);
						delCookie('sdktoken');
						delCookie('uid');
						delCookie();
						RefreshIframe('page/remoteConsultation/acceptVideo.html','acceptVideo');
					},
				});
			}
    /*
    * //首先判断服务器发送的消息是给医生(点击申请视频按钮)的 还是给预约人(接受视频邀请)的
        if(data.is=='医生'){
            //给医生的  因为是我点的申请视频按钮，所以服务器发送消息给医生的话，就一定是对方拒绝了视频
            //对方不接受
           alert('对方拒绝了您的视频邀请');
        }else{

        }*/
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        websocket.close();
    }
//连接成功建立的回调方法
    websocket.onopen = function (event) {
        heartCheck.reset().start();   // 成功建立连接后，重置心跳检测
        console.log('socket连接建立成功');
    }
// 连接发生错误，连接错误时会继续尝试发起连接（尝试5次）
    websocket.onerror = function () {
        console.log("onerror连接发生错误")
        websocket_connected_count++;
        if (websocket_connected_count <= 5) {
            newWebSocket();
        }
    }
// 心跳检测, 每隔一段时间检测连接状态，如果处于连接中，就向server端主动发送消息，来重置server端与客户端的最大连接时间，如果已经断开了，发起重连。
    var heartCheck = {
        timeout: 55000,        // 9分钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
        serverTimeoutObj: null,
        reset: function () {
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function () {
            var self = this;
            this.serverTimeoutObj = setInterval(function () {
                if (websocket.readyState == 1) {
                    console.log("连接状态，发送消息保持连接");
                    websocket.send("ping");
                    heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
                } else {
                    console.log("断开状态，尝试重连");
                    newWebSocket();
                }
            }, this.timeout)
        }
    };
};

function acceptMessage(msg) {
    //给预约人的 说明是有人请求跟我视频
    // 请求视频
    /*if (window.confirm('有视频邀请，是否接受？')) {
        //对方接受 并打开视频页面
        // location.href='page/audienceAccept/audienceAcceptRaw.html';
        console.log(msg);
        $('#audienceAcceptGoto').click();

        sessionStorage.setItem('socket_patinfoId', msg[4]);
        sessionStorage.setItem('socket_queuingId', msg[5]);
        sessionStorage.setItem('socket_roomId', msg[1]);

    } else {
        //预约人拒绝，需要给医生发送消息，提示我拒绝了视频邀请
        var jsonData = {'applyUserCode': msg[2], 'appointUserCode': msg[3], 'roomId': user.id, 'type': 2};
        //发送websocket消息给 对方，让对方知道我拒绝了
        ajaxGet('/oa/interrogationInfo/sendInvite', jsonData, function (res) {});
    }*/
    swal({
        title: "有视频邀请，是否接受？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "接受",
        cancelButtonText: "取消",
        closeOnConfirm: true
    }, function (isConfirm) {
        if (isConfirm) {
            //对方接受 并打开视频页面
            // location.href='page/audienceAccept/audienceAcceptRaw.html';
            console.log(msg);
            $('#audienceAcceptGoto').click();

            sessionStorage.setItem('socket_patinfoId', msg[4]);
            sessionStorage.setItem('socket_queuingId', msg[5]);
            sessionStorage.setItem('socket_roomId', msg[1]);
        } else {
            //预约人拒绝，需要给医生发送消息，提示我拒绝了视频邀请
            var jsonData = {'applyUserCode': msg[2], 'appointUserCode': msg[3], 'roomId': user.id, 'type': 2};
            //发送websocket消息给 对方，让对方知道我拒绝了
            ajaxGet('/oa/interrogationInfo/sendInvite', jsonData, function (res) {
            });
        }
    });
}

$(function () {
    newWebSocket();
});
/*socket结束*/