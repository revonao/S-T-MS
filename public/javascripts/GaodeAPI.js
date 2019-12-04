function init() {
    var map = new AMap.Map('reg_map', {
        zoom:6,//级别
        center: [113.397428, 30.90923],//中心点坐标
        viewMode:'3D'//使用3D视图
    });
    var marker;
    map.on('click', function(e) {
        if (marker != null)
        {
            map.remove(marker);
        }
        document.getElementById("latitude").value = e.lnglat.getLat();
        document.getElementById("longitude").value = e.lnglat.getLng();
        marker = new AMap.Marker({
            position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
            title: '我的店铺地址'
        });
        map.add(marker);
    });

    var autoOptions = {
        input: "tipinput"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: map
    });  //构造地点查询类
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
    }
}