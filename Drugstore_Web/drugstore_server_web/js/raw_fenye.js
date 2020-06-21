var currentPage = 1;
var offsetPage=0;//传输的页起始条数
var showNum=10;//页面需要显示的条数
var num_pages;
//点击分页页数
$(document).delegate(".flipOver",'click',function(){
    $(this).addClass('active').siblings().removeClass('active');
    currentPage = parseInt($(this).attr("pageId"));
    offsetPage = (currentPage-1)*10;//（页码-1）*每页显示条数
    getDateList();
    window.scrollTo(0,0);
});
//点击上一页
$(document).delegate("#prev",'click',function(){
    if($(".flipOver.active").prev().attr("id") == "prev"){
        return true
    }else{
        var page = parseInt($(".flipOver.active").attr("pageid"))-1;
        $(".flipOver.active").prev().addClass("active").siblings().removeClass("active")
    }
    currentPage = page;
    offsetPage = (currentPage-1)*10;//（页码-1）*每页显示条数
    getDateList();
    window.scrollTo(0,0);
});
//点击下一页
$(document).delegate("#Next",'click',function(){
    if($(".flipOver.active").next().attr("id") == "Next"){
        return true
    }else{
        var page = parseInt($(".flipOver.active").attr("pageid"))+1;
        $(".flipOver.active").next().addClass("active").siblings().removeClass("active")
    }
    currentPage = page;
    offsetPage = (currentPage-1)*10;//（页码-1）*每页显示条数
    getDateList();
    window.scrollTo(0,0);
});
//点击分页跳转页按钮
$(document).delegate(".srueToJumpPageBtn",'click',function(){
    currentPage = parseInt($(".toPageNum").val().trim());
    offsetPage = (currentPage-1)*10;//（页码-1）*每页显示条数
    getDateList();
    window.scrollTo(0,0);
});