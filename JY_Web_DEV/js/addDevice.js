var imgUrL;
var user = JSON.parse(sessionStorage.getItem("user"));
var userId = sessionStorage.getItem('userId');
var initHosIds = "";


//下拉框数据
function selectData(url, data, callback){
	ajaxGet(url, data, function(res){
		console.log(res);
		if(res.status == "0"){
			callback(res);
		}
	})
}
selectData("/hospital/info/getHospitalOptionList", {}, function(res){
	console.log(res,"回调数据!");
	var hospitalList = res.resultMap.hospitalList;
	if(hospitalList != null) {
		$("#applyHos").html('<option value="">请选择</option>');
		var hospitalHtml = '';
		for(var s = 0; s < hospitalList.length; s++) {
			hospitalHtml += '<option data-name="' + hospitalList[s].hospitalName + '" value="' + hospitalList[s].id + '">' + hospitalList[s].hospitalName + '</option>';
		}
		$("#applyHos").append(hospitalHtml);
	}
	if($("#applyHos").val() == $("#applyHos").find("option").val()) {
		$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
	}
	if(userId != 1) {
		$("#applyHos").val(user.deptId);
		$("#applyHos").attr("disabled", "disabled");
		initHosIds = user.deptId;
	}
	if ($("#applyHos").val() != "") {
		applytechOfficeBooking($("#applyHos").val());			
	}else{
		$("#applyDepartment").html('<option value="">请选择</option>');
	}
	if(edit_eqt_index != "") {
		initHosIds = equipmentList[edit_eqt_index].hospitalId;
	} else {
		initHosIds = $("#applyHos").val();
	}
})

////指定医院下拉框 初始化
function applyreadHospitalBooking() {
	ajaxGet("/hospital/info/getHospitalOptionList", {}, function(data){
		console.log("医院数据：：：", data);
		var hospitalList = data.resultMap.hospitalList;
		if(hospitalList != null) {
			$("#applyHos").html('<option value="">请选择</option>');
			var hospitalHtml = '';
//			hospitalHtml += '<option value="">请选择</option>';
			for(var s = 0; s < hospitalList.length; s++) {
//				hospitalHtml += '<option value="">请选择</option>';
				hospitalHtml += '<option data-name="' + hospitalList[s].hospitalName + '" value="' + hospitalList[s].id + '">' + hospitalList[s].hospitalName + '</option>';
			}
			$("#applyHos").append(hospitalHtml);

		}
		if($("#applyHos").val() == $("#applyHos").find("option").val()) {
			$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
		}
		if(userId != 1) {
			$("#applyHos").val(user.deptId);
			$("#applyHos").attr("disabled", "disabled");
			initHosIds = user.deptId;
		}
		if ($("#applyHos").val() != "") {
			applytechOfficeBooking($("#applyHos").val());			
		}else{
			$("#applyDepartment").html('<option value="">请选择</option>');
		}
		if(edit_eqt_index != "") {
			initHosIds = equipmentList[edit_eqt_index].hospitalId;
		} else {
			initHosIds = $("#applyHos").val();
		}
	})
//	$.ajax({
//		type: "get",
//		url: config + "/hospital/info/getHospitalList",
//		async: false,
//		dataType: "json",
////		jsonp: "jsoncallback",
//		success: function(data) {
//			console.log("医院数据：：：", data);
//			var hospitalList = data.resultMap.hospitalList;
//			if(hospitalList != null) {
//				var hospitalHtml = '';
//				for(var s = 0; s < hospitalList.length; s++) {
//					hospitalHtml += '<option data-name="' + hospitalList[s].name + '" value="' + hospitalList[s].id + '">' + hospitalList[s].name + '</option>';
//				}
//				$("#applyHos").html(hospitalHtml);
//
//			}
//			if($("#applyHos").val() == $("#applyHos").find("option").val()) {
//				$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
//			}
//			if(userId != 1) {
//				$("#applyHos").val(user.deptId);
//				$("#applyHos").attr("disabled", "disabled");
//				initHosIds = user.deptId;
//			}
//			applytechOfficeBooking($("#applyHos").val());
//			if(edit_eqt_index != "") {
//				initHosIds = equipmentList[edit_eqt_index].hospitalId;
//			} else {
//				initHosIds = $("#applyHos").val();
//			}
////			checkpointInit();
//		},
//	});
}

//指定医院选择 联动 科室
$("#applyHos").change(function() {
	//联动查询 此医院下的科室
	$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
	if ($("#applyHos").val() != "") {
		applytechOfficeBooking($("#applyHos").val());
	}else{
		$("#applyDepartment").html('<option value="">请选择</option>');
	}
	
});
//指定科室初始化
function applytechOfficeBooking(selectHosId) { //参数为当前选择上的医院的id和科室的select的id
	
	ajaxGet("/hospital/section/getSectionList", {hospitalId: selectHosId}, function(data){
		console.log(data);
		if(data.status == "0") {
			var sectionList = data.resultMap.sectionList;
			if(sectionList != null) {
//				var techOfficeHtml = '';
//				$("#applyDepartment").html('<option value="">请选择</option>');
				$("#applyDepartment").html('<option value="">请选择</option>');
//				techOfficeHtml += '<option value="">请选择</option>';
//				$("#applyDepartment").append(techOfficeHtml);
				for(var t = 0; t < sectionList.length; t++) {
					var techOfficeHtml = '';
					techOfficeHtml += '<option data-name="' + sectionList[t].sectionName + '" value="' + sectionList[t].id + '">' + sectionList[t].sectionName + '</option>';
					$("#applyDepartment").append(techOfficeHtml);
				}
			}
			if($("#applyDepartment").val() == $("#applyDepartment").find("option").val()) {
				$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
			}
			// applytheDoctorBooking($("#applyDepartment").val());
			if(userId != 1) {
				$("#applyDepartment").val(user.fkSectionId);
				$("#applyDepartment").attr("disabled", "disabled");
			}
		}
	})
//	$.ajax({
//		type: "get",
//		url: config + "/hospital/section/getSectionList",
//		async: false,
//		dataType: "json",
////		jsonp: "jsoncallback",
//		data: {
//			fkHospitalId: selectHosId
//		},
//		success: function(data) {
//			console.log(data);
//			if(data.status == 1) {
//				var sectionList = data.resultMap.sectionList;
//				if(sectionList != null) {
//					for(var t = 0; t < sectionList.length; t++) {
//						var techOfficeHtml = '';
//						techOfficeHtml += '<option data-name="' + sectionList[t].name + '" value="' + sectionList[t].id + '">' + sectionList[t].name + '</option>';
//						$("#applyDepartment").append(techOfficeHtml);
//					}
//				}
//				if($("#applyDepartment").val() == $("#applyDepartment").find("option").val()) {
//					$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
//				}
//				// applytheDoctorBooking($("#applyDepartment").val());
//				if(userId != 1) {
//					$("#applyDepartment").val(user.fkSectionId);
//					$("#applyDepartment").attr("disabled", "disabled");
//				}
//			}
//		},
//	});
}
$("#applyDepartment").change(function() {
	$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
})

function checkpointInit() {
	ajaxGet('/inspect/project/getList', {
		hospitalId: initHosIds
	}, function(resData) {
		var data = resData.resultMap.list;
		$("#ulist_div").siblings().remove();
		//渲染检查部位数据
		var aahtml = '';
		data.forEach(function(ele, index) {
			//获取克隆dom
			var lableText = ele.inspectProject + " " + ele.projectPrice + "元";
			aahtml += '<div class="tpl checkBox" style="margin-right: 10px;" id="ulist_div">' +
				'<input type="checkbox" style="margin-top: 0px;" class="checkpoint" id="" name="inspectProject" value="' + ele.inspectProject + '"/>' +
				'<label class="f_lab" style="width: 1%;margin-left:5px">' + lableText + '</label>' +
				'<input type="hidden" id="configInfoString" class="configInfoString" value="" />' +
				'</div>';
		});
		//数据插入
		$(".oWrapper").append(aahtml);

		//edit所用  必须放在这，不然组织还没渲染
//		if(edit_eqt_index != "") {
//			editInit(edit_eqt_index);
//			editInit(id);
//		}
		
	});
}
//设备类型下拉
function checkeQuipmentType(cn) {
	if(user.fkHospitalId == null) {
		user.fkHospitalId = "";
	} else {
		user.fkHospitalId = user.fkHospitalId;
	}
	ajaxGet('/equipment/type/getEquipmentTypeList', {}, function(resData) {
		var rm = resData.resultMap.list;
//		console.log("设备类型", rm);
		if(rm != null) {
			$("#equipmentType").html("<option value=''>请选择</option>")
			for(var s = 0; s < rm.length; s++) {
				var equipmentTypeHtml = '';
//				equipmentTypeHtml += '<option>请选择</option>';
				equipmentTypeHtml += '<option data-name="' + rm[s].name + '" value="' + rm[s].id + '">' + rm[s].name + '</option>';
				$("#equipmentType").append(equipmentTypeHtml);
			}
		}
//		cn();
	});
}

//上传图片
var fileObj;
function uploadImg() {
	sessionId = sessionStorage.getItem("sessionId");
//	var formData = new FormData();
//	formData.append('file', document.getElementsByClassName("chooseImg")[0].files[0]);
//	formData.append("sessionId", sessionId);
	var url = null;
	fileObj = document.getElementById("equipmentFile").files[0];
	if (window.createObjcectURL != undefined) {  
	    url = window.createOjcectURL(fileObj);  
	} else if (window.URL != undefined) {  
	    url = window.URL.createObjectURL(fileObj);  
	} else if (window.webkitURL != undefined) {  
	    url = window.webkitURL.createObjectURL(fileObj);  
	}
	$(".fileBox").find("div").show();
	$(".fileBox").find(".addIcon").hide();
	$(".fileBox").find(".chooseImg").hide();
	$(".fileBox").css({
		"border": "0"
	});
	$("#imageBox").find('.fileBox').find("img").attr("src", url);
//	$.ajax({
//		type: "post",
//		// url:"http://192.31.10.62:8001/oa/patinfo/uploadHeadImage",
//		url: config + "/common/uploadImage",
//		cache: false, //上传文件不需要缓存
//		async: true,
//		data: formData,
//		dataType: 'JSON', //接收值的格式
//		enctype: 'multipart/form-data',
//		processData: false, // 告诉jQuery不要去处理发送的数据
//		contentType: false, // 告诉jQuery不要去设置Content-Type请求头
//		success: function(data) {
//			console.log(data);
//			if(data.status == 1) {
//				alert(data.message);
//				//                  $("#imageBox").find('img').remove();
//				$(".fileBox").find("div").show();
//				$(".fileBox").find(".addIcon").hide();
//				$(".fileBox").find(".chooseImg").hide();
//				$(".fileBox").css({
//					"border": "0"
//				});
//				$("#imageBox").find('.fileBox').find("img").attr("src", data.resultMap.imageUrl);
//				//					$("#imageBox").find('.delIcon').after("<img src=" + data.resultMap.imageUrl + " width='100' height='100' />");
//				imgUrL = data.resultMap.imageUrl;
//				// $("#equipmentFile").attr("onchange", "");
//			} else {
//				alert(data.message);
//			}
//		},
//		error: function(data) {
//			console.log(data);
//			if(data.status == 2) {
//				alert(data.message);
//			}
//		}
//	});
}
var ulist;

$(function() {
	console.log(pageStatus);
	//设备类型数据
	checkeQuipmentType(function() {
//		applyreadHospitalBooking();
	});
//	if(user.fkSectionId != "null") {
//		if(user.sectionName == "" || user.sectionName == null) {
//			$("#applyDepartment").html("");
//			var techOfficeHtml = '';
//			techOfficeHtml += '<option data-name="" value="' + user.fkSectionId + '" selected="selected"></option>';
//			$("#applyDepartment").append(techOfficeHtml);
//		} else {
//			$("#applyDepartment").html("");
//			var techOfficeHtml = '';
//			techOfficeHtml += '<option data-name="' + user.sectionName + '" value="' + user.fkSectionId + '" selected="selected">' + user.sectionName + '</option>';
//			$("#applyDepartment").append(techOfficeHtml);
//		}
//	}
	if (pageStatus != undefined) {
		editInit(id, pageStatus);
	}else{
		$("#update").hide();
		$("#rightAddBtn").show();
	}
	$("#applyHos").change(function() {
		//联动查询 此医院下的科室
		if($("#applyHos").val() != ""){
			applytechOfficeBooking($("#applyHos").val());
		}		
		initHosIds = $("#applyHos").val();
//		checkpointInit();
	});
	//指定医院选择 联动医生
	$("#applyDepartment").change(function() {
		//联动查询 此医院下的医生
		applytheDoctorBooking($("#applyDepartment").val());
//		checkpointInit();
	});
	$(".fileBox").find("div").hide();
	$(".fileBox").find(".addIcon").show();
	$(".fileBox").find(".chooseImg").show();
	delClick();
	applyreadHospitalBooking();
});
//编辑赋值初始化，放在下拉框初始化ajax里了
function editInit(id, status) {
//	var eqt = equipmentList[index];形参index
//	console.log(eqt, "asdada");	
	delClick();
	if (status == "0") {
		//查看
		disOninit(id);
	}else{
		//修改
		$("#query").hide();
		$("#update").show();
		$("#rightAddBtn").show();
		$("#checkTime").removeAttr("disabled");		
		getData(id);
//		$("#closeBox").hide();		
	}
	
	
	//1.普通框 赋值
//	$('#equipmentName').val(eqt.equipmentName);
//	$('#equipmentType').val(eqt.typeId);
//	$('#equipmentNumber').val(eqt.equipmentNumber);
//	$('#equipmentChannel').val(eqt.equipmentChannel);
//	$('#inspectAddress').val(eqt.inspectAddress);
//	$('#equipmentBrand').val(eqt.equipmentBrand);
//	$('#equipmentModel').val(eqt.equipmentModel);
//	$('#equipmentId').val(eqt.id);
//	$("#equipmentPrice").val(eqt.price);
//	$("#imageBox").find(".fileBox").find("img").attr("src", eqt.equipmentUrl)
	//		$("#imageBox").html(
	//			"<label class='f_lab'>"+
	//			"<span style='color: red;'>*</span>设备图片：</label>"+
	//			"<div class='fileBox' >"+
	//			"<span class='addIcon'>+</span>"+
	//			"<input type='file' class='newin chooseImg' id='equipmentFile' name='equipmentUrl' value='' onchange='uploadImg();'>"+
	//			"<div>"+
	//			"<span class='delIcon'>"+
	//			"<i class='iconfont'>&#xeb1b;</i>"+
	//			"</span>"+
	//			"<img src=" + eqt.equipmentUrl + " width='100' height='100' />"+
	//			"</div>"+			
	//			"</div>");
	//2.下拉框 选中
	// $("#applyHos").text(eqt.hospital);
	// $("#applyDepartment").text(eqt.yyks);
	// console.log($("#applyHos").text(), "qweqwe");
	// console.log($("#applyHos").val() == eqt.hospitalId);
//	$(".fileBox").find("div").show();
//	$(".fileBox").find(".addIcon").hide();
//	$(".fileBox").find(".chooseImg").hide();
//	$(".fileBox").css({
//		"border": "0"
//	});
//	var optionArr = $("#applyHos").find("option");
//	for(var j = 0; j < optionArr.length; j++) {
//		if(eqt.hospitalId == $(optionArr[j]).val()) {
//			$(optionArr[j]).attr("selected", "selected");
//			$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
//			$("#applyHos").val($(optionArr[j]).val());
//		}
//	}
//	var optionArr1 = $("#applyDepartment").find("option");
//	for(var k = 0; k < optionArr1.length; k++) {
//		if(eqt.ksid == $(optionArr1[k]).val()) {
//			$(optionArr1[k]).attr("selected", "selected");
//			$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
//			$("#applyDepartment").val($(optionArr1[k]).val());
//		}
//	}
	//3.多选框 选中
//	var eqtList;
	//		console.log(eqtList,"asdasd231231");
//	if(eqt.inspectProject.indexOf(",") != -1) {
//		eqtList = eqt.inspectProject.split(",");
//		for(var i = 0; i < eqtList.length; i++) {
//			$("input[name='inspectProject'][value='" + eqtList[i] + "']").attr("checked", "checked");
//		}
//	} else {
//		eqtList = eqt.inspectProject;
//		$("input[name='inspectProject'][value='" + eqtList + "']").attr("checked", "checked");
//	}
}
function getData(id){
	url = '/equipment/equipmentInfo/getEquipmentInfo';
	ajaxGet(url, {id : id}, function(res) {
//		alert(res.message);
//		$("#equipmentFile").val("");
//		console.log(res);
		var dataList = res.resultMap.equipmentInfo;
		$("#applyHos").val(dataList.hospitalId);
		$("#applyDepartment").val(dataList.sectionId);
//		console.log($("#applyHos").find("option"))
//		$("#applyHos").val(dataList.hospitalId);
//		$("#applyDepartment").val(dataList.sectionId);
		$("#equipmentType").val(dataList.type);
		dataList.name ? $("#equipmentName").val(dataList.name) : $("#equipmentName").val("数据维护中");
		dataList.brank ? $("#equipmentBrand").val(dataList.brank) : $("#equipmentBrand").val("数据维护中");
		dataList.model ? $("#equipmentModel").val(dataList.model) : $("#equipmentModel").val("数据维护中");
		dataList.examinationPlace ? $("#inspectAddress").val(dataList.examinationPlace) : $("#inspectAddress").val("数据维护中");
		dataList.buyTime = dataList.buyTime.split(".");
		dataList.buyTime ? $("#checkTime").val(dataList.buyTime[0]) : $("#checkTime").val("数据维护中");
		var oWrapper = $(".oWrapper");
		var projectData = dataList.resultList;
		if (projectData) {
			if(projectData.length > 1){				
				oWrapper.find(".f_div").find(".part").val(projectData[0].part);
				oWrapper.find(".f_div").find(".price").val(projectData[0].price);
				projectData = projectData.splice(1);
				projectData.map( item => {
					var oCloneDom = $(".boxTpl").clone().removeClass("boxTpl");
					oCloneDom.find(".f_div").find(".part").val(item.part);
					oCloneDom.find(".f_div").find(".price").val(item.price);					
					oWrapper.append(oCloneDom);
					removeloneDom();
				})
			}else{
				projectData.map( item => {
					oWrapper.find(".dataBox").eq(1).find(".f_div").find(".part").val(item.part);
					oWrapper.find(".dataBox").eq(1).find(".f_div").find(".price").val(item.price);
				})
			}
		}
		if (status == "0") {
			$(".fileBox").css({"border" : "0px"}).find("div").show();
			$(".addIcon").hide();
			$(".fileBox").find("div").find("img").attr("src", dataList.filePath);
			$("#equipmentFile").hide();
			$(".delIcon").hide();
			$(".delBtn").hide()
		} else{
			$(".fileBox").css({"border" : "0px"}).find("div").show();
			$(".addIcon").hide();
			$(".fileBox").find("div").find("img").attr("src", dataList.filePath);
			$(".delBtn").show();			
		}
		
	})
}
//查看时 禁用初始化
function disOninit(id) {
	$("#applyHos").attr("disabled", "disabled").css({
		"appearance":"none",
		"-webkit-appearance": "none",
		"-moz-appearance": "none"
	});
	$("#applyDepartment").attr("disabled", "disabled").css({
		"appearance":"none",
		"-webkit-appearance": "none",
		"-moz-appearance": "none"
	});
	$("#equipmentType").attr("disabled", "disabled").css({
		"appearance":"none",
		"-webkit-appearance": "none",
		"-moz-appearance": "none"
	});
	$("#equipmentName").attr("disabled", "disabled");
	$("#equipmentBrand").attr("disabled", "disabled");
	$("#equipmentModel").attr("disabled", "disabled");
//	$(".checkpoint").attr("disabled", "disabled");//检查部位
//	$("#equipmentPrice").attr("disabled", "disabled");
//	$("#equipmentFile").attr("disabled", "disabled");
//	$("#inspectProject").attr("disabled", "disabled");
	$("#inspectAddress").attr("disabled", "disabled");//地址
	$("#checkTime").attr("disabled", "disabled");
	$(".oWrapper").find(".f_div").find("input").attr("disabled", "disabled");
	// $("#query").css({
	// 	"display":"none"
	// })
	$("#query").hide();
	$("#update").hide();
	$("#rightAddBtn").hide();
	getData(id);
//	$("#closeBox").show();
}

//save前 非空验证
function fromIsNull(fromArray) {
	var flag = false;
	var c = 0;

	console.log(fromArray);
	$.each(fromArray, function(i, item) {

		if(item['value'] == '') {
			flag = true;
			return false;
		}
		// if (item['name'] == "equipmentPerDO") {
		//     c++;				
		// }
		if(item['name'] == "part" || item['name'] == "price") {
			c++;
		}
	});
	if(flag || c == 0) {
		alert('信息不可为空');
		return true;
	}
	return false;
}
//保存
// var fromData = {};
var resJson = [];
function saveEquipment() {
	
	//判断表单数据是否为空
	var fromArray = $('#equipmentForm').serializeArray();
//	console.log(fromArray,"截取前")
	fromArray.splice(8, 2);	
//	console.log(fromArray,"asdasd");
	//非空验证
	if(fromIsNull(fromArray)) {
		return;
	}
	var formData = new FormData();
	if(fileObj == undefined){
		alert('设备图片不可为空');
		return;
	}
	formData.append("file", fileObj);
//	formData.append("hospital", $("#applyHos").find("option:selected").attr("data-name"));
//	formData.append("yyks", $("#applyDepartment").find("option:selected").attr("data-name"));
	formData.append("type", $("#equipmentType").val());
	formData.append("equipmentType", $("#equipmentType").find("option:selected").attr("data-name"));
//	formData.append("hospitalId", $("#applyHos").val());
	console.log(fromArray)	
	var dataArr = [];
	fromArray.map( (item, index) => {
		index < 8 ? formData.append("" + item.name, item.value) : dataArr.push(item);
	});	
	for(var i = 0 ; i < dataArr.length; i++){
		if(i % 2 == 0){
			var obj = {};
			obj.part = dataArr[i].value;
			obj.price = dataArr[i+1].value;
			console.log(obj)
			resJson.push(obj);
		}else{
			continue
		}
	}
	formData.append("resJson", JSON.stringify(resJson));
//	fromData.equipmentUrl = fileObj;
//	fromData.hospital = $("#applyHos").find("option:selected").attr("data-name");
//	fromData.yyks = $("#applyDepartment").find("option:selected").attr("data-name");
//	fromData.equipmentTypeId = $("#equipmentType").val();
//	fromData.equipmentType = $("#equipmentType").find("option:selected").attr("data-name");
	//		fromData.detailedInfo = $("#configInfoString").val();
//	fromData.hospitalId = $("#applyHos").val();
	console.log(formData);
	url = '/equipment/equipmentInfo/save';
	ajaxPost(url, formData, function(res) {
		alert(res.message);
		$("#equipmentFile").val("");
		fileObj = undefined;
		if(res.status == "0") {
			location.reload();
		}
	})
}

//点击导入的新增信息 的取消
$("#saveCancle").click(function() {
	$("#subscribeListLight1").css("display", "none");
	$("#subscribeListFade").css("display", "none");
});


//删除点击事件
function delClick() {
	$(".delIcon").click(function() {
		$(".fileBox").find("div").hide();
		$(".fileBox").find(".addIcon").show();
		$(".fileBox").find(".chooseImg").show();
		$(".fileBox").css({
			"border": "1px dashed #999"
		});
		$("#equipmentFile").val("");
	})
}
var oWrapper = $(".oWrapper");
$("#rightAddBtn").click(function(){	
	if ($(".boxTpl").find(".f_div").find(".part").val() != "" || $(".boxTpl").find(".f_div").find(".price").val() != "") {
		$(".boxTpl").find(".f_div").find(".part").val("");
		$(".boxTpl").find(".f_div").find(".price").val("");
	}
	var oCloneDom = $(".boxTpl").clone().removeClass("boxTpl");
	oWrapper.append(oCloneDom);
	removeloneDom();
})
function removeloneDom(){
	$(".delBtn").click(function(){		
		$(this).parent().remove();
	});
}

$("#closeBtn").click(function() {
	$("#subscribeListLight1").css("display", "none");
	$("#subscribeListFade").css("display", "none");
})
//修改
var resJson = [];
function updateEquipment() {

	//判断表单数据是否为空
	var fromArray = $('#equipmentForm').serializeArray();
//	console.log(fromArray,"截取前")
	fromArray.splice(8, 2);	
//	console.log(fromArray,"asdasd");
	//非空验证
	if(fromIsNull(fromArray)) {
		return;
	}
	var formData = new FormData();
	if(fileObj != undefined) formData.append('file', fileObj);
//	formData.append("file", fileObj);
//	formData.append("hospital", $("#applyHos").find("option:selected").attr("data-name"));
//	formData.append("yyks", $("#applyDepartment").find("option:selected").attr("data-name"));
//	formData.append("type", $("#equipmentType").val());
	formData.append("equipmentType", $("#equipmentType").find("option:selected").attr("data-name"));
//	formData.append("hospitalId", $("#applyHos").val());
	console.log(fromArray)	
	var dataArr = [];
	fromArray.map( (item, index) => {
		index < 8 ? formData.append("" + item.name, item.value) : dataArr.push(item);
	});	
	for(var i = 0 ; i < dataArr.length; i++){
		if(i % 2 == 0){
			var obj = {};
			obj.part = dataArr[i].value;
			obj.price = dataArr[i+1].value;
			console.log(obj)
			resJson.push(obj);
		}else{
			continue
		}
	}
	formData.append("resJson", JSON.stringify(resJson));
	formData.append("id", id);
//	fromData.equipmentUrl = fileObj;
//	fromData.hospital = $("#applyHos").find("option:selected").attr("data-name");
//	fromData.yyks = $("#applyDepartment").find("option:selected").attr("data-name");
//	fromData.equipmentTypeId = $("#equipmentType").val();
//	fromData.equipmentType = $("#equipmentType").find("option:selected").attr("data-name");
	//		fromData.detailedInfo = $("#configInfoString").val();
//	fromData.hospitalId = $("#applyHos").val();
	console.log(formData);
	url = '/equipment/equipmentInfo/update';
	ajaxPost(url, formData, function(res) {
		alert(res.message);
		$("#equipmentFile").val("");
		if(res.status == "0") {
			location.reload();
		}
	})
}
//点击修改的信息的关闭
//$("#closeBtn").click(function() {
//	$("#subscribeListLight1").css("display", "none");
//	$("#subscribeListFade").css("display", "none");
//	if($("#inspectAddress").val() == "") {
//		alert("检查地点不能为空!");
//	};
//	var fromArray = $('#equipmentForm').serializeArray();
//	var fromData = {};
//
////	$.each(fromArray, function() {
////		// if(this.name=="equipmentPerDO"){
////		//     var uv=fromData["equipmentPerDO"]==null?this.value:fromData["equipmentPerDO"]+","+this.value;
////		//     fromData["equipmentPerDO"]=uv;
////		// }else{
////		//     fromData[this.name] = this.value;
////		// }
////		if(this.name == "inspectProject") {
////			var uv = fromData["inspectProject"] == null ? this.value : fromData["inspectProject"] + "," + this.value;
////			fromData["inspectProject"] = uv;
////		} else {
////			fromData[this.name] = this.value;
////		}
////	});
//	fromData.id = $('#equipmentId').val();
//	fromData.equipmentType = $("#equipmentType").find("option:selected").attr("data-name");
//	fromData.equipmentTypeId = $("#equipmentType").val();
//	fromData.equipmentUrl = imgUrL;
//	console.log("fromData", fromData);
//	if(fromIsNull(fromArray)) {
//		$(".white_content").show();
//		$("#subscribeListFade").show();
//		return;
//	} else {
//		$.ajax({
//			type: "get",
//			url: config + "/equipment/equipmentInfo/update",
//			async: true,
//			data: fromData,
//			success: function(data) {
//				console.log(data);
//				if(data.status == "0") {
//					alert(data.message);
//					RefreshIframe('page/deviceManagement/deviceManagement.html', 'SBGL_YXSB');
//				} else {
//					alert(data.message);
//				}
//			},
//			error: function(data) {
//				console.log(data);
//			}
//		});
//	};
//});