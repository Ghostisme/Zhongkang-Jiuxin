
/**
 * 高德地图定位
 * @type {{}}
 */
export const location =  {
  initMap(id){
    let mapObj = new AMap.Map(id, {})
    let geolocation;
    mapObj.plugin(['AMap.Geolocation'], function () {
        geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //  是否使用高精度定位，默认:true
        GeoLocationFirst: false, //  默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
        timeout: 10000, //  超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: false, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //  显示定位按钮，默认：true
        buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 150), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      mapObj.addControl(geolocation)
      geolocation.getCurrentPosition()
//    function(status, result){
//    	if (status == 'complete') {
//    		var str = [];
//	        str.push('定位结果：' + data.position);
//	        str.push('定位类别：' + data.location_type);
//	        if(data.accuracy){
//	            str.push('精度：' + data.accuracy + ' 米');
//	        }//如为IP精确定位结果则没有精度信息
//	        alert(str);
//    	}
//    }
    })
    return geolocation;
  }
}