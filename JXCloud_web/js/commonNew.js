/**
 * 将表单的serializeArray数据 序列化成接口使用的json对象
 * @param params 表单的serializeArray数据
 */
function regroupFormData(params) {
    var jsonData={};
    for (var i=0;i<params.length;i++) {
        jsonData[params[i].name]=params[i].value
    }
    return jsonData;
}

/**
 * 调用接口的ajax
 * @param url
 * @param fromData
 * @param cn
 */
function ajaxGet(url,jsonData,cn) {
    //添加sessionId
    jsonData.sessionId=sessionStorage.getItem("sessionId");
    console.log('ajaxGet-url:',config + url);
    console.log('ajaxGet-'+url+'-data:',jsonData);
    $.ajax({
        method: 'get',
        url: config + url,
        contentType: "application/json; charset=utf-8", //传到后台的数据格式
        async: true,
        data: jsonData,
        dataType: 'jsonp', //接收值的格式
        jsonp: 'jsoncallback',
        success: function (result) {
            console.log('ajaxGet-'+url+'-success-result:',result);
            cn(result);
        },
        error: function (result) {
            console.log('ajaxGet-'+url+'-success-result:',result);
            cn(result);
        }
    });
}