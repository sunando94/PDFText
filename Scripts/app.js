/**
 * Created by sunando on 07-10-2017.
 */
/*app.js*/

function upload() {
	var files = document.getElementById('my-file');
	for (var i = 0; i < files.files.length; i++) {
		var file = files.files[i];

		console.log('file selected :' + file.name + '\nfile:' + file);
		var tmppath = URL.createObjectURL(file);

		var pdfText = new PDFText();
		pdfText.get(tmppath, function (text) {
			document.getElementById('content').innerHTML = '<p>' + text + '</p>';
		});


	}
}
