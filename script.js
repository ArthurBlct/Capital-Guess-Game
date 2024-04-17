//une app de type geoguesser avec l'api leaflet js
// CartoDB.PositronNoLabels

// var map = L.map('map').setView([48.848296, 2.388217], 2);
var map = L.map('map').setView([48.855664, 2.348322], 2);

//calcul distance : formule d'Haversine

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.tileLayer.provider('CartoDB.PositronNoLabels').addTo(map);

// var marker = L.marker([38, -26]).addTo(map);
// var marker = L.marker([51.5, -0.09]).addTo(map);

function onMapClick(e) {
    // console.log(e.latlng);
    
    //remove the previous marker
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    console.log("Latitude : " +e.latlng.lat + "\nLongitude : " +e.latlng.lng);
}

map.on('click', onMapClick);

window.addEventListener('click' , function(){

    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(data[0].name.common);
        chooseCountry(data);
    })
    .catch(error => console.log(error));

    function chooseCountry(data){
        let random = Math.floor(Math.random() * 250);
        // console.log(random);
        // console.log(data[random].translations.fra.common, data[random].translations.fra.capital);

        console.log(data[random].name.common, data[random].capital +"\n" +data[random].capitalInfo.latlng);
        
        infos.innerHTML = "<h2 id='title-country'>" + data[random].name.common + "</h2>" + "<h2 id='title-capital'>" + data[random].capital + "</h2>";
    }

})

const infos = document.querySelector('#infos');
