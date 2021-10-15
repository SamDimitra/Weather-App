$(document).ready(()=>{
    
    $('#searchform').on('submit',(e)=>{
       let inputVal=$('#inputValue').val();
       getWeather(inputVal);
        e.preventDefault();

    });

    displayDate();
    

    

});

function displayDate(){
    
    var d=new Date();
    var minutes=d.getMinutes().toString.length==1?'0'+d.getMinutes():d.getMinutes();
    var hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours();
    var ampm = d.getHours() >= 12 ? 'pm' : 'am';
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var today=days[d.getDay()]+'&nbsp'+d.getDate()+'&nbsp '+months[d.getMonth()]+'&nbsp '+d.getFullYear()+''+'<br>'+hours+':'+minutes+ampm;
    document.getElementById('displayDate').innerHTML=today;

}


//convert time for sunset and sunrise
function convertTime(timestamp){
    var d=new Date(timestamp*1000);
    var hour=d.getHours();
    var min=d.getMinutes();
    var sec=d.getSeconds();
    var time=hour+':'+min+':'+sec;

    return time;
}

function getWeather(inputVal){
    axios.get('https://api.openweathermap.org/data/2.5/weather?q='+inputVal+'&appid=058dee70286cb339221cb0a7ccc05c00&units=metric')
    .then((response)=>{
        console.log(response);
        let weatherdata=response.data;
        
        console.log(weatherdata);
        
        
        document.getElementById("city").innerHTML=weatherdata.name;
        document.getElementById("temp").innerHTML=weatherdata.main.temp + "°C";
        document.getElementById("description").innerHTML=weatherdata.weather[0].description;
        document.getElementById("icon").src="https://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + ".png";
        document.getElementById("humidity").innerHTML="Humidity: "+ weatherdata.main.humidity+" %";
        document.getElementById("wind").innerHTML="Wind speed: "+weatherdata.wind.speed+" km/h";
        document.getElementById("sunrise").innerHTML="Sunrise: "+convertTime(weatherdata.sys.sunrise);
        document.getElementById("sunset").innerHTML="Sunset: "+convertTime(weatherdata.sys.sunset);

       
        
        })
        
    .catch((err)=>{
        console.log(err);
        });
}



        



