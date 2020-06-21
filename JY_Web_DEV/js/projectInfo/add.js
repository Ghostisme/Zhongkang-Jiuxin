$.ready(function() {
	loadProjectType();
	loadProjectState();
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/project/projectInfo/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			projectName : {
				required : true,
				maxlength:64
			},
			deptName : {
				required : true
			},
			userNames : {
				required : true
			},
			adminUsersNames : {
				required : true
			},
			type : {
				required : true
			},
			state : {
				required : true
			},
			description : {
				required : true,
				maxlength:100
			},
			remarks : {
				required : true,
				maxlength:255
			}
		},
		messages : {
			projectName:{
				required : icon + "请输入项目名称"
			},
			deptName : {
				required : icon + "请选择部门"
			},
			userNames : {
				required : icon + "请选择相关人员"
			},
			adminUsersNames : {
				required : icon + "请选择相关管理人员"
			},
			type : {
				required : icon + "请选择类别"
			},
			state : {
				required : icon + "请选择状态"
			},
			description : {
				required : icon + "请输入描述"
			},
			remarks : {
				required : icon + "请输入备注"
			}
		}
	})
}

var openUser = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/treeView"
	})
}
function loadUser(userIds,userNames){
	$("#userIds").val(userIds);
	$("#userNames").val(userNames);
}
var openAdminUser = function(){
	layer.open({
		type:2,
		title:"选择管理人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/adminUserTreeView"
	})
}
function loadAdminUser(adminUserIds,adminUserNames){
	$("#adminUserIds").val(adminUserIds);
	$("#adminUserNames").val(adminUserNames);
}
var openDept = function(){
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '300px', '450px' ],
		content:"/system/sysDept/treeView"
	})
}
function loadDept( deptId,deptName){
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
}
function loadProjectType(){
	var html = "";
	$.ajax({
		url : '/common/dict/list/project_type',
		success : function(data) {
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].value + '">' + data[i].name + '</option>'
			}
			$(".chosen-projectType").append(html);
			$(".chosen-projectType").chosen({
				maxHeight : 200
			});
			$(".chosen-projectType").trigger("chosen:updated");
			// 点击事件
			$('.chosen-projectType').on('change', function(e, params) {
				
			});
		}
	});
}

function loadProjectState(){
	var html = "";
	$.ajax({
		url : '/common/dict/list/project_state',
		success : function(data) {
			// 加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].value + '">' + data[i].name + '</option>'
			}
			$(".chosen-projectState").append(html);
			$(".chosen-projectState").chosen({
				maxHeight : 200
			});
			$(".chosen-projectState").trigger("chosen:updated");
			// 点击事件
			$('.chosen-projectState').on('change', function(e, params) {
				
			});
		}
	});
}