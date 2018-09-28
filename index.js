$(function(){
    // 1.获取当前城市的天气信息
    let weather;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType:"jsonp",
        success:function(obj){
            console.log(obj);
            weather=obj.data;
            updata(weather);
        }
    })
    function updata(weather){
        $(".city").html(weather.city);
        $(".box h3").html(weather.weather.quality_level);
        $(".temperature").html(weather.weather.current_temperature+"°");
        $(".condition").html(weather.weather.day_condition);
        $(".humidity .right").html(weather.weather.aqi+"%");

        $(".today #dat_high_temperature").html(weather.weather.dat_high_temperature);
        $(".today #dat_low_temperature").html(weather.weather.dat_low_temperature+"°");
        $(".today .bottom-text").html(weather.weather.day_condition);
        $(".today .img").css({"background-image":"url(weather/weather/img/"+weather.weather.dat_weather_icon_id+".png)"});

        $(".tomorrow #tomorrow_high_temperature").html(weather.weather.tomorrow_high_temperature);
        $(".tomorrow #tomorrow_low_temperature").html(weather.weather.tomorrow_low_temperature+"°");
        $(".tomorrow .bottom-text").html(weather.weather.tomorrow_condition);
        $(".tomorrow .tomorrow-img").css({"background-image":"url(weather/weather/img/"+weather.weather.tomorrow_weather_icon_id+".png)"});

        let hour=weather.weather.hourly_forecast;
        let str="";
        hour.forEach(function(v){
                str=str+`
                    <div class="now">
                        <h2 class="now-time">${v.hour}:00</h2>
                        <div class="now-icon" style="background-image:url(weather/weather/img/${v.weather_icon_id}.png)"></div>
                        <h2 class="now-temp">${v.temperature}°</h2>
                    </div>
                    `
        })
        $(".wrap").html(str);
    }

    $(".city").click(function(){
        $(".loaction").css({"display":"block"});
        $(".recent").css({"display":"none"});
        $(".notice").css({"display":"none"});
    })
    $(".section-right").click(function(){
        $(".loaction").css({"display":"none"});
        $(".recent").css({"display":"block"});
        $(".notice").css({"display":"block"});
    })
    let city;
    let str1;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType:"jsonp",
        success:function (v) {
             city = v.data;
           /*for (let i in city){
                 for (let j in city[i]){
                     str1=` <div class="City-box">${j}</div>`
                     $(".City").append(str1)
                 }
           }*/
           updatacity(city)
        }
    })
    let str2;
    let str3;
    function updatacity(city) {
        console.log(city)
        for (let i in city){
           str2=`<h1 class="title1">${i}</h1>`;
           $(".city-box").append(str2);
           $(".City").addClass(".city-box");
           for (let j in city[i]){
               str3=` <div class="City-box">${j}</div>`;
               $(".city-box").append(str3)
           }
        }
    }
    let dq;
    let URL;
    function Ajax(dq){
        $.ajax({
            type:"get",
            url:URL,
            dataType:"jsonp",
            success:function (obj) {
                dq=obj.data;
                updata(dq)
            }
        })
    }
    window.onload = function () {
       $(".City-box").click(function () {
          let tianqi1 = $(this).html();
           $(".loaction").css({"display":"none"});
           $(".recent").css({"display":"block"});
           $(".notice").css({"display":"block"});
           let URL1= `https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`
           URL = URL1;
          Ajax()
       })
        let val;
        $("input").focus(function (e) {
            $(".section-right").css({"display":"none"});
            $(".section-res").css({"display":"block"});
           $("input").blur(function () {
               val=$("input").val();
               $(".section-res").click(function () {
                   let URL2= `https://www.toutiao.com/stream/widget/local_weather/data/?city=${val}`;
                   URL = URL2;
                   Ajax()
                   $(".loaction").css({"display":"none"});
                   $(".recent").css({"display":"block"});
                   $(".notice").css({"display":"block"});
                   $("input").val("");
               })
           })
        })
    }
})