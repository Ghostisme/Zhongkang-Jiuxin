//window.config="https://cloud.zk9y.com/wsApi";
//window.config="http://cloud-dev.zk9y.com/api";//测试地址
//window.config="http://192.31.10.82:8002";
//window.config="http://192.31.10.73:8001";
//window.config="http://192.31.10.93:8001";
//window.config="http://192.31.10.47:8002";
//window.config="http://192.31.10.166:8001";
//window.config="http://192.31.10.197:8002";
//window.config="http://192.31.10.230:9000/api";
window.config="http://cloud-dev.zk9y.com:9000/api"
//window.config="http://lin.vipgz2.idcfengye.com"
function ajaxGet(url,fromData,cn) {
//  console.log('ajaxGet-url:',sessionStorage.getItem('token'));
//  console.log('ajaxGet-data:',fromData);
    $.ajax({
        method: 'get',
        url: config + url,
        contentType: "application/json; charset=utf-8", //传到后台的数据格式
        headers: {
        	"Authorization":sessionStorage.getItem('token')//此处放置请求到的用户token
      	},
        async: true,
        data: fromData,
        dataType: 'JSON', //接收值的格式
        success: function (data,status,xhr) {
//          console.log('ajaxGet:',xhr.getResponseHeader("authorization"));
//          if(xhr.getAllResponseHeaders().split("content-type:")[0].indexOf("authorization:")!=-1){
//          	console.log('textStatus:',xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim());
//          	if(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim().indexOf("connection:")!=-1){
//          		sessionStorage.setItem('token',(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim()).split("connection:")[0].trim());	
//          	}else if(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim().indexOf("vary:")!=-1){
//          		sessionStorage.setItem('token',(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim()).split("vary:")[0].trim());	
//          	}else{
//          		sessionStorage.setItem('token',xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim())
//          	}
//          }
			if(xhr.getResponseHeader("authorization")){
				sessionStorage.setItem('token',xhr.getResponseHeader("authorization"));
			}
            cn(data);
        },
        error: function (result) {
            //233
            console.log('ajaxGet-error:',result);
        }
    });
}
function ajaxPost(url,fromData,cn) {
//  console.log('ajaxGet-url:',sessionStorage.getItem('token'));
//  console.log('ajaxGet-data:',fromData);
    $.ajax({
        method: 'post',
        url: config + url,
//      contentType: "application/json; charset=utf-8", //传到后台的数据格式
        headers: {
        	"Authorization":sessionStorage.getItem('token')//此处放置请求到的用户token
      	},
      	cache: false,
        async: true,
        processData: false,
        enctype: 'multipart/form-data',
        contentType: false,
        data: fromData,
        dataType: 'JSON', //接收值的格式
        success: function (data,status,xhr) {
//          console.log('ajaxGet:',data);
//          if(xhr.getAllResponseHeaders().split("content-type:")[0].indexOf("authorization:")!=-1){
//          	console.log('textStatus:',xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim());
//          	if(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim().indexOf("connection:")!=-1){
//          		sessionStorage.setItem('token',(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim()).split("connection:")[0].trim());	
//          	}else if(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim().indexOf("vary:")!=-1){
//          		sessionStorage.setItem('token',(xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim()).split("vary:")[0].trim());	
//          	}else{
//          		sessionStorage.setItem('token',xhr.getAllResponseHeaders().split("content-type:")[0].split("authorization:")[1].trim())
//          	}
//          }
			if(xhr.getResponseHeader("authorization")){
				sessionStorage.setItem('token',xhr.getResponseHeader("authorization"));
			}
            cn(data);
        },
        error: function (result) {
            //233
            console.log('ajaxGet-error:',result);
            if($(".subModal")){
            	$(".subModal").css("display","none");
            }
           	if($(".modal-backdrop")){
           		$(".modal-backdrop").css("display","none");
           	}
           	if($("#myModal")){
           		$("#myModal").css("display","none");
           	}
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
 
//      console.log('resData:::',resData);
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

//每页标题文本
function tableNavText(dom){
	var thisTabs=parent.$(window.parent.document).find(".page-tabs .J_menuTab");
//	console.log(thisTabs);
	var navText;
	for(var k=0;k<thisTabs.length;k++){
		if ($(thisTabs[k]).hasClass("active")) {
			navText = $(thisTabs[k]).text();
		}
	}
//	console.log(navText);
	$(dom).text(navText);
}
tableNavText(".tableNav");