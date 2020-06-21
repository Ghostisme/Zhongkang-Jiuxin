mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var userId = sessionStorage.getItem('userId');
var businesslicensetype;
var applicantstatus;
/*点击三个nav分别切换到不同内容区*/
$(".manageNav").on("tap", "li", function() {
	//	console.log($(this).find("img"));
	$(this).find("img").addClass("show").removeClass("hide"); //当前元素加上图标
	$(this).siblings().find("img").addClass("hide").removeClass("show");
	//	console.log($(this).children("span"));
	$(this).children("span").addClass("navtextColor"); //当前元素改变字体颜色
	$(this).siblings().children("span").removeClass("navtextColor");
	var spanTxt = $(this).children("span").text();
	if(spanTxt == "公司信息") {
		//		console.log("我们都一样。。。");
		$(".businessInfo").css("display", "block");
		$(".businessAptitude").css("display", "none");
		$(".Account").css("display", "none");
	} else if(spanTxt == "公司资质") {
		$(".businessAptitude").css("display", "block");
		$(".businessInfo").css("display", "none");
		$(".Account").css("display", "none");
	} else {
		$(".Account").css("display", "block");
		$(".businessAptitude").css("display", "none");
		$(".businessInfo").css("display", "none");
	}
});
console.log(config);
$.ajax({
      type:'GET',
//	  url: 'https://192.168.18.127:8443/gcafu_commerce/rest/seller/displayCompanyInfo',
      url:config+'seller/displayCompanyInfo',
        dataType:'JSONP',
//        data:{id:1077,mobile:1},
      data:{id:userId,mobile:1},
        contentType:'application/json;charset=utf-8',
        JSONP:'callback',
        success:function(result){
        	console.log(result.data[0].companylogo);
          /*公司信息*/
          var logo="";
          	  logo+='<img src="'+src+result.data[0].companylogo+'">'
          	  
          	  if(result.data[0].companylogo!=''){
          	  	 $(".companyLOGO").append(logo);//企业LOGO
          	  }
          	  	$('.companyLOGO img').error(function(){
			    $(this).attr('src',"../../../styles/img/my_img/seller_img/companyImg.jpg");
			});
          	  
         
          $(".businessName").append(result.data[0].companyname);//公司名称
          $(".corPorate").append(result.data[0].legalperson);//法人代表
          $(".companyclassify").append(result.data[0].companytypename);//公司类型
          if(result.data[0].provincename == null && result.data[0].cityname ==null && result.data[0].townname == null){
          	 var Inlocation='';
          	  $(".location").append(Inlocation);//所在地区
          }else if(result.data[0].provincename == null){
          	var Inlocation=result.data[0].cityname+'-'+result.data[0].townname;
          	 $(".location").append(Inlocation);//所在地区
          }else if(result.data[0].cityname ==null){
          	var Inlocation=result.data[0].townname;
          	 $(".location").append(Inlocation);//所在地区
          }else if(result.data[0].townname == null){
          	var Inlocation=result.data[0].provincename+'-'+result.data[0].cityname;
          	 $(".location").append(Inlocation);//所在地区
          }else{
          	var Inlocation=result.data[0].provincename+'-'+result.data[0].cityname+'-'+result.data[0].townname;
          	 $(".location").append(Inlocation);//所在地区
          }
         
          $(".address").append(result.data[0].address);//详细地址
          $(".tel").append(result.data[0].tel);//联系方式
          $(".contacts").append(result.data[0].contacts);//指定联系人
          $(".mobilephone").append(result.data[0].cellphone);//指定手机号
          $(".email").append(result.data[0].email);//邮箱地址
          /*公司资质*/
         /*银行账户*/
          $(".bankName").append(result.data[0].openbank);
          $(".accountNumber").append(result.data[0].bankaccount);
          $(".TaxNumber").append(result.data[0].taxnumber);
          businesslicensetype=result.data[0].businesslicensetype;
          applicantstatus=result.data[0].applicantstatus;
        },    
         error:function(){
               alert("系统出错,请重试");
             }
      });
/*公司资质页，营业执照等的点击跳转*/
/*营业执照*/
$(".businessAptitude").on("tap",".businessLicence",function(){
	if(applicantstatus==10){
		mui.toast('您尚未入驻，请入驻后再查看！');
	}else if(applicantstatus==11){
		console.log("啦啦啦啦");
		sessionStorage.setItem('businessLicence','companys');
		window.location.href="CompanyQualification_Img.html";
	}
});
/*开户许可证*/
$(".businessAptitude").on("tap",".accountPermit",function(){
	if(applicantstatus==10){
		mui.toast('您尚未入驻，请入驻后再查看！');
	}else if(applicantstatus==11){
		sessionStorage.setItem('businessLicence','countagree');
		window.location.href="CompanyQualification_Img.html";
	}
});
/*税务登记*/
$(".businessAptitude").on("tap",".taxRegistration",function(){
	if(applicantstatus==10){
		mui.toast('您尚未入驻，请入驻后再查看！');
	}else if(applicantstatus==11){
		console.log(businesslicensetype);
		if(businesslicensetype==1){
			mui.toast('您尚未上传税务登记证！');
		}else if(businesslicensetype==2){
			console.log("啦啦啦啦");
			sessionStorage.setItem('businessLicence','tax');
			window.location.href="CompanyQualification_Img.html";
		}
	}
});
/*企业认证授权书*/
$(".businessAptitude").on("tap",".CorporateCertification",function(){
	if(applicantstatus==10){
		mui.toast('您尚未入驻，请入驻后再查看！');
	}else if(applicantstatus==11){
		console.log("啦啦啦啦");
		sessionStorage.setItem('businessLicence','Corporate');
		window.location.href="CompanyQualification_Img.html";
	}
});
/*组织机构代码证*/
$(".businessAptitude").on("tap",".organizationCode",function(){
	if(applicantstatus==10){
		mui.toast('您尚未入驻，请入驻后再查看！');
	}else if(applicantstatus==11){
		if(businesslicensetype==1){
			mui.toast('您尚未上传组织机构代码证！');
		}else if(businesslicensetype==2){
			console.log("啦啦啦啦");
			sessionStorage.setItem('businessLicence','organization');
			window.location.href="CompanyQualification_Img.html";
		}
	}	
});
/*其他证书*/
$(".businessAptitude").on("tap",".other",function(){
	if(applicantstatus==10){
		mui.toast('您尚未入驻，请入驻后再查看！');
	}else if(applicantstatus==11){
		sessionStorage.setItem('businessLicence','others');
		window.location.href="CompanyQualification_Img.html";
	}
});
