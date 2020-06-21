mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var provinceid;
var cityid;
var townid;
var classificationid;
var varietyid;
var standardid;
var maintenanceperiod;
var version;
var storeid;
var goodsId = sessionStorage.getItem("goodsMngId");
//goodsId = 'FSPT201608171012301864583';
var userId = sessionStorage.getItem('userId');
function loaded() {
	$.ajax({
		type: "GET",
//		url: "http://192.168.18.134:8080/gcafu_commerce/rest/seller/toAddproduct",
		//		url: "https://192.168.18.127:8443/gcafu_commerce/rest/seller/toAddproduct",
		url: config + "seller/toAddproduct",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
//			id: 3,
			id:userId,
			applicantid: goodsId,
			mobile: 1
		},
		//data: {id:'1109',applicantid:goodsId,mobile:1},
		dataType: 'JSONP',
		JSONP: "callback",
		success: function(data) {
			console.log("进去啦");
			console.log(data);
			$(".pname").append(data.productinfodata.productname);
			$(".goodsclassify").append(data.productinfodata.classificationname);
			$(".companyname").append(data.productinfodata.manufactor);
			$(".ver").append(data.productinfodata.varietyname);
			$(".ven").append(data.productinfodata.specifications);
			$(".standardTxt").append(data.productinfodata.standardname);
			$(".numTxt").append(data.productinfodata.material);
			$(".productId").append(data.productinfodata.productid);
			$(".maintenanceperiod").append(data.productinfodata.maintenanceperiod);
			$(".version").append(data.productinfodata.version);
			for(var i=0;i<data.storeListdata.length;i++){
				$(".cStore").append(data.storeListdata[i].province+'-'+data.storeListdata[i].city+'-'+data.storeListdata[i].town+'<br/>');
					html='';
					html+='<span class="provinceid"style="display:none">'+data.storeListdata[i].provinceid+'</span>';
					html+='<span class="cityid"style="display:none">'+data.storeListdata[i].cityid+'</span>';
					html+='<span class="townid"style="display:none">'+data.storeListdata[i].townid+'</span>';
					html+='<span class="storeid"style="display:none">'+data.storeListdata[i].storeid+'</span>';
					$('#goodsClassify').append(html);
			}
			classificationid=data.productinfodata.classificationid;
			varietyid=data.productinfodata.varietyid;
			standardid=data.productinfodata.standardid;
			maintenanceperiod=data.productinfodata.maintenanceperiod;
			version=data.productinfodata.version;
//			provinceid=data.;
//			cityid=data.;
//			townid=data.;
			console.log(classificationid);
			console.log(varietyid);
			console.log(standardid);
			console.log(maintenanceperiod);
			console.log(version);
		},
		error: function(data) {
			console.log("出错啦");
		}
	});
}
/*点击修改并提交向后台传数据*/
//var pram="'{store1:[{townid1:"+1+",infoupdatetime1:"+2+",cityid1:"+3+",:stock1:"+4+",provinceid1:"+5+"}]"+",maintenanceperiod:"+6+",classificationid:"+7+",moq:"+8+",ppu:"+9+",varietyid:"+10+",manufactor:"+11+",rules:"+12+",material:"+13+",specifications:"+14+",version:"+15+",productid:"+16+",storeL:"+17+",standardid:"+18+",applicantid:"+19+",pp:"+20+",productname:"+21+"}'";
//console.log(pram);
loaded();
$(".mui-scroll").on("tap", ".quitBtn", function() {
	//	console.log(provinceid+" "+cityid+" "+townid);

	var myDate = new Date();
	//	console.log(myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate());
	var infoupdatetime = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDate();
	var productname = $(".pname").text();
	productname = productname.replace(/(^\s*)|(\s*$)/g, "");
//	var classificationid = $(".goodsclassify").text();
	var manufactor = $(".companyname").text();
//	var varietyid = $(".ver").text();
	var specifications = $(".ven").text();
//	var standardid = $(".standardTxt").text();
	var material = $(".numTxt").text();
	var productId = parseInt($(".productId").text());
	
//	var maintenanceperiod = $(".maintenanceperiod").text();
//	var version = $(".version").text();
	var ppu = $("#pputxt").val().trim();
	var pp = $("#pricetxt").val().trim();
	var moq = $("#numtxt").val().trim();
	var stock = $("#storetxt").val().trim();
	var rules = "满" + $("#full").val().trim() + "减" + $("#minus").val().trim();
	//	var arr=[];
	//	arr.push(
	//		"id":'1087',
	//		"townid1":townid,
	//		"infoupdatetime1":infoupdatetime,
	//		"cityid1":cityid,
	//		"stock1":stock,
	//		"provinceid1":provinceid,
	//		"maintenanceperiod":maintenanceperiod,
	//		"classificationid":classificationid,
	//		"moq":moq,
	//		"ppu":ppu,
	//		"varietyid":varietyid,
	//		"manufactor":manufactor,
	//		"rules":rules,
	//		"material":material,
	//		"specifications":specifications,
	//		"version":version,
	//		"productid":productId,
	//		"storeL":'1',
	//		"standardid":standardid,
	//		"applicantid":"",
	//		"pp":pp,
	//		"productname":productname,
	//	);
	// 	var pram="{store1:[{townid1:"+townid+",infoupdatetime1:"+infoupdatetime+",cityid1:"+cityid+",stock1:"+stock+",provinceid1:"+provinceid+"}]"+",maintenanceperiod:"+maintenanceperiod+",classificationid:"+classificationid+",moq:"+moq+",ppu:"+ppu+",varietyid:"+varietyid+",manufactor:"+manufactor+",rules:"+rules+",material:"+material+",specifications:"+specifications+",version:"+version+",productid:"+productId+",storeL:"+"1"+",standardid:"+standardid+",applicantid:"+""+",pp:"+pp+",productname:"+productname+"}";
//	var pram = "{" + '"id":"1087"' + ',"store1":[{"townid1":' + '"' + townid + '"' + ',"infoupdatetime1":' + '"' + infoupdatetime + '"' + ',"cityid1":' + '"' + cityid + '"';
//	pram += ',"stock1":' + '"' + stock + '"' + ',"provinceid1":' + '"' + provinceid + '"' + "}]";
//	pram += ',"maintenanceperiod":' + '"' + maintenanceperiod + '"' + ',"classificationid":' + '"' + classificationid + '"';
//	pram += ',"moq":' + '"' + moq + '"' + ',"ppu":' + '"' + ppu + '"' + ',"varietyid":' + '"' + varietyid + '"' + ',"manufactor":' + '"' + manufactor + '"' + ',"rules":' + '"' + rules + '"';
//	pram += ',"material":' + '"' + material + '"' + ',"specifications":' + '"' + specifications + '"' + ',"version":' + '"' + version + '"' + ',"productid":' + '"' + productId + '"';
//	pram += ',"storeL":' + '"' + '1' + '"' + ',"standardid":' + '"' + standardid + '"' + ',"applicantid":' + '"' + '' + '"' + ',"pp":' + '"' + pp + '"' + ',"productname":' + '"' + productname + '"' + "}";
	var provinceLen=$('.provinceid');
	var cityLen=$('.cityid');
	var townLen=$('.townid');
	var storeLen=$('.storeid');
	var a_list = new Array();
	for(var i=0;i<provinceLen.length;i++){
		var provinceid=provinceLen[i].innerHTML;
		var cityid=cityLen[i].innerHTML;
		var townid=townLen[i].innerHTML;
		var storeid=storeLen[i].innerHTML;
		console.log(provinceid+' '+cityid+' '+townid);
		var arry = {
						"provinceid":parseInt(provinceid),
						"cityid":parseInt(cityid),
						"townid":parseInt(townid),
						"stock":parseInt(stock),
						"infoupdatetime":infoupdatetime,
						"storeid":storeid
					};
			var ary = JSON.stringify(arry);
			a_list.push(arry);	
			console.log(a_list);
	}
	
			var pd = new Object();
		pd.product ={
			"productname":productname,
			"classificationid":classificationid,
			"varietyid":varietyid,
			"standardid":standardid,
			"material":material,
			"specifications":specifications,
			"manufactor":manufactor,
			"ppu":ppu,
			"pp":pp,
			"moq":moq,
			"rules":rules,
			"store":a_list,
			"maintenanceperiod":maintenanceperiod,
			"version":version,
			"productid":productId,
			"applicantid":goodsId,
			"id":userId
		};
	var productParams = JSON.stringify(pd);

	console.dir(productParams);
	if($("#pputxt").val() == "") {
		mui.toast("请输入计价单位！");
	} else if($("#pricetxt").val().trim() == "") {
		mui.toast("请输入单价！");
	} else if($("#numtxt").val().trim() == "") {
		mui.toast("请输入起订量！");
	} else if($("#storetxt").val().trim() == "") {
		mui.toast("请输入库存！");
	} else {
		$.ajax({
			type: 'GET',
//			url:'http://192.168.18.134:8080/gcafu_commerce/rest/seller/addproduct',
//			      url:'https://192.168.18.127:8443/gcafu_commerce/rest/seller/addproduct',
				url: config + 'seller/addproduct',
		dataType: 'JSONP',
			data: {
//				id: userId,
				productParams: productParams
			},
			//data:{id:'1087',productParams:'{"store1":[{"townid1":"411602","infoupdatetime1":"2017-04-10","cityid1":"411600","stock1":"120000","provinceid1":"410000"}],"maintenanceperiod":"12","classificationid":"1","moq":"100","ppu":"25元一卷","varietyid":"11","manufactor":"河北的胡","rules":"满100减1","material":"3666d","specifications":"ddd33","version":"0","productid":"0","storeL":"1","standardid":"2","applicantid":"","pp":"25","productname":"kkken"}'},
			contentType: 'application/json;charset=utf-8',
			JSONP: 'callback',
			success: function(data) {
				console.log("lll");
				console.log(data.code);
				if(data.code==1){
					mui.toast("修改提交成功！");
					var goodsDetail=setInterval(function(){
						window.location.href="goodsManage.html";
					},1500);
					
				}else if(data.code == 3){
					mui.toast("修改失败！");
				}
			},
			error: function() {
				//alert("系统出错,请重试");
			}
		});
	}
});

///*省市区三级联动*/
//(function($, doc) {
//	$.init();
//	$.ready(function(e) {
//		var cityPicker3 = new $.PopPicker({
//			layer: 3
//		});
//		cityPicker3.setData(cityData3);
//		var showCityPickerButton = doc.getElementById("inputDiv");
//		console.log(showCityPickerButton);
//		var cityResult3 = $('#gTel');
//		showCityPickerButton.addEventListener('tap', function(event) {
//			cityPicker3.show(function(items) {
//				cityResult3[0].style.color = "#000";
//				
//				if((items[0] || {}).text == "全部") {
//					cityResult3[0].value = "全部";
//					provinceid = (items[0] || {}).value;
//					cityid = 0;
//					townid = 0;
//				} else {
//					if((items[1] || {}).text == "全部") {
//						cityResult3[0].value = (items[0] || {}).text;
//						provinceid = (items[0] || {}).value;
//						cityid = (items[1] || {}).value;
//						townid = 0;
//					} else {
//						if((items[2] || {}).text == "全部") {
//							cityResult3[0].value = (items[0] || {}).text + "-" + (items[1] || {}).text;
//							provinceid = (items[0] || {}).value;
//							cityid = (items[1] || {}).value;
//							townid = (items[2] || {}).value;
//						} else {
//							cityResult3[0].value = (items[0] || {}).text + "-" + (items[1] || {}).text + "-" + (items[2] || {}).text;
//							provinceid = (items[0] || {}).value;
//							cityid = (items[1] || {}).value;
//							townid = (items[2] || {}).value;
//						}
//					}
//				}
//				//				cityResult3[0].innerText = (items[0] || {}).text + "-" + (items[1] || {}).text + "-" + (items[2] || {}).text;
//				//返回 false 可以阻止选择框的关闭
//				//				return false;
//				console.log(provinceid + " " + cityid + " " + townid);
//			});
//		}, false);
//	});
//})(mui, document);