var webApp = new Vue({
  el: '#web',
  data: function() {
    return {
    	sexList: [{
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
			userName: null,
			age: null,
			sex: null,
			mobile: null,
			idCode: null,
			address: null,
			//弹窗显示字段
			alertFlag: false,
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
				name: "年龄",
				domStyle: "width: 10%;"
			},{
				name: "身份证号",
				domStyle: "width: 15%;"
			},{
				name: "电话",
				domStyle: "width: 10%;"
			},{
				name: "地址",
				domStyle: "width: 20%;"
			},{
				name: "操作",
				domStyle: "width: 20%;"
			}]
    }
  },
  methods: {
  	//查询按钮
		queryClick(){
			console.log("查询");			
			this.getData();
		},
		//清空按钮
		resetClick(){
			console.log("清空");	
			this.queryUsername = "";
			this.value = "";
			this.queryAge = "";
			this.getData();
		},
		//新增按钮
		addClick(){
			console.log("新增");
			this.alertFlag = true;			
			this.headerTitle = "新增";
//			this.imgFlag = false;
//			this.imageFlag = false;
//			this.iconFlag = false;
//			this.addGroup = true;
//			this.changeGroup = false;
//			this.queryGroup = false;
			this.userId = '';
			this.dataFlag = 0;
			this.username = '';
			this.sexValue = '';
			this.age = '';
			this.mobile = '';
			this.idCode = '';
			this.address = '';
			$(".el-input__suffix-inner").css({"opacity":"1"});
		},
		//关闭弹窗
		closrAlert(){
			this.alertFlag = false;
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
				console.log(data);
				data.status == "0" ? that.dataList = data.resultMap.patientList : [];
				console.log(that.dataList);
				let doclistTotal = data.resultMap.total;
				that.doctoNum_page = Math.ceil(parseInt(doclistTotal) / 10); 
				let pageHtml = page(parseInt(that.currentPage), that.doctoNum_page);
				$(".doctorpageN").html(pageHtml);
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
			that.headerTitle = "查看";
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
				console.log(res);
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
			that.headerTitle = "修改";
//			that.imgFlag = true;
//			that.imageFlag = true;
//			that.iconFlag = true;
//			that.addGroup = false;
//			that.changeGroup = true;
//			that.queryGroup = false;
			that.dataFlag = 0;
			that.userId = id;
			ajaxGet('/patient/getPatient', {id: id}, function(res){
				console.log(res);
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
				console.log(data);
				if (data.status == "0") {
					that.alertFlag = false;
					location.reload();
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
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.alertFlag = false;
					location.reload();
				}else{
					alert(data.message);
				}
			})
		},
  },
  mounted() {
	  this.getData()
  },
  filters: {
		handleIndex(value){
			value += 1;
			return value;
		}
  }
})