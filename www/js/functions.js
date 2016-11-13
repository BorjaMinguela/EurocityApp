function seleccionDestino(ciudad){
	if (typeof(Storage) == "undefined") alert("storage undefined");
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
function takePhoto(){
	var fileFolder=appConstants.localPermanentStorageFolderImg();
	var fileName="fotoPerfil.jpg";
	photo.takeAsync(
			fileFolder,
			fileName,
			function(){
				var rutaPerfil=photo.fileFolder+photo.fileName;
				localStorage.setItem("fotoPerfil",rutaPerfil);
				//$("#fotoPerfil").attr("src","file://"+localStorage.getItem("fotoPerfil"));//+"?"+(new Date()).getTime());
				alert("Photo in: "+localStorage.getItem("fotoPerfil"));
				location.reload();
			}
			);
}

function login(){
	//Login TBD	
//	var pageDiv=page.create(1);
//	alert(pageDiv);
//	document.body.innerHTML=pageDiv;
	//$("body").append(pageDiv);
	//$("body").enhanceWithin();
	var loginVal=$("#login").val();
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
function turism(){
	document.getElementById("turismo").innerHTML=turismo.create();
}