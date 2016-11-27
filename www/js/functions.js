function seleccionDestino(ciudad){
	if (ciudad=="lisboa"){
		localStorage.setItem("destino.color", "lightgreen");
		localStorage.setItem("destino.name", "Lisboa");
	}
	else if (ciudad=="londres"){
		localStorage.setItem("destino.color", "orange");
		localStorage.setItem("destino.name", "Londres");
	}
	else if (ciudad=="paris"){
		localStorage.setItem("destino.color", "yellow");
		localStorage.setItem("destino.name", "Paris");
	}
	else if (ciudad=="roma"){
		localStorage.setItem("destino.color", "lightblue");
		localStorage.setItem("destino.name", "Roma");
	}
}
function takePhoto(){
	var fileFolder=appConstants.localPermanentStorageFolderImg();
	var fileName="fotoPerfil"+localStorage.getItem("user.name")+".jpg";
	photo.takeAsync(
			fileFolder,
			fileName,
			function(){
				var rutaPerfil=photo.fileFolder+photo.fileName;
				localStorage.setItem("fotoPerfil"+localStorage.getItem("user.name"),rutaPerfil);
				//$("#fotoPerfil").attr("src","file://"+localStorage.getItem("fotoPerfil"));//+"?"+(new Date()).getTime());
				//alert("Photo in: "+localStorage.getItem("fotoPerfil"));
				location.reload();
			}
			);
}

function takePhotoViaje(){
	var fileFolder=appConstants.localPermanentStorageFolderImg();
	var fileName="fotoviaje";
	photo.takeAsync(
			fileFolder,
			fileName,
			function(){
				var rutaFoto=photo.fileFolder+photo.fileName;
				fotoJSON.path=rutaFoto;
				fotoJSON.lugar=localStorage.getItem("destino.name");
				fotoJSON.user=localStorage.getItem("user.name");
				$.ajax({
					type: 'post',
					contentType: 'application/json',
					url: appConstants.addFotoURL(),
					success: function(data){
							alert(data);			
					},
					data: JSON.stringify(fotoJSON)			
				});
			}
			);
}

function login(){
	var loginVal=$("#login").val().trim();//Para quitar espacios extra, que daba error
	if(loginVal!=null&&loginVal!=""){
		if (loginVal=="offline"){//modo offline para cuando no este el servidor
			alert("Modo offline");
			localStorage.setItem("user.name",loginVal);
			return true;
		}
		$.ajax({
			async: false,//peticion asincrona
			dataType: "json",
			url: appConstants.requestUserURL()+"?userName="+loginVal,
			success: function(data){
				if(data.nombre==loginVal){
					localStorage.setItem("user.name",loginVal);
				}
				else{
					alert("No existe el usuario con nombre "+loginVal);
					loginVal="";
				}
			},
			error: function(){
				alert("NO RESPONSE FROM SERVER");
				loginVal="";
			}			
		})
		if (loginVal=="") return false;
		
		}
	else{
		alert("Introduzca un nombre válido");
		return false;
	}
}
function addUser(){
	var loginVal=$("#login").val().trim();
	if((loginVal!=null&&loginVal!="")){
		usuarioJSON.nombre=loginVal;
		$.getJSON(appConstants.requestUserURL()+"?userName="+loginVal,//Consultar en el Servidor si existe el usuario
				function(data,status) {//Función callback
					if(status=="success"){//Si la HTTP-RESPONSE es OK
						if (data.nombre==loginVal){
							alert("Nombre: "+data.nombre+" existe.")
							
						}
						else{
							alert("No existe ese nombre, añadiendo nuevo usuario")
							usuarioJSON.nombre=loginVal;
							$.ajax({//rest por post de json
								type: 'post',
								contentType: 'application/json',
								url: appConstants.addUserURL(),
								success: function(data){
									if(status=="success"){
										alert(data);
										
									}
									else{
										alert("No response from server");
									}
								},
								data: JSON.stringify(usuarioJSON)								
							});
						}
					}
					else {
						alert("NO RESPONSE FROM SERVER");
					}
				}
			);		
	}	
}

function borrar(){
	var proceed=false;
	proceed=confirm("¿Estás seguro que quieres borrar tu cuenta? Este cambio es irreversible")
	if (proceed==true){
		$.getJSON(appConstants.deleteUserURL()+"?userName="+localStorage.getItem("user.name"),
				function(data,status) {//Función callback
					if(status=="success"){//Si la HTTP-RESPONSE es OK
						alert(data)
					}
					else {
						alert("NO RESPONSE FROM SERVER");
					}
				}
			);
	}
	return proceed;
}

function verValoraciones(){
	$.getJSON(appConstants.requestValoracionesURL()+"?userName="+localStorage.getItem("user.name"),
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					valoracionesJSON.valoracion=data.valoracion;
					var alertContent="";
					for(i=0;i<valoracionesJSON.valoracion.length;i++){
						alertContent+="Destino: "+valoracionesJSON.valoracion[i].lugar+" Nota: "+valoracionesJSON.valoracion[i].nota+"\n";						
					}
					if (alertContent!=""){
						alert(alertContent);
					}
					else alert("Aún no se han registrado valoraciones");
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
}

function addValoracion(){
	var puntuacion = document.getElementById("puntos");
	valoracionJSON.nota=puntuacion.value;
	valoracionJSON.user=localStorage.getItem("user.name");
	valoracionJSON.lugar=localStorage.getItem("destino.name");
	$.ajax({
		type: 'post',
		contentType: 'application/json',
		url: appConstants.addValoracionURL(),
		success: function(data){
				alert(data);			
		},
		data: JSON.stringify(valoracionJSON)			
	});
}

function addComentario(categoria){
	var coment = document.getElementById("coment").value.trim();
	if((coment!=null&&coment!="")){
		comentarioJSON.comentario=coment;
		comentarioJSON.categoria=categoria;
		comentarioJSON.user=localStorage.getItem("user.name");
		comentarioJSON.lugar=localStorage.getItem("destino.name");
		$.ajax({
			type: 'post',
			contentType: 'application/json',
			url: appConstants.addComentarioURL(),
			success: function(data){
					alert(data);
					if (categoria=='interes'){
						lugares();
					}
					else if (categoria=='gastronomia'){
						gastro();
					}
			},
			data: JSON.stringify(comentarioJSON)			
		});
	}
	else alert("No se permiten comentarios vacíos");
}

function tests1(){
	$.getJSON(appConstants.requestEjercicioURL()+"?categoria=1&ciudad="+localStorage.getItem("destino.name"),
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					ejerciciosJSON.ejercicio=data.ejercicio;
					document.getElementById("ejercicios").innerHTML=ejercicios.create();
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	
}

function tests2(){
	$.getJSON(appConstants.requestEjercicioURL()+"?categoria=2&ciudad="+localStorage.getItem("destino.name"),
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					ejerciciosJSON.ejercicio=data.ejercicio;
					document.getElementById("ejercicios").innerHTML=ejercicios.create2();
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	
}

function tests3(){
	document.getElementById("ejercicios").innerHTML=ejercicios.create3();
	
}

function corregir(){
	var correctos=0;
	var nEjercicios=ejerciciosJSON.ejercicio.length;
	for(i=0;i<nEjercicios;i++){
		if (document.getElementById("respuesta"+i).value.trim().toUpperCase()==ejerciciosJSON.ejercicio[i].solucion.toUpperCase()){//quitamos espacios y lo hacemos case insensitive
			document.getElementById("enunciado"+i).style.color="green";
			correctos++;
		}//si es correcto se pone el enunciado en verde, sino, en rojo
		else{
			document.getElementById("enunciado"+i).style.color="red";
		}
	}
	var nota=Math.round(correctos/nEjercicios*10);
	alert("Nota: "+nota);
	
	notaJSON.user=localStorage.getItem("user.name");
	notaJSON.nota=nota;
	notaJSON.ejercicio=ejerciciosJSON.ejercicio[0];
	$.ajax({
		type: 'post',
		contentType: 'application/json',
		url: appConstants.addNotaURL(),
		success: function(data){
				alert(data);			
		},
		data: JSON.stringify(notaJSON)			
	});
	
	document.getElementById("ejBoton").innerHTML="Siguiente";
	document.getElementById("ejBoton").setAttribute('onclick','tests2()');
}

function corregir2(){
	var correctos=0;
	var nEjercicios=ejerciciosJSON.ejercicio.length;
	for(i=0;i<nEjercicios;i++){
		if (document.getElementById("respuesta"+i).value.trim()==ejerciciosJSON.ejercicio[i].solucion.trim()){
			document.getElementById("enunciado"+i).style.color="green";
			correctos++;
		}
		else{
			document.getElementById("enunciado"+i).style.color="red";
		}
	}
	var nota=Math.round(correctos/nEjercicios*10);
	alert("Nota: "+nota);
	
	notaJSON.user=localStorage.getItem("user.name");
	notaJSON.nota=nota;
	notaJSON.ejercicio=ejerciciosJSON.ejercicio[0];
	$.ajax({
		type: 'post',
		contentType: 'application/json',
		url: appConstants.addNotaURL(),
		success: function(data){
				alert(data);			
		},
		data: JSON.stringify(notaJSON)			
	});

	document.getElementById("ejBoton").innerHTML="Siguiente";
	document.getElementById("ejBoton").setAttribute('onclick','tests3()');
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
function valor(){
	document.getElementById("valoracion").innerHTML=valoracion.create();
}
function misDestinos(){
	$.getJSON(appConstants.requestUserFotosURL()+"?usuario="+localStorage.getItem("user.name"),
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					fotosJSON.foto=data.foto;
					document.getElementById("misDestinos").innerHTML=destinos.create();
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	
}
function lugares(){
	$.getJSON(appConstants.requestFotosURL()+"?usuario=interes&ciudad="+localStorage.getItem("destino.name"),
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					fotosJSON.foto=data.foto;
					$.getJSON(appConstants.requestComentariosURL()+"?categoria=interes&ciudad="+localStorage.getItem("destino.name"),
							function(data,status) {//Función callback
								if(status=="success"){//Si la HTTP-RESPONSE es OK
									comentariosJSON.comentario=data.comentario;
									document.getElementById("lugaresEmb").innerHTML=lugaresEmb.create();
								}
								else {
									alert("NO RESPONSE FROM SERVER");
								}
							}
						);
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	
}
function gastro(){
	$.getJSON(appConstants.requestFotosURL()+"?usuario=gastronomia&ciudad="+localStorage.getItem("destino.name"),
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					fotosJSON.foto=data.foto;
					$.getJSON(appConstants.requestComentariosURL()+"?categoria=gastronomia&ciudad="+localStorage.getItem("destino.name"),
							function(data,status) {//Función callback
								if(status=="success"){//Si la HTTP-RESPONSE es OK
									comentariosJSON.comentario=data.comentario;
									document.getElementById("gastronomia").innerHTML=gastronomia.create();
								}
								else {
									alert("NO RESPONSE FROM SERVER");
								}
							}
						);
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	
}
function showhideFotos(){
	var e = document.getElementById("fotosDiv");
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';
}
function showhideForo(){
	var e = document.getElementById("foroDiv");
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';
}
function showhideLisboa(){
	var e = document.getElementById("lisboa");
	$.getJSON(appConstants.requestFotosURL()+"?usuario="+localStorage.getItem("user.name")+"&ciudad=Lisboa",
			function(data,status) {//Función callback
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					fotosJSON.foto=data.foto;
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		);
	contentDiv="";
	for(i=0;i<fotosJSON.foto.length;i++){
		contentDiv+=
			'<div class="ui-field-contain">'+
			'<img src="'+fotosJSON.foto[i].path+' height="200px" width="300px">'+
			'</div>';
	}
	e.innerHTML=contentDiv;
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';
}
