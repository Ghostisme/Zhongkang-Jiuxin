function ajaxGet(url, data, callback) {
    $.ajax({
        type: "get",
        url: config + url,
        data: data,
        dataType: "JSON",
        success: function (response) {
            callback(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
}
function ajaxJson(url, data, callback){
    $.ajax({
        type: "get",
        url: url,
        data: data,
        dataType: "JSON",
        success: function (response) {
            callback(response);
        },
        error: function (response) {
            console.log(response);
        }
    });
}