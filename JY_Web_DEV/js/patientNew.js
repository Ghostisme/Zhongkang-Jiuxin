var webApp = new Vue({
  el: '#web',
  data: function() {
    return {
    	sexList: [{
				label: "请选择",
				value: "",
				sexValue: ""
			},{
				label: "男",
				value: "男",
				sexValue: "男"
			},{
				label: "女",
				value: "女",
				sexValue: "女"
			}],
			//查询字段
			value: '',
			sexValue: '',
			queryUsername: '',
			queryAge: '',
			//列表内容数据
			dataList: [],
			sessionId: 'ADMIN',
			//老的查询字段
//			username: '',
//			sex: '',
//			age: '',
//			dateTime: '',
			//分页数据
			currentPage: 1,
			offsetPage: 0,
			showNum: 10,
			//表单字段
			username: null,
			age: null,
			sex: null,
			mobile: null,
			idCode: null,
			address: null,
			//弹窗显示字段
			alertFlag: false,
			alertFlagAdd: false,
			alertFlagChange: false,
//			addGroup: true,
//			changeGroup: false,
//		queryGroup: false,
			//弹窗表头字段
			headerTitle: null,
//			imgFlag: false,
//			imageFlag: false,
//			iconFlag: true,
			//其他字段
			dataFlag: 0,
			userId: '',
			doctoNum_page: '',
			//列表表头数据
			titleList: [{
				name: "序号",
				domStyle: "width: 5%;"
			},{
				name: "患者姓名",
				domStyle: "width: 10%;"
			},{
				name: "性别",
				domStyle: "width: 10%;"
			},{
				name: "年龄(岁)",
				domStyle: "width: 10%;"
			},{
				name: "身份证号",
				domStyle: "width: 15%;"
			},{
				name: "联系电话",
				domStyle: "width: 10%;"
			},{
				name: "地址",
				domStyle: "width: 20%;"
			},{
				name: "操作",
				domStyle: "width: 20%;"
			}],
			//提示校验字段
			tipUserName: "",
			tipUserNameStatus: "",
			tipUserNameShow: false,
			tipAge: "",
			tipAgeStatus: "",
			tipAgeShow: false,
			tipSex: "",
			tipSexStatus: "",
			tipSexShow: false,
			tipPhone: "",
			tipPhoneStatus: "",
			tipPhoneShow: false,
			tipIdCode: "",
			tipIdCodeStatus: "",
			tipIdCodeShow: false,
			//按钮样式切换
			isActive: true,
			queryUsernameList: [],
			queryAgeList: []
    }
  },
  methods: {
  	//查询按钮
		queryClick(){
//			console.log("查询");	
			this.offsetPage = 0;
			this.showNum = 10;
			this.currentPage = 1;
			this.getData();
		},
		//清空按钮
		resetClick(){
//			console.log("清空");	
			this.queryUsername = "";
			this.value = "";
			this.queryAge = "";
			this.offsetPage = 0;
			this.currentPage = 1;
			this.showNum = 10;
			this.getData();
		},
		//新增按钮
		addClick(){
			let that = this;
//			console.log("新增");
			that.alertFlag = true;
			that.alertFlagAdd = true;
			that.alertFlagChange = false;
			that.headerTitle = "新增";
			that.isActive = true;
//			this.imgFlag = false;
//			this.imageFlag = false;
//			this.iconFlag = false;
//			this.addGroup = true;
//			this.changeGroup = false;
//			this.queryGroup = false;
			that.userId = '';
			that.dataFlag = 0;
			that.username = '';
			that.sexValue = '';
			that.age = '';
			that.mobile = '';
			that.idCode = '';
			that.address = '';
			$(".el-input__suffix-inner").css({"opacity":"1"});
		},
		//关闭弹窗
		closeAlert(){
			let that = this;
			that.alertFlag = false;
//			console.log(that.headerTitle)
			if (that.headerTitle == "新增") {
				that.username = "";
				that.sexValue = "";
				that.age = "";
				that.mobile = "";
				that.idCode = "";
				that.address = "";
				that.tipUserNameShow = false;
				that.tipAgeShow = false;
				that.tipSexShow = false;
				that.tipPhoneShow = false;
				that.tipIdCodeShow = false;
			} else if (that.headerTitle == "查看") {
				that.tipUserNameShow = false;
				that.tipAgeShow = false;
				that.tipSexShow = false;
				that.tipPhoneShow = false;
				that.tipIdCodeShow = false;
//				var id = sessionStorage.getItem("patientId");
//				that.queryHandleClick(id);
			} else{
				that.tipUserNameShow = false;
				that.tipAgeShow = false;
				that.tipSexShow = false;
				that.tipPhoneShow = false;
				that.tipIdCodeShow = false;
//				var id = sessionStorage.getItem("patientId");
//				that.changeClick(id);
			}
		},
		//初始化数据
		getData(){
			let that = this;
			data = {
				"nameLike": that.queryUsername,
				'sex': that.value,
				'age': that.queryAge,
//				"allYear": this.dateTime,
				"offset": that.offsetPage, //（页码-1）*每页显示条数
				"limit": that.showNum //每页显示的条数	
			}
			ajaxGet("/patient/getPatientList", data, function(data){
//				console.log(data);
				data.status == "0" ? that.dataList = data.resultMap.patientList : [];
//				console.log(that.dataList);
				let doclistTotal = data.resultMap.total;
				that.doctoNum_page = Math.ceil(parseInt(doclistTotal) / 10); 
				let pageHtml = page(parseInt(that.currentPage), that.doctoNum_page);
				$(".doctorpageN").html(pageHtml);
				//得到年龄结果
//				let arr = data.resultMap.patientList;
//				let newArr = [];
//				arr.map( (item,index) => {
//					let age = item.age * 1;
//					newArr.push(age);
//				});
//				let resArr = [...new Set(newArr)];
//				resArr.sort();
				//得到查询患者年龄List
//				that.queryAgeList = resArr;
				//得到查询患者姓名list
//				that.queryUsernameList = data.resultMap.patientList;
			})
		},
		getSelectData(){
			let that = this;
			data = {
				"nameLike": that.queryUsername,
				'sex': that.value,
				'age': that.queryAge
			}
			ajaxGet("/patient/getPatientList", data, function(data){
//				console.log(data);
				if(data.status == "0"){
//					console.log(that.dataList);
					//得到年龄结果
					let arr = data.resultMap.patientList;
					let newArr = [];
					arr.map( (item,index) => {
						let age = item.age * 1;
						newArr.push(age);
					});
					let resArr = [...new Set(newArr)];
					resArr.sort();
					//得到查询患者年龄List
					that.queryAgeList = resArr;
					//得到查询患者姓名list
					let nameList = data.resultMap.patientList;
					let resList = [];
					nameList.map( (item,index) => {
						resList.push(item.name);
					});
					let resultList = [...new Set(resList)];
					resultList.sort();
					that.queryUsernameList = resultList;
				}	
			})
		},
		//上传图片
		uploadImg(){
			
		},
		//删除图片按钮
		iconClick(){
//			this.imgFlag = false;
//			this.imageFlag = false;
//			this.iconFlag = false;
		},
		//查看
		queryHandleClick(id){
			let that = this;
			that.alertFlag = true;
			that.alertFlagAdd = false;
			that.alertFlagChange = false;
			that.headerTitle = "查看";
			sessionStorage.setItem("patientId", id);
			//imgFlag是上传图片盒子 绑定class
//			that.imgFlag = true;
			//imageFlag是图片显示盒子 v-show
//			that.imageFlag = true;
			//删除图片按钮 v-show
//			that.iconFlag = false;
			//新增弹窗的确定按钮 v-show
//			that.addGroup = false;
			//修改弹窗的确定按钮 v-show
//			that.changeGroup = false;
			//查看弹窗的按钮 v-show
//			that.queryGroup = true;
			that.dataFlag = 1;			
			ajaxGet('/patient/getPatient', {id: id}, function(res){
//				console.log(res);
				let dataList = res.resultMap.patient;
				that.username = dataList.name;
				that.sexValue = dataList.sex;
				that.age = dataList.age;
				that.mobile = dataList.mobile;
				that.idCode = dataList.idCard;
				that.address = dataList.address;				
			})
			$(".el-input__suffix-inner").css({"opacity":"0"});
		},
		//修改
		changeClick(id){
			let that = this;
			that.alertFlag = true;
			that.alertFlagAdd = false;
			that.alertFlagChange = true;
			that.headerTitle = "修改";
			that.isActive = false;
//			that.imgFlag = true;
//			that.imageFlag = true;
//			that.iconFlag = true;
//			that.addGroup = false;
//			that.changeGroup = true;
//			that.queryGroup = false;
			that.dataFlag = 0;
			that.userId = id;
			ajaxGet('/patient/getPatient', {id: id}, function(res){
//				console.log(res);
				let dataList = res.resultMap.patient;
				that.username = dataList.name;
				that.sexValue = dataList.sex;
				that.age = dataList.age;
				that.mobile = dataList.mobile;
				that.idCode = dataList.idCard;
				that.address = dataList.address;
			})
			$(".el-input__suffix-inner").css({"opacity":"1"});
		},
		//姓名失焦验证
		handleUserName(){
			let that = this;
//		let uPattern = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
//			let uPattern = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
//			if (that.username == "") {
//				that.tipUserName = "必填";
//				that.tipUserNameStatus = "error";
//				that.tipUserNameShow = true;
//			}else if(!uPattern.test(that.username)){
//				that.tipUserName = "姓名填写错误！";
//				that.username = "";
//				that.tipUserNameStatus = "error";
//				that.tipUserNameShow = true;
//			}else{
//				that.tipUserNameShow = false;
//			}
			that.handleBtnStatus();
		},
		//年龄失焦验证
		handleAge(){
			let that = this;
//			let posPattern = /^\d+$/;
//			if (that.age == "") {
//				that.tipAge = "必填";
//				that.tipAgeStatus = "error";
//				that.tipAgeShow = true;
//			}else if(!posPattern.test(that.age)){
//				that.tipAge = "年龄填写错误！";
//				that.tipAgeStatus = "error";
//				that.tipAgeShow = true;
//			}else{
//				if (that.idCode != "") {
//					let date = new Date();
//					let year = date.getFullYear();
//					let birthday_year = parseInt((that.idCode).substr(6, 4));
//					let userage = year - birthday_year;
//					if (that.age != userage) {
//						that.tipAge = "年龄与身份证号不符！";
//						that.tipAgeStatus = "error";
//						that.tipAgeShow = true;
//					}else{
//						that.tipAgeShow = false;
//					}
//				}
//			}
			that.handleBtnStatus();
		},
		//性别失焦验证
		handleSex(){
			let that = this;
//			console.log(that.sexValue)
//			if (that.sexValue == "") {
//				that.tipSex = "必填";
//				that.tipSexStatus = "error";
//				that.tipSexShow = true;
//			}else{
//				that.tipSexShow = false;
//			}
			that.handleBtnStatus();
		},
		//联系电话失焦验证
		handlePhone(){
			let that = this;
//			let mPattern = /^1[34578]\d{9}$/;			
//			if (that.mobile == "") {
//				that.tipPhone = "必填";
//				that.tipPhoneStatus = "error";
//				that.tipPhoneShow = true;
//			}else if(!mPattern.test(that.mobile)){
//				that.tipPhone = "联系电话填写错误！";
//				that.tipPhoneStatus = "error";
//				that.tipPhoneShow = true;
//			}else{
//				that.tipPhoneShow = false;
//			}
			that.handleBtnStatus();
		},
		//身份证号失焦校验
		handleIdCode(){
			let that = this;
//			let cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//			if (that.idCode == "") {
//				that.tipIdCode = "必填";
//				that.tipIdCodeStatus = "error";
//				that.tipIdCodeShow = true;
//			}else if(!cP.test(that.idCode)){
//				that.tipIdCode = "身份证号填写错误！";
//				that.tipIdCodeStatus = "error";
//				that.tipIdCodeShow = true;
//			}else{
//				let date = new Date();
//				let year = date.getFullYear();
//				let birthday_year = parseInt((that.idCode).substr(6, 4));
//				let userage = year - birthday_year;
//				if (that.age != userage) {
////					that.age = userage;
//					that.tipAge = "年龄与身份证号不符！";
//					that.tipAgeStatus = "error";
//					that.tipAgeShow = true;
//				}else{
//					that.tipAgeShow = false;
//				}
//				that.tipIdCodeShow = false;
//			}
//			that.handleBtnStatus();
		},
		//新增保存患者确定按钮
		addSaveClick(){
			let that = this;
			data = {
				"name": that.username,
				'sex': that.sexValue,
				'age': that.age,
				'mobile': that.mobile,
				'idCard': that.idCode,
				'address': that.address
			}
			ajaxGet("/patient/save", data, function(data){
//				console.log(data);
				if (data.status == "0") {
					that.alertFlag = false;
					that.getData();
					that.getSelectData();
//					location.reload();
				}else{
					alert(data.message);
				}
			})
		},
		//修改患者信息保存按钮
		changeSaveClick(id){
			let that = this;
			data = {
				'id': Number(that.userId),
				"name": that.username,
				'sex': that.sexValue,
				'age': that.age,
				'mobile': that.mobile,
				'idCard': that.idCode,
				'address': that.address
			}
			ajaxGet("/patient/update", data, function(data){
//				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.alertFlag = false;
					that.getData();
					that.getSelectData();
//					location.reload();
				}else{
					alert(data.message);
				}
			})
		},
		//校验最后按钮显示状态
		handleBtnStatus(){
			let that = this;
//			let date = new Date();
//			let year = date.getFullYear();
//			let birthday_year = parseInt((that.idCode).substr(6, 4));
//			let userage = year - birthday_year;
//			if (!(that.tipUserNameShow || that.tipAgeShow || that.tipSexShow || that.tipPhoneShow || that.tipIdCodeShow)) {
//				that.isActive = false;
//			}else{
//				that.isActive = true;
//			}
//			if (that.tipUserNameShow || that.tipAgeShow || that.tipSexShow || that.tipPhoneShow || that.tipIdCodeShow) {
//				that.isActive = true;
//			}else{
//				that.isActive = false;
//			}
//			if (that.username == "" || that.sexValue == "" || that.age == "" || that.mobile == "" || that.idCode == "" || that.age != userage) {
//				that.isActive = true;
//			} else{
//				that.isActive = false;
//			}
//			let uPattern = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
//			let uPattern = /[&\|\\\*^%$#@\-]/;
			let uPattern = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
//			let uPattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
			if (that.username == "") {
				that.tipUserName = "必填";
				that.tipUserNameStatus = "error";
				that.tipUserNameShow = true;
			}else if(uPattern.test(that.username)){
				that.tipUserName = "姓名填写错误！";
				that.tipUserNameStatus = "error";
				that.tipUserNameShow = true;
			}else{
				that.tipUserNameShow = false;
			}
			
			let posPattern = /^\d+$/;
			if (that.age == "") {
				that.tipAge = "必填";
				that.tipAgeStatus = "error";
				that.tipAgeShow = true;
			}else if(!posPattern.test(that.age)){
				that.tipAge = "年龄填写错误！";
				that.tipAgeStatus = "error";
				that.tipAgeShow = true;
			}else{
				that.tipAgeShow = false;
//				if (that.idCode != "") {
//					let date = new Date();
//					let year = date.getFullYear();
//					let birthday_year = parseInt((that.idCode).substr(6, 4));
//					let userage = year - birthday_year;
//					if (that.age != userage) {
//						that.tipAge = "年龄与身份证号不符！";
//						that.tipAgeStatus = "error";
//						that.tipAgeShow = true;
//					}else{
//						that.tipAgeShow = false;
//					}
//				}
			}
			
			if (that.sexValue == "") {
				that.tipSex = "必填";
				that.tipSexStatus = "error";
				that.tipSexShow = true;
			}else{
				that.tipSexShow = false;
			}
			
			let mPattern = /^1[34578]\d{9}$/;			
			if (that.mobile == "") {
				that.tipPhone = "必填";
				that.tipPhoneStatus = "error";
				that.tipPhoneShow = true;
			}else if(!mPattern.test(that.mobile)){
				that.tipPhone = "联系电话填写错误！";
				that.tipPhoneStatus = "error";
				that.tipPhoneShow = true;
			}else{
				that.tipPhoneShow = false;
			}
			
//			let cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//			if (that.idCode == "") {
//				that.tipIdCode = "必填";
//				that.tipIdCodeStatus = "error";
//				that.tipIdCodeShow = true;
//			}else if(!cP.test(that.idCode)){
//				that.tipIdCode = "身份证号填写错误！";
//				that.tipIdCodeStatus = "error";
//				that.tipIdCodeShow = true;
//			}else{
//				let date = new Date();
//				let year = date.getFullYear();
//				let birthday_year = parseInt((that.idCode).substr(6, 4));
//				let userage = year - birthday_year;
//				if (that.age != userage) {
////					that.age = userage;
//					that.tipAge = "年龄与身份证号不符！";
//					that.tipAgeStatus = "error";
//					that.tipAgeShow = true;
//				}else{
//					that.tipAgeShow = false;
//				}
//				that.tipIdCodeShow = false;
//			}
			
			if (that.tipUserNameShow || that.tipAgeShow || that.tipSexShow || that.tipPhoneShow) {
				that.isActive = true;
			}else{
				that.isActive = false;
			}
		},
		//预约记录
		pageClick(id){
			sessionStorage.setItem("patientId", id);
//			RefreshIframe('page/imaging/applicationInquiry.html','66');
			RefreshIframe('page/patient/appointmentRecord.html','appointmentRecord');
		}
  },
  mounted() {
	  this.getData();
	  this.getSelectData();
  },
  filters: {
		handleIndex(value){
			value += 1;
			return value;
		},
		resAge(value){
			value *= 1;
			return value;
		}
  }
})