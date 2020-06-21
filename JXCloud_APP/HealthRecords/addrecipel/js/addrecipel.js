$(document).ready(function(){
	var maxstrlen = 140;
	function inputBind(eleid,id){
		var val = $('#' + eleid).val();
		var overNum = maxstrlen - val.length;
		if (overNum == 0) {
			$('#' + id).css({"color":"red"});
			layer.msg("您输入的字体已上限");
		} else{
			$('#' + id).css({"color":"#666"});
		}
		$('#' + id).text(overNum);				
	}
	// var maxstrlen = 140;
	// $("#memoNum").text(maxstrlen);
	// $("#memo").on("keyup",function(){
	// 	len = maxstrlen;
	// 	var str = this.value;
	// 	var myLen = 0;
	// 	var i = 0;
	// 	for (; (i < str.length) && (myLen <= maxstrlen * 2); i++) {
	// 		if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
	// 			myLen++;
	// 		else
	// 			myLen += 2;
	// 	}
	// 	var overNum = Math.floor((len * 2 - myLen) / 2);
	// 	var wck = document.getElementById("memoNum");
	// 	if (myLen > len * 2) {
	// 		c.value = str.substring(0, i + 1);
	// 	} else {
	// 		wck.innerHTML = overNum;
	// 		if (overNum == 0) {
	// 			$("#memoNum").css({"color": "red"});
	// 			$(this).blur();
	// 			layer.msg("您输入的字体已上限");
	// 		}else{
	// 			$("#memoNum").css({"color": "#666"});
	// 		}
	// 	}		
	// })
	//页面跳转
	
	//数据保存
	var eleId = sessionStorage.getItem("id");
	var eleDisid = sessionStorage.getItem("disid");
	console.log(eleId);
	console.log(eleDisid);
	// 自己定义点击保存事件
	$(".click").click(function(){
		$.ajax({
			type:"get",
			url:"http://192.31.10.62:8001/oa/patinfoPrescribe/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": eleDisid,
				"drugName": $(".drugName").val(),
				"chemistryName": $(".chemistryName").val(),
				"firmName": $(".firmName").val(),
				"dosage": $(".dosage").val(),
				"memo": $(".memo").val()
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
				}else{
					alert(data.message);
				}					
			},
			error: function(data){
				console.log("11" + data);
				if(data.status == 2){
					alert(data.message);
				}
			}
		});
	})
})
