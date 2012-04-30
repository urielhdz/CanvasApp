var imgWidth, imgHeight,datosPrim;
$(document).on("ready",function(){
	var canvas = document.getElementById("miCanvas");
	if(canvas.getContext)
	{
		$("#btnIC").on("click",function(){
			invertirColores(canvas,ctx);
		});
		$("#btnBN").on("click",function(){
			aBlancoNegro(ctx,canvas);
		});
		$("#btnRS").on("click",function(){
			aSepia(canvas,ctx);
		});
		$("#guardaCanvas").on("click",function(){
			guardarImagen(canvas);
		});
		$("#btnRI").on("click",function(){
			restaurarImagen(ctx,canvas)
		});			
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.src = "JellyFish.jpg";
		img.onload = function(){
			imgWidth = this.width;
			imgHeight = this.height;
			canvas.width = imgWidth/2;
			canvas.height = imgHeight/2;
			ctx.drawImage(this,0,0,imgWidth/2,imgHeight/2);
			var datosDeLaImagen = ctx.getImageData(0,0,imgWidth/2,imgHeight/2);
			datosPrim = datosDeLaImagen.data;
		};
	}
	
});
function invertirColores(canvas,ctx)
{

	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth/2,imgHeight/2);
	var datos = datosDeLaImagen.data;
	for(var i=0; i<datos.length; i+=4)
	{
		datos[i] = 255 - datos[i];
		datos[i+1] = 255 - datos[i+1];
		datos[i+2] = 255 - datos[i+2];
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}
function aBlancoNegro(ctx,canvas)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth/2,imgHeight/2);
	var datos = datosDeLaImagen.data;
	for(var i=0; i<datos.length; i+=4)
	{
		var auxiliar = 0.34 * datos[i] + 0.5 * datos[i+1] + 0.16 * datos[i+2];
		datos[i] = auxiliar;
		datos[i+1] = auxiliar;
		datos[i+2] = auxiliar;
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}
function aSepia(canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth/2,imgHeight/2);
	var datos = datosDeLaImagen.data;
	for(var i=0; i<datos.length; i+=4)
	{
		datos[i] = datos[i] *0.393 + datos[i+1] * 0.769 + datos[i+2] *0.189;
		datos[i+1] = datos[i] * 0.393 + datos[i+1] *0.686 + datos[i+2] * 0.168;
		datos[i+2] = datos[i] * 0.272 + datos[i+1] *0.534 + datos[i+2] * 0.131;
	}
	ctx.putImageData(datosDeLaImagen,0,0);	
}
function guardarImagen(canvas)
{
	var datosCanvas = canvas.toDataURL();
	document.getElementById("canvasImgInsite").src = datosCanvas;
}
function restaurarImagen(ctx,canvas)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth/2,imgHeight/2);
	var datos = datosDeLaImagen.data;
	for(var i=0; i<datos.length; i+=4)
	{
		datos[i] = datosPrim[i];
		datos[i+1] = datosPrim[i+1];
		datos[i+2] = datosPrim[i+2];
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}