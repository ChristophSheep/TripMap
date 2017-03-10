// -------------------------------------------------------------------------------------------------
// Module : List (View)
// Author : Christoph Reif
// Date	  : 2017-03-09
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// METHODS
// -------------------------------------------------------------------------------------------------

//
// addList 
//
function addList(list, text) {
	list.innerHTML = list.innerHTML + text + "<br/>";
}

//
// clearList 
//
function clearList(list){
	list.innerHTML = "";
}

//
// writeFlight 
//
function writeFlight(list, item) {
	
	/*
	var obj = {
			type  		: ITEMTYPE.FLIGHT,
			route 		: flightRoute,
			airportFrom : airportFrom,
			airportTo   : airportTo
	};
	*/
	
	var imgSrcPlane  = "https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-16.png"
	var imgSrcDelete = "https://cdn3.iconfinder.com/data/icons/basic-interface/100/delete-16.png";
	
	var imgPl = "<img src='" + imgSrcPlane + "'>";
	var imgDe = "<img src='" + imgSrcDelete + "' onclick='removeItemById("+item.id+")'>";
	
	var text = imgPl + imgDe + " From: " + item.airportFrom.name + " To: " + item.airportTo.name;
	addList(list, text);
}

//
// writeLocation 
//
function writeLocation(list, item) {
	
	/*
	var obj = {
		type   	 : ITEMTYPE.LOCATION,
		marker 	 : marker,
		position : position
	};
	*/
	
	var imgSrcPushpin = "https://cdn4.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/pin_map_down.png";
	var imgSrcDelete  = "https://cdn3.iconfinder.com/data/icons/basic-interface/100/delete-16.png";
	
	var imgPp = "<img src='" + imgSrcPushpin + "'>";
	var imgDe = "<img src='" + imgSrcDelete + "' onclick='removeItemById("+item.id+")'>";
	
	var text = imgPp + imgDe + " Location: " + item.adress;
	addList(list, text);			
}

//
// writeItem 
//
function writeItem(list, item) {
	
	switch(item.type) {
		case ITEM_TYPE.FLIGHT:
			writeFlight(list, item);
		break;
		
		case ITEM_TYPE.LOCATION:
			writeLocation(list, item);
		break;
	}
}

//
// writeItems 
//
function writeItems(list, items) {
	items.forEach(
		function(item) {
			writeItem(list, item);
		}
	);
}

// -------------------------------------------------------------------------------------------------
// COMMANDS 
// -------------------------------------------------------------------------------------------------

//
// updateList 
//
function updateList(items) {

	var list = document.getElementById("list");
	clearList(list);
	writeItems(list, items);
}


