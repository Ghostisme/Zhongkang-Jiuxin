var menuIds;
var menuAppIds;
$(function() {
	getMenuTreeData();
	validateRule();
});
//$.validator.setDefaults({
//	submitHandler : function() {
//		getAllSelectNodes();
//		update();
//	}
//});
function loadMenuTree(menuTree) {
	$('#menuTree').jstree({
//		"plugins" : [ "wholerow", "checkbox" ],
		"plugins" : [ "checkbox" ],
		'core' : {
			'data' : menuTree
		},
		"checkbox" : {
			//"keep_selected_style" : false,
			//"undetermined" : true
			//"three_state" : false,
			//"cascade" : ' up'
		}
	});
	$('#menuTree').jstree('open_all');
}
function loadMenuTreeRight(menuTree) {
	$('#menuTreeRight').jstree({
//		"plugins" : [ "wholerow", "checkbox" ],
		"plugins" : [ "checkbox" ],
		'core' : {
			'data' : menuTree
		},
		"checkbox" : {
			//"keep_selected_style" : false,
			//"undetermined" : true
			//"three_state" : false,
			//"cascade" : ' up'
		}
	});
	$('#menuTreeRight').jstree('open_all');
}
function getAllSelectNodes() {
	var ref = $('#menuTree').jstree(true); // 获得整个树
	menuIds = ref.get_selected(); // 获得所有选中节点的，返回值为数组
	$("#menuTree").find(".jstree-undetermined").each(function(i, element) {
		menuIds.push($(element).closest('.jstree-node').attr("id"));
	});
	
//	app端
	var refApp = $('#menuTreeRight').jstree(true); // 获得整个树
	menuAppIds = refApp.get_selected(); // 获得所有选中节点的，返回值为数组
	$("#menuTreeRight").find(".jstree-undetermined").each(function(i, element) {
		menuAppIds.push($(element).closest('.jstree-node').attr("id"));
	});
//	console.log(menuIds); 
//	console.log(menuAppIds); 
}
function getMenuTreeData() {
	var roleId = $('#roleId').val();				
	ajaxGet('/sys/role/toSave', {},function(data){
		console.log(data.resultMap.menuTree.children);
		loadMenuTree(data.resultMap.menuTree.children) 
		loadMenuTreeRight(data.resultMap.appMenuTree.children)
	})
}
function update() {
	$('#menuIds').val(menuIds);
	var role = $('#signupForm').serialize();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sys/role/update",
		data : role, // 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(r) {
			if (r.code == 0) {
				parent.layer.msg(r.msg);
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.msg(r.msg);
			}

		}
	});
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			roleName : {
				required : true
			}
		},
		messages : {
			roleName : {
				required : icon + "请输入角色名"
			}
		}
	});
}

$("#doAdd").click(function() {
	getAllSelectNodes();
	var name = $("#add_name").val();
	var memo = $("#add_memo").val();
	if(name==""||name==null){
		swal({title: "",text: '请输入角色名称！'});
	}else if(memo==""||memo==null){
		swal({title: "",text: '请简单描述该角色！'});
	}else if(menuIds.length==0){
		swal({title: "",text: '请选择web端角色包含的权限！'});
	}else if(menuAppIds.length==0){
		swal({title: "",text: '请选择app端角色包含的权限！'});
	}else{
//		var sperIds =[]; 
//		$('select[name="sperIds"]').each(function(){ 
//			var vvv=$(this).val();
//			if(vvv&&vvv!='0'){
//				sperIds.push($(this).val()); 
//			}
//		});
//		var perIds =[]; 
//		$('input[name="perIds"]:checked').each(function(){ 
//			perIds.push($(this).parent().find(".permissionId").text()); 
//		});
//		if(sperIds.length==0&&perIds.length==0){
//			swal({title: "",text: '请选择角色包含的权限！'});
//			return false;
//		}
//		perIds=window.JSON.stringify(perIds);
		console.log(menuIds); 
		console.log(menuAppIds);
		menuIds=window.JSON.stringify(menuIds);
		menuAppIds=window.JSON.stringify(menuAppIds);
		var params = {
			'name' : name,
			'remark' : memo,
			'menuIdJson' : menuIds,
			'appMenuIdJson': menuAppIds,
		};
		console.log(params);
		ajaxGet('/sys/role/save', params,function(data) {
				var status = data.status;
				console.log(data);
				if (status == 0) {
					swal({title:'',text:'新建成功！'});
					setTimeout(function() {
						parent.$(window.parent.document).find(".layui-layer-close").click();
					}, 2000);
					RefreshIframe("page/permissionList/permissionList.html", "5");
					
				} else {
					swal({title:'',text:data.message});
				}
			});
	}
				
});