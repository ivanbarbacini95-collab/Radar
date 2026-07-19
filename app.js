// ===============================
// LIVE WEATHER RADAR
// script.js
// ===============================


// MAPPA

let map = L.map("map").setView(
    [45.4642, 9.1900], // Milano iniziale
    7
);


// Base map

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
    }
).addTo(map);



// RADAR PRECIPITAZIONI

let radarLayer = L.tileLayer(
    "https://tilecache.rainviewer.com/v2/radar/nowcast_0/256/{z}/{x}/{y}/2/1_1.png",
    {
        opacity: 0.55
    }
);


radarLayer.addTo(map);



// MARKER POSIZIONE

let marker;



// GPS

document
.getElementById("locate")
.addEventListener("click", () => {


    if (!navigator.geolocation){

        alert("GPS non supportato");

        return;

    }


    navigator.geolocation.getCurrentPosition(

        position => {


            let lat =
                position.coords.latitude;


            let lon =
                position.coords.longitude;



            map.setView(
                [lat,lon],
                10
            );


            if(marker){
                map.removeLayer(marker);
            }


            marker =
            L.marker([lat,lon])
            .addTo(map)
            .bindPopup(
                "📍 La tua posizione"
            )
            .openPopup();



            getWeather(lat,lon);


        },


        error => {

            alert(
              "Impossibile ottenere posizione"
            );

        }

    );


});




// DATI METEO DEMO
// Qui puoi collegare OpenWeather API

function getWeather(lat,lon){


    document.getElementById("location")
    .innerHTML =
    "Posizione GPS attiva";


    // valori esempio

    document.getElementById("temperature")
    .innerHTML =
    "18 °C";


    document.getElementById("condition")
    .innerHTML =
    "Nuvoloso";


    document.getElementById("wind")
    .innerHTML =
    "22 km/h";


    document.getElementById("pressure")
    .innerHTML =
    "1018 hPa";


}



// ANIMAZIONE RADAR

let radarPlaying=false;


document
.getElementById("playRadar")
.addEventListener(
"click",
()=>{


radarPlaying=!radarPlaying;


if(radarPlaying){

    document
    .getElementById("playRadar")
    .innerHTML="⏸ Stop";


    radarLayer.setOpacity(0.8);


}
else{


    document
    .getElementById("playRadar")
    .innerHTML="▶ Radar";


    radarLayer.setOpacity(0.55);


}


});



// AUTO AGGIORNAMENTO RADAR

setInterval(()=>{


    radarLayer.setUrl(
    "https://tilecache.rainviewer.com/v2/radar/nowcast_0/256/{z}/{x}/{y}/2/1_1.png?"+
    Date.now()
    );


}, 300000); // ogni 5 minuti
