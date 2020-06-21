function pageGo(ele, src){
	$(ele).click(function(){
		$(location).prop('href', src);
	})
}