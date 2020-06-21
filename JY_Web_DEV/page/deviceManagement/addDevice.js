//全局变量
var fileObj;
var user = JSON.parse(sessionStorage.getItem("user"));
var userId = sessionStorage.getItem('userId');
//var initHosIds = "";
var dataList;
var uPattern = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
var cnPattern = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{5,20}$/;
var posPattern = /^\d*\.?\d+$/;
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
			if ($("#applyHos").val() != "") {
				applytechOfficeBooking($("#applyHos").val());			
			}else{
				$("#applyDepartment").html('<option value="">请选择</option>');
			}
			if($("#applyHos").val() == $("#applyHos").find("option").val()) {
				$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
			}
		}
	});
//	$("#applyHos").html('<option value="">请选择</option>');
//	ajaxGet("/hospital/info/getHospitalOptionList", {}, function(data){
////		console.log("医院数据：：：", data);
//		var hospitalList = data.resultMap.hospitalList;
//		if(hospitalList != null) {			
//			var hospitalHtml = '';
//			for(var s = 0; s < hospitalList.length; s++) {
//				hospitalHtml += '<option data-name="' + hospitalList[s].hospitalName + '" value="' + hospitalList[s].id + '">' + hospitalList[s].hospitalName + '</option>';
//			}
//			$("#applyHos").append(hospitalHtml);
//		}
//		if($("#applyHos").val() == $("#applyHos").find("option").val()) {
//			$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
//		}
////		if(userId != 1) {
////			$("#applyHos").val(user.deptId);
////			$("#applyHos").attr("disabled", "disabled");
//////			initHosIds = user.deptId;
////		}
//		if ($("#applyHos").val() != "") {
//			applytechOfficeBooking($("#applyHos").val());			
//		}else{
//			$("#applyDepartment").html('<option value="">请选择</option>');
//		}
//		if (pageStatus != undefined && dataList != null) {
//			echoData(hospitalList, null, null);
//		}
////		else{
////			selectCheck("#applyHos", "#applyHosTip", "#saveOk");
////		}
//		
//	})
}
//科室联动下拉
function applytechOfficeBooking(selectHosId){
	$("#applyDepartment").selectpicker({liveSearchPlaceholder: "科室名称"});
	ajaxGet('/hospital/section/getSectionList',{hospitalId: selectHosId},function(data){
//			console.log(data);
		if(data.status == "0"){			
			var sectionList = data.resultMap.sectionList;
			$("#applyDepartment").append('<option value="">请选择</option>');
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
//	$("#applyDepartment").html('<option value="">请选择</option>');
//	ajaxGet("/hospital/section/getSectionList", {hospitalId: selectHosId}, function(data){
////		console.log(data);
//		if(data.status == "0") {
//			var sectionList = data.resultMap.sectionList;
//			if(sectionList != null) {				
//				for(var t = 0; t < sectionList.length; t++) {
//					var techOfficeHtml = '';
//					techOfficeHtml += '<option data-name="' + sectionList[t].sectionName + '" value="' + sectionList[t].id + '">' + sectionList[t].sectionName + '</option>';
//					$("#applyDepartment").append(techOfficeHtml);
//				}
//			}
//			if($("#applyDepartment").val() == $("#applyDepartment").find("option").val()) {
//				$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
//			}
////			if(userId != 1) {
////				$("#applyDepartment").val(user.fkSectionId);
////				$("#applyDepartment").attr("disabled", "disabled");
////			}
//		}
//		if (pageStatus != undefined && dataList != null) {
//			echoData(null, sectionList, null);
//		}
////		else{
////			selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk");
////		}
//	})
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
//			$("#equipmentType").append(`<option data-name="" value="">请选择</option>`);
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
//	$("#equipmentType").html("<option value=''>请选择</option>");
//	ajaxGet('/equipment/type/getEquipmentTypeList', {}, function(resData) {
//		var rm = resData.resultMap.list;
////		console.log("设备类型", rm);
//		if(rm != null) {
//			for(var s = 0; s < rm.length; s++) {
//				var equipmentTypeHtml = '';
//				equipmentTypeHtml += '<option data-name="' + rm[s].name + '" value="' + rm[s].id + '">' + rm[s].name + '</option>';
//				$("#equipmentType").append(equipmentTypeHtml);
//			}
//		}
//		if (pageStatus != undefined && dataList != null) {
//			echoData(null, null, rm);
//		}
////		else{
////			selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk");
////		}
//	});
}
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
		console.log(projectData)
		if (projectData) {
			if(projectData.length > 1){				
				oWrapper.find(".f_div").find(".part").val(projectData[0].partId);
				oWrapper.find(".f_div").find(".price").val(projectData[0].price);
				var newProjectData = projectData.slice(1);
				newProjectData.map( item => {
					var oCloneDom = $(".boxTpl").clone().removeClass("boxTpl");
					oCloneDom.find(".f_div").find(".part").val(item.partId);
					oCloneDom.find(".f_div").find(".price").val(item.price);
					oWrapper.append(oCloneDom);
					removeloneDom("#saveOk1");
				});
				//检查项目下拉
				getEquipmentData1(".oWrapper .f_div .part", 4, ".part1", projectData, "检查项目");
			}else{
				projectData.map( item => {
					oWrapper.find(".dataBox").eq(1).find(".f_div").find(".part").val(item.partId);
					oWrapper.find(".dataBox").eq(1).find(".f_div").find(".price").val(item.price);
				});
				//检查项目下拉
//				getEquipmentData1(".oWrapper .f_div .part", 4, ".part1", projectData, "检查项目");
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
//		dataList.name ? $("#equipmentName").val(dataList.name) : $("#equipmentName").val("");
//		dataList.brank ? $("#equipmentBrand").val(dataList.brank) : $("#equipmentBrand").val("");
//		dataList.model ? $("#equipmentModel").val(dataList.model) : $("#equipmentModel").val("");
		//设备品牌下拉执行
		getEquipmentData("#equipmentBrand", 2, "#equipmentBrand1", dataList.brankId, "设备品牌");
		//设备名称下拉
		getEquipmentData("#equipmentName", 1, "#equipmentName1", dataList.equipmentId, "设备名称");
		//设备型号下拉
		getEquipmentData("#equipmentModel", 3, "#equipmentModel", dataList.modelId, "设备型号");
		
	})
}


//页面加载
$(document).ready(function(){
	//图片删除按钮点击
	
	//检查项目新增项,删除项交互
	
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
		getEquipmentData("#equipmentBrand", 2, "#equipmentBrand1", null, "设备品牌");
		//设备名称下拉
		getEquipmentData("#equipmentName", 1, "#equipmentName1", null, "设备名称");
		//设备型号下拉
		getEquipmentData("#equipmentModel", 3, "#equipmentModel", null, "设备型号");
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
//设备品牌下拉框赋值
function getEquipmentData1(domId, type, showDom, listForId){
	$(domId).html('<option value="">请选择</option>');
	ajaxGet("/equipmentDict/dict/getEquipmentDictList", {type: type}, function(data){
		console.log("数据：：：", data);
		var equipmentList = data.resultMap.equipmentDictList;
		if(equipmentList != null) {			
			var equipmentHtml = '';
			for(var s = 0; s < equipmentList.length; s++) {
				equipmentHtml += '<option data-name="' + equipmentList[s].name + '" value="' + equipmentList[s].id + '">' + equipmentList[s].name + '</option>';
			}
			$(domId).append(equipmentHtml);
		}
//		if($(domId).val() == $(domId).find("option").val()) {
//			$(domId).attr("data-name", $(domId).find("option:selected").attr("data-name"));
//		}
		if (pageStatus != undefined && dataList != null) {
			echoData1(equipmentList, domId, showDom, listForId);
		}
	})
}
function getEquipmentData(domId, type, showDom, listForId, placeText){
//	if (domId == ".part") {
//		var dom = $(domId);
//		console.log(dom)
////		var num = 0;
//		dom.map( (index, item ) => {
//			$(item).attr("id", ("part" + index ));
//			$( ("#part" + index ) ).selectpicker({liveSearchPlaceholder: placeText});
//			ajaxGet('/equipmentDict/dict/getEquipmentDictList',{type: type},function(data){
////				console.log(data);
//				if(data.status == "0"){
//					$( ("#part" + index ) ).html('');
//					if(data.resultMap.equipmentDictList.length > 0){
//						$.each(data.resultMap.equipmentDictList, function(i,val){  //遍历二维数组
//			    			$( ("#part" + index ) ).append(`<option value="`+val.name+`">`+val.name+`</option>`);
//						})
//						$( ("#part" + index ) ).selectpicker('refresh');
//		  				$( ("#part" + index ) ).selectpicker('render');
//					};
//				};
//				
//			});
////			console.log(num);
//		})
//		
//	}else{
		
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
//	}
	
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
//	$("#applyHos").attr("disabled", "disabled");
//	$("#applyDepartment").attr("disabled", "disabled");
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
//	$("#applyHos").attr("disabled", "disabled");
//	$("#applyDepartment").attr("disabled", "disabled");
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
//	var num = 2;
	$("#rightAddBtn").click(function(){	
		if ($(".boxTpl").find(".f_div").find(".partId").val() != "" || $(".boxTpl").find(".f_div").find(".price").val() != "") {
			$(".boxTpl").find(".f_div").find(".partId").val("");
			$(".boxTpl").find(".f_div").find(".price").val("");
		}
//		$(".boxTpl").find(".part").removeAttr("id");
//		num++;
//		$(".boxTpl").find(".part").attr("id", ("part" + num ));
		var oCloneDom = $(".boxTpl").clone().removeClass("boxTpl");		
//		console.log(oCloneDom,"oCloneDom")
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
		//检查项目下拉
//		getEquipmentData(".part", 4, ".part1", null, "检查项目");
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
	//非空验证
//	if(fromIsNull(fromArray)) {
//		return;
//	}
	var formData = new FormData();
//	if(fileObj == undefined){
//		$(tipDom).show();
//		$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
//		alert('请上传设备图片！');
//		return;
//	}
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
//			console.log(obj)
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
		if(item['name'] == "partId" || item['name'] == "price") {
			c++;
		}
	});
	if(flag || c == 0) {
		alert('表单信息不可为空');
		return true;
	}
	return false;
}

//修改保存
function updateEquipment() {
	var resJson = [];
	var dataArr = [];
	var fromArray = $('#equipmentForm').serializeArray();
	fromArray.splice(8, 2);	
	//非空验证
//	if(fromIsNull(fromArray)) {
//		return;
//	}
	
	var posPattern = /^\d+$/;
	var formData = new FormData();
//	if(fileObj != undefined) {
//		formData.append('file', fileObj);	
//	}else{
//		alert("请上传设备图片！");
//		return;
//	}
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
//			console.log(obj)
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
//	    $("#equipmentFileTip").hide();
	} else if (window.URL != undefined) {  
	    url = window.URL.createObjectURL(fileObj); 
//	    $("#equipmentFileTip").hide();
	} else if (window.webkitURL != undefined) {  
	    url = window.webkitURL.createObjectURL(fileObj); 
//	    $("#equipmentFileTip").hide();
	}
//	else{
//		$("#equipmentFileTip").show();
//	}
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

//下拉数据回显
function echoData(hospitalList, sectionList, equipmentTypeList){
	//下拉赋值
//	console.log(dataList,"查询数据项");
	//医院下拉
	if (hospitalList != null) {
    	var hospitalOption = $("#applyHos").find("option");
    	var hospitalId = dataList.hospitalId + "";
//  	console.log($("#applyHos").find("option"),"医院下拉项")
//  	console.log(hospitalId,"医院ID")
    	for(var i = 0; i < hospitalOption.length; i++){
    		if ($(hospitalOption[i]).val() == hospitalId) {
    			$("#applyHos").val(hospitalId);
    			$(hospitalOption[i]).attr("selected","selected");
    			$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));
    		}
    	}
    	if (pageStatus == "0") {
    		var divDom = $("<div id='showHospital'></div>");
			divDom.text($("#applyHos").find("option:selected").attr("data-name")).css({"margin-left":"12px"});
			$("#applyHos").after(divDom);
			$("#applyHos").hide();
    	}
//		selectCheck("#applyHos", "#applyHosTip", "#saveOk1");
    	applytechOfficeBooking(dataList.hospitalId);
    }
	//科室下拉
	if (sectionList != null) {
    	var sectionOption = $("#applyDepartment").find("option");
    	var sectionId = dataList.sectionId + "";
//  	console.log($("#applyDepartment").find("option"),"科室下拉项")
//  	console.log(sectionId,"科室ID")
    	for(var i = 0; i < sectionOption.length; i++){
    		if ($(sectionOption[i]).val() == sectionId) {
    			$("#applyDepartment").val(sectionId);
    			$(sectionOption[i]).attr("selected","selected");
    			$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
    		}
    	}
    	if (pageStatus == "0") {
    		var divDom = $("<div id='showSection'></div>");
			divDom.text($("#applyDepartment").find("option:selected").attr("data-name")).css({"margin-left":"12px"});
			$("#applyDepartment").after(divDom);
			$("#applyDepartment").hide();
    	}
//  	selectCheck("#applyDepartment", "#applyDepartmentTip", "#saveOk1");
    }
	//设备下拉
	if (equipmentTypeList != null) {
    	var equipmentTypeOption = $("#equipmentType").find("option");
    	var equipmentType = dataList.type + "";
//  	console.log($("#equipmentType").find("option"),"设备下拉项")
//  	console.log(equipmentType,"设备ID")
    	for(var i = 0; i < equipmentTypeOption.length; i++){
    		if ($(equipmentTypeOption[i]).val() == equipmentType) {
    			$("#equipmentType").val(equipmentType);
    			$(equipmentTypeOption[i]).attr("selected","selected");
    			$("#equipmentType").attr("data-name", $("#equipmentType").find("option:selected").attr("data-name"));
    		}
    	}
//  	selectCheck("#equipmentType", "#equipmentTypeTip", "#saveOk1");
    }
//	editInit(id, pageStatus);
}
function echoData1(list, domId, showDom, listForId){
//	console.log(listForId,"dom")
	if (list != null) {
    	var listOption = $(domId).find("option");
//  	console.log(listOption)
    	
    	if (typeof listForId != "string") {
    		console.log(listForId,"asd")
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
//	console.log(showDom,'805')
//	applytechOfficeBooking(dataList.hospitalId);
	if (showDom == "hospital") {
//		var hospitalId = "";
//		$.each(list, function (i) {
//			hospitalId = list[i].id;
//      	oldnumber.push(list[i].id);
//	    });
		oldnumber.push(listForId);
	    applytechOfficeBooking();
	    $(domId).selectpicker('val', oldnumber);//默认选中
	    $(domId).selectpicker('refresh');
	}else{
//		$.each(list, function (i) {
//      	oldnumber.push(list[i].id);
//	    });
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
function selectCheck1(dom, tipDom, btnId){
//	$(dom).change(function() {
//		console.log(fileObj, "图片数据")
//		console.log(fileObj == undefined)
//		console.log(fileObj == undefined || $(dom).val() == "")
		if (fileObj == undefined) {
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
		if ($(dom).val() == "") {
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
//	$(dom).blur(function(){
		if ($(dom).val() == "") {
			$(tipDom).show();
//			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else if(!posPattern.test($(dom).val())){
			$(tipDom).html('<i class="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>' + tipText);
			$(tipDom).show();
//			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else{
//			$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			$(tipDom).hide();
		}
		formCheck(btnId);
//	})
	
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
		
	}
	
}
