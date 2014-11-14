var formidable = require('formidable');
var fs = require('fs');
var fs = require('fs-extra');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('fileupload', { title: 'Express' });
});

router.post("/fileupload", function(req, res) {
	var form = new formidable.IncomingForm();

	//setup the form events
	//to display a progress bar
	form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
 
 	//error event
    form.on('error', function(err) {
        console.error(err);
    });
 
 	//file upload complete
    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        console.log(temp_path);
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = '/home/emerald/tmp/';
 
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success! " + new_location + file_name)
            }
        });
        /* display a page to inform the user of the upload */
        res.render('uploadcomplete', { "uploadfilename": file_name });
    });

	form.parse(req);

})

   
 
module.exports = router;
