//var lat,lon;

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position) {
		//lat = position.coords.latitude; // get latitude
        //lon = position.coords.longitude; // get longitude
        console.log(position)
        wczytajPogode(position);

		// wczytajPogode(position.coords.latitude + ',' + position.coords.longitude);
	});
} else {
	alert("Twoja przegladarka nie wspiera funkcji lokalizacji HTML5");
};

//$(document).ready(function() {
//	setInterval(wczytajPogode, 10000);
//});


function wczytajPogode (lokacja) {
	$.simpleWeather ({
		location: location,
		// woeid: woeid,
		unit: 'c',
		success: function (pogoda) {
			miejscowosc = pogoda.city;
			temp = pogoda.temp+"&deg;";
			wcode = '<img class="weathericon" src="images/weathericons/'+pogoda.code+'.svg">';
			wiatr = pogoda.wind.speed +" "+ pogoda.units.speed;
			wilgotnoscPowietrza = pogoda.humidity +" %";
			day = pogoda.forecast[1].date,
			day2 = pogoda.forecast[2].date;

			$(".location").text(miejscowosc);
			$(".temperature").html(temp);
			$(".climate_bg").html(wcode);
			$(".windspeed").html(wiatr);
			$(".humidity").html(wilgotnoscPowietrza);

						    var headertable = ["Date", "Temp(max)", "Temp(min)", "Image"];

/*			    var dataArray = 
			    [[pogoda.forecast[1].date, pogoda.forecast[1].high+"&deg;", pogoda.forecast[1].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[1].image+">"], 
			    [pogoda.forecast[2].date, pogoda.forecast[2].high+"&deg;", pogoda.forecast[2].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[2].image+">"], 
			    [pogoda.forecast[3].date, pogoda.forecast[3].high+"&deg;", pogoda.forecast[3].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[3].image+">"],
			    [pogoda.forecast[4].date, pogoda.forecast[4].high+"&deg;", pogoda.forecast[4].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[4].image+">"],
			    [pogoda.forecast[5].date, pogoda.forecast[5].high+"&deg;", pogoda.forecast[5].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[5].image+">"],
			    [pogoda.forecast[6].date, pogoda.forecast[6].high+"&deg;", pogoda.forecast[6].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[6].image+">"],
			    [pogoda.forecast[7].date, pogoda.forecast[7].high+"&deg;", pogoda.forecast[7].low+"&deg;", "<img class='table-img' src="+pogoda.forecast[7].image+">"]
			    ];*/

			    var dataArray = 
			    [[pogoda.forecast[1].date, pogoda.forecast[1].high, pogoda.forecast[1].low, "<img class='table-img' src="+pogoda.forecast[1].image+">"], 
			    [pogoda.forecast[2].date, pogoda.forecast[2].high, pogoda.forecast[2].low, "<img class='table-img' src="+pogoda.forecast[2].image+">"], 
			    [pogoda.forecast[3].date, pogoda.forecast[3].high, pogoda.forecast[3].low, "<img class='table-img' src="+pogoda.forecast[3].image+">"],
			    [pogoda.forecast[4].date, pogoda.forecast[4].high, pogoda.forecast[4].low, "<img class='table-img' src="+pogoda.forecast[4].image+">"],
			    [pogoda.forecast[5].date, pogoda.forecast[5].high, pogoda.forecast[5].low, "<img class='table-img' src="+pogoda.forecast[5].image+">"],
			    [pogoda.forecast[6].date, pogoda.forecast[6].high, pogoda.forecast[6].low, "<img class='table-img' src="+pogoda.forecast[6].image+">"],
			    [pogoda.forecast[7].date, pogoda.forecast[7].high, pogoda.forecast[7].low, "<img class='table-img' src="+pogoda.forecast[7].image+">"]
			    ];

			function addTable () {
			    var table = document.createElement("TABLE");
			    table.style.width = "600px";
			 
			    var columnCount = 4;


			 
			    var row = table.insertRow(-1);
			    for (var i = 0; i < columnCount; i++) {
			        var headerCell = document.createElement("TH");
			        headerCell.innerHTML = headertable[i];
			        row.appendChild(headerCell);
			    }
			 
			    for (var i = 0; i < 7; i++) {
			        row = table.insertRow(-1);
			        for (var j = 0; j < columnCount; j++) {
			            var cell = row.insertCell(-1);
			            cell.innerHTML = dataArray[i][j];
			        }
			    }
			 			$(".genTable").html(table);
			}

			  addTable();

			function addChart () {
				console.log(dataArray[0][0]);
				console.log(dataArray[0][2]);
				console.log(dataArray[2][2]);
		    $('#chart').highcharts({
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
		            categories: [dataArray[0][0], dataArray[1][0], dataArray[2][0], dataArray[3][0], dataArray[4][0], dataArray[5][0], dataArray[6][0]]
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
		                enableMouseTracking: false
		            }
		        },
		        series: [{
		            name: 'Temp(max)',
		            data: [parseFloat(dataArray[0][1]), parseFloat(dataArray[1][1]), parseFloat(dataArray[2][1]), parseFloat(dataArray[3][1]), parseFloat(dataArray[4][1]), parseFloat(dataArray[5][1]), parseFloat(dataArray[6][1])]
		        },

		         {
		            name: 'Temp(min)',
		            data: [parseFloat(dataArray[0][2]), parseFloat(dataArray[1][2]), parseFloat(dataArray[2][2]), parseFloat(dataArray[3][2]), parseFloat(dataArray[4][2]), parseFloat(dataArray[5][2]), parseFloat(dataArray[6][2])]
		        }]
		    });
			}  addChart();
		},
		error: function(error) {
			$(".error").html('<p>'+error+'</p>')
		}
	});
}