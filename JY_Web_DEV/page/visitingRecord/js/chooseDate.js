$(document).ready(function(){
	$('#kinerDatePickerInput1').kinerDatePicker({
		clickMaskHide: true,
		showHandler: function (ctx) {
			console.log("显示时间选择器:",ctx);
		},
		hideHandler: function (ctx) {
			console.log("隐藏时间选择器:",ctx);
		},
		changeHandler: function (vals,ctx) {
			console.log("时间改变:",vals,ctx);
		},
		okHandler: function (vals, ctx) {
			console.log("确定选择:",vals,ctx);
		},
		cancelHandler: function (ctx) {
			console.log("取消选择:",ctx);
		}
	})
	$('#kinerDatePickerInput2').kinerDatePicker({
		clickMaskHide: true,
		showHandler: function (ctx) {
			console.log("显示时间选择器:",ctx);
		},
		hideHandler: function (ctx) {
			console.log("隐藏时间选择器:",ctx);
		},
		changeHandler: function (vals,ctx) {
			console.log("时间改变:",vals,ctx);
		},
		okHandler: function (vals, ctx) {
			console.log("确定选择:",vals,ctx);
		},
		cancelHandler: function (ctx) {
			console.log("取消选择:",ctx);
		}
	})
})