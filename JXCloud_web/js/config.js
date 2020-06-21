window.config="https://cloud.zk9x.cn/api";
//window.config="http://192.31.10.62:8001";
//window.config="http://192.31.10.73:8001";
//window.config="http://192.31.10.58:8001";
//window.config="http://192.31.10.47:8002";
//window.config="http://192.31.10.166:8001";
//window.config="http://192.31.10.197:8012";
function ajaxGet(url,fromData,cn) {
    fromData.sessionId=sessionStorage.getItem("sessionId");
    console.log('ajaxGet-url:',config + url);
    console.log('ajaxGet-data:',fromData);
    $.ajax({
        method: 'get',
        url: config + url,
        contentType: "application/json; charset=utf-8", //传到后台的数据格式
        async: true,
        data: fromData,
        dataType: 'jsonp', //接收值的格式
        jsonp: 'jsoncallback',
        success: function (data) {
            console.log('ajaxGet:',data);
            cn(data);
        },
        error: function (result) {
            //233
            console.log('ajaxGet-error:',result);
        }
    });
}
function loginNew(closeLocalMedia) {
    sdkappid = Bom.query("sdkappid") || $("#sdkappid").val();
    userId = $("#userId").val();
    //请使用英文半角/数字作为用户名
    var data={
        roomId: sessionStorage.getItem('userId'),
        userId: sessionStorage.getItem('userId'),
    };
    ajaxGet('/video/getKeyInfo',data,function (resData) {
 
        console.log('resData:::',resData);
        var resDataNew=resData.resultMap;
        if (resData.status==1) {
 
            // 页面处理，显示视频流页面
            $("#video-section").show();
            $("#input-container").hide();
            initRTC({
                "userId":resDataNew.userId,
                "userSig": resDataNew.userSig,
                "privateMapKey": resDataNew.privateMapKey,
                "sdkappid": $('#sdkappid').val(),//resDataNew.sdkappid,
                "accountType": resDataNew.accountType,
                "closeLocalMedia": false,
                "roomid": $('#roomid').val(),//resDataNew.roomId
            });
 
        } else {
            console.log('else:::',resData);
        }
    });
}