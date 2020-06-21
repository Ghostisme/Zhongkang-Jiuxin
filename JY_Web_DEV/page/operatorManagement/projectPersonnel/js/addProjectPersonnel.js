//新增按钮点击以及删除按钮点击
cloneDom(".editBtn1", ".innerBox", ".tpl", ".delBtn1");
cloneDom(".editBtn2", ".outBox", ".tpl1", ".delBtn2");
function cloneDom(addBtnDom, boxDom, cloneDom, delBtnDom){
	$(addBtnDom).click(function(){
		var oWrapper = $(boxDom);
		var oCloneDom = $(cloneDom).clone().removeClass(cloneDom.split(".")[1]);
		oWrapper.append(oCloneDom);
		delBtnClick(delBtnDom);
	})
}
function delBtnClick(delBtnDom){
	$(delBtnDom).click(function(){
		$(this).parent().parent().parent().parent().parent().remove();
	})
}


//新增保存按钮点击
$(".subBtn1").click(function() {		
	var fromArray = $('#equipmentForm').serializeArray();
	console.log(fromArray);
//	fromArray.splice(13, 9);
//	fromArray.splice(23, 9);
	var basicsList = fromArray.splice(0, 4);
//	var inHospitalArr = fromArray.splice(4, 10);
//	var outHospitalArr = fromArray.splice(4, 10);
	console.log(fromArray);
	console.log(basicsList);
	var data = {};
	var jsonInfo = [];
	var obj = {};
	basicsList.map( item => {
		data[item.name] = item.value;	
//		obj.type = radioStatus;
	})
	jsonInfo.push(obj);			
//	data.type = radioStatus;
//	data.projectName = $("#projectName").val();
//	data.name = $("#outName").val();
//	data.address = $("#address").val();
//	data.phone = $("#outPhone").val();
	data.jsonInfo = JSON.stringify(jsonInfo);
	console.log(jsonInfo)
	console.log(data)
//	ajaxGet("/operate/assessment/save", data, function(data){
//		console.log(data);
//		if(data.status == "0") {
//			alert(data.message);
//			$("#reportQueryFade").hide();
//			getreportQueryList();
//		} else {
//			alert(data.message);
//		}
//	})			
});