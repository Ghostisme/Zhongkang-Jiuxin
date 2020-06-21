$(document).ready(function(){
	$("#sumbitBtn").click(function(){
		console.log("----------")
		console.log(window.startTime)
		console.log(window.endTime)
		var sendObj = {};
		var newsEditId=localStorage.getItem("newsEditId");
		sendObj.id = newsEditId;
		var user = JSON.parse(sessionStorage.getItem("user"));
		console.log(user);
		sendObj.hospitalId = $("#applyHos").val();
		//设备参数
		sendObj.deviceId= $("#equipmentType").val();
//		var deviceName = $("#equipmentType").find("option:selected").attr("data-name");
//		sendObj.deviceName = deviceName;
		var deviceModel = $("#equipmentType1").find("option:selected").attr("data-name");
		console.log($("#equipmentType2").val())
		sendObj.deviceModel = deviceModel;
		//医院参数
		var deviceId=$("#equipmentType2").val();
		sendObj.deviceType  = deviceId;
		//核算周期
		sendObj.returnBeginDate = window.startTime;
		sendObj.returnEndDate = window.endTime;
//		beginDate = new Date(beginDate);
//		sendObj.returnBeginDate = beginDate;
		//检查量
		sendObj.checkCode = $("#checkNum").val();

		//应收金额参数
		sendObj.returnShouldFee = $("#shouldPrice").val();
		//实收金额参数
		sendObj.returnFactFee  = $("#factPrice").val();
		//回款时间参数
	 	sendObj.returnTime =$("#returnTime").val();
//		checkTime = new Date(checkTime);
		//成本
	 	sendObj.cost=$("#cost").val();
		//毛利 1应收汇款-成本； 2应收=毛利
	 	sendObj.num=$("#grossProfit_val").val();
		//备注参数
		sendObj.memo = $("#memo").val();
		console.log(sendObj)
//		for(var i in sendObj){
//			if (sendObj[i] == null || sendObj[i] == undefined || sendObj[i] == "") {
//				if(sendObj[i] == sendObj.inputMobile){
//					returndeviceType
//				}else{
//					alert("数据不可为空!");
//					return;
//				}
//			}
//		};
		console.log($(".el-range-input").eq(1).val())
		if($("#applyHos").val()==""||$("#applyHos").val()==null){
			alert("医院不可为空!");
			return;
		}
		if($(".el-range-input").eq(1).val()==""||$(".el-range-input").eq(1).val()==null){
			alert("核算起始日期不能为空");
			return;
		}
		if($("#returnTime").val()==""||$("#returnTime").val()==null){
			alert("回款时间不可为空!");
			return;
		}
		if($("#shouldPrice").val()==""||$("#shouldPrice").val()==null){
			alert("应收回款不可为空!");
			return;
		}
		if($("#factPrice").val()==""||$("#factPrice").val()==null){
			alert("实收回款不可为空!");
			return;
		}
		if($("#cost").val()==""||$("#cost").val()==null){
			alert("成本不可为空!");
			return;
		}
		if($("#grossProfit_val").val()==""||$("#grossProfit_val").val()==null){
			alert("请选择毛利计算方式");
			return;
		}
		ajaxGet('/operate/jiuyueInfo/update',sendObj,function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					setTimeout(function(){ 
                    	parent.$(window.parent.document).find(".layui-layer-close").click();
                    }, 300);
                    RefreshIframe("page/operationDataAdmin/jyMemberPush/jyMemberList.html","YYSJGL_JYYYXXWH");  //标签配置Id
                    
				}else{
					alert(data.message);
				}
		})
	});
})
