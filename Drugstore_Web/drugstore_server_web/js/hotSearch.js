
//上下标 点击模块接口

function sx_up5(id1,id2,isUp,cn) {
    $.ajax({
        type: "get",
        url: config + "/drug/hotSearch/direction",
        async: false,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data:{
            "id":id1,
            "caSort":id2,
            "isUp":isUp
        },
        success: function (data) {
            alert(data.message);
            cn();
        },
    });
}


function filebtnclick(that) {
    $(that).parent().find('input[type="file"]').click();
}