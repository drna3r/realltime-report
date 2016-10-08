var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'is-dash'
});
var colors = require('colors');
var CronJob = require('cron').CronJob;
var http = require('http');
const util = require('util');
var parseString = require('xml2js').parseString;
var https = require('https');
var fs = require("fs");

var competitorid = '';
var POPULARITYURL = '';
var POPULARITYTEXT = '';
var POPULARITYSOURCE = '';
var REACHRANK = '';
var RANKDELTA = '';
var COUNTRYCODE = '';
var COUNTRYNAME = '';
var COUNTRYRANK = '';

/* Old rank for compair */
var POPULARITYTEXTold = '';

var resstatus = '';

new CronJob('*/10 * * * * *', function() {
	
	var options = {
    host: 'na3r.com',
    path: '/temp/data.xml'
}
var data = '';

var request = http.request(options, function (res) {
	if (resstatus = 200){
	resstatus = res.statusCode;
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        	
	
	var d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	console.log('................................................................'/*+'\n'+'\n'*/);
	console.log('Succided at : ' + d.green/* +'\n'*/);
		
	parseString(data, function (err, result) {
		/* Show Alexa Xml Code In Log Consoel*/
		//console.log(util.inspect(result, false, null).red + '\n');
		POPULARITYTEXT = result.ALEXA.SD[0].POPULARITY[0].$.TEXT;
		
		POPULARITYURL = result.ALEXA.SD[0].POPULARITY[0].$.URL;
		POPULARITYTEXT = result.ALEXA.SD[0].POPULARITY[0].$.TEXT;
		POPULARITYSOURCE = result.ALEXA.SD[0].POPULARITY[0].$.SOURCE;
		REACHRANK = result.ALEXA.SD[0].REACH[0].$.RANK;
		RANKDELTA = result.ALEXA.SD[0].RANK[0].$.DELTA;
		COUNTRYCODE = result.ALEXA.SD[0].COUNTRY[0].$.CODE;
		COUNTRYNAME = result.ALEXA.SD[0].COUNTRY[0].$.NAME;
		COUNTRYRANK = result.ALEXA.SD[0].COUNTRY[0].$.RANK;
		
	});	
	
if (POPULARITYTEXT != POPULARITYTEXTold) {
	var queryString = "INSERT INTO alexalog (competitorid, POPULARITYURL, POPULARITYTEXT, POPULARITYSOURCE, REACHRANK, RANKDELTA, COUNTRYCODE, COUNTRYNAME, COUNTRYRANK) VALUES ('9999','" + POPULARITYURL + "','" + POPULARITYTEXT +  "','" + POPULARITYSOURCE +  "','" + REACHRANK +  "','" + RANKDELTA +  "','" + COUNTRYCODE +  "','" + COUNTRYNAME + "','" + COUNTRYRANK + "')";
	 
	connection.query(queryString, function(err, rows, fields) {
		if (err) throw err;
		console.log("Successful Insert to DataBase!".gray);
	});
 }

	/* Write to file 
	var path = "c:\\nodejs\\log.txt";
	fs.writeFile(path, data, function(error) {
		 if (error) {
		   console.error("write error:  " + error.message);
		 } else {
		   console.log("Successful Write to " + path);
		   console.log('\n'+'\n'+'................................................................');
		 }
	});
		
		*/
		
	console.log(/*'\n'+'\n'+*/'................................................................');
	
    });
}else {console.log('Response Is not ok..!  / is : ${res.statusCode}');}});

if (POPULARITYTEXT != POPULARITYTEXTold) {
	
	https.get('https://api.telegram.org/bot144797928:AAH8UqLFcir7_rc7PGydDqFywRYYM2Jyh6c/sendmessage?chat_id=92128155&text=' + POPULARITYTEXT, (res) => {
	  console.log(`Got response: ${res.statusCode}`);
	  // consume response body
	  res.resume();
	}).on('error', (e) => {
	  console.log(`Successful Send to Telegram BOT!`);
	});
	
	POPULARITYTEXTold = POPULARITYTEXT;
}

	request.on('error', function (e) {
		console.log(e.message);
	});

request.end();
}, null, true, 'America/Los_Angeles');