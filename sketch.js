var foo = function() {

};

function grayscaleImageIE(imgObj)
{
	imgObj.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)';
}

function grayscaleImage(imgObj)
{
	var canvas = document.createElement('canvas');
	var canvasContext = canvas.getContext('2d');
	
	var imgW = imgObj.width;
	var imgH = imgObj.height;
	canvas.width = imgW;
	canvas.height = imgH;
	
	canvasContext.drawImage(imgObj, 0, 0);
	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
	
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	
	canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
}

$(function(){
	$("img").each(function() {
		//this.src = grayscaleImage(this);
		var width = this.width, height = this.height;
		if (width == 0 || height == 0) {
			width = $(this).attr("width");
			height = $(this).attr("height");
		}
		this.src = "http://placehold.it/" + width + "x" + height;
	});
	$("[class*='span']").each(function() {
		$(this).borderImage("../img/sketch-border.png");
	});
});

