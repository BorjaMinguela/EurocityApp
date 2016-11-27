//Constantes de la APP
var appConstants = {
	localPermanentStorageFolder: "/sdcard/eus.ehu.intel.tta.eurocity/",
	localPermanentStorageFolderImg: function () {
		return this.localPermanentStorageFolder+"img/";
	},
	localPermanentStorageFolderAudio: function () {
		return this.localPermanentStorageFolder+"audio/";
	},
	localPermanentStorageFolderVideo: function () {
		return this.localPermanentStorageFolder+"video/";
	},
	persistentStorageFolder: function () {
		return cordova.file.externalDataDirectory;
	},
	persistentStorageSolutionsFile: "SOLUTIONS.txt",
	persistentStorageExercisesFile: "EXERCISES.txt",	
	//serverURL: "http://192.168.0.15:8080/EurocityServer/",//EHU PUBLIC
	serverURL: "http://u017633.ehu.eus:28080/EurocityServer/",//EHU PUBLIC
//	serverURLstatic: "http://158.227.64.57:8080/TTA1617_LS-EX_09-11S/",//EHU PUBLIC
	serverURLstatic: "http://u017633.ehu.eus:28080/static/TTA1617_LS-EX_11S_PUBLIC/",//EHU
	requestUsersURL: function() {
		return this.serverURL+"rest/Eurocity/requestUsers"; 
	},
	requestUserURL: function() {
		return this.serverURL+"rest/Eurocity/requestUser"; 
	},
	requestEjercicioURL: function() {
		return this.serverURL+"rest/Eurocity/requestEjercicios"; 
	},
	addUserURL: function() {
		return this.serverURL+"rest/Eurocity/addUser"; 
	},
	deleteUserURL: function() {
		return this.serverURL+"rest/Eurocity/deleteUser"; 
	},
	addValoracionURL: function() {
		return this.serverURL+"rest/Eurocity/addValoracion"; 
	},
	addNotaURL: function() {
		return this.serverURL+"rest/Eurocity/addNota"; 
	},
	requestFotosURL: function() {
		return this.serverURL+"rest/Eurocity/requestFotos"; 
	},
	requestUserFotosURL: function() {
		return this.serverURL+"rest/Eurocity/requestUserFotos"; 
	},
	requestComentariosURL: function() {
		return this.serverURL+"rest/Eurocity/requestComentarios"; 
	},
	addComentarioURL: function() {
		return this.serverURL+"rest/Eurocity/addComentario"; 
	},
	addFotoURL: function() {
		return this.serverURL+"rest/Eurocity/addFoto"; 
	},
	requestValoracionesURL: function() {
		return this.serverURL+"rest/Eurocity/requestValoraciones"; 
	}
};

//JSON
var usuarioJSON = {
		nombre: null
};

var valoracionJSON = {
		nota: null,
		user: null,
		lugar: null
}
var valoracionesJSON = {
		valoracion: [{
			nota: null,
			user: null,
			lugar: null
		}]
}
var ejerciciosJSON = {
		ejercicio: [{
			enunciado: null,
			categoria: null,
			solucion: null,
			lugar: null
		}]
}
var notaJSON = {
		user:null,
		nota:null,
		ejercicio: {
			enunciado: null,
			categoria: null,
			solucion: null,
			lugar: null
		}
}

var fotoJSON = {
		path:null,
		user:null,
		lugar: null
}

var fotosJSON = {
		foto: [{
			path:null,
			user:null,
			lugar: null
		}]
}

var comentariosJSON = {
		comentario: [{
			comentario:null,
			categoria:null,
			user: null,
			lugar: null
		}]
}
var comentarioJSON = {
			comentario:null,
			categoria:null,
			user: null,
			lugar: null
}


var fileUtilities = {
		moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){
			var url="file://"+sourceFullPath;
			var destFile=destFolder+destName;
			var fileTransfer=new FileTransfer();//Crear objeto FileTransfer
		    fileTransfer.download(url,destFile,//Copiar (descargar) el fichero indicado por URL en destFile
				function() {//función successCallback: si el fichero se descargó bien
					window.resolveLocalFileSystemURL(url,//Acceder al fichero original por su URL
		    				function(fileEntry) {//función successCallback: si se ha podido acceder al fichero original
								fileEntry.remove(onSuccess);//Borrar el fichero y seguir con onSuccess
		    				},
		    				function(error) {
		    					alert("Source file NOT accesible; not removed");
		    				}
		    		);			
				},
				function(error) {
					alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
				}
			);
		}
}
var photo = {
		fileFolder:null,
		fileName:null,
		takeAsync: function(fileFolder,fileName,onSuccess) {
			navigator.device.capture.captureImage(
				function(photoFiles) {
//					alert("onCaptureSuccess: ");
					var tempFullPath=photoFiles[0].fullPath; //Begins with "file:"
					tempFullPath=tempFullPath.substring(tempFullPath.indexOf("/")); //to retrieve "file:"
					//alert("New photo in: "+tempFullPath);
					if (fileName=="fotoviaje"){
						fileName=tempFullPath.substring(tempFullPath.lastIndexOf("/")+1);
					}
					fileUtilities.moveAsync(tempFullPath,fileFolder,fileName,
				      function() {
							photo.fileFolder=fileFolder;//Guardar en el atributo fileFolder del objeto photo, la carpeta destino
							photo.fileName=fileName;//Guardar en el atributo fileName del objeto photo, el nuevo nombre del fichero
							if(onSuccess!=false){
								onSuccess();
							}
		        		}							
					);
				},
				function(e) {
					var msgText = "Photo error: " + e.message + "(" + e.code + ")";
					alert(msgText);
				}
			);
//			alert("record2: "+this.fileFolder);
		}
}
var ppal={
		create: function(){
			contentDiv=
				'<div style="text-align:center;display: inline-block;width:50%;">'+
					'<h1>¿En qué te puedo ayudar?</h1>'+
				'</div>'+
				'<div style="display:inline-block;">'+
					//'<img src="img/doge.gif" style="width:120px;height:120px;">'+
					'<img src="https://dl.dropboxusercontent.com/s/40wdqko9el1oa7y/girl.gif?dl=0" style="width:120px;height:120px;">'+
				'</div>'+
				'<a href="" onclick="takePhotoViaje()" class="ui-btn ui-icon-camera ui-btn-icon-notext ui-corner-all"></a>'+
				'<table style="width:100%">'+
					'<tr>'+
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="https://translate.google.com"><strong style="font-size: 35px;">IDIOMA</strong></a></td>'+
					'</tr>'+
					'<tr>'+
					'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="ubicacion.html"><strong style="font-size: 35px;">UBICACIÓN</strong></a></td>'+
					'</tr>'+
					'<tr>'+
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="turismo.html"><strong style="font-size: 35px;">TURISMO</strong></a></td>'+
					'</tr>'+
					'<tr>'+
					'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="valoracion.html"><strong style="font-size: 35px;">VALORACIÓN</strong></a></td>'+
					'</tr>'+
					'<tr>'+
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="ejercicios.html"><strong style="font-size: 35px;">¿CUÁNTO HAS APRENDIDO?</strong></a></td>'+
					'</tr>'+
				'</table>';
			return contentDiv;
		}
}
var miPerfil={
		create: function(){
			contentDiv=
				'<div style="text-align:center;">'+
					'<h1>'+localStorage.getItem("user.name")+'</h1>';
				if (localStorage.getItem("fotoPerfil"+localStorage.getItem("user.name")) === null) {
					contentDiv+='<h1>¿A que esperas? ¡Sube una foto de perfil!</h1>';
				}
				else{
					contentDiv+=
						'<div id="fotoPerfil" style="display: inline-block;width: 150px;height: 150px;border-radius: 50%;background-repeat: no-repeat;background-position: center center;background-size: cover;background-image:url(\''+localStorage.getItem("fotoPerfil"+localStorage.getItem("user.name"))+'\')">'+
				//'<img src="file://'+localStorage.getItem("fotoPerfil")+'" alt="Foto Perfil" id="fotoPerfil" style="width:200px;height:200px;border:2;">'+
						'</div>';
				}
			contentDiv+='<a href="" onclick="takePhoto()" class="ui-btn ui-icon-camera ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<a href="misDestinos.html" id="button-1" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all">Mis destinos</a>'+
				'<a href="nuevoViaje.html" id="button-2" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all">Nuevo Viaje</a>'
				
				;
			return contentDiv;
		}
}
var ubicacion={
		create: function(){
			var mapa="";
			if (localStorage.getItem("destino.name")=="Londres"){
				mapa="https://www.google.es/maps/place/Londres,+Reino+Unido/@51.528308,-0.3817765,10z/data=!3m1!4b1!4m5!3m4!1s0x47d8a00baf21de75:0x52963a5addd52a99!8m2!3d51.5073509!4d-0.1277583";
			}
			else if (localStorage.getItem("destino.name")=="Lisboa"){
				mapa="https://www.google.es/maps/place/Lisboa,+Portugal/@38.7436883,-9.1952231,13z/data=!3m1!4b1!4m5!3m4!1s0xd19331a61e4f33b:0x400ebbde49036d0!8m2!3d38.7222524!4d-9.1393366";
			}
			else if (localStorage.getItem("destino.name")=="Paris"){
				mapa="https://www.google.es/maps/place/Par%C3%ADs,+Francia/@48.8589507,2.2775174,12z/data=!3m1!4b1!4m5!3m4!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.856614!4d2.3522219";
			}
			else if (localStorage.getItem("destino.name")=="Roma"){
				mapa="https://www.google.es/maps/place/Roma,+Italia/@41.9102415,12.395915,11z/data=!3m1!4b1!4m5!3m4!1s0x132f6196f9928ebb:0xb90f770693656e38!8m2!3d41.9027835!4d12.4963655";
			}
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">UBICACIÓN</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Ubicación","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<a href="'+mapa+'" id="button-1" class="ui-btn ui-icon-location ui-btn-icon-left ui-corner-all">Mapas</a>';
			return contentDiv;
		}
}
var turismo={
		create: function(){
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">Turismo</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Turismo","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<div >'+
					'<a href="lugaresEmblematicos.html" class="ui-btn ui-corner-all" style="color:'+localStorage.getItem("destino.color")+'">Lugares emblemáticos</a>'+
					'<a href="" onclick=\'responsiveVoice.speak("Lugares emblemáticos","Spanish Female");\' class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<div >'+
					'<a href="gastronomia.html" class="ui-btn ui-corner-all" style="color:'+localStorage.getItem("destino.color")+'">Gastronomía</a>'+
					'<a href="" onclick=\'responsiveVoice.speak("Gastronomía","Spanish Female");\' class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'
			;
			return contentDiv;
		}
}
var destinos={
		create: function(){
			contentDiv=
				'<div align="center">'+
					'<strong style="font-size: 35px;">Mis destinos</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Mis destinos","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
			contentDiv+=
				'<h1 style="color:lightgreen;">Lisboa</h1>';
			for(i=0;i<fotosJSON.foto.length;i++){
				if (fotosJSON.foto[i].lugar=='Lisboa'){
					contentDiv+=
						'<div class="ui-field-contain">'+
						'<img src="'+fotosJSON.foto[i].path+'" height="200px" width="300px">'+
						'</div>';
				}
			}
			contentDiv+=
				'<h1 style="color:orange;">Londres</h1>';
			for(i=0;i<fotosJSON.foto.length;i++){
				if (fotosJSON.foto[i].lugar=='Londres'){
					contentDiv+=
						'<div class="ui-field-contain">'+
						'<img src="'+fotosJSON.foto[i].path+'" height="200px" width="300px">'+
						'</div>';
				}
			}
			contentDiv+=
				'<h1 style="color:yellow;">París</h1>';
			for(i=0;i<fotosJSON.foto.length;i++){
				if (fotosJSON.foto[i].lugar=='Paris'){
					contentDiv+=
						'<div class="ui-field-contain">'+
						'<img src="'+fotosJSON.foto[i].path+'" height="200px" width="300px">'+
						'</div>';
				}
			}
			contentDiv+=
				'<h1 style="color:lightblue;">Roma</h1>';
			for(i=0;i<fotosJSON.foto.length;i++){
				if (fotosJSON.foto[i].lugar=='Roma'){
					contentDiv+=
						'<div class="ui-field-contain">'+
						'<img src="'+fotosJSON.foto[i].path+'" height="200px" width="300px">'+
						'</div>';
				}
			}
				
			return contentDiv;
		}
}
var lugaresEmb={
		create: function(){
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">Lugares emblemáticos</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Lugares emblemáticos","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
				
					
			if (localStorage.getItem("destino.name")=="Londres"){
				contentDiv+=
					'<div >'+
						'<ul>'+
						  '<li>London Eye</li>'+
						  '<li>Buckingham palace</li>'+
						  '<li>Big Ben</li>'+
						'</ul>'+
					'</div>';
			}
			else if (localStorage.getItem("destino.name")=="Lisboa"){
				contentDiv+=
					'<div >'+
						'<ul>'+
						  '<li>Plaza del comercio</li>'+
						  '<li>Torre de Belém</li>'+
						  '<li>Barrio de la Alfama</li>'+
						'</ul>'+
					'</div>';
			}
			else if (localStorage.getItem("destino.name")=="Paris"){
				contentDiv+=
				'<div >'+
				'<ul>'+
				  '<li>Torre Eiffel</li>'+
				  '<li>Catedral de Notre Dame</li>'+
				  '<li>Arco del triunfo</li>'+
				'</ul>'+
			'</div>';
			}
			else if (localStorage.getItem("destino.name")=="Roma"){
				contentDiv+=
					'<div >'+
						'<ul>'+
						  '<li>Coliseo</li>'+
						  '<li>Fontana de Trevi</li>'+
						  '<li>Foro Romano</li>'+
						'</ul>'+
					'</div>';
			}
			contentDiv+=
			'<div id="foroDiv" style="display:none;">'+
			'<label>Introduzca tu comentario</label>'+
			'<input id="coment" type="text" placeholder="Comentario" name="un" />'+
				'<a href="" class="ui-btn ui-icon-comment ui-btn-icon-right ui-corner-all" onclick="addComentario(\'interes\')">Comentar!</a>';
			for(i=0;i<comentariosJSON.comentario.length;i++){
				contentDiv+=
				'<div class="ui-field-contain">'+
				'<p><b>'+comentariosJSON.comentario[i].user+': </b>'+comentariosJSON.comentario[i].comentario+'</p>'+
				'<a href="" onclick=\'responsiveVoice.speak("'+comentariosJSON.comentario[i].comentario+'","Spanish Female");\' class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
			}
			contentDiv+='</div>';
			
			contentDiv+=
				'<a href="" onclick="showhideForo()" class="ui-btn ui-icon-arrow-u ui-btn-icon-right ui-corner-all">Comentarios</a>'+
				'<a href="" onclick="showhideFotos()" class="ui-btn ui-icon-arrow-d ui-btn-icon-right ui-corner-all">Fotos</a>'+
				
				'<div id="fotosDiv" style="display:none;">';
					for(i=0;i<fotosJSON.foto.length;i++){
					contentDiv+=
					'<div class="ui-field-contain">'+
						'<img src="'+fotosJSON.foto[i].path+'>'+
					'</div>';
				}
				contentDiv+='</div>';
				
			return contentDiv;
		}
}

var gastronomia={
		create: function(){
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">Gastronomía</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Gastronomía","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
				
					
			if (localStorage.getItem("destino.name")=="Londres"){
				contentDiv+=
					'<div >'+
						'<ul>'+
						  '<li>Fish and chips</li>'+
						  '<li>Crepes</li>'+
						  '<li>Pies and kornish pasties</li>'+
						  '<li>Backed/jacket potato</li>'+
						'</ul>'+
					'</div>';
			}
			else if (localStorage.getItem("destino.name")=="Lisboa"){
				contentDiv+=
					'<div >'+
						'<ul>'+
						  '<li>Bolinhas de berlim</li>'+
						  '<li>Bacalao</li>'+
						  '<li>Pasteles de belem</li>'+
						  '<li>Francesinha</li>'+
						'</ul>'+
					'</div>';
			}
			else if (localStorage.getItem("destino.name")=="Paris"){
				contentDiv+=
				'<div >'+
				'<ul>'+
				  '<li>Ratatouille</li>'+
				  '<li>Macarons</li>'+
				  '<li>Foie grass</li>'+
				  '<li>Omelettes</li>'+
				'</ul>'+
			'</div>';
			}
			else if (localStorage.getItem("destino.name")=="Roma"){
				contentDiv+=
					'<div >'+
						'<ul>'+
						  '<li>Supplí alla Romana</li>'+
						  '<li>Sphagetti alla Carbonara</li>'+
						  '<li>Gelato</li>'+
						'</ul>'+
					'</div>';
			}
			contentDiv+=
			'<div id="foroDiv" style="display:none;">'+
			'<label>Introduzca tu comentario</label>'+
			'<input id="coment" type="text" placeholder="Comentario" name="un" />'+
				'<a href="" class="ui-btn ui-icon-comment ui-btn-icon-right ui-corner-all" onclick="addComentario(\'gastronomia\')">Comentar!</a>';
			for(i=0;i<comentariosJSON.comentario.length;i++){
				contentDiv+=
				'<div class="ui-field-contain">'+
				'<p><b>'+comentariosJSON.comentario[i].user+': </b>'+comentariosJSON.comentario[i].comentario+'</p>'+
				'<a href="" onclick=\'responsiveVoice.speak("'+comentariosJSON.comentario[i].comentario+'","Spanish Female");\' class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
			}
			contentDiv+='</div>';
			
			contentDiv+=
				'<a href="" onclick="showhideForo()" class="ui-btn ui-icon-arrow-u ui-btn-icon-right ui-corner-all">Comentarios</a>'+
				'<a href="" onclick="showhideFotos()" class="ui-btn ui-icon-arrow-d ui-btn-icon-right ui-corner-all">Fotos</a>'+
				
				'<div id="fotosDiv" style="display:none;">';
					for(i=0;i<fotosJSON.foto.length;i++){
					contentDiv+=
					'<div class="ui-field-contain">'+
						'<img src="'+fotosJSON.foto[i].path+'>'+
					'</div>';
				}
				contentDiv+='</div>';
				
			return contentDiv;
		}
}
var valoracion={
		create: function(){
			contentDiv=
				'<div style="background-color:red" align="center">'+
				'<strong style="font-size: 35px;">Valoración</strong>'+
				'<a href="" onclick=\'responsiveVoice.speak("Valoración","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<h1>¡Pon una nota del 1 al 10 valorando tu experiencia en el viaje!</h1>'+
				'<div class="ui-field-contain">'+
					'<label for="select-1">Puntuación:</label>'+
					'<select name="select-1" id="puntos">'+
						'<option value="1">1</option>'+
						'<option value="2">2</option>'+
						'<option value="3">3</option>'+
						'<option value="4">4</option>'+
						'<option value="5">5</option>'+
						'<option value="6">6</option>'+
						'<option value="7">7</option>'+
						'<option value="8">8</option>'+
						'<option value="9">9</option>'+
						'<option value="10">10</option>'+
					'</select>'+
				'</div>'+
				'<a href="" id="button-1" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all" onclick="addValoracion()">¡Valorar!</a>'					
				;
			return contentDiv;
		}
}
var ejercicios={
		create: function(){
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">Uniendo conceptos</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Uniendo conceptos","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
					for(i=0;i<ejerciciosJSON.ejercicio.length;i++){
						contentDiv+=
						'<div class="ui-field-contain">'+
							'<label id ="enunciado'+i+'" for="text-1">'+ejerciciosJSON.ejercicio[i].enunciado+'</label>'+
							'<input name="text-1" id="respuesta'+i+'" data-clear-btn="true" value="" type="text"/>'+					        
						'</div>'
					}
					contentDiv+=
						'<a href="" id="ejBoton" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all" onclick="corregir()">Corregir</a>';
				
			;
			return contentDiv;
		},
		create2: function(){
			var str;
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">Buscando sinónimos</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Buscando sinónimos","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>';
					for(i=0;i<ejerciciosJSON.ejercicio.length;i++){
						str = ejerciciosJSON.ejercicio[i].enunciado.split("/");
						contentDiv+=
						'<div class="ui-field-contain">'+
							'<label id ="enunciado'+i+'" for="text-1">'+str[0]+'</label>'+
							'<select name="select-1" id="respuesta'+i+'">'+
								'<option value="">Elija una respuesta</option>'+
								'<option value="'+str[1]+'">'+str[1]+'</option>'+
								'<option value="'+str[2]+'">'+str[2]+'</option>'+
								'<option value="'+str[3]+'">'+str[3]+'</option>'+
							'</select>'+
						'</div>'
					}
					contentDiv+=
						'<a href="" id="ejBoton" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all" onclick="corregir2()">Corregir</a>';
				
			;
			return contentDiv;
		},
		create3: function(){
			var pronunciacion="";
			if (localStorage.getItem("destino.name")=="Londres"){
				pronunciacion="http://www.curso-ingles.com/aprender/cursos/vocabulario-viajar";
			}
			else if (localStorage.getItem("destino.name")=="Lisboa"){
				pronunciacion="http://context.reverso.net/traduccion/espanol-portugues/";
			}
			else if (localStorage.getItem("destino.name")=="Paris"){
				pronunciacion="http://context.reverso.net/traduccion/espanol-frances/billete";
			}
			else if (localStorage.getItem("destino.name")=="Roma"){
				pronunciacion="http://context.reverso.net/traduccion/espanol-italiano/billete";
			}
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">Nivel de pronunciación</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Nivel de pronunciación","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<div>'+
					'<a href="'+pronunciacion+'" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all">Comprueba tu pronunciación</a>'+
					'<a href="viajePpal.html" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-corner-all">Terminar</a>'+
				'</div>';
			return contentDiv;
				
		}

}