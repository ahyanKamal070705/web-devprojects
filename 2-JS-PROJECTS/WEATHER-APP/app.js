const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

const  userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-search-form]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer =document.querySelector(".user-info-container");
 


const API_KEY = "06ab4ad0855794ca00a01cdc57d07e2c";
let currentTab = userTab;

currentTab.classList.add("current-tab");
getSesstionStorage();
 



userTab.addEventListener('click', ()=>{
  switchTab(userTab);
})

searchTab.addEventListener('click', ()=>{
  switchTab(searchTab);
})

function switchTab(recentTab){
   if(recentTab==currentTab){
    // here no switch will happen
     
    // do nothing here just for my understanding

   }else{
    //the tab will switch here
       currentTab.classList.remove("current-tab")
       recentTab.classList.add("current-tab"); 
       currentTab = recentTab;
      
      if(searchForm.classList.contains("active")==false){
      
        //kya search form wala container is invisible make it visible then
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");

      }else{
        //ab main your weather tab mein aagaya hun , to weather display krna parega
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        
        //your weather wala apne aap aayega qki local storage mein save hai 
        getSesstionStorage();  //line 65 pe depend karega ki grant access wala container show karana hai ki nahi
  
      }

     
        
   }
}


// check if co-ordinates are already stored in session storage

function getSesstionStorage(){
  // if store then lakr do....
  const localCoordinates = sessionStorage.getItem('user-coordinates'); // string form mein retreive hoga line 167 se aara haii

  if(localCoordinates==false){
    // agr nahi hai toh grant access wala container dikhao and co-ordinates lo.
    grantAccessContainer.classList.add("active");
  }else{
   
    // agr cordinates exist krta hai tb co-ordinates ke aadhar pr api call karo

    const exist = JSON.parse(localCoordinates); // convert json string to object
    console.log(exist);
    fetchUserWeatherInfo(exist);
   
  }
}
//api call hoga yaha time lagega 

// us  dauran loader wala gif render karo
async function fetchUserWeatherInfo(exist){
 
  // object  destructuring  const lat =  exist.lat or const long = exist.long
   const {lat,lon} = exist;
   console.log(lat);
   console.log(lon);
   //co-ordinates exist remove grant location container
   grantAccessContainer.classList.remove("active");

   //make loader visible 
   loadingScreen.classList.add("active");

   //API CALL
    try {
        
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

      const data = await response.json()

      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
       renderWeatherInfo(data);

    } catch (error) {
      console.log( error);
    }
}


// after api call user-info container active kr die ab dynamically usme data add krna hoga

function renderWeatherInfo(data){

//fetching the elements

const cityName = document.querySelector('[data-city-name]');
const icon = document.querySelector('[data-countryIcon]');
const desc = document.querySelector('[data-weatherDesc]');
const weatherIcon = document.querySelector('[data-weatherIcon]')
const  datatemp = document.querySelector('[data-temp]');
const  datawindspeed = document.querySelector('[ data-windspeed]');
const datahumidity = document.querySelector('[data-humidity]');
const  datacloud = document.querySelector('[data-cloud]');

// now assigning the values

cityName.textContent =data?.name; // data.name ---> i know  data?.name ---> ? is chain operator wahi andar jakr value layega but only . will return error if value not present here ? will return null or undefined

icon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`

// data ke andar weather ke andar--> which is an array so first element of the array then description
desc.textContent = data?.weather?.[0]?.description;

weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    datatemp.innerText = data?.main?.temp;
    datawindspeed.innerText = data?.wind?.speed;
    datahumidity.innerText = data?.main?.humidity;
    datacloud.innerText = data?.clouds?.all;





}


// a listener added on grant access container

const grantAcessButton = document.querySelector("[data-grantAcess]");

grantAcessButton.addEventListener('click',getLocation());

function getLocation(){
 if(navigator.geolocation) {
   
  navigator.geolocation.getCurrentPosition(
    function (position) {
        const latA = position.coords.latitude;
        const lonA = position.coords.longitude;

        // Save coordinates to session storage
        const coordinates = {
            lat: latA,
            lon: lonA
        };
        console.log(coordinates);
        sessionStorage.setItem('user-coordinates', JSON.stringify(coordinates));
        // fetchUserWeatherInfo(coordinates);
         getSesstionStorage();
        
      });



 }else{
  alert('not supported');
 }
}


//  search weather wala part where we will add city name in input field 
// and the ui will get render

const searchInputField = document.querySelector("[data-searchInput]");

searchForm.addEventListener('submit',(e)=>{
 
  e.preventDefault();
  let Cityname = searchInputField.value;



  if(Cityname===""){
    return;
  }else{
     showWeather(Cityname);
  }
 

})


async function showWeather(Cityname) {

  //we are in searchform wala dabba so we have to renmove all previous things
   loadingScreen.classList.add('active');
   userInfoContainer.classList.remove("active");
   grantAccessContainer.classList.remove("active");
  
    try {

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${Cityname}&appid=${API_KEY}`
        );
      
        const data = await response.json();
         
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    } catch (error) {
         console.log(error);
    }
     


}
 

















































 


 

// showWeather();
