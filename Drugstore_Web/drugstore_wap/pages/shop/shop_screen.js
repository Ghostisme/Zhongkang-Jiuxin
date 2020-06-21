//mui.init({
//	swipeBack: true //启用右滑关闭功能
//});
//mui('.mui-scroll-wrapper').scroll({
//	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//});
///*类别条件筛选*/
//$('#offCanvasSide').on("tap","#all",function(){
//	$('#offCanvasSide #gj_ul').slideToggle();
//	$('#offCanvasSide #varietyDetail').hide();
//	$('#offCanvasSide #standardDetail').hide();
//	$('#offCanvasSide #bg').css("display","block");
//});
///*品种*/
//$('#offCanvasSide').on("tap","#varietyAll",function(){
//	$('#offCanvasSide #varietyDetail').slideToggle();
//	$('#offCanvasSide #standardDetail').hide();
//	$('#offCanvasSide #gj_ul').hide();
//	$('#offCanvasSide #bg').css("display","block");
//});
///*类别列表*/
//$("#gj_ul").on("tap","li",function() {
//	$("#all")[0].innerHTML=$(this)[0].innerHTML;
//	$("#gj_ul").css("display","none");
//	$('#offCanvasSide #bg').css("display","none");
//});
///*品种列表*/
//$('#offCanvasSide #varietyDetail').on('tap','ul li',function(){
//	$("#offCanvasSide #varietyAll span")[0].innerHTML=$(this)[0].innerHTML;
//	$("#offCanvasSide #varietyAll span").css('color','#000');
//	$('#offCanvasSide #varietyDetail').hide();
//	$('#offCanvasSide #bg').css("display","none");
//	
//});
///*标准*/
//$('#offCanvasSide #standardDetail').on('tap','li',function(){
//	console.log($("#offCanvasSide #standard span")[0].innerHTML);
//	$("#offCanvasSide #standard span")[0].innerHTML=$(this).find('a').text();
//	$('#offCanvasSide #standardDetail').hide();
//	$('#offCanvasSide #bg').css("display","none");
//});
//$('#offCanvasSide').on("tap","#standard",function(){
//	$('#offCanvasSide #standardDetail').slideToggle();
//	$('#offCanvasSide #varietyDetail').hide();
//	$('#offCanvasSide #gj_ul').hide();
//	$('#offCanvasSide #bg').css("display","block");
//});
//
///*重置与完成功能*/
///*重置*/
//$("#offCanvasSide").on("tap","#bottom-div",function(){
//	var ulNode = document.getElementById('gj_ul');//类别
//	document.getElementById('all').firstElementChild.innerHTML="全部";
//	var varietyTxt=$("#offCanvasSide #varietyAll span")[0];//品种
//	varietyTxt.innerHTML="全部";
//	var standardTxt=$("#offCanvasSide #standard span")[0];//标准
//	standardTxt.innerHTML="国际标准";
//	var cityResult = $('#offCanvasSide #select_city span');//仓库位置
//	cityResult[0].innerText="省-市-区";
//	var inputs=$('input');//公司
//	inputs[0].value='';
//});
///*完成*/
//	
//
//$("#offCanvasSide").on("tap","#bottom-finish",function(){
//	var shopclassify=document.getElementById('all').firstElementChild.innerHTML;//类别
//	var variaty=$("#offCanvasSide #varietyAll span")[0].innerHTML;//品种
////	console.log(variaty);
//	var standard=$("#offCanvasSide #standard span")[0].innerHTML;//标准
////	console.log(standard);
//	var cityResult3 = $('#offCanvasSide #select_city span')[0].innerHTML;//仓库位置
//	//console.log(cityResult3);
//	var company=$('input').val();//公司
//	
//});
///*点击隐藏模态框*/
//$("#offCanvasSide").on("tap","#bg",function(){
//	$('#offCanvasSide #standardDetail').hide();
//	$('#offCanvasSide #varietyDetail').hide();
//	$('#offCanvasSide #gj_ul').hide();
//	$('#offCanvasSide #bg').css("display","none");
//});
//
