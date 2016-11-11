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
						'<td bgcolor="'+localStorage.getItem("destino.color")+ '" align="center" ><a href=""><strong style="font-size: 35px;">TURISMO</strong></a></td>'+
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
				'<h1>'+localStorage.getItem("user.name")+'</h1>'+
				'</div>';
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
var page={
		create: function(i) {
			//var pageDiv='<div data-role="page" id="page-'+i+'">';
			var headerDiv=
				'<div data-role="header" data-position="fixed">';
				switch(i){
					case 1:
						headerDiv+=
							'<div style="width:30%;display: inline-block;">'+
						'<a href="miPerfil.html">'+
		  					'<img src="img/user-icon.png" alt="Perfil" style="width:100px;height:100px;border:0;">'+
						'</a>'+
					'</div>'+
					'<div style="width:30%;display: inline-block;">'+
						'<a href="misDestinos.html">'+
		  					'<img src="img/home-icon.png" alt="Perfil" style="width:100px;height:100px;border:0;">'+
						'</a>'+
					'</div>'+
					'<div class="perfil-options" style="text-align:center;display: inline-block;">'+
						'<fieldset data-role="collapsible" id="collapsible-1" data-collapsed-icon="bullets" data-expanded-icon="bars" data-iconpos="right">'+
							'<h1>Mi Perfil</h1>'+
							'<p>Collapsible content.</p>'+
							'<p>Collapsible content2.</p>'+
						'</fieldset>'+
					'</div>';
						break;
				}
				headerDiv+='</div>';
				
			
			var contentDiv=
				'<div data-role="content" id="pageContent-'+i+'" style="text-align:center;">'+
				'<h1>Hola</h1>';
			contentDiv+='</div>';
//					'<div id="statementDiv-'+i+'" style="text-align:left;">'+
//					'</div>'+
//					'<div id="solutionDiv-'+i+'" class="ui-grid-solo">';
//			switch(exercises.exercise[i].exerciseType){
//				case "img":
//					contentDiv+=
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-1" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="takePhoto('+i+')">TAKE PHOTO</a>'+
//							'<label for="image-'+i+'-1" id="fileName-'+i+'-1" style="text-align:left;word-wrap:break-word;"></label>'+
//							'<img id="image-'+i+'-1" alt="" src="" style="display:none;width:auto;height:auto;"/>'+
//						'</div>'+
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-2" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="sendResult('+i+')">SEND PHOTO</a>'+
//						'</div>';
//					break;
//				case "audio":
//					contentDiv+=
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-1-1" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="startAudioRecord('+i+')">START RECORDING</a>'+
//							'<a href="#" id="button-'+i+'-1-2" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="stopAudioRecord('+i+')">STOP RECORDING</a>'+
//							'<label for="audio-'+i+'-1" id="fileName-'+i+'-1" style="text-align:left;word-wrap:break-word;"></label>'+
//							'<audio id="audio-'+i+'-1" controls="controls" style="display:none">'+
//								'<source id="audioSrc-'+i+'-1" src=""/>'+
//							'</audio>'+
//						'</div>'+
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-2" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="sendResult('+i+')">SEND AUDIO</a>'+
//						'</div>';
//					break;
//				case "video":
//					contentDiv+=
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-1" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="recordVideo('+i+')">RECORD</a>'+
//							'<label for="video-'+i+'-1" id="fileName-'+i+'-1" style="text-align:left;word-wrap:break-word;"></label>'+
//							'<video id="video-'+i+'-1" controls="controls" style="display:none" width="95%" height="auto">'+
//								'<source id="videoSrc-'+i+'-1" src=""/>'+
//							'</video>'+
//						'</div>'+
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-2" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="sendResult('+i+')">SEND VIDEO</a>'+
//						'</div>';						
//					break;	
//			}
//			
//			contentDiv+=						
//						'<div class="ui-block-a" style="text-align:center;vertical-align:middle;">'+
//							'<a href="#" id="button-'+i+'-3" class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="queryCalification('+i+')">QUERY CALIFICATION</a>'+
//							'<p id="calification-'+i+'">CALIFICATION: NONE</p>'+
//						'</div>'+				
//					'</div>'+
//				'</div>';		
			
//			var footerDiv=
//			'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
//				'<div class="ui-grid-b">'+
//					'<div class="ui-block-a" style="text-align:left;width:20%;"><a href="#page-'+(i-1)+'" id="prev-'+i+'" class="ui-btn ui-icon-arrow-l ui-btn-icon-left ui-mini ui-btn-inline ui-corner-all" data-transition="turn">Prev</a></div>'+
//					'<div class="ui-block-b" style="text-align:center;width:60%;"><a class="ui-btn ui-mini ui-btn-inline ui-corner-all" onclick="saveWork()">SAVE</a></div>'+
//					'<div class="ui-block-c" style="text-align:right;width:20%;"><a href="#page-'+(i+1)+'" id="next-'+i+'" class="ui-btn ui-icon-arrow-r ui-btn-icon-left ui-mini ui-btn-inline ui-corner-all" data-transition="turn">Next</a></div>'+
//				'</div>'+
//			'</div>';
			
			var pageDiv=headerDiv+contentDiv;
			
//			alert("create2");
			return pageDiv;
		},
		}
