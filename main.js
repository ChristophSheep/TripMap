// -------------------------------------------------------------------------------------------------
// Module : main
// Author : Christoph Reif
// Date	  : 2017-03-09
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------------------------------------------

var ITEMTYPE = {
  FLIGHT   : 0, 
  LOCATION : 1 
};

// -------------------------------------------------------------------------------------------------
// MODEL
// -------------------------------------------------------------------------------------------------

var items;

// -------------------------------------------------------------------------------------------------
// METHODS
// -------------------------------------------------------------------------------------------------

//
// addItem 
//
function addItem(item) {
	items.push(item);	// update model	
	updateList(items);		// update view
}

//
// clearItems 
//
function clearItems() {
	items = [];			// clear model	
	updateList(items);		// update view
}

// -------------------------------------------------------------------------------------------------
// DEBUG
// -------------------------------------------------------------------------------------------------

var DEBUG = false;

function debugConsole(text) {
	var console = document.getElementById("console");
	console.innerHTML = console.innerHTML + text + "<br/>";
}

// -------------------------------------------------------------------------------------------------
// INIT
// -------------------------------------------------------------------------------------------------

//
// initAirportsDataList 
//
function initAirportsDataList() {

	var airportsDataList = document.getElementById('airports-list');
	
	var addOption = function(airport) {
		
		var option = document.createElement('option');
		
		option.value = airport.Name;
		airportsDataList.appendChild(option);
		
	};
		
	airports.forEach(addOption);
}

//
// init 
//
function init() {

	airports = parseAirports(airportsCsv);
		
	initAirportsDataList();
	
	initMap();
	
	var table = document.getElementById("table");
	
	table.addEventListener("resize", 
		function() {
			google.maps.event.trigger(map, 'resize');
		}
	);
	
	
	items = [];
}

// -------------------------------------------------------------------------------------------------
// COMMANDS 
// -------------------------------------------------------------------------------------------------

//
// addFlight 
//
function addFlight() {

	var airportNameFrom = document.getElementById("airportFromTextBox").value;
	var airportNameTo   = document.getElementById("airportToTextBox"  ).value;

	var airportFrom = getAirportByName(airportNameFrom, airports);
	var airportTo   = getAirportByName(airportNameTo,   airports);
	
	// DEBUG
	
	if (DEBUG) {
	
		debugConsole(JSON.stringify(airportFrom) + "<br/>");
		debugConsole(JSON.stringify(  airportTo) + "<br/>");
		
		var text = 
			"airportFrom Lat:" + airportFrom.latitude + "<br/>"+
			"airportTo   Lat:" +   airportTo.latitude + "<br/>";
		
		debugConsole(text);
	
	}
	
	// DEBUG
	
	if (airportFrom != undefined  
	&&  airportTo   != undefined) {
	
		var positionFrom = new google.maps.LatLng(airportFrom.latitude, airportFrom.longitude);
		var positionTo   = new google.maps.LatLng(airportTo.latitude,   airportTo.longitude  );
		
		var flightRoute = addFlightRoute(positionFrom, positionTo);
		
		map.setCenter(positionFrom);
		
		var item = {
			type  		: ITEMTYPE.FLIGHT,
			route 		: flightRoute,
			airportFrom : airportFrom,
			airportTo   : airportTo
		};
		
		addItem(item);
		
		debugConsole("Add flight from " + airportFrom.name + " to " + airportTo.name);
	}
	
}

//
// addLocation 
//
function addLocation() {
  
    var addressName = document.getElementById("positionAddress").value;
	
	var foo = {
		address: addressName
	};
	
    geocoder.geocode( 
		foo,
		function(results, status) {
      
			if (status == "OK") {
			
				var result = results[0];
			
				var position = result.geometry.location;

				var marker = addMarker(position);
				
				map.setCenter(position);
				
				var item = {
					type   	 : ITEMTYPE.LOCATION,
					marker 	 : marker,
					position : position,
					adress	 : result.formatted_address,
					result	 : result,
				};
				
				addItem(item);
				
				debugConsole("Add position for " + addressName);
				
			} else {
				debugConsole("Geocode was not successful for the following reason: " + status);
			}
		}
	);
}

// -------------------------------------------------------------------------------------------------
// MAIN
// -------------------------------------------------------------------------------------------------

function main() {
	init();
}