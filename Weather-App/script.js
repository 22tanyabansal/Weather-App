const searchbar = document.querySelector(".search-bar");
const section = document.querySelector(".section");
const infoTxt = document.querySelector(".info-txt");
const searchcity = document.querySelector(".search-city");
const searchbutton = document.querySelector(".search button");
const locationbtn = searchbar.querySelector(".Location");
const weatherpart = document.querySelector(".weather");
let weather_data;
weather_data ={
    "apikey": "9b7a69c1c7b15091953c22857d23bfe1",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            +city
            +"&units=metric&appid=" 
            +this.apikey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
},

    displayWeather: function(data) {
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp,humidity,pressure} = data.main;
        const {visibility} = data;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,pressure,visibility,speed);
        document.querySelector(".city").innerText = name +" Weather";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " +humidity+"%";
        document.querySelector(".Wind").innerText = "Wind Speed: " +speed+ "Km/h";
        document.querySelector(".visibility").innerText = "Visibility: " +visibility+ "Km";
        document.querySelector(".Air-pressure").innerText = "Air pressure: " +pressure+ "hPa";
},

    displayCityWeather: function(){
        this.fetchWeather(searchcity.value);
    },
};

searchbutton.addEventListener("click",function(){
    weather_data.displayCityWeather();
    document.getElementById("loc").style.display="none";
    document.getElementById("searching").style.display="none";
    document.getElementById("line").style.display="none";
    
});

searchcity.addEventListener("keyup",e=>{
    if(e.key == "Enter" && searchcity.value != ""){
        weather_data.displayCityWeather();
        document.getElementById("loc").style.display="none";
        document.getElementById("searching").style.display="none";
        document.getElementById("line").style.display="none";
        
    }
});


locationbtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
    document.getElementById("loc").style.display="none";
    document.getElementById("searching").style.display="none";
    document.getElementById("line").style.display="none";
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+weather_data.apikey;
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
    
function fetchData(){
    fetch(api).then(res => res.json()).then(data => weather_data.displayWeather(data)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("error");
    });
}
