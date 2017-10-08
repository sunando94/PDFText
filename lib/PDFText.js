/**
 * Created by sunando on 08-10-2017.
 */

function PDFText() {

	var numofpages = 0;
	var pages = [];
	var pagepromises = [];
	var pagetext;
	var bookpages = [];


	PDFText.prototype.getByteArray = function (file,callback) {
		var fileReader = new FileReader();
		fileReader.onload= function (e) {
			var rawData = fileReader.result;
			callback(rawData);
		}
		 fileReader.readAsArrayBuffer(file);

	}
	PDFText.prototype.getPDF =function (bin,fileName) {
		var blob = new Blob([bin],{type:"application/octet-stream"});

		saveAs(blob,fileName);
	}

	PDFText.prototype.get = function (Url, callback) {
		return getData(Url, callback);
	}

	function
	getData(tmppath, callback) {
		var pdf = getPDF(tmppath);
		var text = readPDF(pdf);
		Promise.resolve(readPDF(pdf)).then(function (text) {
			callback(text);
		});


	}

	function
	getPDF(pdfUrl) {
		var PDF = PDFJS.getDocument(pdfUrl);
		return PDF;
	}

	function
	readPDF(pdf) {
		pages = [];
		return pdf.then(function (pdf) {
			numofpages = pdf.pdfInfo.numPages;
			for (var i = 1; i <= numofpages; i++) {
				pagepromises.push(pdf.getPage(i).then(function (page) {
						var textContent = page.getTextContent();
						return textContent.then(function (text) {
							return text.items.map(function (s) {
								return s.str;
							}).join('');
						});
					})
				);


			}
			return Promise.all(pagepromises).then(function (texts) {
				return texts.join('');
			});
		});

	}
}