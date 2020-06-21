function checkForm(form) {
	var result = true;
	$("input[type=text]", $("form[name="+form+"]")).each(function() {
		var required = $(this).data("req");
		var val = $.trim($(this).val());
		if (required && !val) {
			if(result){
				result = false;
			}
			$(this).addClass("input_error");
		} else {
			$(this).removeClass("input_error");
		}
		if(val){
			var type = $(this).data("type");
			if (type == 'idcard') {
				if (!isIdCard(val)) {
					if(result){
						result = false;
					}
					$(this).focus().addClass("input_error");
				} else {
					$(this).removeClass("input_error");
				}
			} else if (type == 'email') {
				if (!val.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
					if(result){
						result = false;
					}
					$(this).focus().addClass("input_error");
				} else {
					$(this).removeClass("input_error");
				}
			} else if (type == 'phone') {
				if (!vailPhone(val)) {
					if(result){
						result = false;
					}
					$(this).focus().addClass("input_error");
				} else {
					$(this).removeClass("input_error");
				}
			}
		}
	});
	$("input[type=password]", document.forms[form]).each(function() {
		var required = $(this).data("req");
		var val = $.trim($(this).val());
		if (required && !val) {
			if(result){
				result = false;
			}
			$(this).addClass("input_error");
		} else {
			$(this).removeClass("input_error");
		}
	});
	$("textarea", document.forms[form]).each(function() {
		var ifcontinue=true;
		var required = $(this).data("req");
		var val = $.trim($(this).val());
		if (required && !val) {
			if(result){
				result = false;
			}
			$(this).addClass("input_error");
			ifcontinue=false;
		} else {
			$(this).removeClass("input_error");
		}
		if(ifcontinue){
			var maxlength = $(this).attr("maxlength");
			if (val.length > maxlength) {
				if(result){
					result = false;
				}
				$(this).addClass("input_error");
			} else {
				$(this).removeClass("input_error");
			}
		}
	});
	if(!result){
		myAlert("输入内容有错误，请检查！");
	}
	return result;
}
function isIdCard(cardid) {
	// 身份证正则表达式(18位)
	var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
	var stard = "10X98765432"; // 最后一位身份证的号码
	var first = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]; // 1-17系数
	var sum = 0;
	if (!isIdCard2.test(cardid)) {
		return false;
	}
	var year = cardid.substr(6, 4);
	var month = cardid.substr(10, 2);
	var day = cardid.substr(12, 2);
	var birthday = cardid.substr(6, 8);
	if (birthday != dateToString(new Date(year + '/' + month + '/' + day))) { // 校验日期是否合法
		return false;
	}
	for (var i = 0; i < cardid.length - 1; i++) {
		sum += cardid[i] * first[i];
	}
	var result = sum % 11;
	var last = stard[result]; // 计算出来的最后一位身份证号码
	if (cardid[cardid.length - 1].toUpperCase() == last) {
		return true;
	} else {
		return false;
	}
}
// 日期转字符串 返回日期格式20080808
function dateToString(date) {
	if (date instanceof Date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = month < 10 ? '0' + month : month;
		var day = date.getDate();
		day = day < 10 ? '0' + day : day;
		return year + "" + month + "" + day;
	}
	return '';
}
function vailPhone(phone) {
	var flag = false;
	var message = "";
	var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-3]{1})|(17[6-8]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (phone == '') {
		message = "手机号码不能为空！";
	} else if (phone.length != 11) {
		message = "请输入有效的手机号码！";
	} else if (!myreg.test(phone)) {
		message = "请输入有效的手机号码！";
	} else {
		flag = true;
	}
	return flag;
}