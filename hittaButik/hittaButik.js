let coop = [
  [
    "Coop Haga Sundsvall",
    "Riddargatan 14, 856 45 Sundsvall",
    ["07-23", "07-23", "07-23", "07-23", "07-23", "07-23", "07-23"]
  ],
  [
    "Coop Nacksta",
    "Bultgatan 11, 853 50 Sundsvall",
    ["07-22", "07-22", "07-22", "07-22", "07-22", "07-22", "07-22"]
  ],
  [
    "Coop Granlo",
    "Vikingavägen 19, 857 41 Sundsvall",
    ["07-22", "07-22", "07-22", "07-22", "07-22", "08-21", "08-21"]
  ],
  [
    "Stora Coop Sundsvall",
    "Gesällvägen 5, 857 53 Sundsvall",
    ["08-22", "08-22", "08-22", "08-22", "08-22", "08-22", "08-22"]
  ],
  [
    "Coop Bergsåker",
    "Betselvägen 12, 857 50 Sundsvall",
    ["07-22", "07-22", "07-22", "07-22", "07-22", "08-22", "08-22"]
  ],
  [
    "Coop Timrå",
    "Köpmangatan 29, 861 32 Timrå",
    ["07-21", "07-21", "07-21", "07-21", "07-21", "09-21", "09-21"]
  ]
];

var willys = [
  "Ortviksvägen 8, 856 33 Sundsvall",
  "Norra Förmansvägen 17, 857 53 Sundsvall",
  "Köpmangatan 37, 861 31 Timrå"
];

var lidl = [
  "Kolvägen 14, 852 29 Sundsvall",
  "Frölandsvägen 2, 861 35 Timrå"
];

var d = new Date();
var day = d.getDay() - 1;

function initMap() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let la = Math.floor(position.coords.latitude * 1000) / 1000;
      let lo = Math.floor(position.coords.longitude * 1000) / 1000;
      let location = {lat: la, lng: lo};
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: location
      });
      let marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        }
      });
      for(let i = 0; i < coop.length; i++) {
        makeMarker(map, i);
      }
    });
  }
}

function makeMarker(mapc, num) {
  let adr = coop[num][1];
  let spl = adr.split(" ");
  let jn = spl.join("+");
  let url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDPYy4LUH4IFaUH5lrPL_7lWrj6AdIlNXU&address=" + jn;
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function() {
    let data = JSON.parse(this.response);
    let newMarker = new google.maps.Marker({
      position: {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      },
      map: mapc,
    });
    newMarker.addListener("click", function() {
      let ids = ["#hid1", "#butiksnamn", "#oppet", "#btn1", "#btn2", "#btn3", "#btn4", "#hid3"];
      for (e of ids) {
        document.querySelector(e).style.display = "block";
      }
      document.querySelector(ids[1]).textContent = coop[num][0];
      document.querySelector(ids[2]).textContent = coop[num][2][day];
    });
  };
  request.send();
}

function hideTable() {
  let ids = ["#hid1", "#butiksnamn", "#oppet", "#btn1", "#btn2", "#btn3", "#btn4", "#hid3"];
  for (e of ids) {
    document.querySelector(e).style.display = "none";
  }
  document.querySelector(ids[1]).textContent = "";
  document.querySelector(ids[2]).textContent = "";
}
