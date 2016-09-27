var fs = require("fs");
var path = "c:\\nodejs\\Test.txt";
var data = "Hello from the Node writeFile method!";

fs.writeFile(path, data, function(error) {
     if (error) {
       console.error("write error:  " + error.message);
     } else {
       console.log("Successful Write to " + path);
     }
});