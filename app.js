/*app.js*/

function upload() {
	var files = document.getElementById('my-file');
	for (var i = 0; i < files.files.length; i++) {
		var file = files.files[i];

		console.log('file selected :' + file.name);
	}
}

function getText(pdfUrl) {
	var PDF = PDFJS.getDoc
}