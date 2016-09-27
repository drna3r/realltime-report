var http = require('http');
var parseString = require('xml2js').parseString;

var options = {
    host: 'data.alexa.com',
    path: '/data?cli=10&url=infosalamat.com'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
		parseString(data, function (err, result) {
    console.dir(result.ALEXA.SD[0].POPULARITY[0].$.TEXT);
});

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();