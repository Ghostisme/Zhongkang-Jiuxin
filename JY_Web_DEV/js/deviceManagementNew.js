var webApp = new Vue({
	el: "#web",
	data: function(){
		return {
			titleList: [{
				name: "序号",
				domStyle: "width: 5%;"
			},{
				name: "所属医院",
				domStyle: "width: 8%;"
			},{
				name: "所属科室",
				domStyle: "width: 8%;"
			},{
				name: "设备名称",
				domStyle: "width: 8%;"
			},{
				name: "设备类型",
				domStyle: "width: 5%;"
			},{
				name: "设备品牌",
				domStyle: "width: 5%;"
			},{
				name: "设备型号",
				domStyle: "width: 8%;"
			},{
				name: "购买时间",
				domStyle: "width: 8%;"
			},{
				name: "检查地点",
				domStyle: "width: 9%;"
			},{
				name: "检查项目",
				domStyle: "width: 8%;"
			},{
				name: "维修记录",
				domStyle: "width: 8%;"
			},{
				name: "操作",
				domStyle: "width: 20%;"
			}],
			dataList: [],
			//查询字段
			equipmentName_cx: null,
			equipmentBrand_cx: null,
			equipmentType_cx: null,
			//分页字段
			currentPage: 1,
			offsetPage: 0,
			showNum: 10,
		}
	},
	methods: {
		//查询列按钮事件
		queryClick(){
			currentPage = 1;
            this.getData();
		},
		resetClick(){
			this.equipmentName_cx = "";
        	this.equipmentBrand_cx = "";
        	this.equipmentType_cx = "";
        	currentPage = 1;
        	this.getData();
		},
		addClick(){
			//灰背景
            $("#subscribeListFade").fadeIn();
            //框子
            $("#subscribeListLight1").fadeIn();
            //页面
            edit_eqt_index="";//必须清空，不然则是修改
            pageStatus = undefined;            
            $("#addSubscribeList").load("./addDevice.html");
            $(".white_contentHead").find(".infoTitle").text("新增");
		},
		//初始化数据
		getData(){
			let that = this;
			data = {
				offset: that.offsetPage, //（页码-1）*每页显示条数
                limit: that.showNum, //每页显示的条数
//				hospitalId: fkHospitalId,
                name: that.equipmentName_cx,//设备名称
//              hospital: $("#equipmentName_cx").val(),
				model: that.equipmentBrand_cx,//型号
                equipmentTypeName: that.equipmentType_cx//类型
			};
			ajaxGet("/equipment/equipmentInfo/getEquipmentInfoList", data, function(res){
				console.log(res);
				res.status === "0" ? that.dataList = res.resultMap.list : that.dataList = [];
				console.log(that.dataList);
				let doclistTotal = res.resultMap.total;
				that.doctoNum_page = Math.ceil(parseInt(doclistTotal) / 10); 
				let pageHtml = page(parseInt(that.currentPage), that.doctoNum_page);
				$(".doctorpageN").html(pageHtml);				
			})
		}
	},
	mounted() {
	  this.getData()
  	},
  	filters: {
		handleIndex(value){
			value += 1;
			return value;
		},
		equipmentState(value){
			let equipmentState = "";
			if (value == 1) {
				equipmentState = "启用";
			} else{
				equipmentState = "停用";
			}
			return equipmentState;
		},
		statusId(value){
			console.log(value,"值")
			return "status" + value;
		}
  	}
})