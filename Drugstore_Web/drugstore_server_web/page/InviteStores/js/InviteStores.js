var webDom = new Vue({
    el: "#web",
    data() {
        return {
            titltList: [{
                name: "序号",
                myStyle: "width: 5%"
            },{
                name: "邀请门店",
                myStyle: "width: 13%"
            },{
                name: "操作",
                myStyle: "width: 12%"
            }],
            dataList: [],
            dialog: false,
            loading: false,
            delDialog: false,
            checkDialog: false,
            formLabelWidth: '80px',
            alertForm: {
                packagePrice: ''
            },
            checkForm: {
                packagePrice: ''
            },
            timer: null,
            delTimer: null,
            checkTimer: null,
            resourceStatus: "",
            alertText: '',
            id: '',
            // 分页
            currentPage: 1,
            offsetPage: 0,
            showNum: 10,
            num_pages: null,
            // 查询
            inviteStores: ''
        }
    },
    methods: {
        // 获取数据
        getInitData(){
            let sessionId = sessionStorage.getItem('sessionId');
            console.log(sessionId);
            if(sessionId == null || sessionId == "" || sessionId == undefined) {
                window.location.href = "../../../login.html";
            }
            let that = this;
            let data = {
                name: that.inviteStores,
                offset: that.offsetPage,//（页码-1）*每页显示条数
                limit: that.showNum//每页赢显示的条数
            };
            ajaxGet("/sys/dict/list", data, function (res) {
                console.log(res);
                if (res.status === "1") {
                    that.dataList = res.resultMap.dictList;
                    var listTotal = res.resultMap.total;//总条数
                    that.num_pages = Math.ceil(parseInt(listTotal)/10);
                    var pageHtml = page(parseInt(that.currentPage),that.num_pages);
                    $(".pageN").html(pageHtml);
                    that.getPage();
                    console.log(that.dataList)
                } else {
                    that.$message.error(res.message);
                }
            })
        },
        // 新增或者编辑弹窗开关
        handleClose() {
            let that = this;
            if (that.loading) {
                return;
            };
            if (that.alertForm.packagePrice == "") {
                alert("请输入门店");
                return false;
            };
            // 区分新增编辑
            if (that.alertText == "新增") {
                that.addSaveData();
            } else {
                that.changeSaveData();
            };
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
            console.log(this.alertForm);
        },
        // 新增按钮点击
        openAddAlert(){
            this.dialog = true;
            this.alertForm.packagePrice = '';
            this.alertText = '新增';
        },
        // 查看按钮点击
        // openCheckAlert(id){
        //     let that = this;
        //     that.checkDialog = true;
        //     let data = {
        //         id: id
        //     }
        //     ajaxGet("/drug/postage/get", data, function (res) {
        //         console.log(res)
        //         if (res.status === "1") {
        //             let resData = res.resultMap.drugPostage;
        //             that.checkForm.packagePrice = resData.price;
        //         } else {
        //             that.$message.error(res.message);
        //         }
        //     })
        // },
        // checkHandleClose(){
        //     let that = this;
        //     that.$refs.checkDrawer.closeDrawer();
        // },
        // checkCancelForm() {
        //     this.checkDialog = false;
        // },
        // 编辑按钮点击
        openChangeAlert(id){
            console.log(id);
            let that = this;
            that.alertText = '编辑';
            that.dialog = true;
            that.id = id;
            let data = {
                id: id
            };
            // 处理数据
            that.getData(data, function (res) {
                console.log(res);
                that.alertForm.packagePrice = res.name;
            });
        },
        // 删除按钮点击
        openDelectAlert(id){
            console.log(id, "id");
            let that = this;
            that.id = id;
            that.delDialog = true;
        },
        delHandleClose(){
            let that = this;
            if (that.loading) {
                return;
            };
            let data = {
                id: that.id
            }
            that.loading = true;
            that.delTimer = setTimeout(() => {
                ajaxGet("/sys/dict/remove", data, function (res) {
                    console.log(res);
                    if (res.status === "1") {
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                        that.$refs.delDrawer.closeDrawer();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            that.loading = false;
                            that.getInitData();
                        }, 400);
                    } else {
                        that.$message.error(res.message);
                        that.loading = false;
                        that.delTimer = null;
                    }
                })
            }, 2000);
        },
        delCancelForm() {
            this.loading = false;
            this.delDialog = false;
            clearTimeout(this.delTimer);
        },
        // 弹窗获取数据
        getData(sendData, callback){
            ajaxGet("/sys/dict/get", sendData, function (res) {
                if (res.status === "1") {
                    callback(res.resultMap.dict);
                } else {
                    that.$message.error(res.message);
                }
            });
        },
        // 新增弹窗的保存按钮
        addSaveData(){
            let that = this;
            let data = {
                name: that.alertForm.packagePrice,
            }
            that.loading = true;
            that.timer = setTimeout(() => {
                ajaxGet("/sys/dict/save", data, function (res) {
                    console.log(res);
                    if (res.status == "1") {
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                        that.$refs.drawer.closeDrawer();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            that.loading = false;
                            that.getInitData();
                        }, 400);
                    } else {
                        that.$message.error(res.message);
                        that.loading = false;
                        that.timer = null;
                    }
                });
            }, 2000);
        },
        // 编辑弹窗的保存按钮
        changeSaveData(){
            let that = this;
            let data = {
                id: that.id,
                name: that.alertForm.packagePrice
            }
            that.loading = true;
            that.timer = setTimeout(() => {
                ajaxGet("/sys/dict/update", data, function (res) {
                    console.log(res);
                    if (res.status == "1") {
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                        that.$refs.drawer.closeDrawer();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                            that.loading = false;
                            that.getInitData();
                        }, 400);
                    } else {
                        that.$message.error(res.message);
                        that.loading = false;
                        that.timer = null;
                    }
                });
            }, 2000);
        },
        // 分页
        getPage(){
            // var currentPage = 1;
            // var offsetPage=0;//传输的页起始条数
            // var showNum=10;//页面需要显示的条数
            // var num_pages;
            let that = this;
            //点击分页页数
            $(document).delegate(".flipOver",'click',function(){
                $(this).addClass('active').siblings().removeClass('active');
                that.currentPage = parseInt($(this).attr("pageId"));
                that.offsetPage = (that.currentPage-1)*10;//（页码-1）*每页显示条数
                that.getInitData();
                window.scrollTo(0,0);
            });
            //点击上一页
            $(document).delegate("#prev",'click',function(){
                if($(".flipOver.active").prev().attr("id") == "prev"){
                    return true
                }else{
                    var page = parseInt($(".flipOver.active").attr("pageid"))-1;
                    $(".flipOver.active").prev().addClass("active").siblings().removeClass("active")
                }
                that.currentPage = page;
                that.offsetPage = (that.currentPage-1)*10;//（页码-1）*每页显示条数
                that.getInitData();
                window.scrollTo(0,0);
            });


            //点击下一页
            $(document).delegate("#Next",'click',function(){
                if($(".flipOver.active").next().attr("id") == "Next"){
                    return true
                }else{
                    var page = parseInt($(".flipOver.active").attr("pageid"))+1;
                    $(".flipOver.active").next().addClass("active").siblings().removeClass("active")
                }
                that.currentPage = page;
                that.offsetPage = (that.currentPage-1)*10;//（页码-1）*每页显示条数
                that.getInitData();
                window.scrollTo(0,0);
            });
            //点击分页跳转页按钮
            $(document).delegate(".srueToJumpPageBtn",'click',function(){
                that.currentPage = parseInt($(".toPageNum").val().trim());
                that.offsetPage = (that.currentPage-1)*10;//（页码-1）*每页显示条数
                that.getInitData();
                window.scrollTo(0,0);
            });
        },
        // 查询点击
        queryBtnClick(){
            this.currentPage = 1;
            this.offsetPage = 0;
            this.showNum = 10;
            this.getInitData();
        },
        // 清空点击
        resBtnClick(){
            this.currentPage = 1;
            this.offsetPage = 0;
            this.showNum = 10;
            this.inviteStores = '';
            this.getInitData();
        },
        // 排序点击
        sortClick(id, num, isup){
        	let that = this;
        	let data = {
        		id: id,
        		number: num,
        		isUp: isup
        	};
        	ajaxGet("/sys/dict/isUp", data, function (res) {
        		console.log(res);
        		if (res.status == "1") {
        			alert(res.message);
        			that.getInitData();
        		}
        		else alert(res.message);
        	})
        }
    },
    mounted() {
        this.getInitData();
        this.getPage();
    },
    filters: {
        handleValue(value){
            if (value == null || value == undefined) {
                return "-";
            }else{
                return value;
            }
        },
        handleIndex(value){
            value += 1; 
            return value;
        }
    }
})