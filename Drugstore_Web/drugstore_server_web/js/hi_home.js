function uploadImg(that,cn) {
    var formData = new FormData();
    formData.append('file', $(that)[0].files[0]); // 固定格式
    $.ajax({
        url:config+'/common/uploadImage',
        type:'POST',
        data:formData,
        async: false,
        cache: false,
        dataType:'JSON', //接收值的格式
        enctype:'multipart/form-data',
        contentType: false,
        processData: false,
        success:function(data){
            if(data.status!=1){
                alert(data.message);
                cn(null);
            }else{
                cn(data.resultMap.imageUrl);
            }
        },
        error: function () {
            alert("提交失败！");
            cn(null);
        }
    })
}
//上下标 点击模块接口
function sx_up(id1,id2,cn) {
    $.ajax({
        type: "get",
        url: config + "/admin/drug/banner/changeOrderType",//http://192.31.10.62:8006/admin/drug/banner/changeOrderType
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data:{
            "id":id1,
            "directionId":id2
        },
        success: function (data) {
            alert(data.message);
            cn();
        },
    });
}
function sx_up2(id1,id2,cn) {
    $.ajax({
        type: "get",
        url: config + "/admin/drug/banner/changeOrder",
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data:{
            "id":id1,
            "directionId":id2
        },
        success: function (data) {
            alert(data.message);
            cn();
        },
    });
}
function sx_up5(id1,id2,cn) {
    $.ajax({
        type: "get",
        url: config + "/admin/drug/bannerHot/changeOrder",
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data:{
            "id":id1,
            "directionId":id2
        },
        success: function (data) {
            alert(data.message);
            cn();
        },
    });
}
function sx_up4(id1,id2,cn) {
    $.ajax({
        type: "get",
        url: config + "/admin/drug/bannerTwo/changeOrder",
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data:{
            "id":id1,
            "directionId":id2
        },
        success: function (data) {
            alert(data.message);
            cn();
        },
    });
}
function sx_up3(id1,id2) {
    $.ajax({
        type: "get",
        url: config + "/admin/drug/bannerPictures/changeOrder",
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data:{
            "id":id1,
            "directionId":id2
        },
        success: function (data) {
            alert(data.message);
            $("#app_if")[0].contentWindow.getDateList();
            $("#web_if")[0].contentWindow.getDateList();
        },
    });
}
//药品搜索自动补全框
function suggestInit() {
    ajaxGet('/drug/info/getDrugList?retailPriceStart&retailPriceEnd&typeId&fullName&offset&limit&categoryId', {stockCheck:1}, function (res) {
        console.log("金额呵呵呵呵呵：：：：",res);
        var resdata = res.resultMap.commodityInfoList;

        var baiduBsSuggest = $("#ryaoName").bsSuggest({
            //indexId: 0,//每组数据的第几个数据，作为输入输入框的数据id
            //indexKey: 1,//每组数据的第几个数据，作为输入输入框的内容
            idField: 'rec',          //每组数据的哪个字段作为 data-id，优先级高于 indexId 设置（推荐）
            keyField: 'fullName',          //每组数据的哪个字段作为输入框内容，优先级高于 indexKey 设置（推荐）
            allowNoKeyword: false,//是否允许无关键字时请求数据
            showHeader: true, //是否显示选择列表的 header，默认有效字段大于一列时显示，否则不显示
            showBtn: true,//是否显示下拉按钮
            listAlign: "right",              //提示列表对齐位置，left/right/auto
            listStyle: {
                "width": "100%"//"max-width": "200px",
            },
            effectiveFields: ["fullName"],//有效显示于列表中的字段，非有效字段都会过滤
            effectiveFieldsAlias: {//有效字段的别名
                fullName: "药名"
            },
            data: {
                "value": resdata
            }
        }).on("onSetSelectValue", function (a, b) {//选择商品后触发
            $("#rec").val(b.id);
            for (var i=0;i<resdata.length;i++){
                if(resdata[i].rec==b.id){
                    $('#price').val(resdata[i].retailPrice);
                }
            }
        });
        var baiduBsSuggest2 = $("#ryaoName2").bsSuggest({
            //indexId: 0,//每组数据的第几个数据，作为输入输入框的数据id
            //indexKey: 1,//每组数据的第几个数据，作为输入输入框的内容
            idField: 'rec',          //每组数据的哪个字段作为 data-id，优先级高于 indexId 设置（推荐）
            keyField: 'fullName',          //每组数据的哪个字段作为输入框内容，优先级高于 indexKey 设置（推荐）
            allowNoKeyword: false,//是否允许无关键字时请求数据
            showHeader: true, //是否显示选择列表的 header，默认有效字段大于一列时显示，否则不显示
            showBtn: true,//是否显示下拉按钮
            listAlign: "right",              //提示列表对齐位置，left/right/auto
            listStyle: {
                "width": "100%"//"max-width": "200px",
            },
            effectiveFields: ["fullName"],//有效显示于列表中的字段，非有效字段都会过滤
            effectiveFieldsAlias: {//有效字段的别名
                fullName: "药名"
            },
            data: {
                "value": resdata
            }
        }).on("onSetSelectValue", function (a, b) {//选择商品后触发
            $("#rec2").val(b.id);
        });
    })
}
function filebtnclick(that) {
    $(that).parent().find('input[type="file"]').click();
}