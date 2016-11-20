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
				//alert("Photo in: "+localStorage.getItem("fotoPerfil"));
				location.reload();
			}
			);
}

function login(){
	var loginVal=$("#login").val();
	if((loginVal!=null&&loginVal!="")){
//		$.getJSON(appConstants.requestUserURL()+"?userName="+loginVal,//Consultar en el Servidor si existe el usuario
//				function(data,status) {//Función callback
//					if(status=="success"){//Si la HTTP-RESPONSE es OK
//						if(data.nombre==loginVal){
//							alert("Nombre: "+data.nombre+" existe.");
//							localStorage.setItem("user.name",loginVal);
//						}
//						else{
//							alert("No existe el usuario con nombre "+loginVal);
//							loginVal="";
//						}
//					}
//					else {
//						alert("NO RESPONSE FROM SERVER");
//						loginVal="";
//					}
//				}
//			);
		$.ajax({
			async: false,
			dataType: "json",
			url: appConstants.requestUserURL()+"?userName="+loginVal,
			success: function(data){
				if(data.nombre==loginVal){
					alert("Nombre: "+data.nombre+" existe.");
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
	var loginVal=$("#login").val();
	if((loginVal!=null&&loginVal!="")){
		usuarioJSON.nombre=loginVal;
		$.getJSON(appConstants.requestUserURL()+"?userName="+loginVal,//Consultar en el Servidor si existe el usuario
				function(data,status) {//Función callback
					if(status=="success"){//Si la HTTP-RESPONSE es OK
						if (data.nombre==loginVal){
							alert("Nombre: "+data.nombre+" existe.")
						}
						else alert("No existe ese nombre")
//						else{
//							$.post(appConstants.addStudentURL(),JSON.stringify(student),
//									function(data,status) {//Función callback
//								if(status=="success"){//Si la HTTP-RESPONSE es OK
//									alert("ya estas dado de alta, tu login es"+data);//Indicar al usuario q está dado de alta y cuál es su login
//										
//									}
//									else {
//										alert("NO RESPONSE FROM SERVER");
//									}			
//								},
//								"text"//Content-type esperado en HTTP-RESPONSE: text
//							);
//						}
//						else
//							alert("All fields are required");
//						}
					}
					else {
						alert("NO RESPONSE FROM SERVER");
					}
				}
			);
		
	}
	
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