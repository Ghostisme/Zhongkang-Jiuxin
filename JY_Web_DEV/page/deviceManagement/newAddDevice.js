//全局变量
var fileObj;
var user = JSON.parse(sessionStorage.getItem("user"));
var userId = sessionStorage.getItem('userId');
//var initHosIds = "";
var dataList;
var uPattern = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
var cnPattern = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{5,20}$/;
var posPattern = /^\d*\.?\d+$/;
//页面加载
$(document).ready(function(){
	//判断查看,新增,还是修改
	if (pageStatus != undefined) {
		//查看跟修改
		initData(id, pageStatus);
		allFormCheck(pageStatus);
		delClick("#saveOk1");
		addDom("#saveOk1");
	}else{
		delClick("#saveOk");
		addDom("#saveOk");
		disRemoveOninit();
		//新增
		$("#update").hide();
		$("#rightAddBtn").show();
		//初始图片交互
		$(".fileBox").find("div").hide();
		$(".fileBox").find(".addIcon").show();
		$(".fileBox").find(".chooseImg").show();
		//医院下拉执行
		applyreadHospitalBooking();
		//设备下拉执行
		checkeQuipmentType();
		allFormCheck(pageStatus);
		//设备品牌下拉执行
		getEquipmentData("#equipmentBrand", 1, "#equipmentBrand1", null, "设备品牌");
		//设备名称下拉
		getEquipmentData("#equipmentName", 3, "#equipmentName1", null, "设备名称");
		//设备型号下拉
		getEquipmentData("#equipmentModel", 2, "#equipmentModel", null, "设备型号");
		//检查项目下拉
		getEquipmentData1(".part", 4, ".part1", null, "检查项目");
		//项目及价格校验
		var projectArr = $("select[name='partId']");
		for(var i = 0; i < projectArr.length; i++){
			$(projectArr[i]).blur(function(){
				if ($(this).val() == "") {
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck("#saveOk");
			})
		}
		var priceArr = $("input[name='price']");
		for(var i = 0; i < priceArr.length; i++){
			$(priceArr[i]).blur(function(){
				if ($(this).val() == "") {
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(this).parent().next().show();
				}else if(!posPattern.test($(this).val())){
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck("#saveOk");
			})
		}
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
})
//初始查询数据
function initData(id, status){
	url = '/equipment/equipmentInfo/getEquipmentInfo';
	ajaxGet(url, {id : id}, function(res) {
		console.log(res,"175res");
		dataList = res.resultMap.equipmentInfo;
		fileObj = dataList.filePath;
		
		dataList.examinationPlace ? $("#inspectAddress").val(dataList.examinationPlace) : $("#inspectAddress").val("");
		console.log(dataList.buyTime)
		if (dataList.buyTime == null) {
			dataList.buyTime = "";
			$("#checkTime").val("");
		}else{
			dataList.buyTime = dataList.buyTime.split(".");
			dataList.buyTime = dataList.buyTime[0].split(" ");
			$("#checkTime").val(dataList.buyTime[0]);
		}
		var oWrapper = $(".oWrapper");
		var projectData = dataList.resultList;
//		console.log(projectData)
		if (projectData) {
			if(projectData.length > 1){				
				oWrapper.find(".f_div").find(".part").val(projectData[0].partId);
				oWrapper.find(".f_div").find(".price").val(projectData[0].price);
				getEquipmentData1((oWrapper.find(".f_div").find(".part")), 4, ".part1", projectData[0].partId, 0);
				var newProjectData = projectData.slice(1);
					//检查项目下拉
					
			
				newProjectData.map( (item, index) => {
					var oCloneDom = $(".boxTpl").clone().removeClass("boxTpl");
					oCloneDom.find(".f_div").find(".part").val(item.partId);
					oCloneDom.find(".f_div").find(".price").val(item.price);
					oWrapper.append(oCloneDom);
					removeloneDom("#saveOk1");
					//检查项目下拉
					getEquipmentData1((oCloneDom.find(".f_div").find(".part")), 4, ".part1", projectData, index);
				});
				
			}else{
				projectData.map( (item, index) => {
					oWrapper.find(".dataBox").eq(1).find(".f_div").find(".part").val(item.partId);
					oWrapper.find(".dataBox").eq(1).find(".f_div").find(".price").val(item.price);
					//检查项目下拉
					getEquipmentData1((oWrapper.find(".dataBox").eq(1).find(".f_div").find(".part")), 4, ".part1", projectData, index);
				});
				
			}
			//项目及价格校验
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
				$(projectArr[i]).blur(function(){
					if ($(this).val() == "") {
						$(this).parent().next().show();
					}else{
						$(this).parent().next().hide();
					}
					formCheck("#saveOk1");
				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
				$(priceArr[i]).blur(function(){
					if ($(this).val() == "") {
						$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(this).parent().next().show();
					}else if(!posPattern.test($(this).val())){
						$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(this).parent().next().show();
					}else{
						$(this).parent().next().hide();
					}
					formCheck("#saveOk1");
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
		//医院下拉执行
		applyreadHospitalBooking();
		//设备下拉执行
		checkeQuipmentType(dataList.type);		
		editInit(id, status);
		//设备品牌下拉执行
		getEquipmentData("#equipmentBrand", 1, "#equipmentBrand1", dataList.brankId, "设备品牌");
		//设备名称下拉
		getEquipmentData("#equipmentName", 3, "#equipmentName1", dataList.nameId, "设备名称");
		//设备型号下拉
		getEquipmentData("#equipmentModel", 2, "#equipmentModel", dataList.modelId, "设备型号");
		
	})
}
//医院下拉
function applyreadHospitalBooking(){
	$("#applyHos").selectpicker({liveSearchPlaceholder: "医院名称"});
	ajaxGet('/hospital/info/getHospitalOptionList',{},function(data){
//			console.log(data);
		if(data.status == "0"){
			$("#applyHos").append('<option value="">请选择</option>');
			var hospitalList = data.resultMap.hospitalList;
			if(data.resultMap.hospitalList.length > 0){
				$.each(hospitalList, function(i,val){  //遍历二维数组
	    			$("#applyHos").append(`<option data-name="` + val.hospitalName + `" value="` + val.id + `">` + val.hospitalName + `</option>`);
				})
				$("#applyHos").selectpicker('refresh');
  				$("#applyHos").selectpicker('render');
  				if (pageStatus != undefined && dataList != null) {
//					echoData(hospitalList, null, null);
					echoData2(hospitalList, "#applyHos", "hospital", dataList.hospitalId);
				}
			}
//			if ($("#applyHos").val() != "") {
//				applytechOfficeBooking($("#applyHos").val());			
//			}else{
//				$("#applyDepartment").html('');
//			}
			if($("#applyHos").val() == $("#applyHos").find("option").val()) {
				$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
			}
		}
	});
}
//科室联动下拉
function applytechOfficeBooking(selectHosId){
	$("#applyDepartment").selectpicker({liveSearchPlaceholder: "科室名称"});
	$("#applyDepartment").html('');
	ajaxGet('/hospital/section/getSectionList',{hospitalId: selectHosId},function(data){
//			console.log(data);
		if(data.status == "0"){			
			var sectionList = data.resultMap.sectionList;
			$("#applyDepartment").append('<option value="">请选择</option>');
//			$("#applyDepartment").html('');
			if(data.resultMap.sectionList.length > 0){
				$.each(sectionList, function(i,val){  //遍历二维数组
	    			$("#applyDepartment").append(`<option data-name="` + val.sectionName + `" value="` + val.id + `">` + val.sectionName + `</option>`);
				})
				$("#applyDepartment").selectpicker('refresh');
  				$("#applyDepartment").selectpicker('render');
  				if (pageStatus != undefined && dataList != null) {
					echoData2(sectionList, "#applyDepartment", null, dataList.sectionId);
				}
			}
			if($("#applyDepartment").val() == $("#applyDepartment").find("option").val()) {
				$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
			}
		}
	});
}
//设备类型下拉
$("#equipmentType").append('<option value="">请选择</option>');
function checkeQuipmentType(type) {
	if(user.fkHospitalId == null) {
		user.fkHospitalId = "";
	} else {
		user.fkHospitalId = user.fkHospitalId;
	}
	$("#equipmentType").selectpicker({liveSearchPlaceholder: "科室名称"});
	ajaxGet('/equipment/type/getEquipmentTypeList',{},function(data){
//			console.log(data);
		if(data.status == "0"){
			var list = data.resultMap.list;
			if(data.resultMap.list.length > 0){
				$.each(list, function(i,val){  //遍历二维数组					
	    			$("#equipmentType").append(`<option data-name="` + val.name + `" value="` + val.id + `">` + val.name + `</option>`);
				})
				$("#equipmentType").selectpicker('refresh');
  				$("#equipmentType").selectpicker('render');
  				if (pageStatus != undefined && dataList != null) {
					echoData2(list, "#equipmentType", null, type);
				}
			}
			if($("#equipmentType").val() == $("#equipmentType").find("option").val()) {
				$("#equipmentType").attr("data-name", $("#equipmentType").find("option:selected").attr("data-name"));
			}
		}
	});
}
var currentNum;
//设备品牌下拉框赋值
function getEquipmentData1(domId, type, showDom, listForId, num){
	$(domId).html('<option value="">请选择</option>');
	ajaxGet("/equipmentDict/dict/getEquipmentDictList", {type: type}, function(data){
		console.log("数据：：：", data);
		var equipmentList = data.resultMap.equipmentDictList;
//		if(equipmentList != null) {			
//			var equipmentHtml = '';
//			for(var s = 0; s < equipmentList.length; s++) {
//				equipmentHtml += '<option data-name="' + equipmentList[s].name + '" value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
//			}
//			$(domId).append(equipmentHtml);
//		}
		if (pageStatus != undefined && dataList != null) {
			if (typeof listForId != "number") {
				currentNum = num + 1;
	    		for(var i = currentNum; i < listForId.length; i++){
	    			if(equipmentList != null) {			
						for(var s = 0; s < equipmentList.length; s++) {
							var equipmentHtml = '';
							if (equipmentList[s].id == listForId[i].partId) {
								equipmentHtml += '<option data-name="' + equipmentList[s].name + '" selected value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
							} else{
								equipmentHtml += '<option data-name="' + equipmentList[s].name + '" value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
							}
							$(domId).append(equipmentHtml);
						}
					}
	    			
			    	if (pageStatus == "0") {
			    		var divDom = $("<div id=" + showDom + "></div>");
						divDom.text($(domId).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
						$(domId).after(divDom);
						$(domId).hide();
			    	}
			    	break;
	    		}
	    	}else{
				if(equipmentList != null) {			
					var equipmentHtml = '';
					for(var s = 0; s < equipmentList.length; s++) {
						if (equipmentList[s].id == listForId) {
							equipmentHtml += '<option data-name="' + equipmentList[s].name + '" selected value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
						} else{
							equipmentHtml += '<option data-name="' + equipmentList[s].name + '" value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
						}
					}
					$(domId).append(equipmentHtml);
				}
		    	if (pageStatus == "0") {
		    		var divDom = $("<div id=" + showDom + "></div>");
					divDom.text($(domId).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
					$(domId).after(divDom);
					$(domId).hide();
		    	}
	    	}
		}else{
			if(equipmentList != null) {			
				var equipmentHtml = '';
				for(var s = 0; s < equipmentList.length; s++) {
					equipmentHtml += '<option data-name="' + equipmentList[s].name + '" value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
				}
				$(domId).append(equipmentHtml);
			}
		}
	})
}

function getEquipmentData(domId, type, showDom, listForId, placeText){
	$(domId).selectpicker({liveSearchPlaceholder: placeText});
	ajaxGet('/equipmentDict/dict/getEquipmentDictList',{type: type},function(data){
//			console.log(data);
		if(data.status == "0"){
			$(domId).html('');
			var equipmentList = data.resultMap.equipmentDictList;
			$(domId).append('<option value="">请选择</option>');
			if(data.resultMap.equipmentDictList.length > 0){
				$.each(data.resultMap.equipmentDictList, function(i,val){  //遍历二维数组
	    			$(domId).append(`<option value="`+val.id+`">`+val.name+`</option>`);
				});
				$(domId).selectpicker('refresh');
  				$(domId).selectpicker('render');
  				if (pageStatus != undefined && dataList != null) {
					echoData2(equipmentList, domId, showDom, listForId);
				}
			}
		}
	});
}
//编辑查看初始
function editInit(id, status){
	
	//判断查看修改状态
	if (status == "0") {
		//查看		
		disOninit(id, status);
	}else{
		//修改
		$("#query").hide();
		$("#update").show();
		$("#rightAddBtn").show();
		$("#checkTime").removeAttr("disabled");			
	}
}
//查看函数限制输入
function disOninit(id, status){
	$("#applyHos").attr("disabled", "disabled").addClass("disabledData");
	$("#applyDepartment").attr("disabled", "disabled").addClass("disabledData");
	$("#equipmentType").attr("disabled", "disabled").addClass("disabledData");
	$("#equipmentName").attr("disabled", "disabled");
	$("#equipmentBrand").attr("disabled", "disabled");
	$("#equipmentModel").attr("disabled", "disabled");
	$("#inspectAddress").attr("disabled", "disabled");//地址
	$("#checkTime").attr("disabled", "disabled");
	$(".oWrapper").find(".f_div").find("input").attr("disabled", "disabled");
	$("#query").hide();
	$("#update").hide();
	$("#rightAddBtn").hide();	
}

function disRemoveOninit(){
	$("#applyHos").removeAttr("disabled", "disabled").removeClass("disabledData");
	$("#applyDepartment").removeAttr("disabled", "disabled").removeClass("disabledData");
	$("#equipmentType").removeAttr("disabled", "disabled").removeClass("disabledData");
	$("#equipmentName").removeAttr("disabled", "disabled");
	$("#equipmentBrand").removeAttr("disabled", "disabled");
	$("#equipmentModel").removeAttr("disabled", "disabled");
	$("#inspectAddress").removeAttr("disabled", "disabled");//地址
	$("#checkTime").removeAttr("disabled", "disabled");
	$(".oWrapper").find(".f_div").find("input").removeAttr("disabled", "disabled");
}
//检查项目删除函数
function removeloneDom(btnId){
	$(".delBtn").click(function(){		
		$(this).parent().remove();
		formCheck(btnId);
	});
}
//检查项目新增,删除函数
function addDom(btnId){
	var oWrapper = $(".oWrapper");
	$("#rightAddBtn").click(function(){	
		if ($(".boxTpl").find(".f_div").find(".partId").val() != "" || $(".boxTpl").find(".f_div").find(".price").val() != "") {
			$(".boxTpl").find(".f_div").find(".partId").val("");
			$(".boxTpl").find(".f_div").find(".price").val("");
		}
		var oCloneDom = $(".boxTpl").clone().removeClass("boxTpl");
		oWrapper.append(oCloneDom);
		var projectArr = $("select[name='partId']");
		for(var i = 0; i < projectArr.length; i++){
			$(projectArr[i]).blur(function(){
				if ($(this).val() == "") {
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck(btnId);
			})
		}
		var priceArr = $("input[name='price']");
		for(var i = 0; i < priceArr.length; i++){
			$(priceArr[i]).blur(function(){
				if ($(this).val() == "") {
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(this).parent().next().show();
				}else if(!posPattern.test($(this).val())){
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck(btnId);
			})
		}
		removeloneDom(btnId);
	})
}
//删除点击事件
function delClick(btnId) {
	$(".delIcon").click(function() {
		$(".fileBox").find("div").hide();
		$(".fileBox").find(".addIcon").show();
		$(".fileBox").find(".chooseImg").show();
		$(".fileBox").css({
			"border": "1px dashed #999"
		});
		fileObj = undefined;
		$("#equipmentFile").val("");
		$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		selectCheck("#equipmentFile", "#equipmentFileTip", "#saveOk");
	})
}
//新增保存
function saveEquipment() {
	var resJson = [];
	var dataArr = [];
	//判断表单数据是否为空
	var fromArray = $('#equipmentForm').serializeArray();
	fromArray.splice(8, 2);
	var formData = new FormData();
	formData.append("file", fileObj);
	formData.append("type", $("#equipmentType").val());
	formData.append("equipmentType", $("#equipmentType").find("option:selected").attr("data-name"));
//	console.log(fromArray)
	fromArray.map( (item, index) => {
		index < 8 ? formData.append("" + item.name, item.value) : dataArr.push(item);
	});	
	for(var i = 0 ; i < dataArr.length; i++){
		if(i % 2 == 0){
			var obj = {};
			obj.partId = dataArr[i].value;
			obj.price = dataArr[i+1].value;
			resJson.push(obj);
		}else{
			continue
		}
	}
	formData.append("resJson", JSON.stringify(resJson));
//	console.log(formData);
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
//修改保存
function updateEquipment() {
	var resJson = [];
	var dataArr = [];
	var fromArray = $('#equipmentForm').serializeArray();
	fromArray.splice(8, 2);
	var posPattern = /^\d+$/;
	var formData = new FormData();
	if(fileObj != undefined) formData.append('file', fileObj);
	formData.append("equipmentType", $("#equipmentType").find("option:selected").attr("data-name"));
//	console.log(fromArray)
	fromArray.map( (item, index) => {
		index < 8 ? formData.append("" + item.name, item.value) : dataArr.push(item);
	});	
	for(var i = 0 ; i < dataArr.length; i++){
		if(i % 2 == 0){
			var obj = {};
			obj.partId = dataArr[i].value;
			obj.price = dataArr[i+1].value;
			resJson.push(obj);
		}else{
			continue
		}
	}
	formData.append("resJson", JSON.stringify(resJson));
	formData.append("id", id);
//	console.log(formData);
	url = '/equipment/equipmentInfo/update';
	ajaxPost(url, formData, function(res) {
		alert(res.message);
		$("#equipmentFile").val("");
		if(res.status == "0") {
			location.reload();
		}
	})
}
//上传图片
function uploadImg() {	
	var url = null;
	sessionId = sessionStorage.getItem("sessionId");
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
function echoData1(list, domId, showDom, listForId){
	if (list != null) {
		console.log(list)
    	var listOption = $(domId).find("option");
    	if (typeof listForId != "string") {
    		console.log($(list),"asd")
    		listForId.map( item => {
    			var listId = item.partId + "";
    			console.log(listOption)
    			for(var i = 0; i < listOption.length; i++){
		    		if ($(listOption[i]).val() == listId) {
		    			$(domId).val(listId);
		    			$(listOption[i]).attr("selected","selected");
		    			$(domId).attr("data-name", $(domId).find("option:selected").attr("data-name"));
		    		}
		    	}
		    	if (pageStatus == "0") {
		    		var divDom = $("<div id=" + showDom + "></div>");
					divDom.text($(domId).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
					$(domId).after(divDom);
					$(domId).hide();
		    	}
    		})
    	}else{
    		var listId = listForId + "";
    		for(var i = 0; i < listOption.length; i++){
	    		if ($(listOption[i]).val() == listId) {
	    			$(domId).val(listId);
	    			$(listOption[i]).attr("selected","selected");
	    			$(domId).attr("data-name", $(domId).find("option:selected").attr("data-name"));
	    		}
	    	}
	    	if (pageStatus == "0") {
	    		var divDom = $("<div id=" + showDom + "></div>");
				divDom.text($(domId).find("option:selected").attr("data-name")).css({"margin-left":"12px"});
				$(domId).after(divDom);
				$(domId).hide();
	    	}
    	}
    	
    }
}
function echoData2(list, domId, showDom, listForId){
	var oldnumber = new Array();
	if (showDom == "hospital") {
		oldnumber.push(listForId);
	    applytechOfficeBooking(listForId);
	    $(domId).selectpicker('val', oldnumber);//默认选中
	    $(domId).selectpicker('refresh');
	}else{
		oldnumber.push(listForId);
	    $(domId).selectpicker('val', oldnumber);//默认选中
	    $(domId).selectpicker('refresh');
	}
}
//验证校验函数

function formCheck(btnId){
	var projectArr = $("select[name='partId']");
	var priceArr = $("input[name='price']");
	setTimeout(function(){
		for(var i = 0; i < projectArr.length; i++){
			if ($("#applyHos").val() == "" || $("#applyDepartment").val() == "" || $("#equipmentType").val() == "" || $("#equipmentModel").val() == "" || $(projectArr[i]).val() == "" || $(priceArr[i]).val() == "" || fileObj == undefined) {
				$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
			} else{
				$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			}
		}
	}, 0);
}

//下拉框验证
function selectCheck(dom, tipDom, btnId){
	if ($(dom).val() == "") {
		$(tipDom).show();
	}else{
		$(tipDom).hide();
	}
	formCheck(btnId);
}
function selectCheck1(dom, tipDom, btnId){
	if (fileObj == undefined) {
		$(tipDom).show();
	}else{
		$(tipDom).hide();
	}
	formCheck(btnId);
}
function allFormCheck(status){
	if (status != undefined) {
		$("#applyHos").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#applyDepartment").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentType").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentBrand").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentName").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentModel").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		
		$("#equipmentFile").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		
		var projectArr = $("select[name='partId']");
		for(var i = 0; i < projectArr.length; i++){
			$(projectArr[i]).change(function(){
				selectCheck("#applyHos", "#applyHosTip", "#saveOk");
				selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
				selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
				selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
				selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
				selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
				selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
				if ($(this).val() == "") {
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(this).parent().next().show();
				}else if(!posPattern.test($(this).val())){
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck("#saveOk");
				var priceArr = $("input[name='price']");
				for(var i = 0; i < priceArr.length; i++){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
				}
			})
		};
		
		var priceArr = $("input[name='price']");
		for(var i = 0; i < priceArr.length; i++){
			$(projectArr[i]).blur(function(){
				selectCheck("#applyHos", "#applyHosTip", "#saveOk");
				selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
				selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
				selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
				selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
				selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
				selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
				if ($(this).val() == "") {
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(this).parent().next().show();
				}else if(!posPattern.test($(this).val())){
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck("#saveOk");
				var projectArr = $("select[name='partId']");
				for(var i = 0; i < projectArr.length; i++){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
				}
			})
			
		}
	} else{
		$("#applyHos").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#applyDepartment").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentType").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentBrand").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentName").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
//				$(projectArr[i]).blur(function(){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
//				$(priceArr[i]).blur(function(){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
//				})
			}
		});
		$("#equipmentModel").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
				if ($(projectArr[i]).val() == "") {
					$(projectArr[i]).parent().next().show();
				}else{
					$(projectArr[i]).parent().next().hide();
				}
				formCheck("#saveOk");
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
				if ($(priceArr[i]).val() == "") {
					$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(priceArr[i]).parent().next().show();
				}else if(!posPattern.test($(priceArr[i]).val())){
					$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(priceArr[i]).parent().next().show();
				}else{
					$(priceArr[i]).parent().next().hide();
				}
				formCheck("#saveOk");
			}
		});
		
		$("#equipmentFile").change(function(){
			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
			selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
			selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
			selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
			selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
			var projectArr = $("select[name='partId']");
			for(var i = 0; i < projectArr.length; i++){
				if ($(projectArr[i]).val() == "") {
					$(projectArr[i]).parent().next().show();
				}else{
					$(projectArr[i]).parent().next().hide();
				}
				formCheck("#saveOk");
			}
			var priceArr = $("input[name='price']");
			for(var i = 0; i < priceArr.length; i++){
				if ($(priceArr[i]).val() == "") {
					$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(priceArr[i]).parent().next().show();
				}else if(!posPattern.test($(priceArr[i]).val())){
					$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(priceArr[i]).parent().next().show();
				}else{
					$(priceArr[i]).parent().next().hide();
				}
				formCheck("#saveOk");
			}
		});
		
		var projectArr = $("select[name='partId']");
		for(var i = 0; i < projectArr.length; i++){
			$(projectArr[i]).change(function(){
				selectCheck("#applyHos", "#applyHosTip", "#saveOk");
				selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
				selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
				selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
				selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
				selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
				selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
				if ($(this).val() == "") {
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(this).parent().next().show();
				}else if(!posPattern.test($(this).val())){
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck("#saveOk");
				var priceArr = $("input[name='price']");
				for(var i = 0; i < priceArr.length; i++){
					if ($(priceArr[i]).val() == "") {
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
						$(priceArr[i]).parent().next().show();
					}else if(!posPattern.test($(priceArr[i]).val())){
						$(priceArr[i]).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
						$(priceArr[i]).parent().next().show();
					}else{
						$(priceArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
				}
			})
		};
		
		var priceArr = $("input[name='price']");
		for(var i = 0; i < priceArr.length; i++){
			$(projectArr[i]).blur(function(){
				selectCheck("#applyHos", "#applyHosTip", "#saveOk");
				selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
				selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
				selectCheck("#equipmentBrand", "#equipmentBrandTip", "#saveOk");
				selectCheck("#equipmentName", "#equipmentNameTip", "#saveOk");
				selectCheck("#equipmentModel", "#equipmentModelTip", "#saveOk");
				selectCheck1("#equipmentFile", "#equipmentFileTip", "#saveOk");
				if ($(this).val() == "") {
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>必填');
					$(this).parent().next().show();
				}else if(!posPattern.test($(this).val())){
					$(this).parent().next().html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>价格填写错误！');
					$(this).parent().next().show();
				}else{
					$(this).parent().next().hide();
				}
				formCheck("#saveOk");
				var projectArr = $("select[name='partId']");
				for(var i = 0; i < projectArr.length; i++){
					if ($(projectArr[i]).val() == "") {
						$(projectArr[i]).parent().next().show();
					}else{
						$(projectArr[i]).parent().next().hide();
					}
					formCheck("#saveOk");
				}
			})
		}
	}
}
