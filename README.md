# PDFText

PDFText is a javascript libary which makes PDF to text conversion a breeze.
Its just import and use.


##Getting started


To get PDFText.js 
you can clone the project or directly download the javascipt file from the lib folder.

###Usage
######HTML markup(index.html)

```
<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>PDFText</title>
          <script src="Scripts/PDFText.js"></script>
      </head>
      <body>
      <div id="content"></div>
      <input type='file' id='my-file' onchange='upload()' accept='application/pdf'/>
      <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@1.9.632/build/pdf.min.js" type='text/javascript'></script>
      <script src="lib/PDFText.js" type="text/javascript"></script>
      <script src="Scripts/app.js" type='text/javascript'></script>
      </body>
      </html>
 ```

this  will create a file upload with file being read onchange event.
Two javascript library are pre requisite.

- PDF.js
- PDFText.js

these two scripts must be included first.

``` html
<!--PDF.js-->
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@1.9.632/build/pdf.min.js" type='text/javascript'></script>
<!--PDFText.js-->
<script src="lib/PDFText.js" type="text/javascript"></script>
```


#####JavaScript(app.js)
you just have to create an object of PDFText class and call the get function passing the file url and the callback function.
```js
var pdfText = new PDFText();
pdfText.get(tmppath, function (text) {
	/* all operations of the return text can be done here */
document.getElementById('content').innerHTML = '<p>' + text + '</p>';
		});
```

the upload function which is called by the onchange event of the file upload.

```js
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

```