$(document).ready(function(){
//	var arr1 = [];
	//多选择交互
	$(".listBox")
		.find("ul")
			.find("li")
				.click(function(){
					var status = $(this).find("i").attr("data-checked");
//					console.log(status)
					if(status == 1){
						$(this).find("i").html("&#xe684;");
						$(this).find("i").css({"color":"#cbcbcb"});
						$(this).find("i").attr("data-checked", "0");
					}else{
						$(this).find("i").html("&#xe67d;");
						$(this).find("i").css({"color":"#1aac19"});
						$(this).find("i").attr("data-checked", "1");
//						arr1.push($(this).find("span").text());
//						console.log(arr1);
//						return arr1;
					}
				})
//	return arr1;			
})