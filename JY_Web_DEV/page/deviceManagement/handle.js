//点击删除
$(document).on("click", ".subListBtn-del", function() {
	var del_eqt_id = $(this).attr('data-id'); //修改用id获取编辑数据
	$('#del_id').val(del_eqt_id);
	$("#subscribeListLight2").fadeIn();
	$("#subscribeListFade").fadeIn();
});
//删除确认
$("#subscribeListDel-yes").click(function() {
	var del_id = $('#del_id').val();
	ajaxGet('/equipment/equipmentInfo/remove', {
		id: del_id
	}, function(data) {
		if(data.status == "0") {
			//		            alert(data.message);
			$("#subscribeListFade").hide();
			$("#subscribeListLight2").hide();
			//		            $("#subscribeListLight2").css("display","none");
			//		            $("#subscribeListFade").css("display","none");
			webApp.getData();
		} else {
			alert(data.message);
		}
	});
});
//点击设备排班
$(document).on("click", ".deviceTime", function() {
	var currentLineIds = $(this).parent().parent().find(".deviceLineIds").text();
	var hospitalId = $(this).parent().parent().find(".deviceLineIds1").text();
	console.log(currentLineIds);
	// console.log($(this).parent().parent().find(".deviceLineIds"))
	localStorage.setItem("deviceId", currentLineIds);
	localStorage.setItem("hospitalId", hospitalId);
	localStorage.setItem("deviceName", $(this).parent().parent().find(".equipmentName").text());
	localStorage.setItem("deviceNum", $(this).parent().parent().find(".equipmentModel").text());
	localStorage.setItem("deviceType", $(this).parent().parent().find(".equipmentType").text());
	RefreshIframe('page/fullCalender/index.html', 'deviceTime');
}); 
//点击状态
var status;
$(document).on("click", ".status", function() {
	var del_eqt_id1 = $(this).attr('data-id'); //修改用id获取编辑数据
	$('#del_id1').val(del_eqt_id1);
	$("#subscribeListLight4").fadeIn();
	$("#subscribeListFade").fadeIn();
	status = $(this).attr("data-status");
	if(status == "0") {
		$("#subscribeListLight4").find(".header_title").text("停用");
		$("#subscribeListLight4").find(".chooseDel").find("div").eq(0).html('<img src="../../img/warn.png" width="55" height="48"/>停用信息');
		$("#subscribeListLight4").find(".chooseDel").find("div").eq(1).text("确定要停用此项吗");
		$(this).parent().parent().css({
			"color": "#999"
		});
		$(this).prev().css({
			"pointer-events": "none",
			"filter": "alpha(opacity=50)", /*IE滤镜，透明度50%*/
			"-moz-opacity": "0.5", /*Firefox私有，透明度50%*/
			"opacity": "0.5" /*其他，透明度50%*/
		});
		$(this).prev().prev().css({
			"pointer-events": "none",
			"filter": "alpha(opacity=50)", /*IE滤镜，透明度50%*/
			"-moz-opacity": "0.5", /*Firefox私有，透明度50%*/
			"opacity": "0.5" /*其他，透明度50%*/
		});
	} else {
		$("#subscribeListLight4").find(".header_title").text("启用");
		$("#subscribeListLight4").find(".chooseDel").find("div").eq(0).html('<img src="../../img/warn.png" width="55" height="48"/>启用信息');
		$("#subscribeListLight4").find(".chooseDel").find("div").eq(1).text("确定要启用此项吗");
		$(this).parent().parent().css({
			"color": "#000"
		});
		$(this).prev().css({
			"pointer-events": "auto",
			"filter": "alpha(opacity=100)", /*IE滤镜，透明度50%*/
			"-moz-opacity": "1", /*Firefox私有，透明度50%*/
			"opacity": "1" /*其他，透明度50%*/
		});
		$(this).prev().prev().css({
			"pointer-events": "auto",
			"filter": "alpha(opacity=100)", /*IE滤镜，透明度50%*/
			"-moz-opacity": "1", /*Firefox私有，透明度50%*/
			"opacity": "1" /*其他，透明度50%*/
		});
	}
});
$("#subscribeListDel-yes1").click(function() {
	var del_id1 = $('#del_id1').val();
	ajaxGet('/equipment/equipmentInfo/updateEnable', {
		// id: $(".deviceLineIds").text(),
		id: del_id1,
		isEnable: status
	}, function(data) {
		if(data.status == "0") {
			alert(data.message);
			$("#subscribeListLight4").css("display", "none");
			$("#subscribeListFade").css("display", "none");
			webApp.getData();
		} else {
			alert(data.message);
		}
	});
}); //点击维修记录
$(document).on("click", ".subListBtn-repair", function() {
	var equipmentId = $(this).attr("data-id");
	localStorage.setItem("equipmentId", equipmentId);
	RefreshIframe('page/maintenanceRecord/maintenanceRecord.html', '104');
});
//点击查看(修改)按钮
$(document).on("click", ".subListBtn-see", function() {
	//灰背景
	$("#subscribeListFade").fadeIn();
	//框子
	$("#subscribeListLight1").fadeIn();
	//页面
	edit_eqt_index = $(this).attr('data-index'); //查看用id获取编辑数据(现改为获取下标i)			
	pageStatus = $(this).attr('data-status');
	id = $(this).attr('data-id');
	$("#addSubscribeList").load("./addDevice.html");
	$(".white_contentHead").find(".infoTitle").text("查看");
});
$(document).on("click", ".subListBtn-search", function() {
	//灰背景
	$("#subscribeListFade").fadeIn();
	//框子
	$("#subscribeListLight1").fadeIn();
	//页面
	edit_eqt_index = $(this).attr('data-index'); //修改用id获取编辑数据(现改为获取下标i)
	pageStatus = $(this).attr('data-status');
	id = $(this).attr('data-id');
	$("#addSubscribeList").load("./addDevice.html");
	$(".white_contentHead").find(".infoTitle").text("修改");
});