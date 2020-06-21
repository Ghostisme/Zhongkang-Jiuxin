//加载左边菜单
var sessionId = sessionStorage.getItem('sessionId');
console.log('11126', sessionId);
var ItemNums = 0;
//var codeArr=[];//接收code以及对应相应页面
//var codeUrl={};//接收code的url
var user=JSON.parse(sessionStorage.getItem('user'));
socketInit(user,function () {
    $.ajax({
        method: 'get',
        url: config + '/sys/menu/main',
        contentType: "application/json; charset=utf-8",//传到后台的数据格式
        async: true,
        data: {'sessionId': sessionId},
        dataType: 'jsonp',//接收值的格式
        jsonp: 'jsoncallback',
        success: function (data) {
            if (data.status == 1) {
                console.log('11125', data);
                sessionStorage.setItem('user', JSON.stringify(data.resultMap.userDO));
                sessionStorage.setItem('userId',data.resultMap.userDO.id);
                var hashMap = data.resultMap.leftMenuMap;
//				导航条用户信息
                if (data.resultMap.userDO.userName != "" && data.resultMap.userDO.userName != null) {
                    $('.adminStyle').text(data.resultMap.userDO.userName);//用户名
                }
                if (data.resultMap.userDO.headImage != "" && data.resultMap.userDO.headImage != null) {
                    $('.userImg img').attr("src", window.src + data.resultMap.userDO.headImage);//头像
                } else {
                    $('.userImg img').attr("src", "../../img/home/userDefaultImg.jpeg.jpg");
                }
//				获取菜单
                $('#navs').html('');
                for (key in hashMap) {
                    //			console.log(key);  //key 获取的是键名
//					console.log(hashMap[key].name);  // 获取值
                    var html = '';
                    html += '<li class="firstItems">';
                    html += '<i class="lf systemManage" /></i>';
                    html += '<div class="lf">' + hashMap[key].name + '</div>';
                    html += '<i class="lf arrowdown lastArrow"></i>';
                    html += '</li>';
                    html += '<ul class="navsList" id="' + hashMap[key].code + '">';
                    html += '</ul>';
                    $('#navs').append(html);
//					console.log(hashMap[key].menuMap);
                }
                for (key in hashMap) {
                    var xhtml = '';
                    for (name in hashMap[key].menuMap) {
                        var menuMaps = hashMap[key].menuMap;
//						console.log(menuMaps[name].name);
                        xhtml += '<li class="' + menuMaps[name].code + '"><span class="menuName">' + menuMaps[name].name + '</span><span class="jumpUrls">' + menuMaps[name].url + '</span></li>';

                    }
                    $('#' + hashMap[key].code).append(xhtml);
                }
            } else {
                alert(data.message);
//			window.location.reload();
            }
        },
        error: function (result) {
            console.log('11124', result);
        }
    });
});

window.onload = function () {



//点击左侧菜单主菜单,弹出二级菜单
    var defaultArrow = 0;
    $("#navs").on("click", ".firstItems", function () {
        if ($(this).next(".navsList").css('display') == 'block') {
            $(this).find('i.lastArrow').attr('class', 'lf lastArrow arrowdown');
        } else {
            $(this).find('i.lastArrow').attr('class', 'lf lastArrow arrowUp');
        }
        $(this).next(".navsList").slideToggle();
        $(this).next(".navsList").siblings(".navsList").slideUp();
        $(this).siblings().find('i.lastArrow').attr('class', 'lf lastArrow arrowdown');
    });
//点击二级菜单 右侧tag切换
    $(".navsList").on("click", "li", function () {
        var currentTagName = $(this).find(".menuName").text();//获取标签名
        console.log('1111111111', currentTagName);
        var currentTagUrl = $(this).find('.jumpUrls').text();//获取标签url
        $(this).addClass('currentLeftTagName').siblings().removeClass('currentLeftTagName');
        $(this).parent().siblings('ul').find('.currentLeftTagName').removeClass('currentLeftTagName');
        var TagClass = $(this).attr("class");//获取标签名
        var arr = TagClass.split(" ");
        var currentTagClass = arr[0];
        clickThelable(currentTagName,currentTagClass,currentTagUrl);
//		window.location.reload(); 
    });



    $("#contents").on("click", "span.del", function () {
        //	获取当前元素的class
        var currenTag = $(this).parent().attr("class");
        var currentTagPlit = currenTag.split(" ");
        var currentFirstTagName = currentTagPlit[0];
//	上面三行新加的
        $(this).parent().prev().addClass('contensCurrentsTag').siblings().removeClass('contensCurrentsTag');
        var TagClass = $(this).parent().prev().attr('class');
        var arrPrevTag = TagClass.split(" ");
        var pREVTagClass = arrPrevTag[0];//获取删除元素的上一个元素的class，找到对应的侧边栏的class
        if ($(this).parent().prev().find(".tagName").text() == "首页") {
            $('.homeImg').css("display", "block");
            $('.homeImg').nextAll().css("display", "none");
        } else {
            $('#navs').find('.' + pREVTagClass).addClass('currentLeftTagName').siblings().removeClass('currentLeftTagName');
            $('#navs').find('.' + pREVTagClass).parent().siblings('ul').find('.currentLeftTagName').removeClass('currentLeftTagName');
            //找到对应的内容 显示
            $("#" + currentFirstTagName).css("display", "none");
            $("#" + pREVTagClass).css("display", "block");
        }
        console.log("$(this)[0]:::",$(this)[0]);
        //	上面两行新加的
        del($(this)[0]);
        var allTags = $(".contentsTags .homeTag").nextAll(".Tags");
        var tagArr = [];
        for (var i = 0; i < allTags.length; i++) {
            var tagObj = {
                tagClassName: $(allTags[i]).attr("class"),
                tagTxt: $(allTags[i]).find(".tagCName").text().trim(),
                tagUrl: $(allTags[i]).find(".tagName .jumpUrls").text().trim()
            };
            tagArr.push(tagObj);
            var tagArray = JSON.stringify(tagArr);
        }
        if (allTags.length == 0) {
            localStorage.clear('lastLiClassName');
            $(".currentLeftTagName").removeClass('currentLeftTagName');
            console.log("aaaaa");
            $('.homeImg').css("display", "block");
            $('.homeImg').nextAll().css("display", "none");
        }
        ;
        localStorage.setItem('tagInfo', tagArray);//本地存储标签
//		window.location.reload();
    });


    $(".contentsTags").html('<div class="Tags lf homeTag"><span class="lf tagName">首页</span></div>');
    if (localStorage.getItem('tagInfo') !== 'undefined') {
        var StorageArr = JSON.parse(localStorage.getItem('tagInfo'));
        console.log('1112123', StorageArr);
        if (StorageArr != "" && StorageArr != null) {//判断是不是清楚了缓存 如果清除  那就直接直接出现home页
            for (var j = 0; j < StorageArr.length; j++) {
                var html = '';
                html += '<div class="' + StorageArr[j].tagClassName + '">';
                html += '<span class="lf tagName"><span class="tagCName">' + StorageArr[j].tagTxt + '</span><span class="jumpUrls">' + StorageArr[j].tagUrl + '</span></span>';
                html += '<span class="del rt">×</span>';
                html += '</div>';
                $(".contentsTags").append(html);
                //			alert("coming");
                //			jumpToUrl(StorageArr[j].tagUrl,StorageArr[j].tagClassName);
            }
        } else {
            $('.homeImg').css("display", "block");
            $('.homeImg').nextAll().css("display", "none");
        }

    }
    var lastLiClassName = localStorage.getItem('lastLiClassName');
    console.log('111211', lastLiClassName);
    console.log('111289', StorageArr);
    if (lastLiClassName != 'undefined' && lastLiClassName != null) {
        console.log('1112223', localStorage.getItem('lastLiClassName') == "首页");
        if (localStorage.getItem('lastLiClassName') == "首页") {
            $(".homeTag").addClass("contensCurrentsTag").siblings().removeClass("contensCurrentsTag");
            $('.homeImg').css("display", "block");
            $(".homeImg").nextAll().css("display", "none");
        } else {
            $('.' + lastLiClassName).parent().css('display', 'block');
            $('.' + lastLiClassName).addClass('currentLeftTagName');
            $('.contentsTags').find('.' + lastLiClassName).addClass('contensCurrentsTag').siblings().removeClass('contensCurrentsTag');
            $('#navs').find('.' + lastLiClassName).parent().prev().find('i.lastArrow').attr('class', 'lf lastArrow arrowUp');
            var thisTagUrl = $('.contensCurrentsTag').find(".jumpUrls").text().trim();//找到当前打开的页面标签url
            //		jumpToUrl(window.tagURL+thisTagUrl,lastLiClassName);
            for (var j = 0; j < StorageArr.length; j++) {
                jumpToUrl(window.tagURL + StorageArr[j].tagUrl, StorageArr[j].tagClassName);
            }
            $('.homeImg').css("display", "none");
            $("#" + lastLiClassName).css("display", "block");
            $("#" + lastLiClassName).siblings().css("display", "none");
        }

    } else {
//		当只剩一个首页标签时
        $("#navs").find('li').removeClass('currentLeftTagName');
        $('#navs').find('i.lastArrow').attr('class', 'lf lastArrow arrowdown');
        $('.homeTag').addClass('contensCurrentsTag');
        $('.homeImg').css("display", "block");
        $('.homeImg').nextAll().css("display", "none");
//		jumpToUrl(window.tagURL+thisTagUrl);
    }
    //点击菜单切换相应页面
    $(".contentsTags").on("click", ".Tags", function () {
        var currentTags = $(this).attr("class");
//		截取字符串的第一个名
        var arr = currentTags.split(" ");
        var currentTagClass = arr[0];
        console.log('11128', currentTagClass);
        if ($(this).find(".tagName").text().trim() == "首页") {
            $(".homeTag").addClass("contensCurrentsTag").siblings().removeClass("contensCurrentsTag");
            $(".homeImg").css("display", "block");
            $(".homeImg").nextAll().css("display", "none");
            localStorage.setItem('lastLiClassName', "首页");
        } else {
            $(this).addClass('contensCurrentsTag').siblings().removeClass("contensCurrentsTag");
            console.log('11127', $("#" + currentTagClass));
            $("#" + currentTagClass).css("display", "block");
            $("#" + currentTagClass).siblings().css("display", "none");
            localStorage.setItem('lastLiClassName', currentTagClass);
        }
    });
}
/*socket开始*/
function socketInit(user,cn) {
    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        console.log('useruseruser::::',user);
        var wsUrl = "wss://cloud.zk9x.cn/wsApi/websocket/" + user.userCode;        
//      var wsUrl = "wss://www.zk9x.cn/wsApi/websocket/" + user.userCode;
//      var wsUrl = "wss://192.31.10.62:8001/wsApi/websocket/" + user.userCode;
//		var wsUrl = "wss://192.31.10.73:8001/wsApi/websocket/" + user.userCode;
//		var wsUrl = "wss://192.31.10.58:8001/wsApi/websocket/" + user.userCode;
//		var wsUrl = "wss://192.31.10.166:8001/wsApi/websocket/" + user.userCode;
        console.log('wsUrl::::::', wsUrl);
        websocket = new WebSocket(wsUrl);
    } else {
        alert('Not support websocket')
    }
    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        console.log('event：：：：：：：：：：：：：：：：：', event);
        var msg = event.data;
        msg = msg.split(',');
        if (msg[0] == "2") {
            alert("对方拒绝了您的视频邀请");
            //断流
            quitRTC();
        }else if (msg[0] == "1") {
            acceptMessage(msg);
        }else if (msg[0] == "3") {
            alert("用户已登录");
            window.location.href="login.html";
        }
    }
    /*
    * //首先判断服务器发送的消息是给医生(点击申请视频按钮)的 还是给预约人(接受视频邀请)的
        if(data.is=='医生'){
            //给医生的  因为是我点的申请视频按钮，所以服务器发送消息给医生的话，就一定是对方拒绝了视频
            //对方不接受
           alert('对方拒绝了您的视频邀请');
        }else{

        }*/
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        websocket.close();
    }
    //连接成功建立的回调方法
    websocket.onopen = function (event) {
        console.log('socket连接建立成功');
    }
    cn();

}
function acceptMessage(msg) {
    //给预约人的 说明是有人请求跟我视频
    // 请求视频
    if (window.confirm('有视频邀请，是否接受？')) {
        //对方接受 并打开视频
        var currentTagName = "预约视频";//获取标签名
        var currentTagUrl = "audienceAccept/audienceAcceptRaw.html";//获取标签url
        var currentTagClass = "YYGL_YYSPA";//获取标签名
        clickThelable(currentTagName,currentTagClass,currentTagUrl);
        //连接视频
        push(msg[1]);
    } else {
        //预约人拒绝，需要给医生发送消息，提示我拒绝了视频邀请
        var jsonData = {'applyUserCode': msg[2], 'appointUserCode': msg[3], 'roomId': user.id, 'type': 2};
        //发送websocket消息给 对方，让对方知道我拒绝了
        ajaxGet('/oa/interrogationInfo/sendInvite', jsonData, function (res) {
        });
    }
}
/*socket结束*/
function clickThelable(currentTagName,currentTagClass,currentTagUrl) {
    //	将点击的li的class存储在本地 供下次刷新时使用
    localStorage.setItem('lastLiClassName', currentTagClass);
    var TagsLen = $(".contentsTags").find('.' + currentTagClass).length;//右边页面上所有标签
    console.log('222222222222222', TagsLen);
    if (TagsLen == 0) {//检查当前标签是否有当前点击的菜单的class
        var html = '';
        html += '<div class="' + currentTagClass + ' Tags lf">';
        html += '<span class="lf tagName"><span class="tagCName">' + currentTagName + '</span><span class="jumpUrls">' + currentTagUrl + '</span></span>';
        html += '<span class="del rt">×</span>';
        html += '</div>';
        $(".contentsTags").append(html);
        $(".contentsTags").find('.' + currentTagClass).addClass('contensCurrentsTag');
        $(".contentsTags").find('.' + currentTagClass).siblings().removeClass('contensCurrentsTag');
        $("#" + currentTagClass).css("display", "block");
        $("#" + currentTagClass).siblings().css("display", "none");
    } else {
        $(".contentsTags").find('.' + currentTagClass).addClass('contensCurrentsTag');
        $(".contentsTags").find('.' + currentTagClass).siblings().removeClass('contensCurrentsTag');
        $("#" + currentTagClass).css("display", "block");
        $("#" + currentTagClass).siblings().css("display", "none");
        $("#" + currentTagClass).load(window.tagURL + currentTagUrl);
    }
//		每点击一次保存一次导航的cookie
    var allTags = $(".contentsTags .homeTag").nextAll(".Tags");
    var tagArr = [];
    for (var i = 0; i < allTags.length; i++) {
        var tagObj = {
            tagClassName: $(allTags[i]).attr("class"),
            tagTxt: $(allTags[i]).find(".tagCName").text().trim(),
            tagUrl: $(allTags[i]).find(".jumpUrls").text().trim()
        };
        tagArr.push(tagObj);
        var tagArray = JSON.stringify(tagArr);
    }
    localStorage.setItem('tagInfo', tagArray);//本地存储标签
    console.log('333333333333333', window.tagURL + currentTagUrl);
    jumpToUrl(window.tagURL + currentTagUrl, currentTagClass);
    $('.homeImg').css("display", "none");
}
//根据点击标签的url直接导入相应
function jumpToUrl(fromUrl, cHtmlsTags) {//内部定义的是url和标签名
    console.log('11123', $("#homeAllLoad").find("#" + cHtmlsTags).length);
    if ($("#homeAllLoad").find("#" + cHtmlsTags).length == 0) {//如果页面里没有引进的id，就引进，有则打开
        var arrPrevTag = cHtmlsTags.split(" ");
        var pREVTagClass = arrPrevTag[0];//获取删除元素的上一个元素的class，找到对应的侧边栏的class
        $("#homeAllLoad").append('<div id="' + pREVTagClass + '"></div>');
        console.log('111', pREVTagClass);
        console.log('1112', fromUrl);
        $("#" + pREVTagClass).load(fromUrl);
        $("#" + pREVTagClass).siblings().css("display", "none");
    } else {
        $("#" + pREVTagClass).load(fromUrl);
        $("#" + pREVTagClass).css("display", "block");
        $("#" + pREVTagClass).siblings().css("display", "none");
    }
}

//关闭标签
function del(thisdel) {
    var currentTags = $(thisdel.parentNode).attr("class");
//		截取字符串的第一个名
    var arr = currentTags.split(" ");
    var currentTagClass = arr[0];
    console.log("currentTagClass:::",currentTagClass);
    //是预约视频就退房
    if (currentTagClass == "YYGL_YYSP"||currentTagClass == "YYGL_YYSPA") {
        quitRTC();
    }
    thisdel.parentNode.parentNode.removeChild(thisdel.parentNode);
}