var webAlert = new Vue({
	el: "#webAlert",
	data: function(){
		return {
			//数据dataList
//			dataList: [],
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
			//院外院内点击新增事件后的list
			hospitalInnerList: [],
//			hospitalInnerListStr:'',
			hospitalInnerName: 0,
			hospitalOuterList: [],
			hospitalOuterName: 0,
			activeName: 1,
			activeName1: 1,
//			btnList1Flag: false,
//			addBtnList1Flag: false,
//			btnList2Flag: false,
//			addBtnList2Flag: false,
			dataListFlag1: 0,
			dataListFlag2: 0,
			editBtnList1Text: "编辑",
			editBtnList2Text: "编辑",
			//其他字段
			dataFlag1: 0,
			dataFlag2: 0,
			id: null,
			editBtn1Text: "编辑",
			editBtn2Text: "编辑",
			btn1Flag: false,
			btn2Flag: false,
			addBtn1Flag: false,
			addBtn2Flag: false,
			dataFlag: 0,
			//提示校验字段
			tipProjectName: "",
			tipProjectNameStatus: "",
			tipProjectNameShow: false,
			tipTimeIn: "",
			tipTimeInStatus: "",
			tipTimeInShow: false,
			//按钮样式切换
			isActive: false,
			//基础
			btn3Flag: false,
			editBtn3Text: "编辑",
			projectNameList: [],
			timeVal: ""
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
			basicsList.map( item => {
				data[item.name] = item.value;
			});
			data.projectId = that.projectName;
//			console.log(data);
			//院内院外
			console.log(fromArray);
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
				})
				jsonInfo.push(obj);
			})
//			console.log(jsonInfo)
//			jsonInfo.map( item => {
//				for(let prop in item){
//					if (item[prop] == "") {
////						delete item.type;
//						jsonInfo = [];
//					}
//				}
//			});
			data.jsonInfo = JSON.stringify(jsonInfo);
			data.id = this.id;
			let userId= sessionStorage.getItem("userId");
			data.userId = userId;
//			if (that.projectName == "" || that.projectName == null) {
//				alert("项目名称不可为空！");
//				return;
//			}
//			if ($("#timeIn").val() == "") {
//				alert("日期不可为空！");
//				return;
//			}
			ajaxGet("/operate/assessment/update", data, function(data){
				console.log(data);
				if(data.status == "0") {
					alert(data.message);
//					$("#reportQueryFade").hide();
					parent.layer.closeAll();
					RefreshIframe("page/operatorManagement/projectPersonnel/projectPersonnel.html","159");
				} else {
					alert(data.message);
				}
			})
		},
		//获取数据
		getData(id){
			let that = this;
			let data = {
				id: id
			};
			ajaxGet("/operate/assessment/getOperateAssessment", data, function(data){
//				console.log(data);
				if(data.status == "0") {
//					this.dataList = data.resultMap.operateAssessment;
					let dataList = data.resultMap.operateAssessment;
//					console.log(this.dataList)
					//基础信息
					that.projectName = dataList.projectId;
					that.outName = dataList.name;
					that.address = dataList.address;
					that.outPhone = dataList.phone;
					that.hospitalName = dataList.hospitalName;
					that.timeVal = ((dataList.time).split(" "))[0];
					$("#timeIn").val(((dataList.time).split(" "))[0]);
					//处理院内院外的数据
//					let dataSon = dataList.children;
//					let hospitalInner = [];
//					let hospitalOuter = [];
					let hospitalInner = dataList.children.splice(0, 1);
					let hospitalOuter = dataList.childrend2.splice(0, 1);
					let outerInArr = dataList.children;
					let outerOutArr = dataList.childrend2;
					for(let i = 0; i < outerInArr.length; i++){
//						let time = ((outerInArr[i].time).split(" "))[0];
						let obj = {
							dataTopList: [{
								name: "职务：",
								placeholder: "职务",
								idName: outerInArr[i].resign,
			//					idName: projectName,
								inputVar: "resign",
			//					labelStyle: "margin-right: 6px;",
								labelStyle: "",
			//					labelStyle: "margin-right: 11px;",
								boxStyle: ""
							},{
								name: "负责人：",
								placeholder: "负责人",
								idName: outerInArr[i].name,
			//					idName: name1,
								inputVar: "name",
								labelStyle: "",
								boxStyle: ""
							},{
								name: "所属科室：",
								placeholder: "所属科室",
								idName: outerInArr[i].sections,
			//					idName: sections,
								inputVar: "sections",
								labelStyle: "",
								boxStyle: ""
							},{
								name: "联系电话：",
								placeholder: "联系电话",
								idName: outerInArr[i].phone,
			//					idName: phone,
								inputVar: "phone",
								labelStyle: "",
								boxStyle: ""
							}],
							dataOtherList: [{
								name: "内容：",
								placeholder: "内容",
								idName: outerInArr[i].content,
			//					idName: content,
								inputVar: "content",
								labelStyle: ""
							},{
								name: "成果：",
								placeholder: "成果",
								idName: outerInArr[i].achievements,
			//					idName: achievements,
								inputVar: "achievements",
								labelStyle: ""
							},{
								name: "存在问题：",
								placeholder: "存在问题",
								idName: outerInArr[i].problem,
			//					idName: existingProblems,
								inputVar: "existingProblems",
								labelStyle: ""
							},{
								name: "解决方案：",
								placeholder: "解决方案",
								idName: outerInArr[i].solution,
			//					idName: solution,
								inputVar: "solution",
								labelStyle: ""
							}],
							count: that.hospitalInnerName,
							itemFirstName: "所属科室：",
							itemFirstContent: outerInArr[i].sections,
							itemSecondName: "负责人：",
							itemSecondContent: outerInArr[i].name,
							editBtnText: "编辑",
							btnListFlag: true,
							addBtnListFlag: false
//							time: time
						};		
						that.hospitalInnerList.push(obj);
//						that.hospitalInnerListStr=JSON.stringify(that.hospitalInnerList);
//						console.log(that.hospitalInnerListStr);
					}
					for(let i = 0; i < outerOutArr.length; i++){
//						let time = ((outerOutArr[i].time).split(" "))[0];
						let obj = {
							dataTopList: [{
								name: "单位：",
								placeholder: "单位",
								idName: outerOutArr[i].resign,
			//					idName: projectName,
								inputVar: "resign",
			//					labelStyle: "margin-right: 6px;",
								labelStyle: "",
			//					labelStyle: "margin-right: 11px;",
								boxStyle: ""
							},{
								name: "科室：",
								placeholder: "科室",
								idName: outerOutArr[i].sections,
			//					idName: name1,
								inputVar: "sections",
								labelStyle: "",
								boxStyle: ""
							},{
								name: "负责人：",
								placeholder: "负责人",
								idName: outerOutArr[i].name,
			//					idName: sections,
								inputVar: "name",
								labelStyle: "",
								boxStyle: ""
							},{
								name: "联系电话：",
								placeholder: "联系电话",
								idName: outerOutArr[i].phone,
			//					idName: phone,
								inputVar: "phone",
								labelStyle: "",
								boxStyle: ""
							}],
							dataOtherList: [{
								name: "内容：",
								placeholder: "内容",
								idName: outerOutArr[i].content,
			//					idName: content,
								inputVar: "content",
								labelStyle: ""
							},{
								name: "成果：",
								placeholder: "成果",
								idName: outerOutArr[i].achievements,
			//					idName: achievements,
								inputVar: "achievements",
								labelStyle: ""
							},{
								name: "存在问题：",
								placeholder: "存在问题",
								idName: outerOutArr[i].problem,
			//					idName: existingProblems,
								inputVar: "existingProblems",
								labelStyle: ""
							},{
								name: "解决方案：",
								placeholder: "解决方案",
								idName: outerOutArr[i].solution,
			//					idName: solution,
								inputVar: "solution",
								labelStyle: ""
							}],
							count: that.hospitalOuterName,
							itemFirstName: "单位：",
							itemFirstContent: outerOutArr[i].resign,
							itemSecondName: "科室：",
							itemSecondContent: outerOutArr[i].sections,
							itemThirdName: "负责人：",
							itemThirdContent: outerOutArr[i].name,
							editBtnText: "编辑",
							btnListFlag: true,
							addBtnListFlag: false
//							time: time
						};
						that.hospitalOuterList.push(obj);
					}
//					console.log(hospitalInner);
//					console.log(hospitalOuter);
					//院内信息
					hospitalInner.map( item => {
//						console.log(item);
						that.resignIn = item.resign;
						that.nameIn = item.name;
						that.sectionsIn = item.sections;
						that.phoneIn = item.phone;
						that.contentIn = item.content;
						that.achievementsIn = item.achievements;
						that.existingProblemsIn = item.problem;
						that.solutionIn = item.solution;
//						let time = item.time;
//						let resTime = time.split(" ");
//						$("#timeIn").val(resTime[0]);
					});
					//院外信息
					hospitalOuter.map( item => {
//						console.log(item);
						that.resign = item.resign;
						that.name = item.name;
						that.sections = item.sections;
						that.phone = item.phone;
						that.content = item.content;
						that.achievements = item.achievements;
						that.existingProblems = item.problem;
						that.solution = item.solution;
//						let time = item.time;
//						console.log(time);
//						let resTime = time.split(" ");
//						$("#timeOut").val(resTime[0]);
					});
					//查看修改
					that.choosePageStatus();
				} else {
					alert(data.message);
				}
			})
		},
		//查看修改区分显示
		choosePageStatus(){
			let status = sessionStorage.getItem("pageStatus");
			let that = this;
//			console.log(status);
			if (status == "change") {
				that.dataFlag = 1;
				that.dataFlag1 = 1;
				that.dataListFlag1 = 1;
				that.dataFlag2 = 1;
				that.dataListFlag2 = 1;
				$(".addGroup").show();
//				$('#timeIn').bind("click");
				$(".el-input__suffix span").hide();
				that.hospitalInnerList.map( item => {
					item.btnListFlag = true;
//					item.addBtnListFlag
				});
				that.hospitalOuterList.map( item => {
					item.btnListFlag = true;
				});
//				that.hospitalOuterList[status].btnListFlag = false;
//				$(".newin .el-input__inner").css({"border":"1px solid #e5e6e7 !important;"});
//				$(".editBtnList1").css({"display":"block"});
//				$(".editBtnList2").css({"display":"block"});
			} else if(status == "query"){
				that.dataFlag = 1;
				that.dataFlag1 = 1;
				that.dataListFlag1 = 1;
				that.editBtn1Text = "";
				that.editBtn2Text = "";
				that.editBtn3Text = "";
				$(".addGroup").hide();
				$(".el-input__suffix span").hide();
//				console.log($("#timeIn"));
//				console.log(that.hospitalInnerList,"院内list");
				that.hospitalInnerList.map( item => {
//					console.log(item,"院内item");
					item.btnListFlag = false;
				});
				that.hospitalOuterList.map( item => {
					item.btnListFlag = false;
				});
//				$(".newin .el-input__inner").css({"border":"1px solid transparent !important;"});
//				$(".editBtnList1").css({"display":"none !important"});
//				$(".editBtnList2").css({"display":"none !important"});
//				that.editBtnList1Text = "";
//				that.editBtnList2Text = "";
				that.dataFlag2 = 1;
				that.dataListFlag2 = 1;
			}
//			else{
//				$(".newin .el-input__inner").css({"border":"1px solid #e5e6e7 !important;"});
//				that.dataFlag = 0;
//				that.dataFlag1 = 0;
//				that.dataListFlag1 = 0;
//				that.dataFlag2 = 0;
//				that.dataListFlag2 = 0;
//				$(".addGroup").hide();
//			}
		},
		//院内编辑点击，新增，取消显示并点击
		editBtn1Click(e){
			let that = this;
			let btnText = $(".editBtn1").text();
			if (btnText == "编辑") {
				that.editBtn1Text = "保存";
				that.dataFlag1 = 0;
				that.btn1Flag = true;
				that.addBtn1Flag = true;
			} else{
				that.editBtn1Text = "编辑";
				that.dataFlag1 = 1;
				that.btn1Flag = false;
				that.addBtn1Flag = false;
			}
//			console.log(e.target);
		},
		editBtnList1Click(e, status){
			let that = this;
//			console.log(e.target);
			let btnText = that.hospitalInnerList[status].editBtnText;
//			console.log(btnText)
//			console.log(status);
//			console.log(that.hospitalInnerList);
			if (btnText == "编辑") {
				that.hospitalInnerList[status].editBtnText = "保存";
				that.dataListFlag1 = 0;
//				that.hospitalInnerList[status].btnListFlag = true;
				that.hospitalInnerList[status].addBtnListFlag = true;
			} else{
				that.hospitalInnerList[status].editBtnText = "编辑";
				that.dataListFlag1 = 1;
//				that.hospitalInnerList[status].btnListFlag = false;
				that.hospitalInnerList[status].addBtnListFlag = false;
			}
//			console.log(that.hospitalInnerList)
//			console.log(e.target);
		},
		cancelBtn1Click(){
			let that = this;	
			that.btn1Flag = false;
			that.editBtn1Text = "编辑";
			that.addBtn1Flag = false;
			that.dataFlag1 = 1;
		},
		cancelBtnList1Click(e, status){
			let that = this;
//			console.log(that.hospitalInnerList,"取消list")
//			console.log(status,"取消")
//			that.hospitalInnerList[status].btnListFlag = false;
			that.hospitalInnerList[status].editBtnText = "编辑";
			that.hospitalInnerList[status].addBtnListFlag = false;
			that.dataListFlag1 = 1;
		},
		addBtn1Click(){
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
				itemSecondContent: "",
				editBtnText: "编辑",
				btnListFlag: true,
				addBtnListFlag: false
			};		
			that.hospitalInnerList.push(obj);
			console.log(that.hospitalInnerList);
//			let arr = JSON.stringify(that.hospitalInnerList);
//			that.hospitalInnerList = JSON.stringify(that.hospitalInnerList);
//			console.log(arr)
		},
		//院内删除事件
		handleCancel(status){
			let that = this;
//			console.log(that.hospitalInnerList,"删除list")
//			console.log(status,"删除")
//			status--;
			that.hospitalInnerList.splice(status, 1);
//			console.log(status)
		},
		//院外编辑点击事件，新增，取消显示并点击
		editBtn2Click(e){
			let that = this;
			let btnText = $(".editBtn2").text();
			if (btnText == "编辑") {
				that.editBtn2Text = "保存";
				that.dataFlag2 = 0;
				that.btn2Flag = true;
				that.addBtn2Flag = true;
			} else{
				that.editBtn2Text = "编辑";
				that.dataFlag2 = 1;
				that.btn2Flag = false;
				that.addBtn2Flag = false;
			}
		},
		editBtnList2Click(e, status){
			let that = this;
			let btnText = that.hospitalOuterList[status].editBtnText;
			if (btnText == "编辑") {
				that.hospitalOuterList[status].editBtnText = "保存";
				that.dataListFlag2 = 0;
//				that.hospitalOuterList[status].btnListFlag = true;
				that.hospitalOuterList[status].addBtnListFlag = true;
			} else{
				that.hospitalOuterList[status].editBtnText = "编辑";
				that.dataListFlag2 = 1;
//				that.hospitalOuterList[status].btnListFlag = false;
				that.hospitalOuterList[status].addBtnListFlag = false;
			}
//			console.log(e.target);
		},
		cancelBtn2Click(){
			let that = this;	
			that.btn2Flag = false;
			that.editBtn2Text = "编辑";
			that.addBtn2Flag = false;
			that.dataFlag2 = 1;
		},
		cancelBtnList2Click(status){
			let that = this;
//			that.hospitalOuterList[status].btnListFlag = false;
			that.hospitalInnerList[status].editBtnText = "编辑";
			that.hospitalOuterList[status].addBtnListFlag = false;
			that.dataListFlag2 = 1;
		},
		addBtn2Click(){
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
				itemThirdContent: "",
				editBtnText: "编辑",
				btnListFlag: true,
				addBtnListFlag: false
			};
			that.hospitalOuterList.push(obj);
//			console.log(that.hospitalOuterList)
		},
		//院外删除事件
		handleCancel1(status){
			let that = this;
//			status--;
			that.hospitalOuterList.splice(status, 1);
		},
		//表单校验
		handleProjectName(val){
			let that = this;
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
		cancelBtn3Click(){
			let that = this;	
			that.btn3Flag = false;
			that.editBtn3Text = "编辑";
			$(".el-input__suffix span").hide();
//			that.addBtn3Flag = false;
			that.dataFlag = 1;
		},
		editBtn3Click(e){
			let that = this;
			let btnText = $(".editBtn3").text();
			if (btnText == "编辑") {
				that.editBtn3Text = "保存";
				that.dataFlag = 0;
				that.btn3Flag = true;
				$(".el-input__suffix span").show();
//				that.addBtn3Flag = true;
			} else{
				that.editBtn3Text = "编辑";
				that.dataFlag = 1;
				that.btn3Flag = false;
				$(".el-input__suffix span").hide();
//				that.addBtn3Flag = false;
			}
			that.timeVal = $("#timeIn").val();
//			console.log($("#timeIn").val(),"时间值");
//			console.log(e.target);
		},
		getSelectData(){
			let that = this;
			ajaxGet("/operate/project/getList", {}, function(res){
//				console.log(res);
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
		let id = sessionStorage.getItem("dataListId");
		this.id = id;
		this.getData(id);
		//查看修改
//		this.choosePageStatus();
		this.getSelectData();
  	},
  	filters: {
  		handleIndex(value){
			value += 1;
			return value;
		}
  	}
})

