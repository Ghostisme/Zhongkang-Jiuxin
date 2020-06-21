var webDom = new Vue({
    el: "#web",
    data() {
        return {
            initText: "编辑",
            form: {
                free: "",
                default: "",
                memo: "",
                flag: true
            },
            // titltList: [{
            //     name: "地区",
            //     myStyle: "width: 20%"
            // },{
            //     name: "是否包邮",
            //     myStyle: "width: 15%"
            // },{
            //     name: "运费",
            //     myStyle: "width: 15%"
            // },{
            //     name: "包邮价格",
            //     myStyle: "width: 15%"
            // },{
            //     name: "备注",
            //     myStyle: "width: 20%"
            // },{
            //     name: "操作",
            //     myStyle: "width: 30%"
            // }],
            titltList: [{
                name: "地区",
                myStyle: "width: 20%"
            },{
                name: "是否包邮",
                myStyle: "width: 15%"
            },{
                name: "运费",
                myStyle: "width: 20%"
            },{
                name: "包邮价格",
                myStyle: "width: 20%"
            },{
                name: "操作",
                myStyle: "width: 30%"
            }],
            dataList: [],
            dialog: false,
            loading: false,
            delDialog: false,
            checkDialog: false,
            formLabelWidth: '80px',
            alertForm: {
                region: '',
                resource: '',
                packagePrice: '',
                freight: '',
                options: []
            },
            checkForm: {
                region: '',
                resource: '',
                packagePrice: '',
                freight: ''
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
        }
    },
    methods: {
        // 获取数据
        getInitData(){
            let that = this;
            let data = {
            	offset: that.offsetPage,//（页码-1）*每页显示条数
                limit: that.showNum//每页赢显示的条数
            };
            ajaxGet("/drug/postage/getDefault", data, function (res) {
                console.log(res);
                if (res.status === "1") {
                    let obj = res.resultMap.drugPostage;
                    that.form.free = obj.price;
                    that.form.default = obj.carriage;
                    that.form.memo = obj.memo;
                    that.dataList = res.resultMap.list;
                    var listTotal = res.resultMap.count;//总条数
                    that.num_pages = Math.ceil(parseInt(listTotal)/10);
                    var pageHtml = page(parseInt(that.currentPage),that.num_pages);
                    $(".pageN").html(pageHtml);
                    that.getPage();
                } else {
                    that.$message.error(res.message);
                }
            })
        },
        // 默认区域按钮文字切换
        initHandleClick(){
            let that = this;
            let btnText = this.initText;
            if (btnText == "编辑") {
                that.initText = "保存";
                that.form.flag = false;
            } else {
                // this.initText = "编辑";
                // this.form.flag = true;
                let data = {};
                data.price = that.form.free;
                data.carriage = that.form.default;
                data.memo = that.form.memo;
                ajaxGet("/drug/postage/updateDefault", data, function (res) {
                    console.log(res);
                    if (res.status === "1") {
                        that.initText = "编辑";
                        that.form.flag = true;
                        that.$message({
                            message: res.message,
                            type: 'success'
                        });
                    } else {
                        that.$message({
                            message: res.message,
                            type: 'error'
                        });
                        that.form.flag = false;
                    }
                })
            }
        },
        // 新增或者编辑弹窗开关
        handleClose() {
            let that = this;
            if (that.loading) {
                return;
            };
            if (that.alertForm.region == "") {
                alert("请选择地区");
                return false;
            };
            if (that.alertForm.resource == "") {
                alert("请选择是否包邮");
                return false;
            };
            if (that.alertForm.packagePrice == "" && that.alertForm.resource == "包邮") {
                alert("请输入包邮价格");
                return false;
            };
            if (that.alertForm.freight == "") {
                alert("请输入运费");
                return false;
            };
            // 区分新增编辑
            if (that.alertText == "新增") {
                that.addSaveData();
            } else {
                that.changeSaveData();
            };
            // that.$confirm('确定要提交表单吗？')
            // .then(_ => {
            //     // console.log(that.alertForm);
            //     if (that.alertForm.region == "") {
            //         alert("请选择地区");
            //         return false;
            //     }
            //     if (that.alertForm.resource == "") {
            //         alert("请选择是否包邮");
            //         return false;
            //     }
            //     if (that.alertForm.packagePrice == "" && that.alertForm.resource == "包邮") {
            //         alert("请输入包邮价格");
            //         return false;
            //     }
            //     if (that.alertForm.freight == "") {
            //         alert("请输入运费");
            //         return false;
            //     }
            //     // 区分新增编辑
            //     if (that.alertText == "新增") {
            //         that.addSaveData();
            //     } else {
            //         that.changeSaveData();
            //     }
            // })
            // .catch(_ => {});
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
            console.log(this.alertForm);
        },
        // 单选点击交互
        handleChange(){
            if (this.alertForm.resource == "包邮") {
                this.resourceStatus = 1;
            } else {
                this.resourceStatus = 0;
            }
            console.log(this.resourceStatus);
        },
        // 获取城市下拉
        getCity(){
            let that = this;
            let data = {};
            ajaxJson("js/provinceCity_new.json", data, function (res) {
                console.log(res);
                that.alertForm.options = res.provinces;
            });
        },
        // 新增按钮点击
        openAddAlert(){
            this.dialog = true;
            this.alertForm.region = '';
            this.alertForm.resource = '';
            this.alertForm.packagePrice = '';
            this.alertForm.freight = '';
            this.alertText = '新增';
            this.getCity();
        },
        // 查看按钮点击
        openCheckAlert(id){
            let that = this;
            that.checkDialog = true;
            let data = {
                id: id
            }
            ajaxGet("/drug/postage/get", data, function (res) {
                console.log(res)
                if (res.status === "1") {
                    let resData = res.resultMap.drugPostage;
                    that.checkForm.region = resData.city;
                    if (resData.type == 1) {
                        that.checkForm.resource = "包邮";
                        that.checkForm.packagePrice = resData.price;
                        that.checkForm.freight = resData.carriage;
                    } else {
                        that.checkForm.resource = "不包邮";
                        that.checkForm.freight = resData.carriage;
                    }
                } else {
                    that.$message.error(res.message);
                }
            })
        },
        checkHandleClose(){
            let that = this;
            that.$refs.checkDrawer.closeDrawer();
        },
        checkCancelForm() {
            this.checkDialog = false;
        },
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
                that.alertForm.region = res.city;
                if (res.type == 1) {
                    that.alertForm.resource = "包邮";
                    that.alertForm.packagePrice = res.price;
                    that.alertForm.freight = res.carriage;
                } else {
                    that.alertForm.resource = "不包邮";
                    that.alertForm.freight = res.carriage;
                }
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
                ajaxGet("/drug/postage/remove", data, function (res) {
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
            ajaxGet("/drug/postage/get", sendData, function (res) {
                if (res.status === "1") {
                    callback(res.resultMap.drugPostage);
                } else {
                    that.$message.error(res.message);
                }
            });
        },
        // 新增弹窗的保存按钮
        addSaveData(){
            let that = this;
            let data = {
                city: that.alertForm.region,
                type: that.resourceStatus,
                price: that.alertForm.packagePrice,
                carriage: that.alertForm.freight
            }
            that.loading = true;
            that.timer = setTimeout(() => {
                ajaxGet("/drug/postage/save", data, function (res) {
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
            if (that.alertForm.resource == "包邮") {
                that.resourceStatus = 1;
            } else {
                that.resourceStatus = 0;
            }
            let data = {
                id: that.id,
                city: that.alertForm.region,
                type: that.resourceStatus,
                price: that.alertForm.packagePrice,
                carriage: that.alertForm.freight
            }
            that.loading = true;
            that.timer = setTimeout(() => {
                ajaxGet("/drug/postage/update", data, function (res) {
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
        }
    },
    mounted() {
        this.getInitData();
    },
    filters: {
        hangleValue(value){
            if (value == null || value == undefined) {
                return "-";
            }else{
                return value;
            }
        }
    }
})