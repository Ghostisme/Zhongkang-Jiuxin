var webApp = new Vue({
	el: "#web",
	data: function(){
		return {
			//搜索条选中
			tabsActiveName: '1',
			//搜索条查询字段
			queryEquipmentBrand: "",
			queryEquipmentModel: "",
			queryInspectionItems: "",
			queryEquipmentPrice: "",
			//各个数据表头
			equipmentName: {
				titleList: [{
					name: "序号",
					domStyle: "width: 5%;"
				},{
					name: "设备名称",
					domStyle: "width: 15%;"
				},{
					name: "操作",
					domStyle: "border-right: 1px solid transparent !important;width: 15%;"
				}],
				//分页字段
				currentPage: 1,
				offsetPage: 0,
				showNum: 10,
				num_page: 1,
				//给后台传值类型
				type: "3",
				//数据字段
				dataList: [],
				//搜索条查询字段
				queryEquipmentName: "",
				//删除
				delEquipmentNameAlertFlag: false,
				equipmentNameAlertFlagDel: false,
				delId: "",
				//新增
				addEquipmentNameAlertFlag: false,
				equipmentNameAddVal: "",
				equipmentNameAddFlag: 0,
				tipAddEquipmentName: "",
				tipAddEquipmentNameStatus: "",
				tipAddEquipmentNameShow: false,
				addEquipmentNameActive: false,
				//编辑
				changeEquipmentNameAlertFlag: false,
				equipmentNameChangeVal: "",
				equipmentNameChangeFlag: 0,
				tipChangeEquipmentName: "",
				tipChangeEquipmentNameStatus: "",
				tipChangeEquipmentNameShow: false,
				changeEquipmentNameActive: false,
				changeId: "",
				options: []
			},
			equipmentBrand: {
				titleList: [{
					name: "序号",
					domStyle: "width: 5%;"
				},{
					name: "设备品牌",
					domStyle: "width: 15%;"
				},{
					name: "操作",
					domStyle: "border-right: 1px solid transparent !important;width: 15%;"
				}],
				//分页字段
				currentPage: 1,
				offsetPage: 0,
				showNum: 10,
				num_page: 1,
				//给后台传值类型
				type: "1",
				//数据字段
				dataList: [],
				//搜索条查询字段
				queryEquipmentBrand: "",
				//删除
				delEquipmentBrandAlertFlag: false,
				equipmentBrandAlertFlagDel: false,
				delId: "",
				//新增
				addEquipmentBrandAlertFlag: false,
				equipmentBrandAddVal: "",
				equipmentBrandAddFlag: 0,
				tipAddEquipmentBrand: "",
				tipAddEquipmentBrandStatus: "",
				tipAddEquipmentBrandShow: false,
				addEquipmentBrandActive: false,
				//编辑
				changeEquipmentBrandAlertFlag: false,
				equipmentBrandChangeVal: "",
				equipmentBrandChangeFlag: 0,
				tipChangeEquipmentBrand: "",
				tipChangeEquipmentBrandStatus: "",
				tipChangeEquipmentBrandShow: false,
				changeEquipmentBrandActive: false,
				changeId: "",
				options: []
			},
			equipmentModel: {
				titleList: [{
					name: "序号",
					domStyle: "width: 5%;"
				},{
					name: "设备型号",
					domStyle: "width: 15%;"
				},{
					name: "操作",
					domStyle: "border-right: 1px solid transparent !important;width: 15%;"
				}],
				//分页字段
				currentPage: 1,
				offsetPage: 0,
				showNum: 10,
				num_page: 1,
				//给后台传值类型
				type: "2",
				//数据字段
				dataList: [],
				//搜索条查询字段
				queryEquipmentModel: "",
				//删除
				delEquipmentModelAlertFlag: false,
				equipmentModelAlertFlagDel: false,
				delId: "",
				//新增
				addEquipmentModelAlertFlag: false,
				equipmentModelAddVal: "",
				equipmentModelAddFlag: 0,
				tipAddEquipmentModel: "",
				tipAddEquipmentModelStatus: "",
				tipAddEquipmentModelShow: false,
				addEquipmentModelActive: false,
				//编辑
				changeEquipmentModelAlertFlag: false,
				equipmentModelChangeVal: "",
				equipmentModelChangeFlag: 0,
				tipChangeEquipmentModel: "",
				tipChangeEquipmentModelStatus: "",
				tipChangeEquipmentModelShow: false,
				changeEquipmentModelActive: false,
				changeId: "",
				options: []
			},
			equipmentInspection: {
				titleList: [{
					name: "序号",
					domStyle: "width: 5%;"
				},{
					name: "检查项目",
					domStyle: "width: 15%;"
				},{
					name: "操作",
					domStyle: "border-right: 1px solid transparent !important;width: 15%;"
				}],
				//分页字段
				currentPage: 1,
				offsetPage: 0,
				showNum: 10,
				num_page: 1,
				//给后台传值类型
				type: "4",
				//数据字段
				dataList: [],
				//搜索条查询字段
				queryEquipmentInspection: "",
				//删除
				delEquipmentInspectionAlertFlag: false,
				equipmentInspectionAlertFlagDel: false,
				delId: "",
				//新增
				addEquipmentInspectionAlertFlag: false,
				equipmentInspectionAddVal: "",
				equipmentInspectionAddFlag: 0,
				tipAddEquipmentInspection: "",
				tipAddEquipmentInspectionStatus: "",
				tipAddEquipmentInspectionShow: false,
				addEquipmentInspectionActive: false,
				//编辑
				changeEquipmentInspectionAlertFlag: false,
				equipmentInspectionChangeVal: "",
				equipmentInspectionChangeFlag: 0,
				tipChangeEquipmentInspection: "",
				tipChangeEquipmentInspectionStatus: "",
				tipChangeEquipmentInspectionShow: false,
				changeEquipmentInspectionActive: false,
				changeId: "",
				options: []
			},
		}
	},
	methods: {
		//标签选择交互
		handleClick(tab) {
        	console.log(tab,"tab");
        	tab = tab * 1 ;
        	switch (tab){
        		case 1:
        			this.equipmentBrand.offsetPage = 0;
        			this.equipmentBrand.currentPage = 1;
        			break;
        		case 2:
        			this.equipmentModel.offsetPage = 0;
        			this.equipmentModel.currentPage = 1;
        			break;
        		case 3:
        			this.equipmentName.offsetPage = 0;
        			this.equipmentName.currentPage = 1;
        			break;	
        		default:
        			this.equipmentInspection.offsetPage = 0;
        			this.equipmentInspection.currentPage = 1;
        			break;
        	}
//      	sessionStorage.setItem("tabsActiveName", tab);
        	this.getData(tab);
    	},
    	//设备名称新增
    	equipmentNameAddClick(tab){
    		tab = tab * 1 ;
    		let that = this;
			that.equipmentName.addEquipmentNameAlertFlag = true;
			that.equipmentName.addEquipmentNameActive = true;
			that.equipmentName.equipmentNameAddVal = "";
    	},
    	closeEquipmentNameAddAlert(){
    		let that = this;
			that.equipmentName.addEquipmentNameAlertFlag = false;
    	},
    	addEquipmentNameSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
				name: that.equipmentName.equipmentNameAddVal
			}
			ajaxGet("/equipmentDict/dict/save", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentName.addEquipmentNameAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleAddEquipmentName(){
    		this.equipmentNameAddFormCheck();
    	},
    	//设备名称查询
    	queryEquipmentNameClick(tab){
    		tab = tab * 1 ;
    		this.equipmentName.offsetPage = 0;
			this.equipmentName.showNum = 10;
			this.equipmentName.currentPage = 1;
			this.getData(tab);
    	},
    	//设备名称清空
    	resetEquipmentNameClick(tab){
    		tab = tab * 1 ;
    		this.equipmentName.offsetPage = 0;
			this.equipmentName.showNum = 10;
			this.equipmentName.currentPage = 1;
			this.equipmentName.queryEquipmentName = "";
			this.getData(tab);
    	},
    	//设备名称编辑弹窗
    	changeEquipmentNameClick(e, id){
    		let that = this;
    		that.equipmentName.changeEquipmentNameAlertFlag = true;
//  		that.equipmentName.changeEquipmentNameActive = true;
			that.equipmentName.changeId = id;
			that.getChangeEquipmentNameData();
    	},
    	closeEquipmentNameChangeAlert(){
    		let that = this;
			that.equipmentName.changeEquipmentNameAlertFlag = false;
    	},
    	getChangeEquipmentNameData(){
    		let that = this;
			data = {
				id: that.equipmentName.changeId
			}
			ajaxGet("/equipmentDict/dict/getEquipmentDict", data, function(data){
				console.log(data);
				if (data.status == "0") {
					that.equipmentName.equipmentNameChangeVal = data.resultMap.equipmentDict.name;
				}else{
					alert(data.message);
				}
			})
    	},
    	changeEquipmentNameSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
    			id: that.equipmentName.changeId,
				name: that.equipmentName.equipmentNameChangeVal
			}
			ajaxGet("/equipmentDict/dict/update", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentName.changeEquipmentNameAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleChangeEquipmentName(){
    		this.equipmentNameChangeFormCheck();
    	},
    	//设备名称删除弹窗
    	cancelEquipmentNameClick(e, id){
    		let that = this;
			that.equipmentName.delEquipmentNameAlertFlag = true;
			that.equipmentName.equipmentNameAlertFlagDel = true;
			that.equipmentName.delId = id;
    	},
    	equipmentNameClick(val){
    		let that = this;
			data = {
				id: that.equipmentName.delId
			}
			ajaxGet("/equipmentDict/dict/remove", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentName.delEquipmentNameAlertFlag = false;
					that.equipmentName.equipmentNameAlertFlagDel = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	closeEquipmentNameDelAlert(){
    		let that = this;
			that.equipmentName.delEquipmentNameAlertFlag = false;
			that.equipmentName.equipmentNameAlertFlagDel = false;
    	},
    	//设备名称表单校验
    	//新增
    	equipmentNameAddFormCheck(){
    		let that = this;
    		if (that.equipmentName.equipmentNameAddVal == "") {
				that.equipmentName.tipAddEquipmentName = "必填";
				that.equipmentName.tipAddEquipmentNameStatus = "error";
				that.equipmentName.tipAddEquipmentNameShow = true;
				that.equipmentName.addEquipmentNameActive = true;
			}else{
				that.equipmentName.tipAddEquipmentNameShow = false;
				that.equipmentName.addEquipmentNameActive = false;
			}
    	},
    	//修改
    	equipmentNameChangeFormCheck(){
    		let that = this;
    		if (that.equipmentName.equipmentNameChangeVal == "") {
				that.equipmentName.tipChangeEquipmentName = "必填";
				that.equipmentName.tipChangeEquipmentNameStatus = "error";
				that.equipmentName.tipChangeEquipmentNameShow = true;
				that.equipmentName.changeEquipmentNameActive = true;
			}else{
				that.equipmentName.tipChangeEquipmentNameShow = false;
				that.equipmentName.changeEquipmentNameActive = false;
			}
    	},
    	//设备品牌新增
    	equipmentBrandAddClick(tab){
    		tab = tab * 1 ;
    		let that = this;
			that.equipmentBrand.addEquipmentBrandAlertFlag = true;
			that.equipmentBrand.addEquipmentBrandActive = true;
			that.equipmentBrand.equipmentBrandAddVal = "";
    	},
    	closeEquipmentBrandAddAlert(){
    		let that = this;
			that.equipmentBrand.addEquipmentBrandAlertFlag = false;
    	},
    	addEquipmentBrandSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
				name: that.equipmentBrand.equipmentBrandAddVal
			}
			ajaxGet("/equipmentDict/dict/save", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentBrand.addEquipmentBrandAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleAddEquipmentBrand(){
    		this.equipmentBrandAddFormCheck();
    	},
    	//设备品牌查询
    	queryEquipmentBrandClick(tab){
    		tab = tab * 1 ;
    		this.equipmentBrand.offsetPage = 0;
			this.equipmentBrand.showNum = 10;
			this.equipmentBrand.currentPage = 1;
			this.getData(tab);
    	},
    	//设备品牌清空
    	resetEquipmentBrandClick(tab){
    		tab = tab * 1 ;
    		this.equipmentBrand.offsetPage = 0;
			this.equipmentBrand.showNum = 10;
			this.equipmentBrand.currentPage = 1;
			this.equipmentBrand.queryEquipmentBrand = "";
			this.getData(tab);
    	},
    	//设备品牌编辑弹窗
    	changeEquipmentBrandClick(e, id){
    		let that = this;
    		that.equipmentBrand.changeEquipmentBrandAlertFlag = true;
			that.equipmentBrand.changeId = id;
			that.getChangeEquipmentBrandData();
    	},
    	closeEquipmentBrandChangeAlert(){
    		let that = this;
			that.equipmentBrand.changeEquipmentBrandAlertFlag = false;
    	},
    	getChangeEquipmentBrandData(){
    		let that = this;
			data = {
				id: that.equipmentBrand.changeId
			}
			ajaxGet("/equipmentDict/dict/getEquipmentDict", data, function(data){
				console.log(data);
				if (data.status == "0") {
					that.equipmentBrand.equipmentBrandChangeVal = data.resultMap.equipmentDict.name;
				}else{
					alert(data.message);
				}
			})
    	},
    	changeEquipmentBrandSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
    			id: that.equipmentBrand.changeId,
				name: that.equipmentBrand.equipmentBrandChangeVal
			}
			ajaxGet("/equipmentDict/dict/update", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentBrand.changeEquipmentBrandAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleChangeEquipmentBrand(){
    		this.equipmentBrandChangeFormCheck();
    	},
    	//设备品牌删除弹窗
    	cancelEquipmentBrandClick(e, id){
    		let that = this;
			that.equipmentBrand.delEquipmentBrandAlertFlag = true;
			that.equipmentBrand.equipmentBrandAlertFlagDel = true;
			that.equipmentBrand.delId = id;
    	},
    	equipmentBrandClick(val){
    		let that = this;
			data = {
				id: that.equipmentBrand.delId
			}
			ajaxGet("/equipmentDict/dict/remove", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentBrand.delEquipmentBrandAlertFlag = false;
					that.equipmentBrand.equipmentBrandAlertFlagDel = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	closeEquipmentBrandDelAlert(){
    		let that = this;
			that.equipmentBrand.delEquipmentBrandAlertFlag = false;
			that.equipmentBrand.equipmentBrandAlertFlagDel = false;
    	},
    	//设备品牌表单校验
    	//新增
    	equipmentBrandAddFormCheck(){
    		let that = this;
    		if (that.equipmentBrand.equipmentBrandAddVal == "") {
				that.equipmentBrand.tipAddEquipmentBrand = "必填";
				that.equipmentBrand.tipAddEquipmentBrandStatus = "error";
				that.equipmentBrand.tipAddEquipmentBrandShow = true;
				that.equipmentBrand.addEquipmentBrandActive = true;
			}else{
				that.equipmentBrand.tipAddEquipmentBrandShow = false;
				that.equipmentBrand.addEquipmentBrandActive = false;
			}
    	},
    	//修改
    	equipmentBrandChangeFormCheck(){
    		let that = this;
    		if (that.equipmentBrand.equipmentBrandChangeVal == "") {
				that.equipmentBrand.tipChangeEquipmentBrand = "必填";
				that.equipmentBrand.tipChangeEquipmentBrandStatus = "error";
				that.equipmentBrand.tipChangeEquipmentBrandShow = true;
				that.equipmentBrand.changeEquipmentBrandActive = true;
			}else{
				that.equipmentBrand.tipChangeEquipmentBrandShow = false;
				that.equipmentBrand.changeEquipmentBrandActive = false;
			}
    	},
    	//设备型号新增
    	equipmentModelAddClick(tab){
    		tab = tab * 1 ;
    		let that = this;
			that.equipmentModel.addEquipmentModelAlertFlag = true;
			that.equipmentModel.addEquipmentModelActive = true;
			that.equipmentModel.equipmentModelAddVal = "";
    	},
    	closeEquipmentModelAddAlert(){
    		let that = this;
			that.equipmentModel.addEquipmentModelAlertFlag = false;
    	},
    	addEquipmentModelSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
				name: that.equipmentModel.equipmentModelAddVal
			}
			ajaxGet("/equipmentDict/dict/save", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentModel.addEquipmentModelAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleAddEquipmentModel(){
    		this.equipmentModelAddFormCheck();
    	},
    	//设备型号查询
    	queryEquipmentModelClick(tab){
    		tab = tab * 1 ;
    		this.equipmentModel.offsetPage = 0;
			this.equipmentModel.showNum = 10;
			this.equipmentModel.currentPage = 1;
			this.getData(tab);
    	},
    	//设备型号清空
    	resetEquipmentModelClick(tab){
    		tab = tab * 1 ;
    		this.equipmentModel.offsetPage = 0;
			this.equipmentModel.showNum = 10;
			this.equipmentModel.currentPage = 1;
			this.equipmentModel.queryEquipmentModel = "";
			this.getData(tab);
    	},
    	//设备型号编辑弹窗
    	changeEquipmentModelClick(e, id){
    		let that = this;
    		that.equipmentModel.changeEquipmentModelAlertFlag = true;
			that.equipmentModel.changeId = id;
			that.getChangeEquipmentModelData();
    	},
    	closeEquipmentModelChangeAlert(){
    		let that = this;
			that.equipmentModel.changeEquipmentModelAlertFlag = false;
    	},
    	getChangeEquipmentModelData(){
    		let that = this;
			data = {
				id: that.equipmentModel.changeId
			}
			ajaxGet("/equipmentDict/dict/getEquipmentDict", data, function(data){
				console.log(data);
				if (data.status == "0") {
					that.equipmentModel.equipmentModelChangeVal = data.resultMap.equipmentDict.name;
				}else{
					alert(data.message);
				}
			})
    	},
    	changeEquipmentModelSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
    			id: that.equipmentModel.changeId,
				name: that.equipmentModel.equipmentModelChangeVal
			}
			ajaxGet("/equipmentDict/dict/update", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentModel.changeEquipmentModelAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleChangeEquipmentModel(){
    		this.equipmentModelChangeFormCheck();
    	},
    	//设备型号删除弹窗
    	cancelEquipmentModelClick(e, id){
    		let that = this;
			that.equipmentModel.delEquipmentModelAlertFlag = true;
			that.equipmentModel.equipmentModelAlertFlagDel = true;
			that.equipmentModel.delId = id;
    	},
    	equipmentModelClick(val){
    		let that = this;
			data = {
				id: that.equipmentModel.delId
			}
			ajaxGet("/equipmentDict/dict/remove", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentModel.delEquipmentModelAlertFlag = false;
					that.equipmentModel.equipmentModelAlertFlagDel = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	closeEquipmentModelDelAlert(){
    		let that = this;
			that.equipmentModel.delEquipmentModelAlertFlag = false;
			that.equipmentModel.equipmentModelAlertFlagDel = false;
    	},
    	//设备型号表单校验
    	//新增
    	equipmentModelAddFormCheck(){
    		let that = this;
    		if (that.equipmentModel.equipmentModelAddVal == "") {
				that.equipmentModel.tipAddEquipmentModel = "必填";
				that.equipmentModel.tipAddEquipmentModelStatus = "error";
				that.equipmentModel.tipAddEquipmentModelShow = true;
				that.equipmentModel.addEquipmentModelActive = true;
			}else{
				that.equipmentModel.tipAddEquipmentModelShow = false;
				that.equipmentModel.addEquipmentModelActive = false;
			}
    	},
    	//修改
    	equipmentModelChangeFormCheck(){
    		let that = this;
    		if (that.equipmentModel.equipmentModelChangeVal == "") {
				that.equipmentModel.tipChangeEquipmentModel = "必填";
				that.equipmentModel.tipChangeEquipmentModelStatus = "error";
				that.equipmentModel.tipChangeEquipmentModelShow = true;
				that.equipmentModel.changeEquipmentModelActive = true;
			}else{
				that.equipmentModel.tipChangeEquipmentModelShow = false;
				that.equipmentModel.changeEquipmentModelActive = false;
			}
    	},    	
    	//检查项目新增
    	equipmentInspectionAddClick(tab){
    		tab = tab * 1 ;
    		let that = this;
			that.equipmentInspection.addEquipmentInspectionAlertFlag = true;
			that.equipmentInspection.addEquipmentInspectionActive = true;
			that.equipmentInspection.equipmentInspectionAddVal = "";
    	},
    	closeEquipmentInspectionAddAlert(){
    		let that = this;
			that.equipmentInspection.addEquipmentInspectionAlertFlag = false;
    	},
    	addEquipmentInspectionSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
				name: that.equipmentInspection.equipmentInspectionAddVal
			}
			ajaxGet("/equipmentDict/dict/save", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentInspection.addEquipmentInspectionAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleAddEquipmentInspection(){
    		this.equipmentInspectionAddFormCheck();
    	},
    	//检查项目查询
    	queryEquipmentInspectionClick(tab){
    		tab = tab * 1 ;
    		this.equipmentInspection.offsetPage = 0;
			this.equipmentInspection.showNum = 10;
			this.equipmentInspection.currentPage = 1;
			this.getData(tab);
    	},
    	//检查项目清空
    	resetEquipmentInspectionClick(tab){
    		tab = tab * 1 ;
    		this.equipmentInspection.offsetPage = 0;
			this.equipmentInspection.showNum = 10;
			this.equipmentInspection.currentPage = 1;
			this.equipmentInspection.queryEquipmentInspection = "";
			this.getData(tab);
    	},
    	//检查项目编辑弹窗
    	changeEquipmentInspectionClick(e, id){
    		let that = this;
    		that.equipmentInspection.changeEquipmentInspectionAlertFlag = true;
			that.equipmentInspection.changeId = id;
			that.getChangeEquipmentInspectionData();
    	},
    	closeEquipmentInspectionChangeAlert(){
    		let that = this;
			that.equipmentInspection.changeEquipmentInspectionAlertFlag = false;
    	},
    	getChangeEquipmentInspectionData(){
    		let that = this;
			data = {
				id: that.equipmentInspection.changeId
			}
			ajaxGet("/equipmentDict/dict/getEquipmentDict", data, function(data){
				console.log(data);
				if (data.status == "0") {
					that.equipmentInspection.equipmentInspectionChangeVal = data.resultMap.equipmentDict.name;
				}else{
					alert(data.message);
				}
			})
    	},
    	changeEquipmentInspectionSaveClick(val){
    		let that = this;
    		data = {
    			type: val,
    			id: that.equipmentInspection.changeId,
				name: that.equipmentInspection.equipmentInspectionChangeVal
			}
			ajaxGet("/equipmentDict/dict/update", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentInspection.changeEquipmentInspectionAlertFlag = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	handleChangeEquipmentInspection(){
    		this.equipmentInspectionChangeFormCheck();
    	},
    	//检查项目删除弹窗
    	cancelEquipmentInspectionClick(e, id){
    		let that = this;
			that.equipmentInspection.delEquipmentInspectionAlertFlag = true;
			that.equipmentInspection.equipmentInspectionAlertFlagDel = true;
			that.equipmentInspection.delId = id;
    	},
    	equipmentInspectionClick(val){
    		let that = this;
			data = {
				id: that.equipmentInspection.delId
			}
			ajaxGet("/equipmentDict/dict/remove", data, function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					that.equipmentInspection.delEquipmentInspectionAlertFlag = false;
					that.equipmentInspection.equipmentInspectionAlertFlagDel = false;
					that.handleClick(val);
				}else{
					alert(data.message);
				}
			})
    	},
    	closeEquipmentInspectionDelAlert(){
    		let that = this;
			that.equipmentInspection.delEquipmentInspectionAlertFlag = false;
			that.equipmentInspection.equipmentInspectionAlertFlagDel = false;
    	},
    	//检查项目表单校验
    	//新增
    	equipmentInspectionAddFormCheck(){
    		let that = this;
    		if (that.equipmentInspection.equipmentInspectionAddVal == "") {
				that.equipmentInspection.tipAddEquipmentInspection = "必填";
				that.equipmentInspection.tipAddEquipmentInspectionStatus = "error";
				that.equipmentInspection.tipAddEquipmentInspectionShow = true;
				that.equipmentInspection.addEquipmentInspectionActive = true;
			}else{
				that.equipmentInspection.tipAddEquipmentInspectionShow = false;
				that.equipmentInspection.addEquipmentInspectionActive = false;
			}
    	},
    	//修改
    	equipmentInspectionChangeFormCheck(){
    		let that = this;
    		if (that.equipmentInspection.equipmentInspectionChangeVal == "") {
				that.equipmentInspection.tipChangeEquipmentInspection = "必填";
				that.equipmentInspection.tipChangeEquipmentInspectionStatus = "error";
				that.equipmentInspection.tipChangeEquipmentInspectionShow = true;
				that.equipmentInspection.changeEquipmentInspectionActive = true;
			}else{
				that.equipmentInspection.tipChangeEquipmentInspectionShow = false;
				that.equipmentInspection.changeEquipmentInspectionActive = false;
			}
    	},
    	//请求设备名称数据
    	getData(val){
    		let that = this;
    		let params = {};
    		console.log(val)
			sessionStorage.setItem("tabsActiveName", val);
    		switch (parseInt(val)){
    			case 3:
    				params = {
    					offset: that.equipmentName.offsetPage, //（页码-1）*每页显示条数
		                limit: that.equipmentName.showNum, //每页显示的条数
		                name: that.equipmentName.queryEquipmentName,//项目名称
		                type: val
    				}
    				break;
    			case 1:
    				params = {
    					offset: that.equipmentBrand.offsetPage, //（页码-1）*每页显示条数
		                limit: that.equipmentBrand.showNum, //每页显示的条数
		                name: that.equipmentBrand.queryEquipmentBrand,//项目名称
		                type: val
    				}
    				break;
    			case 2:
    				params = {
    					offset: that.equipmentModel.offsetPage, //（页码-1）*每页显示条数
		                limit: that.equipmentModel.showNum, //每页显示的条数
		                name: that.equipmentModel.queryEquipmentModel,//项目名称
		                type: val
    				}
    				break;
    			default:
    				params = {
    					offset: that.equipmentInspection.offsetPage, //（页码-1）*每页显示条数
		                limit: that.equipmentInspection.showNum, //每页显示的条数
		                name: that.equipmentInspection.queryEquipmentInspection,//项目名称
		                type: val
    				}
    				break;
    		}
//			data = params;

			ajaxGet("/equipmentDict/dict/getEquipmentDictList", params, function(res){
				console.log(res);
				let total,pageHtml;
//				console.log('......',parseInt(val));
				switch (parseInt(val)){
					case 3:
						res.status === "0" ? that.equipmentName.dataList = res.resultMap.equipmentDictList : that.equipmentName.dataList = [];
						total = res.resultMap.total;
						that.equipmentName.num_page = Math.ceil(parseInt(total) / 10);
						pageHtml = page(parseInt(that.equipmentName.currentPage), that.equipmentName.num_page);
						$(".equipmentNamePageN").html(pageHtml);
						that.equipmentName.options = res.resultMap.equipmentDictList;
						break;
					case 1:
						res.status === "0" ? that.equipmentBrand.dataList = res.resultMap.equipmentDictList : that.equipmentBrand.dataList = [];
						total = res.resultMap.total;
						that.equipmentBrand.num_page = Math.ceil(parseInt(total) / 10);
						pageHtml = page(parseInt(that.equipmentBrand.currentPage), that.equipmentBrand.num_page);
						$(".equipmentBrandPageN").html(pageHtml);
						that.equipmentBrand.options = res.resultMap.equipmentDictList;
						break;
					case 2:
						res.status === "0" ? that.equipmentModel.dataList = res.resultMap.equipmentDictList : that.equipmentModel.dataList = [];
						total = res.resultMap.total;
						that.equipmentModel.num_page = Math.ceil(parseInt(total) / 10);
						pageHtml = page(parseInt(that.equipmentModel.currentPage), that.equipmentModel.num_page);
						$(".equipmentModelPageN").html(pageHtml);
						that.equipmentModel.options = res.resultMap.equipmentDictList;
						break;	
					default:
						res.status === "0" ? that.equipmentInspection.dataList = res.resultMap.equipmentDictList : that.equipmentInspection.dataList = [];
						total = res.resultMap.total;
						that.equipmentInspection.num_page = Math.ceil(parseInt(total) / 10);
						pageHtml = page(parseInt(that.equipmentInspection.currentPage), that.equipmentInspection.num_page);
						$(".equipmentInspectionPageN").html(pageHtml);
						that.equipmentInspection.options = res.resultMap.equipmentDictList;
						break;
				}
								
			});
    	}
	},
	mounted() {
//		this.getData();
		let tabsActiveName = this.tabsActiveName * 1;
		sessionStorage.setItem("tabsActiveName", tabsActiveName);
		let oldTabsActiveName = sessionStorage.getItem("tabsActiveName");
		if (oldTabsActiveName != 1) {
			tabsActiveName = oldTabsActiveName * 1;
		}else{
			tabsActiveName = 1;
		}
		this.getData(tabsActiveName);
  	},
  	filters: {
		handleIndex(value){
			value += 1;
			return value;
		}
  	}
})