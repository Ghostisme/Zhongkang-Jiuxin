		//			点击搜索按钮
		$(document).on("click", ".searching", function() {
			var search = $("#searchBox").val().trim();
		});
		//		点击查询按钮
//		$(document).on("click", ".btn-check", function() {
//			var lookDoctorInfoUserTypeId=$(this).parent().parent().find('.doctorInfoType').text();
//			var lookDoctorInfoUserType;
//			var lookdoctorInfofkHospitalName=$(this).parent().parent().find(".doctorInfofkHospitalName").text();//医院名称
//			var lookdoctorInfofkSectionName=$(this).parent().parent().find(".doctorInfofkSectionName").text();//科室名称
//			var lookdoctorInfofkDeptName=$(this).parent().parent().find(".doctorInfoDetail-name").text();//部门名称
//			var lookdoctorInfofkHospitalId=$(this).parent().parent().find(".doctorInfofkHospitalId").text();//医院id
//			var lookdoctorInfofkSectionId=$(this).parent().parent().find(".doctorInfofkSectionId").text();//科室id
//			var lookdoctorInfofkDeptId=$(this).parent().parent().find(".doctorInfofkDeptId").text();//部门id
//			var lookdoctorInfoUserName=$(this).parent().parent().find(".doctorInfoDetail-id span").text();//用户名
//			var lookdoctorInfoTels=$(this).parent().parent().find(".doctorInfoDetail-tel span").text();//用户电话
//			var lookdoctorInfoDetails=$(this).parent().parent().find(".doctorDescript span").text();//医生描述
//			var adminIds=JSON.parse($(this).parent().parent().find(".hosHiddenIds").text());
//			if($(this).parent().parent().find(".roleIds").text()!=''&&$(this).parent().parent().find(".roleIds").text()!=null){
//				var roleIds=JSON.parse($(this).parent().parent().find(".roleIds").text());
//				var lookOrganize=$("#lookOrganize").find(".adminHosId");
//				for(var k=0;k<adminIds.length;k++){
//					for(var i=0;i<lookOrganize.length;i++){
//						
//						if(adminIds[k]==$(lookOrganize[i]).text()){
//							$(lookOrganize[i]).next('input').prop("checked",'checked');
//						}
//					}
//				}
//				var hasRole=0;
//				console.log(roleIds);
//				for(var f=0;f<roleIds.length;f++){
//					if(roleIds[f]==10){
//						hasRole++;
//					}
//				}
//				if(hasRole>0){//10为运营人员
//					$(".lookAdminOrganize").css("display","block");
//				}else{
//					$(".lookAdminOrganize").css("display","none");
//				}
//			}else{
//				$(".lookAdminOrganize").css("display","none");
//			}
//
//			$("#lookDoctorInfoUserType").val(lookDoctorInfoUserType);
//			$("#lookDoctorInfoHospName").val(lookdoctorInfofkHospitalName);//医院
//			$("#lookDoctorInfoTechOffice").val(lookdoctorInfofkSectionName);//科室
//			$("#lookDoctorInfoDept").val(lookdoctorInfofkDeptName);//部门
//			$("#lookDoctorInfoUserName").val(lookdoctorInfoUserName);//用户名
//			$("#lookDoctorInfoTel").val(lookdoctorInfoTels);//电话
//			$("#lookDoctorInfoDetail").val(lookdoctorInfoDetails);//描述
//			$("#doctorlight1").fadeIn();
//			$("#fade").fadeIn();
//			$("#doctorlight1 input").attr("disabled",true);
//			$("#doctorlight1 textarea").attr("disabled",true);
//		});
		//查询日汇总
		$(document).on("click", ".checkDayData", function() {
			sessionStorage.setItem("jumpFormHosToDayCheck","1");
			console.log($(this).parent().parent().find(".currentLineHosName span").text());
			var dayCheckObj={
				hosId:$(this).parent().parent().find(".doctorInfoListId").text(),
				hosName:$(this).parent().parent().find(".currentLineHosName span").text()
			}
			sessionStorage.setItem("dayCheckHosInfo",JSON.stringify(dayCheckObj));
			RefreshIframe('page/operationDataAdmin/daySumNew/dailySummaryList.html','154');
		});
		//查询日汇总
		$(document).on("click", ".checkMonthData", function() {
			sessionStorage.setItem("jumpFormHosToDayCheck","2");
			console.log($(this).parent().parent().find(".currentLineHosName span").text());
			var monthCheckObj={
				hosId:$(this).parent().parent().find(".doctorInfoListId").text(),
				hosName:$(this).parent().parent().find(".currentLineHosName span").text()
			}
			sessionStorage.setItem("monthCheckHosInfo",JSON.stringify(monthCheckObj));
			RefreshIframe('page/operationDataAdmin/monthSumNew/monthSummaryList.html','153');
		});
		//		点击删除按钮
		$(document).on("click", ".btn-del", function() {
			$(".delHiddenListId").text($(this).parent().parent().find(".doctorInfoListId").text());
			$("#doctorlight2").fadeIn();
			$("#fade").fadeIn();
		});
		//		点击新增按钮
		var selectHosId; //定义新增默认选择的医院的id;
		var deptPid = 0; //定义新增默认选择的部门第一层pid为0
		var deptChoseName;//新增里的默认选择的部门名称
//		$(".doctorBtnAdd").click(function() {
//			$("#doctorlight4").fadeIn();
//			$("#fade").fadeIn();
//			var doctorDivIds = $("#addDoctorInfoHspName").attr("id"); //获取当前添加医生信息里医院选项的select的id
//			//			读取医院信息
//			readHospital(doctorDivIds);
//			//			读取部门信息
//			var doctorSelectDeptIds = $("#addDoctorInfoDeptLay").attr("id");
//			readDept(doctorSelectDeptIds, deptPid);
//			$("#addDoctorInfoDocName").val(" ");
//			$("#addDoctorInfoDocTel").val(" ");
//		});
		//            点击新增按钮
    $(document).on('click','.doctorBtnAdd',function(){
        parent.layer.open({
			    type: 2,
			    title: '新增',
			    shadeClose: true,
			    shade: [0.5],
			    maxmin: true, //开启最大化最小化按钮
			    area: ['1000px', '550px'],
			    content: './page/hosAdmin/addHosAdmin.html'
			});
    });
//  点击编辑按钮
	$(document).on('click','.btn-change',function(){
		var listId=$(this).parent().parent().find('.doctorInfoListId').text();
		localStorage.setItem("doctorInfoEditId",listId)
		localStorage.removeItem("jumpFromHosClick");
        parent.layer.open({
			    type: 2,
			    title: '编辑',
			    shadeClose: true,
			    shade: [0.5],
			    maxmin: true, //开启最大化最小化按钮
			    area: ['1000px', '550px'],
			    content: './page/hosAdmin/editHosAdmin.html'
			});
    });
//  点击医院
	$(document).on('click','.currentHosNameBtn',function(){
		var listId=$(this).parent().parent().find('.doctorInfoListId').text();
		localStorage.setItem("doctorInfoEditId",listId);
		localStorage.setItem("jumpFromHosClick",0);
        parent.layer.open({
			    type: 2,
			    title: '编辑',
			    shadeClose: true,
			    shade: [0.5],
			    maxmin: true, //开启最大化最小化按钮
			    area: ['1000px', '550px'],
			    content: './page/hosAdmin/editHosAdmin.html'
			});
    });
		//点击修改按钮
		var changeInfoSelectHosId; //定义新增默认选择的医院的id;
		var changeInfodeptPid = 0; //定义新增默认选择的部门第一层pid为0
		var changeInfodeptChoseName;//新增里的默认选择的部门名称
		var changeInfoCurrentId;
//$(document).on("click", ".btn-change", function() {
//			var changeDoctorInfoUserTypeId=$(this).parent().parent().find('.doctorInfoType').text();
//			var changeDoctorInfoUserType;
//			var changedoctorInfofkHospitalName=$(this).parent().parent().find(".doctorInfofkHospitalName").text();//医院名称
//			var changedoctorInfofkSectionName=$(this).parent().parent().find(".doctorInfofkSectionName").text();//科室名称
//			var changedoctorInfofkDeptName=$(this).parent().parent().find(".doctorInfoDetail-name").text();//部门名称
//			var changedoctorInfofkHospitalId=$(this).parent().parent().find(".doctorInfofkHospitalId").text();//医院id
//			var changedoctorInfofkSectionId=$(this).parent().parent().find(".doctorInfofkSectionId").text();//科室id
//			var changedoctorInfofkDeptId=$(this).parent().parent().find(".doctorInfofkDeptId").text();//部门id
//			var changedoctorInfoUserName=$(this).parent().parent().find(".doctorInfoDetail-id span").text();//用户名
//			var changedoctorInfoTels=$(this).parent().parent().find(".doctorInfoDetail-tel span").text();//用户电话
//			var changedoctorInfoDetails=$(this).parent().parent().find(".doctorDescript span").text();//医生描述
//			$(".changeHiddenListId").text($(this).parent().parent().find(".doctorInfoListId").text());
//			
//			var adminIds=JSON.parse($(this).parent().parent().find(".hosHiddenIds").text());
////			var adminIds=['44','42'];
////			console.log('adminIds',adminIds);
//			var changeOrganize=$("#changeOrganize").find(".adminHosId");
//			if($(this).parent().parent().find(".roleIds").text()!=''&&$(this).parent().parent().find(".roleIds").text()!=null){
//				var roleIds=JSON.parse($(this).parent().parent().find(".roleIds").text());
//				for(var k=0;k<adminIds.length;k++){
//					for(var i=0;i<changeOrganize.length;i++){
//						
//						if(adminIds[k]==$(changeOrganize[i]).text()){
//							$(changeOrganize[i]).next().prop("checked",'checked');
//						}
//					}
//				}
//				if(adminIds.length==changeOrganize.length){
//					$(".changeCheckedAll").prop("checked",'checked');
//				}
//				console.log('roleIds',roleIds);
//				var hasRole=0;
//				for(var f=0;f<roleIds.length;f++){
//					if(roleIds[f]==10){
//						hasRole++;
//					}
//				}
//				if(hasRole>0){//10为运营人员
//					$(".changeAdminOrganize").css("display","block");
//				}else{
//					$(".changeAdminOrganize").css("display","none");
//				}
//			}else{
//				$(".changeAdminOrganize").css("display","none");
//			}
//			
////			if(changeDoctorInfoUserTypeId=="1"){
////				changeDoctorInfoUserType="医生" //用户类型
////				$(".changeDoctorInfohospitalName").css("display","block");
////				$(".changeDoctorInfoTechOffice").css("display","block");
////				$(".changeDoctorInfoChoseDept").css("display","none");
////			}else if(changeDoctorInfoUserTypeId=="2"){
////				changeDoctorInfoUserType="服务人员" //用户类型
////				$(".changeDoctorInfohospitalName").css("display","none");
////				$(".changeDoctorInfoTechOffice").css("display","none");
////				$(".changeDoctorInfoChoseDept").css("display","block");
////			}
//////			else if(changeDoctorInfoUserTypeId=="3"){
//////				changeDoctorInfoUserType="患者" //用户类型
//////				$(".changeDoctorInfohospitalName").css("display","none");
//////				$(".changeDoctorInfoTechOffice").css("display","none");
//////				$(".changeDoctorInfoChoseDept").css("display","block");
//////			}
////			else if(changeDoctorInfoUserTypeId=="4"){
////				changeDoctorInfoUserType="村医" //用户类型
//////				$(".changeDoctorInfohospitalName").css("display","none");
//////				$(".changeDoctorInfoTechOffice").css("display","none");
//////				$(".changeDoctorInfoChoseDept").css("display","block");
////				$(".changeDoctorInfohospitalName").css("display","block");
////				$(".changeDoctorInfoTechOffice").css("display","block");
////				$(".changeDoctorInfoChoseDept").css("display","none");
////			}
////			初始化医院信息
//			var changedoctorDivIds = $("#changeDoctorInfoHspName").attr("id"); //获取当前修改弹框医生信息里医院选项的select的id
////			读取医院信息
//			if(changedoctorInfofkHospitalId==""||changedoctorInfofkHospitalId=="null"||changedoctorInfofkHospitalId=="undefined"){
//				changedoctorInfofkHospitalId=1;
//			}
//			changeInfoSelectHosId = changedoctorInfofkHospitalId;
//			changeInfoCurrentId=changedoctorInfofkSectionId;
//			readHospital(changedoctorDivIds,changeInfoSelectHosId,changeInfoCurrentId);
//			$("#changeDoctorInfoHspName").val(changedoctorInfofkHospitalId);
//			
//			if(changeInfoSelectHosId!=""&&changeInfoSelectHosId!=null&&changeInfoSelectHosId!=undefined){
//				//			初始化科室信息
//				var changecurrentTechOfficeSlcId = $("#changeDoctorInfoTechOffice").attr("id");
//				techOffice(changeInfoSelectHosId,changecurrentTechOfficeSlcId,changeInfoCurrentId);
//			}
////			初始化部门信息
////			读取部门信息
//			if(changedoctorInfofkDeptId!=""&&changedoctorInfofkDeptId!=null){
//				changeInfodeptPid=parseInt(changedoctorInfofkDeptId);
//			}else{
//				changeInfodeptPid=0;
//			}
//			var changedoctorSelectDeptIds = $("#changeDoctorInfoDeptLay").attr("id");//修改弹框里的部门弹框
//			readDept(changedoctorSelectDeptIds,0);
////			alert(changeDoctorInfoUserTypeId);
//			$("#changeDoctorInfoUserInfo").val(changeDoctorInfoUserTypeId);
////			$("#changeDoctorInfoHspName").val(changedoctorInfofkHospitalName);//医院
//			$("#changeDoctorInfoTechOffice").val(changedoctorInfofkSectionId);//科室
//			$("#changeDoctorInfoDept").val(changedoctorInfofkDeptName);//部门
//			$("#changeDoctorInfoDocName").val(changedoctorInfoUserName);//用户名
//			$("#changeDoctorInfoDocTel").val(changedoctorInfoTels);//电话
//			$("#changeDoctorInfoDetail").val(changedoctorInfoDetails);//描述
//			$("#doctorlight5").fadeIn();
//			$("#fade").fadeIn();			
//		})
		// 	新增内容里医院和部门联动
//		$(".doctorSelectUserIdentity select").change(function() {
//			if($(this).val() == "1"||$(this).val() == "4") {
//				$(".AddDoctorInfohospitalName").css("display", "block");
//				$(".AddDoctorInfoTechOffice").css("display", "block");
//				$(".AddDoctorInfoChoseDept").css("display", "none");
//			} else {
//				$(".AddDoctorInfohospitalName").css("display", "none");
//				$(".AddDoctorInfoTechOffice").css("display", "none");
//				$(".AddDoctorInfoChoseDept").css("display", "block");
//			}
//		});
		//修改信息弹框里的医院和部门联动
//		$(".changeDoctorSelectUserIdentity select").change(function() {
//			if($(this).val() == "1"||$(this).val() == "4") {
//				$(".changeDoctorInfohospitalName").css("display", "block");
//				$(".changeDoctorInfoTechOffice").css("display", "block");
//				$(".changeDoctorInfoChoseDept").css("display", "none");
//			} else {
//				$(".changeDoctorInfohospitalName").css("display", "none");
//				$(".changeDoctorInfoTechOffice").css("display", "none");
//				$(".changeDoctorInfoChoseDept").css("display", "block");
//			}
//		});
		//点击新增里的医院选择框	
		$("#addDoctorInfoHspName").change(function() {
			//	console.log($(this).val());
			var currentTechOfficeSlcId = $("#addDoctorInfoTechOffice").attr("id");
			selectHosId = $(this).val();
//			techOffice(selectHosId, currentTechOfficeSlcId);
		});
		//点击修改框里的医院选择框
		$("#changeDoctorInfoHspName").change(function() {
			//	console.log($(this).val());
			var changecurrentTechOfficeSlcId = $("#changeDoctorInfoTechOffice").attr("id");
			changeInfoSelectHosId = $(this).val();
//			techOffice(changeInfoSelectHosId, changecurrentTechOfficeSlcId);
		});
		//点击增加的部门弹框里的内容时
		var kIndex = 1; //初始化有几个ul
		$("#doctorlight4").on("click", "#addDoctorInfoDeptLay li", function() {
			//	console.log($(this).val());
			var addDoctorInfoDeptLayId = $("#addDoctorInfoDeptLay").attr("id");
			deptPid = parseInt($(this).find(".currentDeptId").text());
			deptChoseName = $(this).find(".currentDeptName").text();
			$("#addDoctorInfoDeptHiddenId").val(deptPid);
			$("#addDoctorInfoDept").val(deptChoseName);
			//	获取当前点击的是第几层
			var index = $("#addDoctorInfoDeptLay ul").index($(this).parent()); //判断是第几个ul
			kIndex = index + 2;
			if($(this).parent().next().length == 0) { //如果当前点击的ul后面没有ul添加一个，如果有就不添加
				//		k++;
				sessionStorage.setItem("currentUlNum", kIndex); //当前有几个ul了，重新加载页面的时候记住并添加
				$(this).parent().after('<ul class="addDoctorInfoDept' + kIndex + ' lf"></ul>');
			}
			readDept(addDoctorInfoDeptLayId, deptPid, index);
		});
		//点击修改弹框里的部门弹框里的内容时
		var changekIndex = 1; //初始化有几个ul
		$("#doctorlight5").on("click", "#changeDoctorInfoDeptLay li", function() {
			//	console.log($(this).val());
			var changeDoctorInfoDeptLay = $("#changeDoctorInfoDeptLay").attr("id");
			changeInfodeptPid = parseInt($(this).find(".currentDeptId").text());
			cahngeDeptChoseName = $(this).find(".currentDeptName").text();
			$("#changeDoctorInfoDeptHiddenId").val(changeInfodeptPid);
			$("#changeDoctorInfoDept").val(cahngeDeptChoseName);
			//	获取当前点击的是第几层
			var index = $("#changeDoctorInfoDeptLay ul").index($(this).parent()); //判断是第几个ul
			changekIndex = index + 2;
			if($(this).parent().next().length == 0) { //如果当前点击的ul后面没有ul添加一个，如果有就不添加
				//		k++;
				sessionStorage.setItem("currentUlNum", changekIndex); //当前有几个ul了，重新加载页面的时候记住并添加
				$(this).parent().after('<ul class="changeDoctorInfoDept' + changekIndex + ' lf"></ul>');
			}
			readDept(changeDoctorInfoDeptLay, changeInfodeptPid, index);
		});
		//新增里的点击除按钮和弹框以外的地方弹框消失
		//点击新增里的选择部门
//		$(function(){
//		　　$(document).bind("click",function(e){
//				$(".AddDoctorInfoChoseDept").click(function(e) {
//					e.stopPropagation();
//					$("#addDoctorInfoDeptLay").toggle();
//				});
//		　　　　//id为menu的是菜单 
//		　　　　if($(e.target).closest("#addDoctorInfoDeptLay").length == 0 && $(e.target).closest("#addDoctorInfoDeptLay li").length == 0){
//		　　　　//点击id为menu之外且id，则触发
//		　　　	$("#changeDoctorInfoDeptLay").css("display", "none");
//		　　　　}
//		　　})
//		})
		$("body").click(function (e) {
		    if (!$(e.target).closest(".AddDoctorInfoChoseDept,#addDoctorInfoDeptLay").length) {
		        $("#addDoctorInfoDeptLay").hide();
		    }
		});
		$(".AddDoctorInfoChoseDept").click(function(e) {
				$("#addDoctorInfoDeptLay").toggle();
		});
		//点击修改里的选择部门
		$("body").click(function (e) {
		    if (!$(e.target).closest(".changeDoctorInfoChoseDept,#changeDoctorInfoDeptLay").length) {
		        $("#changeDoctorInfoDeptLay").hide();
		    }
		});
		$(document).ready(function() {
			$(".changeDoctorInfoChoseDept").click(function(e) {
				$("#changeDoctorInfoDeptLay").toggle();
			});
		});
		//		读取医院的接口
//		function readHospital(currentSelectIds,currentName,currentTid) { //参数为外层的selcect的id
//			console.log(currentSelectIds);
//			$("#" + currentSelectIds).html('<option value="0"selected="selected">请选择</option>');
//			$.ajax({
//				type: "get",
//				url: config + "/sys/hospital/list",
//				async: false,
//				dataType: "jsonp",
//				jsonp: "jsoncallback",
//				data: {},
//				success: function(data) {
//					console.log(data);
//					if(data.status == 1) {
//						var hospitalList = data.resultMap.hospitalList;
//						for(var s = 0; s < hospitalList.length; s++) {
//							var hospitalHtml = '';
//							hospitalHtml += '<option value="' + hospitalList[s].id + '">' + hospitalList[s].name + '</option>';
//							$("#" + currentSelectIds).append(hospitalHtml);
//						}
//					}
//					selectHosId = $("#addDoctorInfoHspName").val(); //定义默认选择的医院的id;
//					console.log(selectHosId);
//					selectHosId=currentName;
//					var currentTechOfficeSlcId = $("#" + currentSelectIds).parent().parent().next().find("select").attr("id");
//					if(currentTid!=""&&currentTid!=null&&currentTid!=undefined){
//						$("#" + currentSelectIds).val(selectHosId);
//					}else{
//						$("#" + currentSelectIds).val(0);
//					}
//					techOffice(selectHosId,currentTechOfficeSlcId,currentTid);
//				},
//			});
//		}
//		readAdminHospital();
//		读取管理机构
		function readAdminHospital() { //参数为外层的selcect的id
			$("#addOrganize").html('');
			$("#changeOrganize").html('');
			$("#lookOrganize").html('');
			$.ajax({
				type: "get",
				url: config + "/sys/hospital/list",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {},
				success: function(data) {
					console.log(data);
					if(data.status == 1) {
						var hospitalList = data.resultMap.hospitalList;
						for(var s = 0; s < hospitalList.length; s++) {
							var adminHospital='';
							adminHospital+='<span class="lf"style="width:25%;display:table;height:44px;"><span style="display:none;"class="adminHosId">'+ hospitalList[s].id+'</span><input type="checkbox"style="width:15px;height:15px;float:left;margin-top:15px;"><span style="display:table-cell;height:44px;vertical-align:middle;">' +hospitalList[s].name+ '</span></span>'
							$("#addOrganize").append(adminHospital);
							$("#changeOrganize").append(adminHospital);
							$("#lookOrganize").append(adminHospital);
						}
					}
				},
			});
		}
		//读取科室
		function techOffice(currentSelectHosIds, currentTechSelect,currentTid) { //参数为当前选择上的医院的id和科室的select的id
			$("#" + currentTechSelect).html('<option value="0"selected="selected">请选择</option>');
			$.ajax({
				type: "get",
				url: config + "/sys/section/list",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					fkHospitalId: currentSelectHosIds
				},
				success: function(data) {
					console.log(data);
					if(data.status == 1) {
						var sectionList = data.resultMap.sectionList;
						for(var t = 0; t < sectionList.length; t++) {
							var techOfficeHtml = '';
							techOfficeHtml += '<option value="' + sectionList[t].id + '">' + sectionList[t].name + '</option>';
							$("#" + currentTechSelect).append(techOfficeHtml);
						}
						if(currentTid!=""&&currentTid!=null&&currentTid!=undefined){
							$("#" + currentTechSelect).val(currentTid);
						}else{
							$("#" + currentTechSelect).val(0);
						}
					}
				},
			});
		}

		//读取部门
		function readDept(currentSelectDeptIds, deptPid, index) { //参数为当前选择上的医院的id和科室的select的id
			if(deptPid == 0) {
				$("#" + currentSelectDeptIds).find(".addDoctorInfoDept1").html('');
			} else {
				var currentIndex = index + 2;
				console.log(currentIndex);
				$("#" + currentSelectDeptIds).find(".addDoctorInfoDept" + currentIndex).html(''); //添加之前先清空
				$("#" + currentSelectDeptIds).find(".addDoctorInfoDept" + currentIndex).nextAll().remove();
			}
			$.ajax({
				type: "get",
				url: config + "/sys/dept/list",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					pid: deptPid
				},
				success: function(data) {
					console.log(data);
					if(data.status == 1) {
						var deptList = data.resultMap.deptList;
						if(deptPid == 0) {
							console.log(currentSelectDeptIds);
							for(var a = 0; a < deptList.length; a++) {
								var deptListHtml = '';
								deptListHtml += '<li><span class="currentDeptName">' + deptList[a].name + '</span><span class="currentDeptId"style="display:none;">' + deptList[a].id + '</span></li>';
								$("#" + currentSelectDeptIds).find(".addDoctorInfoDept1").append(deptListHtml);
							}
						} else {
							for(var a = 0; a < deptList.length; a++) {
								var deptListHtml = '';
								deptListHtml += '<li><span class="currentDeptName">' + deptList[a].name + '</span><span class="currentDeptId"style="display:none;">' + deptList[a].id + '</span></li>';
								$("#" + currentSelectDeptIds).find(".addDoctorInfoDept" + currentIndex).append(deptListHtml);
							}
						}

					}
				},
			});
		}
		//      以下是调取接口
		//		加载列表
		var userId = sessionStorage.getItem('userId');
		//		分页
		var currentPage = 1;
		var offsetPage = 0; //传输的页起始条数
		var showNum = 10; //页面需要显示的条数
		var doctoNum_pages;
		//点击分页页数
		$(document).delegate(".flipOver", 'click', function() {
			$(this).addClass('active').siblings().removeClass('active');
			currentPage = parseInt($(this).attr("pageId"));
			offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
			doctorList();
			window.scrollTo(0, 0);
		});
		//点击上一页
		$(document).delegate("#prev", 'click', function() {
			if($(".flipOver.active").prev().attr("id") == "prev") {
				return true
			} else {
				var page = parseInt($(".flipOver.active").attr("pageid")) - 1;
				$(".flipOver.active").prev().addClass("active").siblings().removeClass("active")
			}
			currentPage = page;
			offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
			doctorList();
			window.scrollTo(0, 0);
		});

		//点击下一页
		$(document).delegate("#Next", 'click', function() {
			if($(".flipOver.active").next().attr("id") == "Next") {
				return true
			} else {
				var page = parseInt($(".flipOver.active").attr("pageid")) + 1;
				$(".flipOver.active").next().addClass("active").siblings().removeClass("active")
			}
			currentPage = page;
			offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
			doctorList();
			window.scrollTo(0, 0);
		});
			//点击分页跳转页按钮
	    $(document).delegate(".srueToJumpPageBtn",'click',function(){
	        currentPage = parseInt($(".toPageNum").val().trim());
	        offsetPage = (currentPage-1)*10;//（页码-1）*每页显示条数
	        doctorList();
	        window.scrollTo(0,0);
	    });
		//			读取用户列表
		var searchHospitalId="";  
		var responsibleName="";  
		var searchHosName="";
		doctorList();
		//	获取订单列表
		function doctorList() {
			$("#doctorContentList").html('');
			searchHosName=$("#doctorInfoSearchHos").val();
			ajaxGet('/hospital/info/getHospitalList', 
				{
					//所属科室id
//					fkSectionId:responsibleName,
					//所属医院id
					responsibleName:responsibleName,//负责人
					//员工姓名
					hospitalName:searchHosName,
					offset: offsetPage, //（页码-1）*每页显示条数
					limit: showNum //每页赢显示的条数
					},
			function(data) {
					console.log("此处为医生管理列表信息");
					console.log(data);
					var doctorinfoList = data.resultMap.hospitalList;
					var doclistTotal = data.resultMap.total; //总条数
					//							var index = data.viewIndex;
//					alert(doclistTotal);
					doctoNum_pages = Math.ceil(parseInt(doclistTotal) / 10); //总条数除以每页十条数据为总页码
//					alert(doctoNum_pages);
					for(var i = 0, k = 0; i < doctorinfoList.length; i++) {
						console.log(doctorinfoList[i].name);
						var doctorhtml = '';
						k++;
						doctorhtml += '<ul class="doctorInfoDetail-ul dataList">';
						doctorhtml += '<li class="doctorInfoListId boxRightBorder"style="display:none">' + doctorinfoList[i].id + '</li>' ;//隐藏的用户身份
//						doctorhtml += '<li class="doctorInfoType boxRightBorder"style="display:none">' + doctorinfoList[i].type + '</li>' ;//隐藏的用户身份
//						doctorhtml += '<li class="doctorInfofkHospitalId boxRightBorder"style="display:none">' + doctorinfoList[i].fkHospitalId + '</li>';//隐藏的医院id
//						doctorhtml += '<li class="doctorInfofkHospitalName boxRightBorder"style="display:none">' + doctorinfoList[i].hospitalName + '</li>';//隐藏的医院名称
//						doctorhtml += '<li class="doctorInfofkSectionId boxRightBorder"style="display:none">' + doctorinfoList[i].fkSectionId + '</li>'; //隐藏的科室id
//						doctorhtml += '<li class="doctorInfofkSectionName boxRightBorder"style="display:none">' + doctorinfoList[i].sectionName + '</li>';//隐藏的科室名称
//						doctorhtml += '<li class="doctorInfofkDeptId boxRightBorder"style="display:none">' + doctorinfoList[i].fkDeptId + '</li>';//隐藏的部门id
//						doctorhtml += '<li class="doctorInfoDetail-radio"><label class="radio"><input type="radio" name="radio" id="" value="" class="radioclass"/><i></i></label></li>';
						doctorhtml += '<li class="doctorInfoDetail-code LiTextAlign boxRightBorder"><span>' + k + '</span></li>';
						if(doctorinfoList[i].hospitalName){
							doctorhtml += '<li class="doctorInfoDetail-id LiTextAlign boxRightBorder currentLineHosName"><span class="btnTextColor currentHosNameBtn">' + doctorinfoList[i].hospitalName + '</span></li>'; //医生姓名
						}else{
							doctorhtml += '<li class="doctorInfoDetail-id LiTextAlign boxRightBorder currentLineHosName"><span></span></li>'; //医生姓名
						}
						if(doctorinfoList[i].level){
							doctorhtml += '<li class="doctorInfoDetail-code LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].level + '</span></li>'; //组织名称为医院和科室组织的
						}else{
							doctorhtml += '<li class="doctorInfoDetail-code LiTextAlign boxRightBorder"><span></span></li>'; //组织名称为医院和科室组织的
						}
						
//						if(doctorinfoList[i].type == 1||doctorinfoList[i].type ==4) {
//							if(doctorinfoList[i].hospitalName == "" || doctorinfoList[i].hospitalName == null) {
//								if(doctorinfoList[i].sectionName == "" || doctorinfoList[i].sectionName == null) {
//									doctorhtml += '<li class="doctorInfoDetail-name LiTextAlign boxRightBorder"><span></span></li>'; //组织名称为医院和科室组织的
//								} else {
//									doctorhtml += '<li class="doctorInfoDetail-name LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].sectionName + '</span></li>'; //组织名称为医院和科室组织的
//								}
//							} else {
//								if(doctorinfoList[i].sectionName == "" || doctorinfoList[i].sectionName == null) {
//									doctorhtml += '<li class="doctorInfoDetail-name LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].hospitalName + '</span></li>'; //组织名称为医院和科室组织的
//								} else {
//									doctorhtml += '<li class="doctorInfoDetail-name LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].hospitalName + '（' + doctorinfoList[i].sectionName + '）' + '</span></li>'; //组织名称为医院和科室组织的
//								}
//							}

//						} 
//						else {
//							if(doctorinfoList[i].deptName == "" || doctorinfoList[i].deptName == null) {
//								doctorhtml += '<li class="doctorInfoDetail-name LiTextAlign"><span></span></li>'; //部门
//							} else {
//								doctorhtml += '<li class="doctorInfoDetail-name LiTextAlign"><span>' + doctorinfoList[i].deptName + '</span></li>'; //部门
//							}
//						}
						if(doctorinfoList[i].province&&doctorinfoList[i].city){
							doctorhtml+='<li class="doctorInfoDetail-addr LiTextAlign boxRightBorder"><span>'+doctorinfoList[i].province+'-'+doctorinfoList[i].city+'</span></li>';//科室	
						}else{
							doctorhtml+='<li class="doctorInfoDetail-addr LiTextAlign boxRightBorder"><span></span></li>';//科室	
						}
						if(doctorinfoList[i].characteristicSection){
							doctorhtml+='<li class="doctorInfoDetail-sex LiTextAlign boxRightBorder"><span>'+doctorinfoList[i].characteristicSection+'</span></li>';//科室	
						}else{
							doctorhtml+='<li class="doctorInfoDetail-sex LiTextAlign boxRightBorder"><span></span></li>';//科室	
						}
						
						if(doctorinfoList[i].directorList[0]) {//院长
							doctorhtml += '<li class="doctorInfoDetail-tel LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].directorList[0].responsibleName+'</span></li>'; //医生电话
						} else {
							doctorhtml += '<li class="doctorInfoDetail-tel LiTextAlign boxRightBorder"><span></span></li>'; //医生电话
						}
						if(doctorinfoList[i].secitionResponsibleList[0]) {//负责人
							doctorhtml += '<li class="doctorInfoDetail-tel LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].secitionResponsibleList[0].responsibleName+'</span></li>'; //医生电话
						} else {
							doctorhtml += '<li class="doctorInfoDetail-tel LiTextAlign boxRightBorder"><span></span></li>'; //医生电话
						}
						if(doctorinfoList[i].operatorList[0]) {//运营人
							doctorhtml += '<li class="doctorInfoDetail-tel LiTextAlign boxRightBorder"><span>' + doctorinfoList[i].operatorList[0].responsibleName+'</span></li>'; //医生电话
						} else {
							doctorhtml += '<li class="doctorInfoDetail-tel LiTextAlign boxRightBorder"><span></span></li>'; //医生电话
						}
//						if(doctorinfoList[i].roleList.length){
//							var roleIds=[];
//							var hasRoles=0;
//							for(var u=0;u<doctorinfoList[i].roleList.length;u++){
//									roleIds.push(doctorinfoList[i].roleList[u].id);
//									doctorhtml += '<li class="roleIds LiTextAlign boxRightBorder"style="display:none">' + JSON.stringify(roleIds) + '</li>'; //医生描述
//									if(doctorinfoList[i].roleList[u].id==5){
//										hasRoles++;
//									}
//							}
//						}
//						if(hasRoles>0){//管理员
//							var hosIds=[];
//							doctorhtml += '<li class="doctorchoseHos LiTextAlign boxRightBorder"><span>全部</span></li>'
//						}else{
//							if(doctorinfoList[i].hrList.length>0) {
//								var hosIds=[];
//								doctorhtml += '<li class="doctorchoseHos LiTextAlign boxRightBorder">'
//								for(var e=0;e<doctorinfoList[i].hrList.length;e++){
//									hosIds.push(doctorinfoList[i].hrList[e].hospitalId);
//									doctorhtml += '<span>' + doctorinfoList[i].hrList[e].hospitalName + '、</span>'; //医生描述
//								}
//								doctorhtml +='<span style="display:none;" class="hosHiddenIds boxRightBorder">'+JSON.stringify(hosIds)+'</span>'
//								doctorhtml += '</li>'
//							}else{
//								var hosIds=[];
//								doctorhtml += '<li class="doctorchoseHos LiTextAlign boxRightBorder"><span style="display:none;" class="hosHiddenIds">'+JSON.stringify(hosIds)+'</span></li>'
//							}
//						}
						doctorhtml += '<li class="doctorDescript LiTextAlign boxRightBorder"style="display:none;">'+doctorinfoList[i].memo+'</li>'
						doctorhtml += '<li class="doctorInfoDetail-change LiTextAlign"><a href = "javascript:void(0)" class="btn-change btnTextColor"><span>编辑</span></a></li>';
//						doctorhtml += '<li class="doctorInfoDetail-check LiTextAlign"><a href = "javascript:void(0)" class="btn-check btnTextColor"><span>耗材</span></a></li>';
						doctorhtml += '<li class="doctorInfoDetail-del LiTextAlign"><a href = "javascript:void(0)" class="btn-del btnTextColor"><span>删除</span></a></li>';
						doctorhtml += '<li class="doctorInfoDetail-check LiTextAlign"><a href = "javascript:void(0)" class="btn-check btnTextColor checkDayData"><span>日汇总</span></a></li>';
						doctorhtml += '<li class="doctorInfoDetail-check LiTextAlign"><a href = "javascript:void(0)" class="btn-check btnTextColor checkMonthData"><span>月汇总</span></a></li>';
						doctorhtml += '</ul>';
						$("#doctorContentList").append(doctorhtml);
						var pageHtml = page(parseInt(currentPage), doctoNum_pages);
						$(".doctorpageN").html(pageHtml);
					}
				})
		}

		
		//		点击确认修改
		$("#doctorlight5 #change-ok").click(function() {
			var changeListIds=parseInt($(".changeHiddenListId").text()); //用户id
			var userIdentity = $("#changeDoctorInfoUserInfo").val(); //用户身份
			var changeDoctorInfoHspName = $("#changeDoctorInfoHspName").val(); //医院名
			var changeDoctorInfoTechOffice = $("#changeDoctorInfoTechOffice").val(); //科室
			var changeDoctorInfoDocName = $("#changeDoctorInfoDocName").val(); //医生姓名
			var changeDoctorInfoDocTel = $("#changeDoctorInfoDocTel").val().trim(); //医生电话
			var changeDoctorInfoDetail = $("#changeDoctorInfoDetail").val(); //医生描述
			var changeDoctorInfoChoseDept = $("#changeDoctorInfoDept").val(); //获取所选部门
			var changeDoctorInfoChoseDeptId = $("#changeDoctorInfoDeptHiddenId").val(); //获取选择部门id
			var changeDoctorInfo = {}; //定义一个对象存放参数
			console.log(changeDoctorInfoHspName+"kkk"+changeDoctorInfoTechOffice);
			//			管理机构数组
			var changeOrganize=$("#changeOrganize").find("input");
			var addOrganizeArrStr='';
			if(changeOrganize.length>0){
				var addOrganizeArr=[];//存放管理的数组
				for(var p=0;p<changeOrganize.length;p++){
					if($(changeOrganize[p]).prop("checked")==true){
						addOrganizeArr.push($(changeOrganize[p]).prev('.adminHosId').text());
						addOrganizeArrStr=addOrganizeArr;
//						addOrganizeArrStr=JSON.stringify(addOrganizeArr);
					}
				}
			}else{
				addOrganizeArrStr='';
			}
//			if(userIdentity == "1"||userIdentity == "4") {
				if(changeDoctorInfoHspName==0||changeDoctorInfoHspName==null||changeDoctorInfoHspName==""){
					alert("请选择医院");
				}else if(changeDoctorInfoTechOffice==0||changeDoctorInfoTechOffice==null||changeDoctorInfoTechOffice==""){
					alert("请选择科室");
				}else if(changeDoctorInfoDocName==""||changeDoctorInfoDocName==null){
					alert("请输入用户名");
				}else if(changeDoctorInfoDocTel==""||changeDoctorInfoDocTel==null){
					alert("请输入联系方式");
				}else{
					changeDoctorInfo = {
						id:changeListIds,
//						type: userIdentity,
						fkHospitalId: changeDoctorInfoHspName,
						fkSectionId: changeDoctorInfoTechOffice,
						userName: changeDoctorInfoDocName,
						mobile: changeDoctorInfoDocTel,
						memo: changeDoctorInfoDetail,
						hospitalIds:addOrganizeArrStr
					}
					$.ajax({
						method: 'get',
						url: config + '/sys/user/update',
						contentType: "application/json; charset=utf-8", //传到后台的数据格式
						async: true,
						data: changeDoctorInfo,
						dataType: 'jsonp', //接收值的格式
						jsonp: 'jsoncallback',
						traditional: true,
						success: function(data) {
							console.log(data);
							if(data.status == 1) {
								document.getElementById('doctorlight5').style.display = 'none';
								document.getElementById('fade').style.display = 'none';
								alert(data.message)
								doctorList();
							} else {
								alert(data.message);
								//		window.location.reload();
							}
						},
						error: function(result) {
							console.log(result);
						}
					});
				}
				
			
			
		})
//		删除单行数据
		$("#doctorlight2 #del-yes").click(function(){
			var changeListIds=parseInt($(".delHiddenListId").text()); //用户id
			ajaxGet('/hospital/info/remove',{id:changeListIds},function(data) {
					console.log(data);
					if(data.status == 0) {
						document.getElementById('doctorlight2').style.display = 'none';
						document.getElementById('fade').style.display = 'none';
						alert(data.message)
						doctorList();
					} else {
						alert(data.message);
						//		window.location.reload();
					}
				});
		});
		$(".close").click(function(){
			document.getElementById('doctorlight2').style.display = 'none';
			document.getElementById('fade').style.display = 'none';
		});
//	加载页面时默认加载查询条件---医院 科室 医生
	
//	readHospital("doctorInfoSearchHos");
	//	点击医院的时候联动科室
//	$("#doctorInfoSearchHos").change(function(){
//		var currentDoctorInfoSearchHos=$(this).val();
//		searchHospitalId=currentDoctorInfoSearchHos;
//		doctorList();
////		techOffice(currentDoctorInfoSearchHos,"doctorInfoSearchTechOffice");
//	});
//	点击页面查询
	$("#doctorSearchBtns").click(function(){
		currentPage = 1;
		offsetPage = 0;
		searchHospitalId=$("#doctorInfoSearchName").val();//用户名称
		responsibleName=$("#doctorInfoSearchTechOffice").val();//负责人名称
		searchUserName=$("#doctorInfoSearchHos").val();//医院
//		searchUserName=$(".doctorSex button").attr('title');//医院
//		if(searchUserName!='医院名称'){
//			searchUserName=$(".doctorSex button").attr('title');//医院
//		}else{
//			searchUserName='';
//		}
		doctorList();
	});
//点击清除按钮
	$("#doctorSearchClearData").click(function(){
		searchHospitalId="";
		responsibleName="";
		searchUserName="";
		$("#doctorInfoSearchHos").val("");
		$("#doctorInfoSearchTechOffice").val("");
		$("#doctorInfoSearchName").val("");
		$(".doctorSex button").attr('title','医院名称');//医院
		$(".doctorSex button .filter-option").text('医院名称');//医院
		doctorList();
	});
//	点击医生身份选择时部门弹框消失
$("#addDoctorInfoUserInfo").click(function(){
//	$("#addDoctorInfoDeptLay").fadeOut();
});
$("#addDoctorInfoUserInfo").change(function(){
	if($(this).val()=="10"){
		$(".adminOrganize").css("display","block");
	}else{
		$(".adminOrganize").css("display","none");
	}
});
$("#changeDoctorInfoUserInfo").click(function(){
//	$("#changeDoctorInfoDeptLay").fadeOut();
});
var sessionId=sessionStorage.getItem('sessionId');
//读取岗位
//readRoleList("addDoctorInfoUserInfo");
//readRoleList("changeDoctorInfoUserInfo");
	//		读取医院的接口
		function readRoleList(currentSelectIds) { //参数为外层的selcect的id
			$("#" + currentSelectIds).html('<option value="0"selected="selected">请选择</option>');			
			$.ajax({
				type: "get",
				url: config + "/sys/role/list",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {sessionId:sessionId},
				success: function(data) {
					console.log("岗位",data);
						var roleList = data.resultMap.roleList;
						for(var s = 0; s < roleList.length; s++) {
							var hospitalHtml = '';
							hospitalHtml += '<option value="' + roleList[s].id + '">' + roleList[s].name + '</option>';
							$("#" + currentSelectIds).append(hospitalHtml);
						}
				},
			});
		}
//		点击新增的全选
		$(".addCheckedAll").click(function(){
			if($(this).prop("checked")==true){
				var addOrganize=$("#addOrganize").find("input");
				for(var k=0;k<addOrganize.length;k++){
					$(addOrganize[k]).prop("checked","checked")
				}
			}else{
				var addOrganize=$("#addOrganize").find("input");
				for(var k=0;k<addOrganize.length;k++){
					$(addOrganize[k]).prop("checked",false);
				}
			}
		})
//		点击新增的checkBox
		$("#addOrganize").on('click','input',function(){
				var addOrganize=$("#addOrganize").find("input");
				var checkedLen=0;
				for(var k=0;k<addOrganize.length;k++){
					if($(addOrganize[k]).prop("checked")==true){
						checkedLen++;
					}
					
				}
				if(checkedLen==addOrganize.length){
					$(".addCheckedAll").prop("checked","checked");
				}else{
					$(".addCheckedAll").prop("checked",false);
				}
		})
		
		//		点击修改的全选
		$(".changeCheckedAll").click(function(){
			if($(this).prop("checked")==true){
				var changeOrganize=$("#changeOrganize").find("input");
				for(var k=0;k<changeOrganize.length;k++){
					$(changeOrganize[k]).prop("checked","checked")
				}
			}else{
				var changeOrganize=$("#changeOrganize").find("input");
				for(var k=0;k<changeOrganize.length;k++){
					$(changeOrganize[k]).prop("checked",false);
				}
			}
		})
//		点击修改的checkBox
		$("#changeOrganize").on('click','input',function(){
				var changeOrganize=$("#changeOrganize").find("input");
				var checkedLen=0;
				for(var k=0;k<changeOrganize.length;k++){
					if($(changeOrganize[k]).prop("checked")==true){
						checkedLen++;
					}
					
				}
				if(checkedLen==changeOrganize.length){
					$(".changeCheckedAll").prop("checked","checked");
				}else{
					$(".changeCheckedAll").prop("checked",false);
				}
		})
//		获取医院列表
		gethos();
		function gethos(){
			ajaxGet('/hospital/info/getHospitalOptionList',{},function(data){
				console.log(data);
				if(data.status==0){
					$("#doctorInfoSearchHos").html('');
					if(data.resultMap.hospitalList.length>0){
						$.each(data.resultMap.hospitalList,function(i,val){  //遍历二维数组
			    			$("#doctorInfoSearchHos").append(`<option value="`+val.hospitalName+`">`+val.hospitalName+`</option>`);
						})
						$('.selectpicker').selectpicker('refresh');
		  				$('.selectpicker').selectpicker('render');
					}
				}
				
				
			});
		}
		window.onload=function(){
		  $('.selectpicker').selectpicker({
		  });
		
//		  $('.selectpicker').selectpicker('refresh');
//		  $('.selectpicker').selectpicker('render');
		};
