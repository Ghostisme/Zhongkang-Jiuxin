//页面加载完毕执行函数
$(document).ready(function(){
	delClick();
	applyreadHospitalBooking();
	//设备类型数据
	checkeQuipmentType(function() {
		if ($("#equipmentType").val() == "") {
			$("#equipmentBrand").html('<option value="">请选择</option>').attr("disabled","disabled").css("cssText","width:514px;background-color:#f5f5f5 !important");
		}else{
			$("#equipmentBrand").removeAttr("disabled");
			$("#equipmentBrand").removeAttr("style");
			$("#equipmentBrand").css("width","514px");			
		}
		if ($("#applyHos").val() != "" && $("#equipmentType").val() != "") {
			equipmentTypeData($("#applyHos").val(), $("#equipmentType").val())
		}
	});
	if (pageStatus != undefined) {
		editInit(id, pageStatus);
	}else{
		$("#update").hide();
		$("#rightAddBtn").show();
		
	}
//	console.log($("#repairMemo"))
//	$("#repairMemo").blur(function(){
//		console.log($(this).val().trim())
//		if($(this).val().trim() == ""){
//			alert("qwe")
//		}
//	})
//	inputCheck("#repairMemo", "#repairMemoTip", "#saveOk");
	$("#applyHos").change(function() {
		//联动查询 此医院下的科室
		$("#applyHos").attr("data-name", $("#applyHos").find("option:selected").attr("data-name"));	
		if ($("#applyHos").val() == "") {
			$("#applyDepartment").html('<option value="">请选择</option>').attr("disabled","disabled").css("cssText","width:200px;background-color:#f5f5f5 !important");
		} else{
			$("#applyDepartment").removeAttr("disabled");
			$("#applyDepartment").removeAttr("style");
			$("#applyDepartment").css("width","200px");
			applytechOfficeBooking($("#applyHos").val());
		}
	});
	$("#equipmentType").change(function() {
		if ($("#equipmentType").val() == "") {
			$("#equipmentBrand").html('<option value="">请选择</option>').attr("disabled","disabled").css("cssText","width:514px;background-color:#f5f5f5 !important");
		}else{
			$("#equipmentBrand").removeAttr("disabled");
			$("#equipmentBrand").removeAttr("style");
			$("#equipmentBrand").css("width","514px");			
		}
		data = {
			hospitalId: $("#applyHos").val(),
			type: $("#equipmentType").val()
		}
		equipmentTypeData(data, "#equipmentType");
	})
	//指定医院选择 联动医生
	$("#applyDepartment").change(function() {
		//联动查询 此医院下的医生
		applytheDoctorBooking($("#applyDepartment").val());
	});
	$(".fileBox").find("div").hide();
	$(".fileBox").find(".addIcon").show();
	$(".fileBox").find(".chooseImg").show();
	
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
	//科室下拉
	$("#applyDepartment").change(function() {
		$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
	})
})


//医院下拉
//指定医院下拉框 初始化
function applyreadHospitalBooking() {
	ajaxGet("/hospital/info/getHospitalOptionList", {}, function(data){
		console.log("医院数据：：：", data);
		var hospitalList = data.resultMap.hospitalList;
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
//		if(userId != 1) {
//			$("#applyHos").val(user.deptId);
//			$("#applyHos").attr("disabled", "disabled");
//			initHosIds = user.deptId;
//		}
		if ($("#applyHos").val() != "") {
			applytechOfficeBooking($("#applyHos").val());
			$("#applyDepartment").removeAttr("disabled");
			$("#applyDepartment").removeAttr("style");
			$("#applyDepartment").css("width","200px");	
		}else{
			$("#applyDepartment").html('<option value="">请选择</option>').attr("disabled","disabled").css("cssText","width:200px;background-color:#f5f5f5 !important");
		}
		if(edit_eqt_index != "") {
			initHosIds = equipmentList[edit_eqt_index].hospitalId;
		} else {
			initHosIds = $("#applyHos").val();
		}
	})
}

//科室下拉
function applytechOfficeBooking(selectHosId) { //参数为当前选择上的医院的id和科室的select的id
	ajaxGet("/hospital/section/getSectionList", {hospitalId: selectHosId}, function(data){
//		console.log(data);
		if(data.status == "0") {
			var sectionList = data.resultMap.sectionList;
			if(sectionList != null) {
				$("#applyDepartment").html('<option value="">请选择</option>');
				for(var t = 0; t < sectionList.length; t++) {
					var techOfficeHtml = '';
					techOfficeHtml += '<option data-name="' + sectionList[t].sectionName + '" value="' + sectionList[t].id + '">' + sectionList[t].sectionName + '</option>';
					$("#applyDepartment").append(techOfficeHtml);
				}
			}
			if($("#applyDepartment").val() == $("#applyDepartment").find("option").val()) {
				$("#applyDepartment").attr("data-name", $("#applyDepartment").find("option:selected").attr("data-name"));
			}
//			if(userId != 1) {
//				$("#applyDepartment").val(user.fkSectionId);
//				$("#applyDepartment").attr("disabled", "disabled");
//			}
		}
	})
}

//设备类型下拉
function checkeQuipmentType() {
	if(user.fkHospitalId == null) {
		user.fkHospitalId = "";
	} else {
		user.fkHospitalId = user.fkHospitalId;
	}
	ajaxGet('/equipment/type/getEquipmentTypeList', {}, function(resData) {
		var rm = resData.resultMap.list;
		$("#equipmentType").html('<option value="">请选择</option>');
//		console.log("设备类型", rm);
		if(rm != null) {
			for(var s = 0; s < rm.length; s++) {
				var equipmentTypeHtml = '';
				equipmentTypeHtml += '<option data-name="' + rm[s].name + '" value="' + rm[s].id + '">' + rm[s].name + '</option>';
				$("#equipmentType").append(equipmentTypeHtml);
			}
		}
	});
}


//下拉框验证
function selectCheck(dom, tipDom, btnId){
	$(dom).change(function() {
		if ($(dom).val() == "") {
			$(tipDom).show();
			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else{
			$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			$(tipDom).hide();
		}
	});
}
//输入框验证
function inputCheck(dom, tipDom, btnId){
	$(dom).blur(function(){
		if ($(dom).val().trim() == "") {
			$(tipDom).show();
			$(btnId).attr("disabled","disabled").addClass("formDisabledBtn");
		}else{
			$(btnId).removeAttr("disabled").removeClass("formDisabledBtn");
			$(tipDom).hide();
		}
	})
}