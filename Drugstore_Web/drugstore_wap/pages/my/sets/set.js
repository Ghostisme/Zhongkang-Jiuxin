$(document).on("tap",".setItems",function(){
	var currentItem=$(this).find(".InfoTitle").text().trim();
	switch (currentItem){
		case "修改密码":
		jumpUrl("../../changePwd/changePwd.html");
		break;
		case "版本更新":
//		jumpUrl("../../changePwd/changePwd.html");
		break;
		case "关于我们":
		jumpUrl("aboutUs/aboutUs.html");
		break;
	}
});
function jumpUrl(url){
	window.location.href=url;
}
