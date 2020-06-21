var webAlert = new Vue({
	el: "#webAlert",
	data: function(){
		return {
			//基础信息字段
			projectName: null,
			outName: null,
			address: null,
			outPhone: null,
			hospitalName: null,
			//院内字段
			resignIn: null,
			nameIn: null,
			sectionsIn: null,
			phoneIn: null,
			contentIn: null,
			achievementsIn: null,
			existingProblemsIn: null,
			solutionIn: null,
			//院外字段
			resign: null,
			name: null,
			sections: null,
			phone: null,
			content: null,
			achievements: null,
			existingProblems: null,
			solution: null,
			//院外院内点击新增事件后的list
			hospitalInnerList: [],
			hospitalInnerName: 0,
			hospitalOuterList: [],
			hospitalOuterName: 0,
			activeName: 1,
			activeName1: 1,
			//提示校验字段
			tipProjectName: "",
			tipProjectNameStatus: "",
			tipProjectNameShow: false,
			tipTimeIn: "",
			tipTimeInStatus: "",
			tipTimeInShow: false,
			//按钮样式切换
			isActive: true,
			projectNameList: [],
		}
	},
	methods:{
		//最后新增保存按钮点击
		saveBtnClick(){
			let that = this;
			let fromArray = $('#equipmentForm').serializeArray();
//			console.log(fromArray);
			//发送数据对象
			let data = {};
			//基础信息
			let basicsList = fromArray.splice(0, 5);
//			console.log(basicsList)
			basicsList.map( item => {
				data[item.name] = item.value;
			});
			data.projectId = that.projectName;
//			console.log(data);
			//院内院外
			console.log(fromArray)
			let jsonInfo = [];
			let arr = [];
			let item = 0;
			for(let i = 0; i < fromArray.length; i++){
				if (i % 9 === 0 && i !== 0) {
					item++;
				}
				( arr[item] || (arr[item] = []) ).push({
					[fromArray[i].name] : fromArray[i].value
				})
			}
			arr.map( item => {
//				console.log(item)
				let obj = {};
				item.map( item => {					
					for(let prop in item){
						obj[prop] = item[prop];
					}
				});
				jsonInfo.push(obj);
			});
			console.log(jsonInfo);
//			jsonInfo.map( item => {
//				for(let prop in item){
//					if (item[prop] == "") {
////						delete item.type;
//						jsonInfo = [];
//					} else{
//						jsonInfo = jsonInfo;
//					}
//				}
//			});
//			console.log(jsonInfo,"处理后")
//			if (that.projectName == "" || that.projectName == null) {
//				alert("项目名称不可为空！");
//				return;
//			}
//			if ($("#timeIn").val() == "") {
//				alert("日期不可为空！");
//				return;
//			}
			
			data.jsonInfo = JSON.stringify(jsonInfo);
			let id = sessionStorage.getItem("userId");
			data.userId = id;
			ajaxGet("/operate/assessment/save", data, function(data){
				console.log(data);
				if(data.status == "0") {
					alert(data.message);
					parent.layer.closeAll();
//					webApp.getData();
					RefreshIframe("page/operatorManagement/projectPersonnel/projectPersonnel.html","159");
				} else {
					alert(data.message);
				}
			})
		},
		//院内新增点击事件
		editBtn1Click(){
			let that = this;
			that.hospitalInnerName++;
			let obj = {
				dataTopList: [{
					name: "职务：",
					placeholder: "职务",
					idName: "",
//					idName: projectName,
					inputVar: "resign",
//					labelStyle: "margin-right: 6px;",
					labelStyle: "",
//					labelStyle: "margin-right: 11px;",
					boxStyle: ""
				},{
					name: "负责人：",
					placeholder: "负责人",
					idName: "",
//					idName: name1,
					inputVar: "name",
					labelStyle: "",
					boxStyle: ""
				},{
					name: "所属科室：",
					placeholder: "所属科室",
					idName: "",
//					idName: sections,
					inputVar: "sections",
					labelStyle: "",
					boxStyle: ""
				},{
					name: "联系电话：",
					placeholder: "联系电话",
					idName: "",
//					idName: phone,
					inputVar: "phone",
					labelStyle: "",
					boxStyle: ""
				}],
				dataOtherList: [{
					name: "内容：",
					placeholder: "内容",
					idName: "",
//					idName: content,
					inputVar: "content",
					labelStyle: ""
				},{
					name: "成果：",
					placeholder: "成果",
					idName: "",
//					idName: achievements,
					inputVar: "achievements",
					labelStyle: ""
				},{
					name: "存在问题：",
					placeholder: "存在问题",
					idName: "",
//					idName: existingProblems,
					inputVar: "existingProblems",
					labelStyle: ""
				},{
					name: "解决方案：",
					placeholder: "解决方案",
					idName: "",
//					idName: solution,
					inputVar: "solution",
					labelStyle: ""
				}],
				count: that.hospitalInnerName,
				time: "院内",
				itemFirstName: "所属科室：",
				itemFirstContent: "",
				itemSecondName: "负责人：",
				itemSecondContent: ""
			};		
			that.hospitalInnerList.push(obj);
			console.log(that.hospitalInnerList)
		},
		//院内删除事件
		handleCancel(status){
			let that = this;
			status--;
			that.hospitalInnerList.splice(status, 1);
		},
		//院外新增点击事件
		editBtn2Click(){
			let that = this;
			that.hospitalOuterName++;
			let obj = {
				dataTopList: [{
					name: "单位：",
					placeholder: "单位",
					idName: "",
//					idName: projectName,
					inputVar: "resign",
//					labelStyle: "margin-right: 6px;",
					labelStyle: "",
//					labelStyle: "margin-right: 11px;",
					boxStyle: ""
				},{
					name: "科室：",
					placeholder: "科室",
					idName: "",
//					idName: name1,
					inputVar: "sections",
					labelStyle: "",
					boxStyle: ""
				},{
					name: "负责人：",
					placeholder: "负责人",
					idName: "",
//					idName: sections,
					inputVar: "name",
					labelStyle: "",
					boxStyle: ""
				},{
					name: "联系电话：",
					placeholder: "联系电话",
					idName: "",
//					idName: phone,
					inputVar: "phone",
					labelStyle: "",
					boxStyle: ""
				}],
				dataOtherList: [{
					name: "内容：",
					placeholder: "内容",
					idName: "",
//					idName: content,
					inputVar: "content",
					labelStyle: ""
				},{
					name: "成果：",
					placeholder: "成果",
					idName: "",
//					idName: achievements,
					inputVar: "achievements",
					labelStyle: ""
				},{
					name: "存在问题：",
					placeholder: "存在问题",
					idName: "",
//					idName: existingProblems,
					inputVar: "existingProblems",
					labelStyle: ""
				},{
					name: "解决方案：",
					placeholder: "解决方案",
					idName: "",
//					idName: solution,
					inputVar: "solution",
					labelStyle: ""
				}],
				count: that.hospitalOuterName,
				time: "院外",
				itemFirstName: "单位：",
				itemFirstContent: "",
				itemSecondName: "科室：",
				itemSecondContent: "",
				itemThirdName: "负责人：",
				itemThirdContent: ""
			};
			that.hospitalOuterList.push(obj);
			console.log(that.hospitalOuterList);
		},
		//院外删除事件
		handleCancel1(status){
			let that = this;
			status--;
			that.hospitalOuterList.splice(status, 1);
		},
		//获取所属医院
		getHospital(){
			let that = this;
			let userId = sessionStorage.getItem("userId");
			ajaxGet("/hospital/relation/getHospitalRelationName", {userId: userId}, function(data){
				console.log(data);
				if(data.status == "0"){
					that.hospitalName = data.resultMap.hospitalName;
				}else{
					alert(data.message);
				}
			});
		},
		//表单校验
		handleProjectName(val){
			let that = this;
			console.log(val);
			that.projectName = val;
			that.handleBtnStatus();
		},
		handleTimeIn(){
			let that = this;
			that.handleBtnStatus();
		},
		handleBtnStatus(){
			let that = this;
			if (that.projectName == "" || that.projectName == null) {
				that.tipProjectName = "必填";
				that.tipProjectNameStatus = "error";
				that.tipProjectNameShow = true;
			} else{
				that.tipProjectNameShow = false;
			}
			if ($("#timeIn").val() == "") {
				that.tipTimeIn = "必填";
				that.tipTimeInStatus = "error";
				that.tipTimeInShow = true;
			}else{
				that.tipTimeInShow = false;
			}
			if (that.tipProjectNameShow || that.tipTimeInShow) {
				that.isActive = true;
			}else{
				that.isActive = false;
			}
		},
		getSelectData(){
			let that = this;
			ajaxGet("/operate/project/getList", {}, function(res){
				console.log(res);
				if(res.status == "0"){
					that.projectNameList = res.resultMap.projectList;
					let obj = {
						id: "",
						name: "请选择"
					}
					that.projectNameList.splice(0, 0, obj);
				}else{
					alert(res.message);
				}
			})
		}
	},
	mounted() {
		let user = JSON.parse(sessionStorage.getItem("user"));
		this.outName = user.userName;
		this.outPhone = user.mobile;
		this.getHospital();
		this.getSelectData();
  	},
  	filters: {
//		handleName(value){
//			console.log(value);
//		}
		handleValue(value){
//			console.log(value);
			let that = this;
	//			console.log(that.value);
			if (that.value != undefined || that.value != null) {
				return that.value;
			}else{
				return "";
			}
		}
	}
})