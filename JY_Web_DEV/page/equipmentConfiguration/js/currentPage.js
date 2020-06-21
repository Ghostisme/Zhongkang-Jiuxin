//分页
//let currentPage,
//offsetPage, //传输的页起始条数
//showNum, //页面需要显示的条数
//num_page;
let tabsActiveName = sessionStorage.getItem("tabsActiveName");
console.log(tabsActiveName, "tabsActiveName");

//点击分页页数
$(document).delegate(".flipOver", 'click', function() {
	$(this).addClass('active').siblings().removeClass('active');
//	currentPage = parseInt($(this).attr("pageId"));
//	offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
	tabsActiveName = sessionStorage.getItem("tabsActiveName");
	switch (tabsActiveName){
		case "1":
			webApp.equipmentBrand.currentPage = parseInt($(this).attr("pageId"));
			webApp.equipmentBrand.offsetPage = (webApp.equipmentBrand.currentPage - 1) * 10; //（页码-1）*每页显示条数
//			currentPage = webApp.equipmentBrand.currentPage;
//			offsetPage = webApp.equipmentBrand.offsetPage;
//			showNum = webApp.equipmentBrand.showNum;
//			num_page = webApp.equipmentBrand.num_page;
			break;
		case "2":
			webApp.equipmentModel.currentPage = parseInt($(this).attr("pageId"));
			webApp.equipmentModel.offsetPage = (webApp.equipmentModel.currentPage - 1) * 10; //（页码-1）*每页显示条数
//			currentPage = webApp.equipmentModel.currentPage;
//			offsetPage = webApp.equipmentModel.offsetPage;
//			showNum = webApp.equipmentModel.showNum;
//			num_page = webApp.equipmentModel.num_page;
			break;
		case "3":
			webApp.equipmentName.currentPage = parseInt($(this).attr("pageId"));
			webApp.equipmentName.offsetPage = (webApp.equipmentName.currentPage - 1) * 10; //（页码-1）*每页显示条数
//			currentPage = webApp.equipmentName.currentPage;
//			offsetPage = webApp.equipmentName.offsetPage;
//			showNum = webApp.equipmentName.showNum;
//			num_page = webApp.equipmentName.num_page;
			break;	
		default:
			webApp.equipmentInspection.currentPage = parseInt($(this).attr("pageId"));
			webApp.equipmentInspection.offsetPage = (webApp.equipmentInspection.currentPage - 1) * 10; //（页码-1）*每页显示条数
//			currentPage = webApp.equipmentInspection.currentPage;
//			offsetPage = webApp.equipmentInspection.offsetPage;
//			showNum = webApp.equipmentInspection.showNum;
//			num_page = webApp.equipmentInspection.num_page;
			break;
	}
//	initData();
	webApp.getData(tabsActiveName);
	window.scrollTo(0, 0);
});
//点击上一页
$(document).delegate("#prev", 'click', function() {
	tabsActiveName = sessionStorage.getItem("tabsActiveName")
	if($('#pane-'+tabsActiveName).find(".flipOver.active").prev().attr("id") == "prev") {
		return true
	} else {
		var page = parseInt($('#pane-'+tabsActiveName).find(".flipOver.active").attr("pageid")) - 1;
		$('#pane-'+tabsActiveName).find(".flipOver.active").prev().addClass("active").siblings().removeClass("active");
	}
//	currentPage = page;
//	offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
	
	switch (tabsActiveName){
		case "1":
			webApp.equipmentBrand.currentPage = page;
			webApp.equipmentBrand.offsetPage = (webApp.equipmentBrand.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
		case "2":
			webApp.equipmentModel.currentPage = page;
			webApp.equipmentModel.offsetPage = (webApp.equipmentModel.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
		case "3":
			webApp.equipmentName.currentPage = page;
			webApp.equipmentName.offsetPage = (webApp.equipmentName.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;	
		default:
			webApp.equipmentInspection.currentPage = page;
			webApp.equipmentInspection.offsetPage = (webApp.equipmentInspection.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
	}
//	initData();
//	console.log(webApp,"找东西")
	webApp.getData(tabsActiveName);
	window.scrollTo(0, 0);
});

//点击下一页
$(document).delegate("#Next", 'click', function() {
	tabsActiveName = sessionStorage.getItem("tabsActiveName");
	console.log($('#pane-'+tabsActiveName));
	if($('#pane-'+tabsActiveName).find(".flipOver.active").next().attr("id") == "Next") {
		return true
	} else {
		var page = parseInt($('#pane-'+tabsActiveName).find(".flipOver.active").attr("pageid")) + 1;
		$('#pane-'+tabsActiveName).find(".flipOver.active").next().addClass("active").siblings().removeClass("active");
	}
//	currentPage = page;
//	offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
	
	
	switch (tabsActiveName){
		case "1":
			webApp.equipmentBrand.currentPage = page;
			webApp.equipmentBrand.offsetPage = (webApp.equipmentBrand.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
		case "2":
			webApp.equipmentModel.currentPage = page;
			webApp.equipmentModel.offsetPage = (webApp.equipmentModel.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
		case "3":
			webApp.equipmentName.currentPage = page;
			webApp.equipmentName.offsetPage = (webApp.equipmentName.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;	
		default:
			webApp.equipmentInspection.currentPage = page;
			webApp.equipmentInspection.offsetPage = (webApp.equipmentInspection.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
	}
//	initData();
	webApp.getData(tabsActiveName);
	window.scrollTo(0, 0);
});
//点击分页跳转页按钮
$(document).delegate(".srueToJumpPageBtn", 'click', function() {
//	currentPage = parseInt($(".toPageNum").val().trim());
//	offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
	tabsActiveName = sessionStorage.getItem("tabsActiveName");
	switch (tabsActiveName){
		case "1":
			webApp.equipmentBrand.currentPage = parseInt($(".equipmentBrandPageN .toPageNum").val().trim());
			webApp.equipmentBrand.offsetPage = (webApp.equipmentBrand.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
		case "2":
			webApp.equipmentModel.currentPage = parseInt($(".equipmentModelPageN .toPageNum").val().trim());
			webApp.equipmentModel.offsetPage = (webApp.equipmentModel.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
		case "3":
			webApp.equipmentName.currentPage = parseInt($(".equipmentNamePageN .toPageNum").val().trim());
			webApp.equipmentName.offsetPage = (webApp.equipmentName.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;	
		default:
			webApp.equipmentInspection.currentPage = parseInt($(".equipmentInspectionPageN .toPageNum").val().trim());
			webApp.equipmentInspection.offsetPage = (webApp.equipmentInspection.currentPage - 1) * 10; //（页码-1）*每页显示条数
			break;
	}
//	initData();
	webApp.getData(tabsActiveName);
	window.scrollTo(0, 0);
});

