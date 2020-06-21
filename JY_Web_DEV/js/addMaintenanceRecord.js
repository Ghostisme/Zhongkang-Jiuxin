var imgUrL;
var user = JSON.parse(sessionStorage.getItem("user"));
var userId = sessionStorage.getItem('userId');
var initHosIds = "";
var dataList;
//$("#applyHos").html('<option value="">请选择</option>');
//$("#applyDepartment").html('<option value="">请选择</option>');
//$("#equipmentType").html('<option value="">请选择</option>');
//$("#equipmentBrand").html("<option value=''>请选择</option>");
//指定医院下拉框 初始化
function applyreadHospitalBooking(hosId) {
	$("#applyHos").selectpicker({liveSearchPlaceholder: "医院"});
	ajaxGet("/hospital/relation/getHospitalRelationList",{userId: userId},function(data){
//		console.log(data);
		if(data.status == "0"){
			$("#applyHos").html('<option value="">请选择</option>');
			if(data.resultMap.list.length > 0){
				$.each(data.resultMap.list, function(i,val){  //遍历二维数组
//	    			$("#applyHos").append(`<option value="`+val.id+`">`+val.name+`</option>`);
	    			if(hosId == val.hospitalId){
	    				$("#applyHos").append(`<option selected value="`+val.hospitalId+`">`+val.hospitalName+`</option>`);
	    			}else{
	    				$("#applyHos").append(`<option value="`+val.hospitalId+`">`+val.hospitalName+`</option>`);
	    			}
				})
				$("#applyHos").selectpicker('refresh');
  				$("#applyHos").selectpicker('render');
  				if ($("#applyHos").val() != "") {
					applytechOfficeBooking($("#applyHos").val(),dataList.sectionId);
				}
			}
		}
	});
//	ajaxGet("/hospital/relation/getHospitalRelationList", {userId: userId}, function(data){
//		console.log("医院数据：：：", data);
//		var hospitalList = data.resultMap.list;
//		if(hospitalList != null) {
//			$("#applyHos").html('<option value="">请选择</option>');
//			console.log(hosId);
//			var hospitalHtml = '';
//			for(var s = 0; s < hospitalList.length; s++) {
//				if(hosId==hospitalList[s].hospitalId){
//					hospitalHtml += '<option data-name="' + hospitalList[s].hospitalName + '" selected value="' + hospitalList[s].hospitalId + '">' + hospitalList[s].hospitalName + '</option>';
//				}else{
//					hospitalHtml += '<option data-name="' + hospitalList[s].hospitalName + '" value="' + hospitalList[s].hospitalId + '">' + hospitalList[s].hospitalName + '</option>';
//				}
//			}
//			$("#applyHos").append(hospitalHtml);
//		}
////		if(userId != 1) {
////			$("#applyHos").val(user.deptId);
////			$("#applyHos").attr("disabled", "disabled");
////			initHosIds = user.deptId;
////		}
//		if ($("#applyHos").val() != "") {
//			applytechOfficeBooking($("#applyHos").val(),dataList.sectionId);
//		}
//	})
}

//指定科室初始化
function applytechOfficeBooking(selectHosId,selectDeptId) { //参数为当前选择上的医院的id和科室的select的id
	if(selectHosId){
		$("#applyDepartment").selectpicker({liveSearchPlaceholder: "科室"});
		ajaxGet("/hospital/section/getSectionList",{hospitalId: selectHosId},function(data){
			console.log(data);
			if(data.status == "0"){
				$("#applyDepartment").html('<option value="">请选择</option>');
				if(data.resultMap.sectionList.length > 0){
					$.each(data.resultMap.sectionList, function(i,val){  //遍历二维数组
	//	    			$("#applyHos").append(`<option value="`+val.id+`">`+val.name+`</option>`);
		    			if(selectDeptId == val.id){
		    				$("#applyDepartment").append(`<option selected value="`+val.id+`">`+val.sectionName+`</option>`);
		    			}else{
		    				$("#applyDepartment").append(`<option value="`+val.id+`">`+val.sectionName+`</option>`);
		    			}
					})
					$("#applyDepartment").selectpicker('refresh');
	  				$("#applyDepartment").selectpicker('render');
				}
//				selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			}
		});
	}
	
//	$("#applyDepartment").html('<option value="">请选择</option>');
//	if(selectHosId){
//		ajaxGet("/hospital/section/getSectionList", {hospitalId: selectHosId}, function(data){
//			console.log(data);
//			if(data.status == "0") {
//				var sectionList = data.resultMap.sectionList;
//				if(sectionList != null) {
//					for(var t = 0; t < sectionList.length; t++) {
//						var techOfficeHtml = '';
//						if(selectDeptId==sectionList[t].id){
//							techOfficeHtml += '<option data-name="' + sectionList[t].sectionName + '" selected value="' + sectionList[t].id + '">' + sectionList[t].sectionName + '</option>';
//						}else{
//							techOfficeHtml += '<option data-name="' + sectionList[t].sectionName + '" value="' + sectionList[t].id + '">' + sectionList[t].sectionName + '</option>';
//						}
//						$("#applyDepartment").append(techOfficeHtml);
//					}
//				}
//	//			if(userId != 1) {
//	//				$("#applyDepartment").val(user.fkSectionId);
//	//				$("#applyDepartment").attr("disabled", "disabled");
//	//			}
//				selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
//			}
//		})
//	}
	
}


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
		$(".oWrapper").html(aahtml);
	});
}
//设备类型下拉
function checkEquipmentType(equipmentId) {
//	if(user.fkHospitalId == null) {
//		user.fkHospitalId = "";
//	} else {
//		user.fkHospitalId = user.fkHospitalId;
//	}
	$("#equipmentType").selectpicker({liveSearchPlaceholder: "设备类型"});
	ajaxGet("/equipment/type/getEquipmentTypeList",{},function(data){
		console.log(data);
		if(data.status == "0"){
			$("#equipmentType").html('<option value="">请选择</option>');
			if(data.resultMap.list.length > 0){
				$.each(data.resultMap.list, function(i,val){  //遍历二维数组
	    			if(equipmentId == val.id){
	    				$("#equipmentType").append(`<option selected value="`+val.id+`">`+val.name+`</option>`);
	    			}else{
	    				$("#equipmentType").append(`<option value="`+val.id+`">`+val.name+`</option>`);
	    			}
				})
				$("#equipmentType").selectpicker('refresh');
  				$("#equipmentType").selectpicker('render');
			}
			if ($("#equipmentType").val() != "") {
				equipmentTypeData($("#equipmentType").val(),dataList.equipmentInfo);
			}
		}
	});
//	ajaxGet('/equipment/type/getEquipmentTypeList', {}, function(resData) {
//		var rm = resData.resultMap.list;
//		$("#equipmentType").html('<option value="">请选择</option>');
////		console.log("设备类型", rm);
//		if(rm != null) {
//			for(var s = 0; s < rm.length; s++) {
//				var equipmentTypeHtml = '';
////				equipmentTypeHtml += '<option data-name="' + rm[s].name + '" value="' + rm[s].id + '">' + rm[s].name + '</option>';				
//				if(equipmentId==rm[s].id){
//					equipmentTypeHtml += '<option data-name="' + rm[s].name + '" selected value="' + rm[s].id + '">' + rm[s].name + '</option>';
//				}else{
//					equipmentTypeHtml += '<option data-name="' + rm[s].name + '" value="' + rm[s].id + '">' + rm[s].name + '</option>';
//				}
//				$("#equipmentType").append(equipmentTypeHtml);
//			}
//		}
//		if ($("#equipmentType").val() != "") {
//			equipmentTypeData($("#equipmentType").val(),dataList.equipmentInfo);
//		}
//	});
}

//上传图片
var fileObj;
function uploadImg() {
	sessionId = sessionStorage.getItem("sessionId");
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
	formCheck("#saveOk");
	formCheck("#saveOk1");
}
var ulist;
var radioVal = "0";
var radioArr = $(".radioGroup").find(".radioItem");
var equipmentId;
$(function() {
//	console.log(pageStatus);
	//设备类型数据
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
	$("#equipmentBrand").change(function(){
		equipmentId = $(this).val();
	})
	if (pageStatus != undefined) {
		editInit(id, pageStatus);
		
	}else{
		$("#update").hide();
		$("#rightAddBtn").show();
		allFormCheck(pageStatus);
		applyreadHospitalBooking();
		checkEquipmentType();
//		inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
//		inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
//		inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
//		selectCheck("#applyHos", "#applyHosTip", "#saveOk");
//		selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
//		selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
//		selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
//		inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
//		inputCheck("#equipmentPrice", "#equipmentPriceTip", "#saveOk");
//		inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
//		inputCheck("#items", "#itemsTip", "#saveOk");
		
	}
	$("#applyUser").val(user.userName).attr("disabled","disabled");
	$("#equipmentType").change(function() {
		equipmentTypeData($("#equipmentType").val(),'');
	})
	//指定医院选择 联动 科室
	$("#applyHos").change(function() {
		//联动查询 此医院下的科室
		applytechOfficeBooking($("#applyHos").val(),'');
//		equipmentTypeData($("#equipmentType").val());
	});
//	$("#applyDepartment").change(function() {
//		equipmentTypeData($("#equipmentType").val());
//	})
	$(".fileBox").find("div").hide();
	$(".fileBox").find(".addIcon").show();
	$(".fileBox").find(".chooseImg").show();
	delClick("#saveOk");
	//是否解决单选
	if (pageStatus != "0") {
		radioArr.map(item => {
			$(radioArr[item]).click(function(){
				if ($(this).find(".chooseForm").attr("class") == "chooseForm radioForm") {
					radioVal = $(this).attr("data-index");
					$(this).find(".chooseForm").attr("class", "chooseForm chooseRadioForm");
					$(this).siblings().find(".chooseForm").attr("class", "chooseForm radioForm");
				}else{
					$(this).find(".chooseForm").attr("class", "chooseForm radioForm");
					$(this).siblings().find(".chooseForm").attr("class", "chooseForm chooseRadioForm");
				}
			})
		})
	}
});

//设备品牌下拉
function equipmentTypeData(selectTypeId,selectDeptId){
	if (selectTypeId) {
		$("#equipmentBrand").selectpicker({liveSearchPlaceholder: "设备品牌"});
		ajaxGet("/equipment/equipmentInfo/searchEquipmentInfoList",{
			hospitalId: $("#applyHos").val(),
			sectionId: $("#applyDepartment").val(),
			type: $("#equipmentType").val()
		},function(data){
			console.log(data);
			if(data.status == "0"){
				$("#equipmentBrand").html('<option value="">请选择</option>');
				if(data.resultMap.list.length > 0){
					$.each(data.resultMap.list, function(i,val){  //遍历二维数组
		    			if(equipmentId == val.id){
		    				$("#equipmentBrand").append(`<option data-name="` + val.brank + `"-"` + val.name + `"-"` + val.model + `" selected value="`+val.id+`">`+val.brank + `-` + val.name + `-` + val.model+`</option>`);
		    			}else{
		    				$("#equipmentBrand").append(`<option data-name="` + val.brank + `"-"` + val.name + `"-"` + val.model + `" value="`+val.id+`">`+val.brank + `-` + val.name + `-` + val.model+`</option>`);
		    			}
//		    			equipmentId = val.id;
					})
					$("#equipmentBrand").selectpicker('refresh');
	  				$("#equipmentBrand").selectpicker('render');
				}else{
					$.each(data.resultMap.list, function(i,val){  //遍历二维数组
		    			if(equipmentId == val.id){
		    				$("#equipmentBrand").append(`<option data-name="` + val.brank + `"-"` + val.name + `"-"` + val.model + `" selected value="`+val.id+`">`+val.brank + `-` + val.name + `-` + val.model+`</option>`);
		    			}else{
		    				$("#equipmentBrand").append(`<option data-name="` + val.brank + `"-"` + val.name + `"-"` + val.model + `" value="`+val.id+`">`+val.brank + `-` + val.name + `-` + val.model+`</option>`);
		    			}
//		    			equipmentId = val.id;
					})
					$("#equipmentBrand").selectpicker('refresh');
	  				$("#equipmentBrand").selectpicker('render');
				}
//				selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			}
		});
//		ajaxGet("/equipment/equipmentInfo/searchEquipmentInfoList", {
//			hospitalId: $("#applyHos").val(),
//			sectionId: $("#applyDepartment").val(),
//			type: $("#equipmentType").val()
//		}, function(res){
//			if(res.status == "0"){
//				var dataList = res.resultMap.list;
//				$("#equipmentBrand").html("<option value=''>请选择</option>");
//				if(dataList != null) {
//					for(var s = 0; s < dataList.length; s++) {
//						var equipmentTypeHtml = '';
//						var str = dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model;
//						if(selectDeptId == str){
//							equipmentTypeHtml += '<option data-name="' + dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model + '" selected value="' + dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model + '">' + dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model + '</option>';
//						}else{
//							equipmentTypeHtml += '<option data-name="' + dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model + '" value="' + dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model + '">' + dataList[s].brank + "-" + dataList[s].name + "-" + dataList[s].model + '</option>';
//						}
//						equipmentId = dataList[s].id;
//						$("#equipmentBrand").append(equipmentTypeHtml);
//					}					
//				}
//				selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
//				
//			}
//		})
	}
}
//编辑赋值初始化，放在下拉框初始化ajax里了
function editInit(id, status) {
	delClick("#saveOk1");
	if (status == "0") {
		//查看
		disOninit();
	}else{
		//修改
		$("#query").hide();
		$("#update").show();
		$("#rightAddBtn").show();
		$("#checkTime").removeAttr("disabled");
		allFormCheck(status);
//		inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
//		inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
//		inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
//		selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
//		selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
//		selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
//		selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
//		inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
//		inputCheck("#equipmentPrice", "#equipmentPriceTip", "#saveOk1");
//		inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
//		inputCheck("#items", "#itemsTip", "#saveOk1");
	}
	url = '/equipment/equipmentMaintenance/getEquipmentMaintenance';
	ajaxGet(url, {id : id}, function(res) {
		console.log(res);
		dataList = res.resultMap.equipmentMaintenance;
//		$("#applyHos").val(dataList.hospitalId);
		applyreadHospitalBooking(dataList.hospitalId);
		applytechOfficeBooking(dataList.hospitalId,dataList.sectionId)
//		$("#applyDepartment").val(dataList.sectionId);
//		$("#equipmentType").val(dataList.type);
		checkEquipmentType(dataList.equipmentType);
		$("#equipmentPrice").val(dataList.price);
		$("#maintenanceUser").val(dataList.maintenanceUser);
		$("#items").val(dataList.items);
		$("#memo").val(dataList.remarks);
		if (typeof(dataList.applyTime) == "number") {
			var d=new Date(dataList.applyTime); 
			var applyTime = formatDate(d);
			$("#applyTime").val(applyTime);
		}else{
			if (dataList.applyTime.indexOf(".") != -1) {
				$("#applyTime").val(dataList.applyTime);
			} else{
				dataList.applyTime = dataList.applyTime.split(".");
				dataList.applyTime ? $("#applyTime").val(dataList.applyTime[0]) : $("#applyTime").val("");
			}
//			$("#applyTime").val(dataList.applyTime);
		}
		if (typeof(dataList.applyUpdateTime) == "number") {
			var d=new Date(dataList.applyUpdateTime); 
			var applyUpdateTime = formatDate(d);
			$("#applyUpdateTime").val(applyUpdateTime);
		} else{
			if (dataList.applyUpdateTime.indexOf(".") != -1) {
				$("#applyUpdateTime").val(dataList.applyUpdateTime);
			} else{
				dataList.applyUpdateTime = dataList.applyUpdateTime.split(".");
				dataList.applyUpdateTime ? $("#applyUpdateTime").val(dataList.applyUpdateTime[0]) : $("#applyUpdateTime").val("");
			}
//			$("#applyUpdateTime").val(dataList.applyUpdateTime);
		}
		if (typeof(dataList.time) == "number") {
			var d=new Date(dataList.time); 
			var time = formatDate(d);
			$("#checkTime").val(time);
		} else{
			if (dataList.time.indexOf(".") != -1) {
				$("#checkTime").val(dataList.time);
			} else{
				dataList.time = dataList.time.split(".");
				dataList.time ? $("#checkTime").val(dataList.time[0]) : $("#checkTime").val("");
			}
		}
		$("#repairMemo").val(dataList.repairMemo);
//		dataList.name ? $("#equipmentName").val(dataList.name) : $("#equipmentName").val("数据维护中");
//		dataList.brank ? $("#equipmentBrand").val(dataList.brank) : $("#equipmentBrand").val("数据维护中");
//		dataList.model ? $("#equipmentModel").val(dataList.model) : $("#equipmentModel").val("数据维护中");
		dataList.examinationPlace ? $("#inspectAddress").val(dataList.examinationPlace) : $("#inspectAddress").val("");
		dataList.equipmentId ? equipmentId = dataList.equipmentId : equipmentId = "";
		dataList.isEnable = dataList.isEnable + "";
		radioVal = dataList.isEnable;
		radioArr.map( item => {
			console.log($(radioArr[item]).attr("data-index"))
			console.log(dataList.isEnable)
			console.log($(radioArr[item]).attr("data-index") == dataList.isEnable)
			if ($(radioArr[item]).attr("data-index") == dataList.isEnable) {
				$(radioArr[item]).find(".chooseForm").attr("class", "chooseForm chooseRadioForm");
				$(radioArr[item]).siblings().find(".chooseForm").attr("class", "chooseForm radioForm");
			} else{
				$(radioArr[item]).find(".chooseForm").attr("class", "chooseForm radioForm");
				$(radioArr[item]).siblings().find(".chooseForm").attr("class", "chooseForm chooseRadioForm");
			}
		})
	})
}

function formatDate(now) { 
	var year=now.getFullYear();  //取得4位数的年份
	var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
	var date=now.getDate();      //返回日期月份中的天数（1到31）
	var hour=now.getHours();     //返回日期中的小时数（0到23）
	var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
	var second=now.getSeconds(); //返回日期中的秒数（0到59）
	return year+"-"+addZero(month)+"-"+addZero(date)+" "+addZero(hour)+":"+addZero(minute)+":"+addZero(second); 
}
function addZero(num){
    if(parseInt(num) < 10){
        num = '0' + num;
    }
    return num;
}
//查看时 禁用初始化
function disOninit() {
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
	$("#equipmentBrand").attr("disabled", "disabled").css({
		"appearance":"none",
		"-webkit-appearance": "none",
		"-moz-appearance": "none"
	});
	$("#inspectAddress").attr("disabled", "disabled");//地址
	$("#checkTime").attr("disabled", "disabled");
	$("#equipmentPrice").attr("disabled", "disabled");
	$("#maintenanceUser").attr("disabled", "disabled");
	$("#items").attr("disabled", "disabled");
	$("#memo").attr("disabled", "disabled");
	$("#applyTime").attr("disabled", "disabled");
	$("#applyUpdateTime").attr("disabled", "disabled");
	$("#repairMemo").attr("disabled", "disabled");
	$(".oWrapper").find(".f_div").find("input").attr("disabled", "disabled");
	$("#query").hide();
	$("#update").hide();
	$("#rightAddBtn").hide();
	$("#applyUserTip").hide();
	$("#applyTimeTip").hide();
	$("#applyUpdateTimeTip").hide();
	$("#repairMemoTip").hide();
	$("#applyHosTip").hide();
	$("#applyDepartmentTip").hide();
	$("#equipmentTypeTip").hide();
	$("#equipmentBrandTip").hide();
	$("#checkTimeTip").hide();
	$("#equipmentPriceTip").hide();
	$("#maintenanceUserTip").hide();
	$("#itemsTip").hide();
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
function saveEquipment() {
	var formData = {};
	//判断表单数据是否为空
	var fromArray = $('#equipmentForm').serializeArray();
	//非空验证
//	if(fromIsNull(fromArray)) {
//		return;
//	}
	console.log(fromArray)
	fromArray.map( (item, index) => {
		formData[item.name] = item.value;
	});	
//	if ($("#equipmentBrand").val() == "") {
//		alert("设备品牌不可为空!");
//		return;
//	}
	formData.applyUser = $("#applyUser").val();
	formData.isEnable = radioVal;
	formData.equipmentId = equipmentId;	
	console.log(formData);
	url = '/equipment/equipmentMaintenance/save';
	ajaxGet(url, formData, function(res) {
		alert(res.message);
//		$("#equipmentFile").val("");
		fileObj = undefined;
		localStorage.setItem("equipmentId", "");
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
function delClick(btnId) {
	$(".delIcon").click(function() {
		$(".fileBox").find("div").hide();
		$(".fileBox").find(".addIcon").show();
		$(".fileBox").find(".chooseImg").show();
		$(".fileBox").css({
			"border": "1px dashed #999"
		});
		$("#equipmentFile").val("");
		fileObj = undefined;
		$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
	})
}
var oWrapper = $(".oWrapper");
$("#rightAddBtn").click(function(){
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
function updateEquipment() {
	var formData = {};
	//判断表单数据是否为空
	var fromArray = $('#equipmentForm').serializeArray();
	//非空验证
//	if(fromIsNull(fromArray)) {
//		return;
//	}
	console.log(fromArray)	
	fromArray.map( (item, index) => {
		formData[item.name] = item.value;
	});	
	formData.applyUser = $("#applyUser").val();
	formData.isEnable = radioVal;	
	formData.equipmentId = equipmentId;	
	formData.id = id;
//	if ($("#equipmentBrand").val() == "") {
//		alert("设备品牌不可为空!");
//		return;
//	}
	console.log(formData);
	url = '/equipment/equipmentMaintenance/update';
	ajaxGet(url, formData, function(res) {
		alert(res.message);
		$("#equipmentFile").val("");
		if(res.status == "0") {
			location.reload();
		}
	})
}

function echoData(list, dom){
	console.log(dataList,"查询数据")
	//医院下拉
	if (list != null && dom == "#applyHos") {
    	var hospitalOption = $(dom).find("option");
    	var hospitalId = dataList.hospitalId + "";
    	console.log($(dom).find("option"),"医院下拉项")
    	console.log(hospitalId,"医院ID")
    	for(var i = 0; i < hospitalOption.length; i++){
    		if ($(hospitalOption[i]).val() == hospitalId) {
    			$(dom).val(hospitalId);
    			$(hospitalOption[i]).attr("selected","selected");
    			$(dom).attr("data-name", $(dom).find("option:selected").attr("data-name"));
    		}
    	}
    	if (pageStatus == "0") {
    		var divDom = $("<div id='showHospital'></div>");
			divDom.text($(dom).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
			$(dom).after(divDom);
			$(dom).hide();
    	}
    	if ($(dom).val() != "") {
			applytechOfficeBooking(dataList.hospitalId);
			$("#applyDepartment").removeAttr("disabled");
			$("#applyDepartment").removeAttr("style");
			$("#applyDepartment").css("cssText","width:200px;background-color:#FFF !important");	
		}else{
			$("#applyDepartment").html('<option value="">请选择</option>').attr("disabled","disabled").css("cssText","width:200px;background-color:#f5f5f5 !important");
		}
		$(dom).change(function() {
    		$("#applyDepartment").html("<option value=''>请选择</option>");
    	})
    }else if(list != null && dom == "#applyDepartment"){
    	var sectionOption = $(dom).find("option");
    	var sectionId = dataList.sectionId + "";
    	console.log($(dom).find("option"),"科室下拉项")
    	console.log(sectionId,"科室ID")
    	for(var i = 0; i < sectionOption.length; i++){
    		if ($(sectionOption[i]).val() == sectionId) {
    			$(dom).val(sectionId);
    			$(sectionOption[i]).attr("selected","selected");
    			$(dom).attr("data-name", $(dom).find("option:selected").attr("data-name"));
    		}
    	}
    	if (pageStatus == "0") {
    		var divDom = $("<div id='showSection'></div>");
			divDom.text($(dom).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
			$(dom).after(divDom);
			$(dom).hide();
    	}
    }else if(list != null && dom == "#equipmentType"){
    	var equipmentTypeOption = $(dom).find("option");
    	var equipmentType = dataList.equipmentType + "";
    	console.log($(dom).find("option"),"设备下拉项")
    	console.log(equipmentType,"设备ID")
    	for(var i = 0; i < equipmentTypeOption.length; i++){
    		if ($(equipmentTypeOption[i]).val() == equipmentType) {
    			$(dom).val(equipmentType);
    			$(equipmentTypeOption[i]).attr("selected","selected");
    			$(dom).attr("data-name", $(dom).find("option:selected").attr("data-name"));
    		}
    	}
    	if (pageStatus == "0") {
    		var divDom = $("<div id='showEquipmentType'></div>");
			divDom.text($(dom).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
			$(dom).after(divDom);
			$(dom).hide();
    	}
    	$(dom).change(function() {
    		$("#equipmentBrand").html("<option value=''>请选择</option>");
    	})
    }else{    	
    	var equipmentBrandOption = $(dom).find("option");
    	var equipmentBrand = dataList.equipmentInfo + "";
    	console.log($(dom).find("option"),"设备品牌下拉项")
    	console.log(equipmentBrand,"设备品牌ID")
    	for(var i = 0; i < equipmentBrandOption.length; i++){
    		if ($(equipmentBrandOption[i]).val() == equipmentBrand) {
    			$(dom).val(equipmentBrand);
    			$(equipmentBrandOption[i]).attr("selected","selected");
    			$(dom).attr("data-name", $(dom).find("option:selected").attr("data-name"));
    		}
    	}
    	if (pageStatus == "0") {
    		var divDom = $("<div id='showEquipmentBrand'></div>");
			divDom.text($(dom).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
			$(dom).after(divDom);
			$(dom).hide();
    	}
    }
}

function formCheck(btnId){
	if ($("#applyTime").val() == "" || $("#applyUpdateTime").val() == "" || $("#repairMemo").val().trim() == "" || $("#applyHos").val() == "" || $("#applyDepartment").val() == "" || $("#applyDepartment").val() == "" || $("#equipmentType").val() == "" || $("#equipmentBrand").val() == "" || $("#checkTime").val() == "" || $("#equipmentPrice").val() == "" || $("#maintenanceUser").val() == "" || $("#items").val().trim() == "") {
		$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
	} else{
		$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
	}
}
//下拉框验证
function selectCheck(dom, tipDom, btnId){
//	$(dom).change(function() {
		if ($(dom).val() == "") {
			$(tipDom).show();
//			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else{
//			$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			$(tipDom).hide();
		}
		formCheck(btnId);
//	});
	
}
//输入框验证
function inputCheck(dom, tipDom, btnId){
//	$(dom).blur(function(){
		if ($(dom).val().trim() == "") {
			$(tipDom).show();
//			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else{
//			$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			$(tipDom).hide();
		}
		formCheck(btnId);
//	})
}
function inputCheck1(dom, tipDom, btnId, tipText){
	var posPattern = /^\d*\.?\d+$/;
//	$(dom).blur(function(){
		if ($(dom).val().trim() == "") {
			$(tipDom).show();
//			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else if(!posPattern.test($(dom).val().trim())){
//			$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			$(tipDom).html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>' + tipText);
			$(tipDom).show();
		}else{
			$(tipDom).hide();
		}
		formCheck(btnId);
//	})
}
//时间输入框验证
function dateInput(dom, tipDom, btnId){
	if ($(dom).val().trim() == "") {
		$(tipDom).show();
//		$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
	}else{
//		$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
		$(tipDom).hide();
	}
	formCheck(btnId);
}

function allFormCheck(status){
	console.log(status)
	if (status != undefined) {
		$("#applyTime").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#applyUpdateTime").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#repairMemo").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#applyHos").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#applyDepartment").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#equipmentType").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#equipmentBrand").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#checkTime").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#equipmentPrice").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#maintenanceUser").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
		$("#items").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk1");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk1");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk1");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk1");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk1");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk1", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk1");
			inputCheck("#items", "#itemsTip", "#saveOk1");
			formCheck("#saveOk1");
		});
	} else{
		$("#applyTime").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#applyUpdateTime").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#repairMemo").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#applyHos").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#applyDepartment").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#equipmentType").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#equipmentBrand").change(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#checkTime").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#equipmentPrice").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#maintenanceUser").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
		$("#items").blur(function(){
			inputCheck("#applyTime", "#applyTimeTip", "#saveOk");
			inputCheck("#applyUpdateTime", "#applyUpdateTimeTip", "#saveOk");
			inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			inputCheck("#checkTime", "#checkTimeTip", "#saveOk");
			inputCheck1("#equipmentPrice", "#equipmentPriceTip", "#saveOk", "价格填写错误！");
			inputCheck("#maintenanceUser", "#maintenanceUserTip", "#saveOk");
			inputCheck("#items", "#itemsTip", "#saveOk");
			formCheck("#saveOk");
		});
	}
}