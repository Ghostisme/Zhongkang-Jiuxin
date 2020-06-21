//$(".onoffswitch-label").click();//初始化上架 0上架 1下架
//			点击开关
var switchBtn=1;//默认下架
$(".onoffswitch-label").click(function(){
	if(switchBtn==0){
		switchBtn=1;//下架
	}else{
		switchBtn=0;//上架
	}
});

//var switchBtn="0";//默认下架
//$(".onoffswitch-label").click(function(){
//	if(switchBtn=="1"){
//		switchBtn="0";//下架
//	}else{
//		switchBtn="1";//上架
//	}
//});
/*商品基本信息上传图片*/
$('#acc_sc1').click(function() {
	addPic($('#image0'), $("#img0"));
});
$('#acc_sc2').click(function() {
	addPic($('#image1'), $("#img1"));
});
$('#acc_sc3').click(function() {
	addPic($('#image2'), $("#img2"));
});
$('#acc_sc4').click(function() {
	addPic($('#image3'), $("#img3"));
});
var image0 = "";
var image1 = "";
var image2 = "";
var image3 = "";
var imgArr;
var firstCategrayId;//定义的一级分类id
function addPic(fileId, imgId) {
	fileId.change(function() {
		var file = this.files[0];
		var fsize = parseInt((file.size) / 1024); //计算图片大小，默认是B，转换成KB  
		if(!/image\/\w+/.test(file.type)) {

			swal("请确保文件为图像类型");
			return false;
		}
		if(fsize >= 500) {
			swal("图片过大，请重新选择图片");
			return false;
		}
		if(!/\.(jpg|png|JPG|PNG)$/.test(fileId.val())) {
			swal("图片类型必须是.jpg,png中的一种");
			return false;
		}
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			imgId.attr('src', this.result);
			if(imgId.attr('id') == 'img0') {
				$('#big_img img').attr('src', this.result);
			}
			var fileElementId = $(fileId).attr("id");
			var formData = new FormData();
			formData.append("file", document.getElementById(fileElementId).files[0]);
			//			formData.append("type", 1);
			//			console.info(formData.get("myfile"));

			$.ajax({
				url: window.config + "/common/uploadImage",
				type: 'POST',
				data: formData,
				dataType: 'JSON',
				enctype: 'multipart/form-data',
				contentType: false,
				processData: false,
				success: function(data) {
					//把图片替换  
					//					console.log(data.resultMap.imageUrl); 
					if(fileElementId == "image0") {
						image0 = data.resultMap.imageUrl;
						$(".img1").val(image0);
						$("#img0").attr("src", image0);
						$("#big_img img").attr("src", image0);
						$("#img0").parent().find(".deleteImgs").addClass("deleteImgs_pic");
					} else if(fileElementId == "image1") {
						image1 = data.resultMap.imageUrl;
						$(".img2").val(image1);
						//						console.log(image1)
						$("#img1").attr("src", image1);
						$("#img1").parent().find(".deleteImgs").addClass("deleteImgs_pic");
					} else if(fileElementId == "image2") {
						image2 = data.resultMap.imageUrl;
						$(".img3").val(image2);
						$("#img2").attr("src", image2);
						$("#img2").parent().find(".deleteImgs").addClass("deleteImgs_pic");
					} else if(fileElementId == "image3") {
						image3 = data.resultMap.imageUrl;
						console.log(image3);
						$(".img4").val(image3);
						$("#img3").attr("src", image3);
						$("#img3").parent().find(".deleteImgs").addClass("deleteImgs_pic");
					}
				},
				error: function() {
					swal("上传失败！");
				}
			});
		}
	});
}
var rec = localStorage.getItem("editingUndercarriage");
var showpic1="";
var showpic2="";
var showpic3="";
var showpic4="";
var showpic5="";
var detailCount=0;
getDrugsInfo();
function getDrugsInfo() {
	$.ajax({
		type: "get",
		url: config + "/drug/info/getDrugIdInfo",
		async: true,
		dataType: "JSON",
		data: {
			rec: rec
		},
		success: function(data) {
			console.log("list:", data);
			var commodityInfo = data.resultMap.commodityInfo;
			$(".goodsName").text(data.resultMap.commodityInfo.fullName); //药品名
			$("#spec").text(data.resultMap.commodityInfo.standard); //规格
			$("#approvalNumber").text(data.resultMap.commodityInfo.permitNo); //批准文号
			$("#standard_select").text(data.resultMap.commodityInfo.storageCondition); //储存条件
			$("#standerNumber").text(data.resultMap.commodityInfo.manufacturer); //生产厂商
			$("#vendor").text("￥" + data.resultMap.commodityInfo.retailPrice); //价格
			$("#brand_select").text(data.resultMap.commodityInfo.type); //药品剂型
			$("#brand_Store").text(data.resultMap.commodityInfo.qty);//库存
			firstCategrayId=data.resultMap.commodityInfo.typeId;//一级分类id
			//firstToSecond(data.resultMap.commodityInfo.typeId);
			$("#ryaoName").val(data.resultMap.commodityInfo.typeName); //一级分类
				if(data.resultMap.commodityCategoryTypeList!=null&&data.resultMap.commodityCategoryTypeList!=""){
					$("#secondType_select").html('');
					for(var i = 0; i < data.resultMap.commodityCategoryTypeList.length; i++) {
						var typeHtml = '';
						typeHtml += '<span class="selectTypeRow">';
						typeHtml += '<span class="selectTypeId"style="display:none;">' + data.resultMap.commodityCategoryTypeList[i].categoryId + '</span>';
						if(data.resultMap.commodityCategoryTypeList[i].flg == 'checked') {
							typeHtml += '<input type="checkbox" id="selectType' + i + '" checked/>';
						} else {
							typeHtml += '<input type="checkbox" id="selectType' + i + '"/>';
						}
	
						typeHtml += '<label for="selectType' + i + '">' + data.resultMap.commodityCategoryTypeList[i].name + '</label>';
						typeHtml += '</span>';
						$("#secondType_select").append(typeHtml);
					}
				}
			if(data.resultMap.commodityImgList.length > 0) {
				$("#big_img img").attr("src", data.resultMap.commodityImgList[0].fileUrl);
			}
			if(data.resultMap.commodityImgList.length == 1) {
				$("#img0").attr("src", data.resultMap.commodityImgList[0].fileUrl);
				$(".img1").val(data.resultMap.commodityImgList[0].fileUrl);
				$("#img0").parent().find(".deleteImgs").addClass("deleteImgs_pic");
			}
			if(data.resultMap.commodityImgList.length == 2) {
				$("#img0").attr("src", data.resultMap.commodityImgList[0].fileUrl);
				$("#img1").attr("src", data.resultMap.commodityImgList[1].fileUrl);
				$(".img1").val(data.resultMap.commodityImgList[0].fileUrl);
				$(".img2").val(data.resultMap.commodityImgList[1].fileUrl);
				$("#img0").parent().find(".deleteImgs").addClass("deleteImgs_pic");
				$("#img1").parent().find(".deleteImgs").addClass("deleteImgs_pic");
			}
			if(data.resultMap.commodityImgList.length == 3) {
				$("#img0").attr("src", data.resultMap.commodityImgList[0].fileUrl);
				$("#img1").attr("src", data.resultMap.commodityImgList[1].fileUrl);
				$("#img2").attr("src", data.resultMap.commodityImgList[2].fileUrl);
				$(".img1").val(data.resultMap.commodityImgList[0].fileUrl);
				$(".img2").val(data.resultMap.commodityImgList[1].fileUrl);
				$(".img3").val(data.resultMap.commodityImgList[2].fileUrl);
				$("#img0").parent().find(".deleteImgs").addClass("deleteImgs_pic");
				$("#img1").parent().find(".deleteImgs").addClass("deleteImgs_pic");
				$("#img2").parent().find(".deleteImgs").addClass("deleteImgs_pic");
			}
			if(data.resultMap.commodityImgList.length == 4) {
				$("#img0").attr("src", data.resultMap.commodityImgList[0].fileUrl);
				$("#img1").attr("src", data.resultMap.commodityImgList[1].fileUrl);
				$("#img2").attr("src", data.resultMap.commodityImgList[2].fileUrl);
				$("#img3").attr("src", data.resultMap.commodityImgList[3].fileUrl);
				$(".img1").val(data.resultMap.commodityImgList[0].fileUrl);
				$(".img2").val(data.resultMap.commodityImgList[1].fileUrl);
				$(".img3").val(data.resultMap.commodityImgList[2].fileUrl);
				$(".img4").val(data.resultMap.commodityImgList[3].fileUrl);
				$("#img0").parent().find(".deleteImgs").addClass("deleteImgs_pic");
				$("#img1").parent().find(".deleteImgs").addClass("deleteImgs_pic");
				$("#img2").parent().find(".deleteImgs").addClass("deleteImgs_pic");
				$("#img3").parent().find(".deleteImgs").addClass("deleteImgs_pic");
			}
			
			if(data.resultMap.commodityInfoImgList.length > 0) {
				$("#add_img_div").html('');
				for(var g = 0; g < data.resultMap.commodityInfoImgList.length; g++) {
					var filesBox='';
					detailCount++;
					filesBox+='<div id="select_img_div'+detailCount+'"class="img_box" class="img_box" style="position: relative;">';
					filesBox+='<img id="addimg'+detailCount+'" class="detail_img" src="'+data.resultMap.commodityInfoImgList[g].fileUrl+'" />';					
					filesBox+='<div class="acc_sc">';					
					filesBox+='<input type="file" name="showpic'+detailCount+'" id="showpic'+detailCount+'"class="showpicsFile"multiple/>';						
					filesBox+='</div>';					
					filesBox+='<div class="delete dele_pic">×</div>';					
					filesBox+='<input type="text" class="showpics showpic'+detailCount+'"name="showpic'+detailCount+'"/>';					
					filesBox+='</div>';	
					$("#add_img_div").append(filesBox);
				}
				kkk=data.resultMap.commodityInfoImgList.length;
				var filesNewBox='';
					kkk++;
					filesNewBox+='<div id="select_img_div'+kkk+'"class="img_box" class="img_box" style="position: relative;">';
					filesNewBox+='<img id="addimg'+kkk+'" class="detail_img" src="../../img/big_picture.png" />';					
					filesNewBox+='<div class="acc_sc">';					
					filesNewBox+='<input type="file" name="showpic'+kkk+'" id="showpic'+kkk+'"class="showpicsFile"multiple/>';						
					filesNewBox+='</div>';					
					filesNewBox+='<div class="delete">×</div>';					
					filesNewBox+='<input type="text" class="showpics showpic'+kkk+'"name="showpic'+kkk+'"/>';					
					filesNewBox+='</div>';	
					$("#add_img_div").append(filesNewBox);
			}
		},error: function(){
			alert("服务器错误");
		}
	});
}

//window.ImgArr='';
//提交修改信息
$("#submit_div button").click(function() {
	var sendTypeIds = '';
	var checkedInput = $("#secondType_select input:checked").length;
	if(checkedInput == 0) {
		swal("请选择二级分类后再进行提交！");
	} else {
		var checkedInput = $("#secondType_select input");
		for(var p = 0; p < checkedInput.length; p++) {
			if($(checkedInput[p]).prop('checked')) {
				sendTypeIds = sendTypeIds + $(checkedInput[p]).parent().find(".selectTypeId").text() + ',';
			}
		}
		sendTypeIds = (sendTypeIds.substring(sendTypeIds.length - 1) == ',') ? sendTypeIds.substring(0, sendTypeIds.length - 1) : sendTypeIds;
		console.log(sendTypeIds);
		var formData = new FormData();
		formData.append("commodityId", rec); //药品id
		formData.append("typeId", firstCategrayId); //一级分类id
		formData.append("categoryId", sendTypeIds); //二级分类id
		console.log(switchBtn);
		formData.append("isInvalid", switchBtn); //是否下架
		var img1 = $(".img1").val();
		var img2 = $(".img2").val();
		var img3 = $(".img3").val();
		var img4 = $(".img4").val();
		var productImg = [img1, img2, img3, img4];
//		console.log(productImg);
		formData.append("file", JSON.stringify(productImg));
//		uploadFiles(formData);
//		console.log(firstCategrayId);
		var arr = [];
		console.log(productImg)
		if($(".img_box").length > 1) {
			var imgBox=$(".img_box");
			for(var k=0;k<imgBox.length-1;k++){
				arr.push($(imgBox[k]).find(".detail_img").attr("src"));
			}
			console.log(arr);
			formData.append("img", JSON.stringify(arr));
			uploadFiles(formData);
		} else {
			var filesArray = [];
			formData.append("img", JSON.stringify(filesArray));
			uploadFiles(formData);
		}
	}
});

//	提交表单
function uploadFiles(formData) {
	$.ajax({
		url: config + '/drug/info/saveDrugInfo',
		//		url:"http://192.168.18.189:8080/gcafu_commerce/rest/upload/product",
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		dataType: 'JSON', //接收值的格式
		enctype: 'multipart/form-data',
		contentType: false,
		processData: false,
		success: function(data) {
			console.log(data);
			swal("提交成功！");
//			closeNavTabAndRefreshIframe("page/changeProductDetail/changeUndercarriage.html", "page/drugList/drugList.html")
			setTimeout(function(){
				closeNavTabAndRefreshIframe("page/changeProductDetail/changeUndercarriage.html", "page/drugList/undercarriageDrugList.html")
			},1000);
		},
		error: function() {
			swal("提交失败！");
		}
	});
}



/*商品详情信息上传图片*/
//$('.acc_sc5').click(function() {
//	detailAddPic($('#showpic1'), $("#addimg1"));
//});
//$('.acc_sc6').click(function() {
//	detailAddPic($('#showpic2'), $("#addimg2"));
//});
//$('.acc_sc7').click(function() {
//	detailAddPic($('#showpic3'), $("#addimg3"));
//});
//$('.acc_sc8').click(function() {
//	detailAddPic($('#showpic4'), $("#addimg4"));
//});
//$('.acc_sc9').click(function() {
//	detailAddPic($('#showpic5'), $("#addimg5"));
//});
$("#add_img_div").on("click",".acc_sc",function() {
	detailAddPic($(this).find('input[type="file"]'), $(this).parent().find('img'));
});
//	detailAddPic($(this).find('input[type="file"]'), $(this).parent().find('img'));

var kkk=1;
function detailAddPic(fileId, imgId) {
	fileId.change(function() {
		var file = this.files[0];
		var self = $(this);
		var fsize = parseInt((file.size) / 1024); //计算图片大小，默认是B，转换成KB  
		if(!/image\/\w+/.test(file.type)) {
	
			swal("请确保文件为图像类型");
			return false;
		}
		if(fsize >= 500) {
			swal("图片过大，请重新选择图片");
			return false;
		}
		if(!/\.(jpg|png|JPG|PNG)$/.test(fileId.val())) {
			swal("图片类型必须是.jpg,png中的一种");
			return false;
		}
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			
			
//			self.parent().parent().next().css("display","block");
//			self.parent().parent().next().nextAll().css("display","none");
			
			//向后台传值
			var fileElementId=$(fileId).attr("id");
//			console.log(fileElementId=="showpic1");
			//上传商品详情图片调取后台接口
			var formData = new FormData();
			formData.append("file", document.getElementById(fileElementId).files[0]); 
			console.log(document.getElementById(fileElementId));
//			console.info(formData.get("myfile"));
			$.ajax({
	            url:window.config+"/common/uploadImage",
//				url:"http://192.168.18.189:8080/gcafu_commerce/rest/upload/product",
	           	type:'POST',
				data:formData,
				dataType:'JSON',
				enctype:'multipart/form-data',
				contentType: false,
				processData: false,
				success:function(data){ 
	                //把图片替换  
	                console.log(data.resultMap.imageUrl);
					var nextSibling=self.parent().parent().next();
					self.parent().parent().find(".delete").addClass("dele_pic");
					self.css("display","none");
					imgId.attr('src', data.resultMap.imageUrl);
					var ImgLen=0;
					var imgBox=$(".img_box").find("img");
					for(var g=0;g<imgBox.length;g++){
						if($(imgBox[g]).attr("src")=="../../img/big_picture.png"){
							ImgLen++;
						}
					}
					if(ImgLen<1){
						var filesNewBox='';
						kkk++;
						filesNewBox+='<div id="select_img_div'+kkk+'"class="img_box" style="position: relative;">';
						filesNewBox+='<img id="addimg'+kkk+'" class="detail_img" src="../../img/big_picture.png" />';					
						filesNewBox+='<div class="acc_sc">';					
						filesNewBox+='<input type="file" name="showpic'+kkk+'" id="showpic'+kkk+'"class="showpicsFile"multiple/>';						
						filesNewBox+='</div>';					
						filesNewBox+='<div class="delete">×</div>';					
						filesNewBox+='<input type="text" class="showpics showpic'+kkk+'"name="showpic'+kkk+'"/>';					
						filesNewBox+='</div>';	
						$("#add_img_div").append(filesNewBox);
					}
//					if(fileElementId=="showpic1"){
////	                	showpic1=data;
//	                	$(".showpic1").val(data.resultMap.imageUrl);
//	                }else if(fileElementId=="showpic2"){
////	                	showpic2=data;
//	                	$(".showpic2").val(data.resultMap.imageUrl);
//	                }
//	                else if(fileElementId=="showpic3"){
////	                	showpic3=data;
//	                	$(".showpic3").val(data.resultMap.imageUrl);
//	                }
//	                else if(fileElementId=="showpic4"){
////	                	showpic4=data;
//	                	$(".showpic4").val(data.resultMap.imageUrl);
//	                }else if(fileElementId=="showpic5"){
////	                	showpic5=data;
//	                	$(".showpic5").val(data.resultMap.imageUrl);
//	                }
	            },  
	            error: function (data, status, e) {  
	            	console.log(status);
	                //alert("服务器错误！");  
	            }  
	        });  

		}
	});
}
/*商品详情信息删除图片*/
//$(document).on("click", ".dele_pic", function() {
//	$(this).parent().find('input[type="file"]').css("display","block");
//	$(this).parent().find("img").attr("src","../../img/big_picture.png");
//	$(this).parent().css('display', 'block');
//	$(this).parent().find(".delete").removeClass("dele_pic");
//	$(this).siblings("input").val("");
//	var nextLen=$(this).parent().nextAll();
//	for(var i=0;i<nextLen.length;i++){
//		if($(nextLen[i]).css("display")=="block"&&$(nextLen[i]).find("img").attr("src")=="../../img/big_picture.png"){
//			$(nextLen[i]).css("display","none");	
//		}else if($(nextLen[i]).css("display")=="block"&&$(nextLen[i]).find("img").attr("src")!="../../img/big_picture.png"){
//			if($(nextLen[nextLen.length-1]).css("display")=="block"&&$(nextLen[nextLen.length]).find("img").attr("src")=="../../img/big_picture.png"){
//				$(nextLen[nextLen.length]).css("display","none");
//			}else{
//				$(this).parent().parent().append($(this).parent().clone(true));
//				$(this).parent().remove();
//			}
//		}
//	}
//});
$(document).on("click", ".dele_pic", function() {
	$(this).parent().remove();
});
$(document).on("click", ".deleteImgs_pic", function() {
	$(this).parent().find("input").val('');
	$("."+$(this).parent().find("input").attr('name')).val('');;
	$(this).parent().parent().find("img").attr("src","../../img/small_picture.png");
	$(this).removeClass("deleteImgs_pic");
});


suggestInit();
//一级分类
function suggestInit() {
    ajaxGet('/drug/info/firstList', {name:"",limit:"",offset:""}, function (res) {
        console.log("一级分类：：：：",res);
        var resdata = res.resultMap.commodityTypeList;

        var baiduBsSuggest = $("#ryaoName").bsSuggest({
            //indexId: 0,//每组数据的第几个数据，作为输入输入框的数据id
            //indexKey: 1,//每组数据的第几个数据，作为输入输入框的内容
            idField: 'id',          //每组数据的哪个字段作为 data-id，优先级高于 indexId 设置（推荐）
            keyField: 'name',          //每组数据的哪个字段作为输入框内容，优先级高于 indexKey 设置（推荐）
            allowNoKeyword: false,//是否允许无关键字时请求数据
            showHeader: true, //是否显示选择列表的 header，默认有效字段大于一列时显示，否则不显示
            showBtn: true,//是否显示下拉按钮
            listAlign: "right",              //提示列表对齐位置，left/right/auto
            listStyle: {
                "width": "100%"//"max-width": "200px",
            },
            effectiveFields: ["name"],//有效显示于列表中的字段，非有效字段都会过滤
            effectiveFieldsAlias: {//有效字段的别名
                name: "一级分类"
            },
            data: {
                "value": resdata
            }
        }).on("onSetSelectValue", function (a, b) {//选择商品后触发
            $("#rec").val(b.id);
            firstCategrayId=b.id;
            firstToSecond(b.id);
//          for (var i=0;i<resdata.length;i++){
//              if(resdata[i].rec==b.id){
//                  $('#price').val(resdata[i].id);
//              }
//          }
        });
        
    })
}

function firstToSecond(firstSelectId){
	$.ajax({
        method: 'get',
        url: config + "/drug/info/twoMeno",
        contentType: "application/json; charset=utf-8", //传到后台的数据格式
        async: true,
        data: {typeId:firstSelectId},
        dataType: 'JSON', //接收值的格式
        success: function (data) {
            console.log('ajaxGet二级分类:',data);
				$("#secondType_select").html('');
				if(data.resultMap.commodityCategoryTypeList!=null&&data.resultMap.commodityCategoryTypeList!=""){
					for(var i = 0; i < data.resultMap.commodityCategoryTypeList.length; i++) {
						var typeHtml = '';
						typeHtml += '<span class="selectTypeRow">';
						typeHtml += '<span class="selectTypeId"style="display:none;">' + data.resultMap.commodityCategoryTypeList[i].categoryId + '</span>';
						if(data.resultMap.commodityCategoryTypeList[i].flg == 'checked') {
							typeHtml += '<input type="checkbox" id="selectType' + i + '" checked/>';
						} else {
							typeHtml += '<input type="checkbox" id="selectType' + i + '"/>';
						}
	
						typeHtml += '<label for="selectType' + i + '">' + data.resultMap.commodityCategoryTypeList[i].name + '</label>';
						typeHtml += '</span>';
						$("#secondType_select").append(typeHtml);
					}
				}
        },
        error: function (result) {
            //233
            console.log('ajaxGet-error:',result);
        }
    });
}
