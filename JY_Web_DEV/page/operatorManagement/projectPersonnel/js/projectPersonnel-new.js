var webApp = new Vue({
	el: "#web",
	data: function(){
		return {
			//列表表头数据
			titleList: [{
				name: "序号",
				domStyle: "width: 5%;"
			},{
				name: "日期",
				domStyle: "width: 15%;"
			},{
				name: "项目名称",
				domStyle: "width: 15%;"
			},{
				name: "操作",
				domStyle: "border-right: 1px solid transparent !important;"
			}],
			//查询字段
			queryTime: '',
			queryProjectName: '',
			queryName: '',
			//分页字段
			currentPage: 1,
			offsetPage: 0,
			showNum: 10,
			//数据字段
			dataList: [],
			projectNameList: [],
			
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
			this.queryTime = "";
			this.queryProjectName = "";
			this.queryName = "";
			this.offsetPage = 0;
			this.showNum = 10;
			this.currentPage = 1;
			this.getData();
		},
		//新增点击
		addClick(){
			parent.layer.open({
//				name: "addAlert",
			    type: 2,
			    title: '新增',
			    shadeClose: true,
			    shade: [0.5],
			    maxmin: true, //开启最大化最小化按钮
//			    area: ['1500px', '950px'],
//			    area: ['1400px', '550px'],
			    area: ['1150px', '550px'],
			    content: './page/operatorManagement/projectPersonnel/addProjectPersonnel-new.html'
			});
		},
		//初始化数据
		getData(){
			var userId = sessionStorage.getItem('userId');
			let that = this;
			data = {
				offset: that.offsetPage, //（页码-1）*每页显示条数
                limit: that.showNum, //每页显示的条数
                time: that.queryTime,
                name: that.queryName,//项目负责人姓名
                projectId: that.queryProjectName,//项目名称,
                userId: userId
			};
			ajaxGet("/operate/assessment/getOperateAssessmentList", data, function(res){
				console.log(res);
				res.status === "0" ? that.dataList = res.resultMap.list : that.dataList = [];
				console.log(that.dataList);
				let doclistTotal = res.resultMap.total;
				that.doctoNum_page = Math.ceil(parseInt(doclistTotal) / 10); 
				let pageHtml = page(parseInt(that.currentPage), that.doctoNum_page);
				$(".doctorpageN").html(pageHtml);				
			})
		},
		//查看点击
		queryClick(e, id){
			parent.layer.open({
//				name: "addAlert",
			    type: 2,
			    title: '查看',
			    shadeClose: true,
			    shade: [0.5],
			    maxmin: true, //开启最大化最小化按钮
//			    area: ['1500px', '950px'],
//			    area: ['1400px', '550px'],
			    area: ['1150px', '550px'],
			    content: './page/operatorManagement/projectPersonnel/editProjectPersonnel-new.html'
			});
			sessionStorage.setItem("pageStatus", "query");
			sessionStorage.setItem("dataListId", id);
		},
		//修改点击
		changeClick(e, id){
			parent.layer.open({
//				name: "addAlert",
			    type: 2,
			    title: '修改',
			    shadeClose: true,
			    shade: [0.5],
			    maxmin: true, //开启最大化最小化按钮
//			    area: ['1500px', '950px'],
//			    area: ['1400px', '550px'],
			    area: ['1150px', '550px'],
			    content: './page/operatorManagement/projectPersonnel/editProjectPersonnel-new.html'
			});
			sessionStorage.setItem("pageStatus", "change");
			sessionStorage.setItem("dataListId", id);
		},
		//删除点击
		cancelClick(e, id){
			let that = this;
			//灰背景
            $("#subscribeListFade").fadeIn();
            //框子
            $("#subscribeListLight2").fadeIn();
			$("#subscribeListDel-yes").click(function(){
				let data = {};
				data = {
					id: id				
				}
				ajaxGet("/operate/assessment/remove", data, function(res){
					console.log(res);
					if(res.status == "0"){
						alert(res.message);
						$("#subscribeListFade").fadeOut();
						$("#subscribeListLight2").fadeOut();
						RefreshIframe("page/operatorManagement/projectPersonnel/projectPersonnel.html","159");
//						that.getData();						
					}else{
						alert(res.message);
					}
				})
			})
		},
		//下拉框数据
		initData(){
			let that = this;
			data = {};
			ajaxGet("/operate/project/getProjectList", data, function(res){
				console.log(res);
				if(res.status == "0"){
					that.projectNameList = res.resultMap.projectList;
//					let obj = {
//						id: "",
//						name: "请选择"
//					}
//					that.projectNameList.splice(0, 0, obj);
				}else{
					alert(res.message);
				}
			})
		}
	},
	mounted() {
	  this.getData();
	  this.initData();
  	},
  	filters: {
		handleIndex(value){
			value += 1;
			return value;
		},
		resTime(value){
			console.log(value);
			if (value) {
				if (value.indexOf(".0") != -1) {
					value = value.split(".");
					let timeArr = value[0].split(" ");
					return timeArr[0];
				}else{
					return value;
				}
			}else{
				return "";
			}
			
		}
  	}
})