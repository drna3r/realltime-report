var colors = require('colors');
var CronJob = require('cron').CronJob;
var http = require('http');
const util = require('util');
var parseString = require('xml2js').parseString;
var https = require('https');
var siteprank = '1';
var siteprankold = '1';


new CronJob('*/10 * * * * *', function() {
	
	var options = {
    host: 'data.alexa.com',
    path: '/data?cli=10&url=infosalamat.com'
}
var data = '';

var request = http.request(options, function (res) {
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        	
	
	var d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	console.log('................................................................'+'\n'+'\n');
	console.log('Succided at : ' + d.green +'\n');
		
	parseString(data, function (err, result) {
		console.log(util.inspect(result, false, null).red + '\n');
		siteprank = result.ALEXA.SD[0].POPULARITY[0].$.TEXT;
		
	});	
	var fs = require("fs");
	var path = "c:\\nodejs\\log.txt";
	fs.writeFile(path, data, function(error) {
		 if (error) {
		   console.error("write error:  " + error.message);
		 } else {
		   console.log("Successful Write to " + path);
		   console.log('\n'+'\n'+'................................................................');
		 }
	});
		

    });
});

if (siteprank != siteprankold) {
	
	https.get('https://api.telegram.org/bot144797928:AAH8UqLFcir7_rc7PGydDqFywRYYM2Jyh6c/sendmessage?chat_id=92128155&text=' + siteprank, (res) => {
	  console.log(`Got response: ${res.statusCode}`);
	  // consume response body
	  res.resume();
	}).on('error', (e) => {
	  console.log(`Got error: ${e.message}`);
	});
	
	siteprankold = siteprank;
}

	request.on('error', function (e) {
		console.log(e.message);
	});

request.end();
}, null, true, 'America/Los_Angeles');