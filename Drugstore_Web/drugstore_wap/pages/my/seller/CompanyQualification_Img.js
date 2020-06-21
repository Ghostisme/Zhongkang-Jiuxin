mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var userId = sessionStorage.getItem('userId');
var companys = document.getElementById('companys');
var jumpState=sessionStorage.getItem('businessLicence');
var imgs;
if(jumpState=='companys'){
	$('#navTxt').text("营业执照");
	$('#companys').css('display','block');
	$('#countagree').css('display','none');
	$('#tax').css('display','none');
	$('#Corporate').css('display','none');
	$('#organization').css('display','none');
	$('#others').css('display','none');
}else if(jumpState=='countagree'){
	$('#navTxt').text("开户许可证");
	$('#companys').css('display','none');
	$('#countagree').css('display','block');
	$('#tax').css('display','none');
	$('#Corporate').css('display','none');
	$('#organization').css('display','none');
	$('#others').css('display','none');
}else if(jumpState=='tax'){
	$('#navTxt').text("税务登记证");
	$('#companys').css('display','none');
	$('#countagree').css('display','none');
	$('#tax').css('display','block');
	$('#Corporate').css('display','none');
	$('#organization').css('display','none');
	$('#others').css('display','none');
}else if(jumpState=='Corporate'){
	$('#navTxt').text("企业认证授权书");
	$('#companys').css('display','none');
	$('#countagree').css('display','none');
	$('#tax').css('display','none');
	$('#Corporate').css('display','block');
	$('#organization').css('display','none');
	$('#others').css('display','none');
}else if(jumpState=='organization'){
	$('#navTxt').text("组织机构代码证");
	$('#companys').css('display','none');
	$('#countagree').css('display','none');
	$('#tax').css('display','none');
	$('#Corporate').css('display','none');
	$('#organization').css('display','block');
	$('#others').css('display','none');
}else if(jumpState=='others'){
	$('#navTxt').text("其他证书");
	$('#companys').css('display','none');
	$('#countagree').css('display','none');
	$('#tax').css('display','none');
	$('#Corporate').css('display','none');
	$('#organization').css('display','none');
	$('#others').css('display','block');
}
$.ajax({
	type: "GET",
	url: config+'seller/displayCompanyInfo',
	contentType: "json; charset=utf-8",
	async: true,
	data:{id:userId,mobile:1},
	dataType: 'JSONP',
	jsonp: 'callback',
	success: function(data) {
		console.log(data);
		console.log(data.data[0].img1);
		console.log(data.data[0].img2);
		console.log(data.data[0].img3);
		if(data.data[0].businesslicensetype==1){
//			$('#companys .companyDetail img').attr('src',src+data.data[0].img1);
			if(data.data[0].img1!=""&&data.data[0].img1!=null){
				$('.companys').css('display','none');
				html='';
				html += '<img src="' +src+data.data[0].img1 + '" alt="" />';
				$('#companys .companyDetail').append(html);
			}else{
				$('.companys').css('display','block');
				$('.companys .confirmtxt').text('您尚未上传营业执照！');
				$('#companys .companyDetail').css('display','none');
			}
			if(data.data[0].img2!=""&&data.data[0].img2!=null){
				$('.countagree').css('display','none');
				countagree='';
				countagree += '<img src="' +src+data.data[0].img2 + '" alt="" />';
				$('#countagree .companyDetail').append(countagree);
			}else{
				$('.countagree').css('display','block');
				$('.countagree .confirmtxt').text('您尚未上传开户许可证！');
				$('#countagree .companyDetail').css('display','none');
			}
			if(data.data[0].img3!=""&&data.data[0].img3!=null){
				$('.Corporate').css('display','none');
				Corporate='';
				Corporate +='<img src="' +src+data.data[0].img3 + '" alt="" />';
				$('#Corporate .companyDetail').append(Corporate);
			}else{
				$('.Corporate').css('display','block');
				$('.Corporate .confirmtxt').text('您尚未上传企业认证授权书！');
				$('#Corporate .companyDetail').css('display','none');
			}
			
			for(var i=9,arr=[];i<=20;i++){
				imgs='img'+i;
				var imgList=eval(('data.data[0].')+imgs);
				console.log(imgList);
				if(imgList!=''&&imgList!=null){
					arr.push(imgList);
				}
			}
			if(arr.length>0){
				$('.others').css('display','none');
			}else{
				$('.others').css('display','block');
				$('.others .confirmtxt').text('您尚未上传其他证书！');
				$('#others .companyDetail').css('display','none');
			}
			for(var j=0;j<arr.length;j++){
				div = document.createElement('div');
				if( j % 2 != 0) {
					div.className = 'companyDetail';
				} else if(j == 0 ||j % 2 == 0) {
					div.className = 'companyDetail left_list';
				}
				others='';
				others +='<img src="' +src+arr[j] + '" alt="" />';
				div.innerHTML=others;
				$('#others').append(div);
			}
			
			
		}else if(data.data[0].businesslicensetype==2){
			if(data.data[0].img1!=""&&data.data[0].img1!=null){
				$('.companys').css('display','none');
				html='';
				html += '<img src="' +src+data.data[0].img1 + '" alt="" />';
				$('#companys .companyDetail').append(html);
			}else{
				$('.companys').css('display','block');
				$('.companys .confirmtxt').text('您尚未上传营业执照！');
				$('#companys .companyDetail').css('display','none');
			}
			if(data.data[0].img2!=""&&data.data[0].img2!=null){
				$('.organization').css('display','none');
				organization='';
				organization +='<img src="' +src+data.data[0].img2 + '" alt="" />';
				$('#organization .companyDetail').append(organization);
			}else{
				$('.organization').css('display','block');
				$('.organization .confirmtxt').text('您尚未上传组织机构代码证！');
				$('#organization .companyDetail').css('display','none');
			}
			if(data.data[0].img3!=""&&data.data[0].img3!=null){
				$('.tax').css('display','none');
				tax='';
				tax +='<img src="' +src+data.data[0].img3 + '" alt="" />';
				$('#tax .companyDetail').append(tax);
			}else{
				$('.tax').css('display','block');
				$('.tax .confirmtxt').text('您尚未上传税务登记证！');
				$('#tax .companyDetail').css('display','none');
			}
			if(data.data[0].img4!=""&&data.data[0].img4!=null){
				$('.countagree').css('display','none');
				countagree='';
				countagree += '<img src="' +src+data.data[0].img4 + '" alt="" />';
				$('#countagree .companyDetail').append(countagree);
			}
			else{
				$('#countagree .companyDetail').css('display','none');
				$('.countagree').css('display','block');
				$('.countagree .confirmtxt').text('您尚未上传开户许可证！');
			}
			if(data.data[0].img5!=""&&data.data[0].img5!=null){
				$('.Corporate').css('display','none');
				Corporate='';
				Corporate +='<img src="' +src+data.data[0].img5 + '" alt="" />';
				$('#Corporate .companyDetail').append(Corporate);
			}else{
				$('#Corporate .companyDetail').css('display','none');
				$('.Corporate').css('display','block');
				$('.Corporate .confirmtxt').text('您尚未上传企业认证授权书！');
			}
			
			for(var i=9,arr=[];i<=20;i++){
				imgs='img'+i;
				var imgList=eval(('data.data[0].')+imgs);
				console.log(imgList);
				if(imgList!=''&&imgList!=null){
					arr.push(imgList);
				}
			}
			if(arr.length>0){
				$('.others').css('display','none');
			}else{
				$('.others').css('display','block');
				$('.others .confirmtxt').text('您尚未上传其他证书！');
			}
			for(var j=0;j<arr.length;j++){
				div = document.createElement('div');
				if( j % 2 != 0) {
					div.className = 'companyDetail';
				} else if(j == 0 ||j % 2 == 0) {
					div.className = 'companyDetail left_list';
				}
				others='';
				others +='<img src="' +src+arr[j] + '" alt="" />';
				div.innerHTML=others;
				$('#others').append(div);
			}
			
			
			
			
		}

	},
	error: function(data) {

	}
});


