window.dataLayer = window.dataLayer || [];
if(!!getCookie('55ID') && getCookie('55ID') != ''){
	window.dataLayer.push({'user_id': getCookie('55ID')});
}
window.dataLayer.push({'event':'page_view', 'page_path':document.location.pathname,	"currency": "USD", "analytics_cookies_allowed":true});

var usersList =[
	{"id": 1055,"login": "Factory","password": "Factory@55!"},
	{"id": 2055,"login": "Bac","password": "Bac@55!"},
	{"id": 3055,"login": "toto","password": "toto"},
	{"id": 5555,"login": "Nifties","password": "fiftyfive55"}
];

var travelDestinations =[
	{"id": "city001","name":"Switzerland","category": "city","price":799, 'img':'switzerland', 'video':'https://www.youtube.com/embed/jDNbTU1O-oM'},
	{"id": "city002","name":"Sevilla","category": "city","price":799,'img':'sevilla','video':'https://www.youtube.com/embed/LnV7IkZU-OY'},
	{"id": "city003","name":"Providence","category": "city","price":799,'img':'prov', 'video':'https://www.youtube.com/embed/_mXvFKLsacs'},
	{"id": "city004","name":"San Francisco","category": "city","price":799,'img':'sf','video':'https://www.youtube.com/embed/OO1NYarwqa0'},
	{"id": "city005","name":"Paris","category": "city","price":999,'img':'paris','video':'https://www.youtube.com/embed/AQ6GmpMu5L8'},
	{"id": "isl001","name":"Lanzarote","category": "island","price":799,'img':'lanzarote', 'video':'https://www.youtube.com/embed/AX8uI7seMW0'},
	{"id": "isl002","name":"Mallorca","category": "island","price":799,'img':'mallorca','video':'https://www.youtube.com/embed/9R38Xx5Va1Q'},
	{"id": "isl003","name":"Puerto Rico","category": "island","price":799,'img':'pr','video':'https://www.youtube.com/embed/MtC34MJfYQI'},
	{"id": "isl004","name":"Fuerteventura","category": "island","price":799,'img':'fuerte', 'video':'https://www.youtube.com/embed/4QJ4ALxD978'},
	{"id": "isl005","name":"Reunion","category": "island","price":1200,'img':'run','video':'https://www.youtube.com/embed/g0mwkiXIaBo'}
];

function getCookie(key) {
	var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
	return keyValue ? keyValue[2] : null;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculate(rowPrice){
	var checkoutPrice = 0;
	rowPrice.each(function(){
		checkoutPrice +=parseInt($(this).text().replace('$',''));
	});
	return checkoutPrice;
}



if(/details\.html/.test(window.location.pathname)){
	
	var hash = window.location.hash.substr(1);
	
	var previousPage = document.referrer;
	
	var listName = 'all';
	
	if(/islands-in-the-sun/.test(previousPage)){
		listName = 'islands';
	} else if(/paradise-cities/.test(previousPage)){
		listName = 'cities';
	}
	
	for(var i = 0; i<travelDestinations.length; i++){
		if(travelDestinations[i]['name'].replace(' ', '').toLowerCase() == hash){
			var travelDestination = travelDestinations[i];
		}
	}
	
	window.dataLayer.push({
		'event': 'view_item',
		'ecommerce':{
			'items': [{
				"item_list_name":listName,
				"item_id": travelDestination.id,
				"item_category": travelDestination.category,
				"price": travelDestination.price,
				"item_name": travelDestination.name,
				"item_variant": "6 nights"
			}]
		}
	});
}


if(/checkout\.html/.test(window.location.pathname)){
	
	var cart55 = getCookie('55Basket') ? JSON.parse(getCookie('55Basket')) : [];
	var products=[];
	if(JSON.parse(getCookie('55Basket')) || cart55.length <1){

		cart55.forEach(function(travel){
			products.push({
					"item_id":travel.id,
					"item_category":travel.category,
					"price": travel.price,
					"item_name": travel.name,
					"quantity": travel.quantity,
					"item_variant":"6 nights"
			});
		});
		window.dataLayer.push({'ecommerce':null});
		window.dataLayer.push({
			'event': 'begin_checkout',
			'ecommerce': {
				'items': products
			}
		});

	}
	
}

if(/thankyou\.html/.test(window.location.pathname)){
	
	var order55 = JSON.parse(getCookie('order55')) || [];
	
	if(!getCookie('55Basket')){
		window.location.replace("destinations.html");
	} 

	var randomNum =  'fak55-' + Math.random().toString(36).substr(2, 16);
	var orderDetails = JSON.parse(getCookie('55Basket')) || '';
		
	var orderDate = new Date();

	document.cookie = "55Basket=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";

	order55.push({
		orderRef:randomNum,
		orderDate:orderDate,
	});
		
	document.cookie = 'order55=' + JSON.stringify(order55)+ ';path=/';
	var products=[];
	orderDetails.forEach(function(travel){
		products.push({
			"item_id":travel.id,
			"item_category":travel.category,
			"price": travel.price.toString(),
			"item_name": travel.name,
			"quantity": travel.quantity,
			"item_variant":"6 nights"
		});
	});
	window.dataLayer.push({'ecommerce':null});
	window.dataLayer.push({
		'event':'purchase',
		'ecommerce':{
			'currency':'USD',
			"transaction_id": order55[order55.length -1].orderRef,
			"shipping": 0,
			"value": 1000,
			"tax": 0,
			'items': products
		}

	});
}