if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        wczytajPogode(position.coords.latitude+','+position.coords.longitude);
        addMap(position);
    });
} else {
    alert("Twoja przegladarka nie wspiera funkcji lokalizacji HTML5");
};

function wczytajPogode (lokacja) {
    $.simpleWeather ({
        location: lokacja,
        unit: 'c',
        success: function (pogoda) {
            //dostęp do danych o pogodzie
            addInfo(pogoda);
            //przekazanie prognozy
            addTable(pogoda.forecast);
            addChart(pogoda.forecast);

        },
        error: function(error) {
            $(".error").html('<p>'+error+'</p>')
        }
    });
}

function addMap (position) {
    var szer  = position.coords.latitude;
    var dlug = position.coords.longitude;

    mapa.innerHTML = '<p>Szerokość geograficzna: ' + szer + '° <br>Długość geograficzna: ' + dlug + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + szer + "," + dlug + "&zoom=13&size=600x300&sensor=false";

    mapa.appendChild(img);

}

function addInfo (pogoda) {
    var miejscowosc = pogoda.city;
    var temp = pogoda.temp+"&deg;";
    var wcode = '<img class="ikona-pogoda" src="images/weathericons/'+pogoda.code+'.svg">';
    var wiatr = pogoda.wind.speed +" "+ pogoda.units.speed;
    var wilgotnoscPowietrza = pogoda.humidity +" %";
 
    $(".lokacja").text(miejscowosc);
    $(".temperatura").html(temp);
    $(".img-pogoda").html(wcode);
    $(".predkosc-wiatru").html(wiatr);
    $(".wilgotnosc").html(wilgotnoscPowietrza);
}

function addTable (prognozy) {
    var table = document.createElement("TABLE");
    var naglowki = ["Date", "Temp(max)", "Temp(min)", "Image"];        
    var row = table.insertRow(-1);

    table.style.width = "600px";  
 
    for (naglowek of naglowki) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = naglowek;
        row.appendChild(headerCell);
    }
 
    for (prognoza of prognozy) {
        row = table.insertRow(-1);
        var data = row.insertCell(0);
        data.innerHTML = prognoza.date;
        var wysokaTemp = row.insertCell(1);
        wysokaTemp.innerHTML = prognoza.high +"&deg";
        var niskaTemp = row.insertCell(2);
        niskaTemp.innerHTML = prognoza.low +"&deg";
        var obrazek = row.insertCell(3);
        obrazek.innerHTML = "<img class='table-img' src=" + prognoza.image + ">";
    }
    $(".tabela").html(table);
}

function addChart (prognozy) {
    var kategorie = [];
    var wysokieTemp = [];
    var niskieTemp = [];
    for (prognoza of prognozy) {
        kategorie.push(prognoza.date) ;
        wysokieTemp.push(parseFloat(prognoza.high));
        niskieTemp.push(parseFloat(prognoza.low));
    }
 
    $('#wykres').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Weekly temperature amplitude'
        },
        subtitle: {
            text: 'Source: simplewatherjs.com'
        },
        xAxis: {
            categories: kategorie
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Temp(max)',
            data: wysokieTemp
        },
 
         {
            name: 'Temp(min)',
            data: niskieTemp
        }]
    });
}