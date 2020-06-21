var webApp = new Vue({
	el: "#web",
	data: function(){
		return {
			//列表表头数据
			titleList: [{
				name: "序号",
				domStyle: "width: 5%;"
			},{
				name: "项目名称",
				domStyle: "width: 15%;"
			},{
				name: "负责人",
				domStyle: "width: 15%;"
			},{
				name: "创建时间",
				domStyle: "width: 15%;"
			},{
				name: "创建人",
				domStyle: "width: 15%;"
			},{
				name: "操作",
				domStyle: "border-right: 1px solid transparent !important;"
			}],
			//角色list
			roleList: [],
			//查询字段
			queryProjectName: '',
			queryName: '',
			//分页字段
			currentPage: 1,
			offsetPage: 0,
			showNum: 10,
			doctoNum_page: 1,
			//数据字段
			dataList: [],
			checkList: [],
			
			initDataList: [],
			//其他字段
			
			delId: "",
			//删除弹窗
			delAlertFlag: false,
			alertFlagDel: false,
			addChangeFlag: false,
			//查看弹窗
			addQueryFlag: false,
			//新增弹窗
			addAlertFlag: false,
			alertFlagAdd: false,
			addIsActive: false,
			projectFlag: 0,
			project: "",
			tipProject: "",
			tipProjectStatus: "",
			tipProjectShow: false,
			tipRole: "",
			tipRoleStatus: "",
			tipRoleShow: false,
			checked: false,
			tipChecked: "",
			tipCheckedStatus: "",
			tipCheckedShow: false,
			roleValue: "",
			checkChooseList: [],
			//修改弹窗
			changeIsActive: false,
			alertFlagChange: false,
			changeAlertFlag: false,
			projectFlag1: 0,
			project1: "",
			tipProject1: "",
			tipProjectStatus1: "",
			tipProjectShow1: false,
			tipRole1: "",
			tipRoleStatus1: "",
			tipRoleShow1: false,
			checked: false,
			tipChecked1: "",
			tipCheckedStatus1: "",
			tipCheckedShow1: false,
			roleValue1: "",
			checkChooseList1: [],
			queryProjectNameList: [],
			queryNameList: []
		}
	},
	methods: {
		//条件查询按钮操作事件
		queryTopClick(){
			this.offsetPage = 0;
			this.showNum = 10;
			this.currentPage = 1;
			this.getData();
		},
		resetClick(){
			this.queryProjectName = "";
			this.queryName = "";
			this.offsetPage = 0;
			this.showNum = 10;
			this.currentPage = 1;
			this.getData();
		},
		//新增点击
		addClick(){
			let that = this;
			that.addAlertFlag = true;
			that.alertFlagAdd = true;
			that.addIsActive = 1;
			that.checkList = [];
			that.project = "";
			that.roleValue = "";
			that.roleList = [];
			that.checkChooseList = [];
			that.tipProjectShow = false;
			that.tipRoleShow = false;
			that.tipCheckedShow = false;
			that.projectFlag = 0;
			that.getRole();
		},
		//初始化数据
		getData(){
			let that = this;
			data = {
				offset: that.offsetPage, //（页码-1）*每页显示条数
                limit: that.showNum, //每页显示的条数
                userName: that.queryName,//项目负责人姓名
                name: that.queryProjectName//项目名称
			};
			ajaxGet("/operate/project/getProjectList", data, function(res){
				console.log(res);
				res.status === "0" ? that.dataList = res.resultMap.projectList : that.dataList = [];
				console.log(that.dataList);
				let doclistTotal = res.resultMap.count;
				that.doctoNum_page = Math.ceil(parseInt(doclistTotal) / 10); 
				let pageHtml = page(parseInt(that.currentPage), that.doctoNum_page);
				$(".doctorpageN").html(pageHtml);
//				that.queryProjectNameList = res.resultMap.projectList;
//				that.queryNameList = res.resultMap.projectList;
			})
		},
		getSelectData(){
			let that = this;
			data = {
				
			};
			ajaxGet("/operate/project/getProjectSerachList", data, function(res){
				console.log(res);
				res.status === "0" ? that.queryNameList = res.resultMap.list : that.queryNameList = [];
			})
		},
		getSelectProjectData(){
			let that = this;
			data = {
                userName: that.queryName,//项目负责人姓名
                name: that.queryProjectName//项目名称
			};
			ajaxGet("/operate/project/getProjectList", data, function(res){
				console.log(res);
				res.status === "0" ? that.queryProjectNameList = res.resultMap.projectList : that.queryProjectNameList = [];
				console.log(that.queryProjectNameList);
//				that.queryNameList = res.resultMap.projectList;
			})
		},
		queryData(id){
			let that = this;
			data = {
				id: id
			};
			ajaxGet("/operate/project/getProject", data, function(res){
				console.log(res);
				res.status === "0" ? that.initDataList = res.resultMap.project : that.initDataList = [];
				console.log(that.initDataList)
//				that.roleList checkList
				that.project = that.initDataList.name;
				that.getRole();
				that.roleValue = that.initDataList.roleId;
				that.getName(that.initDataList.roleId);
				that.initDataList.projectPersonnelList.map( item => {
					that.checkChooseList.push(item.userName);
				});
			})
		},
		changeData(id){
			let that = this;
			data = {
				id: id
			};
			ajaxGet("/operate/project/getProject", data, function(res){
				console.log(res);
				res.status === "0" ? that.initDataList = res.resultMap.project : that.initDataList = [];
				console.log(that.initDataList)
				that.project = that.initDataList.name;
				that.getRole();
				that.roleValue = that.initDataList.roleId;
				that.getName(that.initDataList.roleId);
				that.initDataList.projectPersonnelList.map( item => {
					that.checkChooseList.push(item.userName);
				});
			})
		},
		//获取角色
		getRole(){
			let that = this;
			ajaxGet("/sys/role/getRoleList", {}, function(res){
				console.log(res);
				res.status === "0" ? that.roleList = res.resultMap.roleList : that.roleList = [];
			});
		},
		getName(id){
			let that = this;
			console.log(typeof id);
//			if (id != null) {
				ajaxGet("/operate/project/getOperatePerson", {roleId: id}, function(res){
					console.log(res);
					res.status === "0" ? that.checkList = res.resultMap.userRoleList : that.checkList = [];
					
//					that.checkList.map( item => {
//						if(item.userName != ""){
//							return item;
//						}
//					});
					console.log(that.checkList);
					if (that.checkList.length == 0) {
						that.addFormCheck();
					}
				})
//			}
		},
		//查看点击
		queryClick(e, id){
			let that = this;
			that.addQueryFlag = true;
			that.projectFlag = 1;
			console.log(id);
			that.queryData(id);
		},
		closeQueryAlert(){
			let that = this;
			that.addQueryFlag = false;
		},
		//修改点击
		changeClick(e, id){
			let that = this;
//			that.changeAlertFlag = true;
//			that.alertFlagChange = true;
//			that.projectFlag = 0;
			that.changeIsActive = false;
			that.alertFlagChange = true;
			that.changeAlertFlag = true;
			that.projectFlag = 0;
			that.project = "";
			that.tipProject = "";
			that.tipProjectStatus = "";
			that.tipProjectShow = false;
			that.tipRole = "";
			that.tipRoleStatus = "";
			that.tipRoleShow = false;
			that.checked = false;
			that.tipChecked = "";
			that.tipCheckedStatus = "";
			that.tipCheckedShow = false;
			that.roleValue = "";
			that.checkChooseList = [];
			sessionStorage.setItem("pageId", id);
			that.changeData(id);
		},
		closeChangeAlert(){
			let that = this;
			that.changeAlertFlag = false;
			that.alertFlagChange = false;
		},
		changeSaveClick(){
			let that = this;
			let id = sessionStorage.getItem("pageId")
			let jsonInfo = [];
			that.checkChooseList.map( item => {
				that.checkList.map( item1 => {
					console.log(item1.userName)
					console.log(item)
					if (item1.userName == item) {
						let obj = {};
						obj.operatorId = item1.userId;
						jsonInfo.push(obj)
					}
				})
			})
			console.log(jsonInfo);
			data = {
				'id': id,
				'name': that.project,
				"roleId": that.roleValue,
				'jsonInfo': JSON.stringify(jsonInfo),
			};
			console.log(data);
			ajaxGet("/operate/project/update", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.addAlertFlag = false;
					that.getData();
					that.getSelectProjectData();
//					location.reload();
				}else{
					alert(data.message);
				}
			})
		},
		//删除点击
		cancelClick(e, id){
			let that = this;
			that.delAlertFlag = true;
			that.alertFlagDel = true;
			that.delId = id;
		},
		//删除弹窗关闭级确定
		closeDelAlert(){
			let that = this;
			that.delAlertFlag = false;
			that.alertFlagDel = false;
		},
		determineClick(){
			let that = this;
			data = {
				id: that.delId
			}
			ajaxGet("/operate/project/remove", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.delAlertFlag = false;
					that.alertFlagDel = false;
					that.getData();
					that.getSelectProjectData();
//					location.reload();
				}else{
					alert(data.message);
				}
			})
		},
		//新增弹窗关闭及确定
		closeAddAlert(){
			let that = this;
			that.addAlertFlag = false;
			that.alertFlagAdd = false;
			that.tipProjectShow = false;
			that.tipRoleShow = false;
			that.tipCheckedShow = false;
			that.addIsActive = 0;
		},
		addSaveClick(){
			let that = this;
			let jsonInfo = [];
			that.checkChooseList.map( item => {
				that.checkList.map( item1 => {
					console.log(item1.userName)
					console.log(item)
					if (item1.userName == item) {
						let obj = {};
						obj.operatorId = item1.userId;
						jsonInfo.push(obj)
					}
				})
			})
			console.log(jsonInfo)
			data = {
				'name': that.project,
				"roleId": that.roleValue,
				'jsonInfo': JSON.stringify(jsonInfo),
			};
			console.log(data);
			ajaxGet("/operate/project/save", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.addAlertFlag = false;
					that.getData();
					that.getSelectProjectData();
//					location.reload();
				}else{
					alert(data.message);
				}
			})
		},
		handleProject(){
			this.addFormCheck();
		},
		handleRole(val){
			let that = this;
			that.roleValue = val;
			console.log(that.roleValue);
			that.getName(val);
			this.addFormCheck();
		},
		handleCheck(e){
			console.log(e);
			console.log(this.checkChooseList);
			this.addFormCheck();
		},
		addFormCheck(){
			let that = this;
			if (that.project == "") {
				that.tipProject = "必填";
				that.tipProjectStatus = "error";
				that.tipProjectShow = true;
			}else{
				that.tipProjectShow = false;
			}
			if (that.roleValue == "") {
				that.tipRole = "必填";
				that.tipRoleStatus = "error";
				that.tipRoleShow = true;
			}else{
				that.tipRoleShow = false;
			}
			if (that.checkChooseList == "") {
				that.tipChecked = "必填";
				that.tipCheckedStatus = "error";
				that.tipCheckedShow = true;
			}else{
				that.tipCheckedShow = false;
			}
			if (that.tipProjectShow || that.tipRoleShow || that.tipCheckedShow) {
				that.addIsActive = true;
			}else{
				that.addIsActive = false;
			}
		},
		handleProject1(){
			this.changeFormCheck();
		},
		handleRole1(val){
			let that = this;
			that.roleValue = val;
			console.log(that.roleValue);
			that.getName(val);
			this.changeFormCheck();
		},
		handleCheck1(e){
			console.log(e);
			console.log(this.checkChooseList);
			this.changeFormCheck();
		},
		changeFormCheck(){
			let that = this;
			if (that.project == "") {
				that.tipProject = "必填";
				that.tipProjectStatus = "error";
				that.tipProjectShow = true;
			}else{
				that.tipProjectShow = false;
			}
			if (that.roleValue == "") {
				that.tipRole = "必填";
				that.tipRoleStatus = "error";
				that.tipRoleShow = true;
			}else{
				that.tipRoleShow = false;
			}
			if (that.checkChooseList == "") {
				that.tipChecked = "必填";
				that.tipCheckedStatus = "error";
				that.tipCheckedShow = true;
			}else{
				that.tipCheckedShow = false;
			}
			if (that.tipProjectShow || that.tipRoleShow || that.tipCheckedShow) {
				that.changeIsActive = true;
			}else{
				that.changeIsActive = false;
			}
		}
	},
	mounted() {
	  this.getData();
	  this.getSelectData();
	  this.getSelectProjectData();
  	},
  	filters: {
		handleIndex(value){
			value += 1;
			return value;
		}
  	}
})