//js
// 基于准备好的dom，初始化echarts图表
var myMapChart = echarts.init(document.getElementById('mapMain'));
var optionMap = {
//  tooltip: {
//      trigger: 'item',
//      formatter: '{b}'
//  },
  title: {
  		show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）            
  		text: '检查量',//主标题文本，'\n'指定换行                  
  		subtarget: null,//指定窗口打开副标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）            
  		x:'left',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）            
  		y: 'center',//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）           
		textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}                
		fontFamily: 'Arial, Verdana, sans...',                
		fontSize: 16,                
		fontStyle: 'normal',
		fontWeight: 'normal',            
		},
  },
	tooltip:{
		borderWidth: 1,
		borderColor: "#6E98FC",
		// formatter详细配置： https://echarts.baidu.com/optionMap.html#tooltip.formatter
		formatter(params, ticket, callback) { // https://echarts.baidu.com/optionMap.html#tooltip.formatter
			// params.data 就是series配置项中的data数据
						 console.log(params.data)
			let lossPercent,
				delay

			let htmlStr = '';
			htmlStr += '<div style="margin-right:10px;font-size:12px;text-align:left;">'+params.data.name+'</div><br/>';
//			for(var k=0 ;k<params.data.hospital.length;k++){
//				htmlStr+='<p style="text-align:left;margin-top:-10px;">';
//				htmlStr+='<span style="margin-right:10px;">'+1+'</span>';
				htmlStr+='<div style="margin-right:10px;text-align:left;">本月全省检查量：'+params.data.value+'例</div><br/>';
				if(params.data.checkLastNum){
					htmlStr+='<div style="margin-right:10px;text-align:left;">上月全省检查量：'+params.data.checkLastNum+'例</div><br/>';
				}else{
					htmlStr+='<div style="margin-right:10px;text-align:left;">上月全省检查量：0例</div><br/>';
				}
				
				htmlStr+='<div style="margin-right:10px;text-align:left;">';
				if(params.data.checkChainRatio){
					htmlStr+='环比：'+params.data.checkChainRatio;
				}else{
					htmlStr+='环比：--';
				}
				
				if(params.data.checkChainRatioFlag==1){//环比符号(1：上涨，0：持平，-1：下降)
					htmlStr+='<i class="fa fa-arrow-up"></i>';
				}else if(params.data.checkChainRatioFlag==-1){
					htmlStr+='<i class="fa fa-arrow-down"></i>';
				}
				htmlStr+='</div><br/>';
//				htmlStr+='</p></br>';
//			}
			
			return htmlStr
		}
	},
    dataRange: {
		x: 'left',
        y: 'bottom',
        padding: 5,                    // 值域内边距，单位px，默认各方向内边距为5，
                         // 接受数组分别设定上右下左边距，同css
	    itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
	                        // 横向布局时为水平间隔，纵向布局时为纵向间隔
	    itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
	    itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值 * 10
        splitList: [
            {start: 5000,color:'#1e4fa8'},
            {start: 3000, end: 5000,color:'#3b67b6'},
            {start: 1000, end: 3000,color:'#5686db'},
            {start: 500, end: 1000,color:'#5d9bf9'},
            {start: 100, end: 500,color:'#a5cbfe'},
//          {start: 5, end: 5, label: '5（火灾数量）', color: 'black'},
            {end: 100, color: '#d7e6fd'}
        ],
//      color: ['#03338C', '#2EACFB'],
    },

    series: [{
        name: '债券评级',
        type: 'map',
        mapType: 'china',
        selectedMode: 'single',
        color:'#ffffff',
        mapLocation: {
            x: 'center',
            y: 'center',
            width: '100%'
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    textStyle: {
                        color: "#141414",
                        fontSize: 11,
                        fontFamily: "Arial"
                    }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    textStyle: {
//                      color: "#fff",
                        fontSize: 11,
                        fontFamily: "Arial"
                    },
                }
            }
        },
        data: [{
            name: '北京',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '天津',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '上海',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '重庆',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '河北',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '河南',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '云南',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '辽宁',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '黑龙江',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '湖南',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '安徽',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '山东',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '新疆',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '江苏',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '浙江',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '江西',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '湖北',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '广西',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '甘肃',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '山西',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '内蒙古',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '陕西',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '吉林',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '福建',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '贵州',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '广东',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '青海',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '西藏',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '四川',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '宁夏',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '海南',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '台湾',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '香港',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '澳门',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }, {
            name: '南海诸岛',
            selected: false,
            value: 0,//本月检查量
            checkLastNum:'0',//上月检查量
            checkChainRatio:'0%',//环比量
            checkChainRatioFlag:0//环比符号(1：上涨，0：持平，-1：下降)
        }]
    }]
};

// 为echarts对象加载数据 
myMapChart.setOption(optionMap);
var selectDatas;
var seriesDate;
//地图选择某个省时，则触发事件
myMapChart.on("mapSelected", function(param) {
    //
    var selected = param.selected;
    //选择的省
    var selectedProvince;
    var name;
    for (var i = 0, l = optionMap.series[0].data.length; i < l; i++) {
        //获取series[0]下的每name的名称
        name = optionMap.series[0].data[i].name;

        //更改series[0] 中的数据 为选中的状态
        optionMap.series[0].data[i].selected = selected[name];
        //获取选择的省
        if (selected[name]) {
            selectedProvince = name;
        }
    }
    if (typeof selectedProvince == 'undefined') {
        optionMap.series.splice(1);
//      optionMap.legend = null;
//      optionMap.dataRange = null;
//      myMapChart.setOption(optionMap, true);
        return;
    }
//读取后台数据			
ajaxGet('/sys/statistics/getHomePageStatisticsReport',{selectType:1,province:selectedProvince},function(data){
	console.log("下级市区数据",data);
//	selectDatas=[{
//		city: "蓟县",
//		checkThisNum: 21,
//		checkLastNum: 3,
//		checkChainRatioFlag: 1,
//		checkChainRatio: 600,
//		returnFactFee: 0,
//		grossProfit: 0,
//		returnShouldFee: 0,
//		cost: 0
//	}]; 
selectDatas=data.resultMap.mapDataResult;
	var obj=[]
	for (var i=0;i<selectDatas.length;i++) {   
	    //评分数据
	    var name = selectDatas[i].city
	    obj.push({
	    	name:selectDatas[i].city,
	    	value:selectDatas[i].checkThisNum,
	    	checkLastNum:selectDatas[i].checkLastNum,//上月检查量
        checkChainRatio:selectDatas[i].checkChainRatio,//环比量
        checkChainRatioFlag:selectDatas[i].checkChainRatioFlag//环比符号(1：上涨，0：持平，-1：下降)
	    })
	
	    //缓存
	    $("#mapdata").data(name,data[i]);
	}
	//在series中添加对象
var seriesDate = {
        selectedMode: "single",
        tooltip: {
            trigger: 'item',

            formatter: function(params, ticket, callback) {
                //获取series[1]的obj
//              var temp1 = params[5]
//              var name = temp1.name
                console.log(selectDatas)
								
//              //鼠标当前指示的城市
                var objvalue = $("#mapdata").data(name)
//              if (objvalue) {
//                  let htmlStr = '';
//										htmlStr += '<div style="margin-right:10px;font-size:12px;text-align:right;">'+selectDatas.city+'</div><br/>';
//						//			for(var k=0 ;k<params.data.hospital.length;k++){
//										htmlStr+='<p style="text-align:left;margin-top:-10px;">';
//						//				htmlStr+='<span style="margin-right:10px;">'+1+'</span>';
//										htmlStr+='<div style="margin-right:10px;text-align:right;">本月全省检查量：'+selectDatas.value+'例</div><br/>';
//										htmlStr+='<div style="margin-right:10px;text-align:right;">上月全省检查量：'+selectDatas.checkLastNum+'例</div><br/>';
//										htmlStr+='<div style="margin-right:10px;text-align:right;">';
//										if(selectDatas.checkChainRatioFlag==1){//环比符号(1：上涨，0：持平，-1：下降)
//											htmlStr+='<i class="fa fa-arrow-up"></i>';
//										}else if(selectDatas.checkChainRatioFlag==-1){
//											htmlStr+='<i class="fa fa-arrow-down"></i>';
//										}
//										htmlStr+='环比：'+selectDatas.checkChainRatio+'</div><br/>';
//						//				htmlStr+='</p></br>';
//						//			}
//									
//									return htmlStr
//              }
                return "此市区暂无数据"

            }
        },
        //鼠标是否可进入详情气泡中
        enterable: true,
        name: '评级',
        type: 'map',
        //地国类型 为选择的省
        mapType: selectedProvince,
        mapLocation: {
            x: 'center',
            y: 'top',
            width: '70%'
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    textStyle: {
                        color: "#141414",
                        fontSize: 11,
                        fontFamily: "Arial"
                    }
                },
				 				areaStyle: {
				          	color: '#D7E6FD',//默认的地图板块颜色
				        },
                borderWidth:1,
                borderColor:'#e1e1e1',
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        //显示地图的位位
        mapLocation: {
            x: '15%'
        },
        //拖拽漫游开通
        roam: true,

        data: obj
    };
    console.log(seriesDate);
	sessionStorage.setItem("jumpOptions",JSON.stringify(seriesDate))
//	window.location.href="static2.html"
	RefreshIframe('static2.html','provinceAndCityData');
//  myChart.setoptionMap(optionMap, true);
});

	
});

ajaxGet('/sys/statistics/getHomePageStatisticsReport',{selectType:0},function(data){
		
//全国运营情况（地图）（结果集）
	if(data.resultMap.mapDataResult){
				var equipmentType=[];
				var equipmentData=[];
				var colors=[];
				$.each(optionMap.series[0].data, function(j,mapItem) {
					$.each(data.resultMap.mapDataResult, function(i,item) {
						if(item.province.indexOf(mapItem.name) != -1){
							mapItem.value=item.checkThisNum;
							if(item.checkLastNum){
								mapItem.checkLastNum=item.checkLastNum;
							}
							if(item.checkChainRatio){
								mapItem.checkChainRatio=item.checkChainRatio+'%';
							}
						}
					});
				});
				myMapChart.setOption(optionMap,true);
			}		
});