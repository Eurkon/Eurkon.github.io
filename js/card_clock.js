function electric_clock_init(){fetch("https://wttr.in/"+returnCitySN.cip+'?format="%l+\\+%c+\\+%t+\\+%h"').then((c=>c.text())).then((c=>{var e=c.replace(/not found/g,"not found,not found").replace(/"/g,"").replace(/\+/g,"").replace(/,/g,"\\").replace(/ /g,"").replace(/°C/g,"");res_list=e.split("\\");var t=document.getElementById("electric_clock");style="<style>@font-face{font-family:'UnidreamLED';src:url('https://npm.elemecdn.com/eurkon-cdn/hexo/fonts/UnidreamLED.ttf');}#electric_clock{padding:20px}.card-clock{padding:0!important;}.card-background{height:150px;margin:15px;border-radius:8px;box-shadow:inset 3px 3px 18px 0 rgb(50 50 50 / 40%);z-index:2;}.clock-row{font-family:UnidreamLED;font-weight:400;display:flex;justify-content:space-between;flex-wrap:nowrap;white-space:nowrap;}.card-clock-time{flex:1;font-size:2rem;text-align:center;line-height:1.5;}</style>",clock_box_html=`\n        <div class="clock-row">\n          <span id="card-clock-clockdate" class="card-clock-clockdate"></span>\n          <span class="card-clock-weather">${res_list[2]}${res_list[3]} *C</span>\n          <span class="card-clock-humidity">💧 ${res_list[4]}</span>\n        </div>\n        <div class="clock-row">\n          <span id="card-clock-time" class="card-clock-time"></span>\n        </div>\n        <div class="clock-row">\n          <span class="card-clock-ip">${returnCitySN.cip}</span>\n          <span class="card-clock-location">${res_list[0]}</span>\n          <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>\n        </div>${style}`;var n=["SUN","MON","TUE","WED","THU","FRI","SAT"];function a(){var c,e=new Date,t=l(e.getHours(),2)+":"+l(e.getMinutes(),2)+":"+l(e.getSeconds(),2),a=l(e.getFullYear(),4)+"-"+l(e.getMonth()+1,2)+"-"+l(e.getDate(),2)+" "+n[e.getDay()],o=e.getHours();if(o>12?(o-=12,c=" PM"):c=" AM",document.getElementById("card-clock-time")){var r=document.getElementById("card-clock-time"),i=document.getElementById("card-clock-clockdate"),s=document.getElementById("card-clock-dackorlight");r.innerHTML=t,i.innerHTML=a,s.innerHTML=c}}function l(c,e){for(var t="",n=0;n<e;n++)t+="0";return(t+c).slice(-e)}document.getElementById("card-clock-loading").innerHTML="",t.innerHTML=clock_box_html;setInterval(a,1e3);a()})).catch((function(c){console.log(c)}))}electric_clock_init();