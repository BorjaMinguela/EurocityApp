var appConstants = {
	localPermanentStorageFolder: "/sdcard/eus.ehu.intel.tta.eurocityapp/",
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
//	serverURL: "http://158.227.64.57:8080/TTA1617_LS-EX_09-11S/",//EHU PUBLIC
	serverURL: "http://u017633.ehu.eus:28080/TTA1617_LS-EX_11S_PUBLIC/",//EHU PUBLIC
//	serverURLstatic: "http://158.227.64.57:8080/TTA1617_LS-EX_09-11S/",//EHU PUBLIC
	serverURLstatic: "http://u017633.ehu.eus:28080/static/TTA1617_LS-EX_11S_PUBLIC/",//EHU
	uploadFileURL: function() {
		return this.serverURL+"rest/School/uploadFile"; 
	},
	requestLessonsURL: function() {
		return this.serverURL+"rest/School/requestLessons";
	},
	requestInitialDataURL: function() {
		return this.serverURL+"rest/School/requestInitialData";
	},
	requestCalificationURL: function() {
		return this.serverURL+"rest/School/requestCalification";
	},
	addStudentURL: function() {
		return this.serverURL+"rest/School/addStudent";
	}
};
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
					alert("New photo in: "+tempFullPath);
					
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
					'<img src="img/doge.gif" style="width:120px;height:120px;">'+
				'</div>'+
				'<table style="width:100%">'+
					'<tr>'+
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="idioma.html"><strong style="font-size: 35px;">IDIOMA</strong></a></td>'+
					'</tr>'+
					'<tr>'+
					'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="ubicacion.html"><strong style="font-size: 35px;">UBICACIÓN</strong></a></td>'+
					'</tr>'+
					'<tr>'+
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href="turismo.html"><strong style="font-size: 35px;">TURISMO</strong></a></td>'+
					'</tr>'+
					'<tr>'+
					'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href=""><strong style="font-size: 35px;">VALORACIÓN</strong></a></td>'+
					'</tr>'+
					'<tr>'+
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href=""><strong style="font-size: 35px;">¿CUÁNTO HAS APRENDIDO?</strong></a></td>'+
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
				if (localStorage.getItem("fotoPerfil") === null) {
					contentDiv+='<h1>¿A que esperas? ¡Sube una foto de perfil!</h1>';
				}
				else{
					contentDiv+=
						'<div id="fotoPerfil" style="display: inline-block;width: 150px;height: 150px;border-radius: 50%;background-repeat: no-repeat;background-position: center center;background-size: cover;background-image:url(\''+localStorage.getItem("fotoPerfil")+'\')">'+
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
			contentDiv=
				'<div style="background-color:'+localStorage.getItem("destino.color")+'" align="center">'+
					'<strong style="font-size: 35px;">UBICACIÓN</strong>'+
					'<a href="" onclick=\'responsiveVoice.speak("Ubicación","Spanish Female");\' id="audio1" class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<a href="https://www.google.es/maps" id="button-1" class="ui-btn ui-icon-location ui-btn-icon-left ui-corner-all">Mapas</a>';
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
					'<a href="" class="ui-btn ui-corner-all" style="color:'+localStorage.getItem("destino.color")+'">Lugares emblemáticos</a>'+
					'<a href="" onclick=\'responsiveVoice.speak("Lugares emblemáticos","Spanish Female");\' class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'+
				'<div >'+
					'<a href="" class="ui-btn ui-corner-all" style="color:'+localStorage.getItem("destino.color")+'">Gastronomía</a>'+
					'<a href="" onclick=\'responsiveVoice.speak("Gastronomía","Spanish Female");\' class="ui-btn ui-icon-audio ui-btn-icon-notext ui-corner-all"></a>'+
				'</div>'
			;
			return contentDiv;
		}
}