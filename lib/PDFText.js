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
		 fileReader.readAsDataURL(file);

	}

	PDFText.prototype.ab2Str=function (buff,callback) {
		// var stringtext= String.fromCharCode(new Uint16Array(buff));
		// return stringtext;
		var bb = new Blob([buff]);

		var f = new FileReader();
		f.onload = function(e) {
			callback(e.target.result)
		}
		f.readAsText(bb);

	}
	PDFText.prototype.str2Ab=function (str,callback) {
		var bb = new Blob([str]);
		//bb.append(str);
		var f = new FileReader();
		f.onload = function(e) {
			callback(e.target.result);
		}
		f.readAsArrayBuffer(bb);
	}
	function dataURLtoBlob(dataurl) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {type:mime});
	}
	PDFText.prototype.getPDF =function (bin,fileName) {
		// var byteChar=atob(bin);
		// var byteNumbers=new Array(byteChar.length);
		// for(var i=0;i<byteChar.length;i++)
		// {
		// 	byteNumbers[i]=bytechar.charCodeAt(i);
		// }
		// var byteArray=new Uint8Array(byteNumbers);

	//	var blob = new Blob([bin],{type:"application/pdf"});

		saveAs(dataURLtoBlob(bin),fileName);
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