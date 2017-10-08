/**
 * Created by sunando on 07-10-2017.
 */
/*app.js*/

function upload() {
	$( "#contentpanel" ).css("opacity","0");
	$('.progressbar').css("display","block");
	$('.progressbar').animate({opacity:1},2000

	);

	var files = document.getElementById('my-file');
	for (var i = 0; i < files.files.length; i++) {
		var file = files.files[i];

		console.log('file selected :' + file.name + '\nfile:' + file);
		var tmppath = URL.createObjectURL(file);

		var pdfText = new PDFText();
		pdfText.getByteArray(file,function (rawData) {

           // // var PDFText=new PDFText();
			// pdfText.ab2Str(rawData,function (data) {
			// 	//console.log(data);
           //
			// });


		pdfText.getPDF(rawData,'test_no.pdf');

		});
		pdfText.get(tmppath, function (text) {
			document.getElementById('content').innerHTML = '<p style="color: #616161">' + text + '</p>';
			console.log('success');
			//console.log(text);
			$('.progressbar').animate({opacity:0},2000,function () {
				$('.progressbar').css("display","none");
				$( "#contentpanel" ).animate({opacity:1}, 2000);
			});

		});


	}
}
