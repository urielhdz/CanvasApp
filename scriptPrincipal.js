var imgWidth,imgHeight,datosPrim;

$(document).on("ready",inciar);

function inciar()
{
	var canvas = document.getElementById("miCanvas");
	if(canvas.getContext)
	{
		$("#btnBN").click(function(){
			aBlancoNegro(img,canvas,ctx);
		});
		$("#btnIC").on("click",function(){
			invertirColores(img,canvas,ctx);
		});
		$("#btnRI").click(function(){
			restaurarImagen(img,canvas,ctx)
		});
		$("#btnRS").click(function(){
			aSepia(img,canvas,ctx)
		});
		$("#guardaCanvas").on("click",function(){
			guardarCanvas(img,canvas,ctx);
		});
		$("#cerrarVentana").on("click",cerrarVentana);
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.src = "Jellyfish.jpg";
		img.onload = function()
		{
			imgWidth = this.width;
			imgHeight = this.height;
			canvas.width = imgWidth/2;
			canvas.height = imgHeight/2;
			ctx.drawImage(this,0,0,imgWidth/2,imgHeight/2);
			var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
			datosPrim = datosDeLaImagen.data;
		}
	}
};
function aBlancoNegro(img,canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		var brightness = 0.34 * datos[i] + 0.5 * datos[i + 1] +0.16 * datos[i + 2];
		datos[i] = brightness;
		datos[i+1] = brightness;
		datos[i+2] = brightness;
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}

function invertirColores(img,canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		datos[i] = 255 - datos[i];
		datos[i+1] = 255 - datos[i+1];
		datos[i+2] = 255 - datos[i+2];
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}

function restaurarImagen(img,canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		datos[i] = datosPrim[i];
		datos[i+1] = datosPrim[i+1];
		datos[i+2] = datosPrim[i+2];
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}
function aSepia(img,canvas,ctx)
{
	console.log("entre");
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		datos[i] = datos[i]*0.393 + datos[i+1]*0.769 + datos[i+2]*0.189;
		datos[i+1] = datos[i]*0.349 + datos[i+1]*0.686 + datos[i+2]*0.168;
		datos[i+2] = datos[i]*0.272 + datos[i+1]*0.534 + datos[i+2]*0.131;
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}
function guardarCanvas(img,canvas,ctx)
{
	var izquierda = ((screen.width - $("#canvasImg").width())/2);
	var arriba = ((screen.height - $("#canvasImg").height())/2);
	$("#canvasImg").css({'left':izquierda+"px",'top':arriba+"px"});
	var dataURL = canvas.toDataURL();
	document.getElementById("canvasImgInsite").src = dataURL;
	$("#canvasImg").fadeIn();
	$("#pantalla").css(
		{
			'width':(screen.width * 0.98),
			'height':(screen.height * 0.85)
		});
	$("#pantalla").fadeIn();
	window.addEventListener("keydown",function(e){
		if(e.keyCode == 27)
		{
			cerrarVentana();
		}
			
	});
}
function cerrarVentana()
{
	$("#canvasImg").fadeOut();
	$("#pantalla").fadeOut();
	window.removeEventListener("keydown",function(){});
}