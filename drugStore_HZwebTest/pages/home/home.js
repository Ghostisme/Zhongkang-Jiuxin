//全部商品分类
var liIndex;
(function(){
	console.log($(".quickQuery"));
	$(".ulDown1 li").hover(function(){
		$(".ulChildDown").show();
		$(this).addClass("hoverStyle").siblings().removeClass("hoverStyle");
		liIndex=$(this).index();
	},function(){
		$(".ulChildDown").hide();
		$(".ulDown1 li").removeClass("hoverStyle");
	});
	$(".ulChildDown").hover(function(){
		$($(".ulDown1 li")[liIndex]).addClass("hoverStyle").siblings().removeClass("hoverStyle");
		$(".ulDown1").show();
		$(".ulChildDown").show();
	},function(){
		$(".ulDown1").show();
		$(".ulChildDown").hide();
		$(".ulDown1 li").removeClass("hoverStyle");
	});
})(jQuery);

$(".loadTop").load("../headerTop.html");
$(".loadHeader").load("../mainTop.html");
$("footer").load("../footerCommon.html");
$(".loadMenu").load("../fix_right_menu.html");
