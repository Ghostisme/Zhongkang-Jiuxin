$(function () {
//给四个区域绑定点击事件 判断当前的下一个区域 如果为空 点击当前区域 qrm-pinming-panel 隐藏 并且把input高亮去掉
    $("body").on("click",".qrm-lev>li",function () {
        if($(this).parent().parent().next().children(".qrm-lev").html()==""){
            // 去掉输入框的高亮状态
            $(".qrm-border1").hide();
            $(".qrm-border2").hide();
            $(".qrm-border3").hide();
            $(".choseDeptPlate").hide();
            $(".qrm-pinming").css("border","1px solid #ddd");
            $(".qrm-pinming").css("background-image","url(images/qrm-arrow-down.png)");
        }
    })
});
//点击空白处隐藏div
$(document).click(function(event){
        
        if($($(".choseDeptPlate")[0]).css("display")=="block"){
        	var x1 = $($('.deptSelectBox')[0]);  // 设置目标区域
	        if(!x1.is(event.target) && x1.has(event.target).length === 0){ // Mark 1
	        	$(".qrm-border1").hide();
	            $(".qrm-border2").hide();
	            $(".qrm-border3").hide();
	            $($(".choseDeptPlate")[0]).hide();
	            $(".qrm-pinming").css("border","1px solid #ddd");
	            $(".qrm-pinming").css("background-image","url(images/qrm-arrow-down.png)");
	           //$('#divTop').slideUp('slow');  //滑动消失
	//         $('.qrm-pinming-panel').hide(300);     //淡出消失
	        }
        }
       if($($(".choseDeptPlate")[1]).css("display")=="block"){
        	var x1 = $($('.deptSelectBox')[1]);  // 设置目标区域
	        if(!x1.is(event.target) && x1.has(event.target).length === 0){ // Mark 1
	        	$(".qrm-border1").hide();
	            $(".qrm-border2").hide();
	            $(".qrm-border3").hide();
	            $($(".choseDeptPlate")[1]).hide();
	            $(".qrm-pinming").css("border","1px solid #ddd");
	            $(".qrm-pinming").css("background-image","url(images/qrm-arrow-down.png)");
	           //$('#divTop').slideUp('slow');  //滑动消失
	//         $('.qrm-pinming-panel').hide(300);     //淡出消失
	        }
        }
   });