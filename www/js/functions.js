function seleccionDestino(ciudad){
	if (ciudad=="lisboa"){
		localStorage.setItem("destino.color", "lightgreen");
		localStorage.setItem("destino.name", "lisboa");
	}
	else if (ciudad=="londres"){
		localStorage.setItem("destino.color", "orange");
		localStorage.setItem("destino.name", "londres");
	}
	else if (ciudad=="paris"){
		localStorage.setItem("destino.color", "yellow");
		localStorage.setItem("destino.name", "paris");
	}
	else if (ciudad=="roma"){
		localStorage.setItem("destino.color", "lightblue");
		localStorage.setItem("destino.name", "roma");
	}
}
function cambiarColor() {
    elements = document.getElementsByClassName("destiny");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor=destino.color;
    }
}



function login(){
	//Login TBD	
//	var pageDiv=page.create(1);
//	alert(pageDiv);
//	document.body.innerHTML=pageDiv;
	//$("body").append(pageDiv);
	//$("body").enhanceWithin();
	var loginVal=$("#login").val();
	alert(loginVal);
	localStorage.setItem("user.name",loginVal);
}


function cabecera(){
	var div = document.getElementById('content');

	div.innerHTML = contenido;
}
function miperfil(){
	document.getElementById("miperfil").innerHTML=miPerfil.create();
}
function viajeppal(){
	document.getElementById("ppal").innerHTML=ppal.create();
}
function ubi(){
	document.getElementById("ubicacion").innerHTML=ubicacion.create();
}