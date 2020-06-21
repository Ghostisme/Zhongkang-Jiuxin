var data =[
{"id":1,"city":"郑州市","positive":0,"negative":13,"ratingScore":0.9784},
{"id":2,"city":"焦作市","positive":10,"negative":10,"ratingScore":0.9788},
{"id":3,"city":"开封市","positive":20,"negative":20,"ratingScore":0.8777},
{"id":4,"city":"新乡市","positive":30,"negative":30,"ratingScore":0.6766},
{"id":5,"city":"周口市","positive":40,"negative":40,"ratingScore":0.6966},
{"id":6,"city":"平顶山市","positive":50,"negative":50,"ratingScore":0.6844},
{"id":7,"city":"南阳市","positive":60,"negative":60,"ratingScore":0.6266},
{"id":8,"city":"三门峡市","positive":70,"negative":70,"ratingScore":0.7733},
{"id":9,"city":"漯河市","positive":80,"negative":80,"ratingScore":0.0622},
{"id":10,"city":"商丘市","positive":90,"negative":90,"ratingScore":0.4611},
]

//评级覆盖数据
var obj=[]
for (var i=0;i<data.length;i++) {   
    //评分数据
    var name = data[i].city
    obj.push({name,value:data[i].ratingScore})

    //缓存
    $("#mapdata").data(name,data[i])
}
    console.log($("#mapdata").data("焦作市"))