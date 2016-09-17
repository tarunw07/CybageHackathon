var fs = require("fs");

var groundfloor = [[]];
var firstfloor = [[]];

exports.getFloors = function (callback) {
	//parsing ground floor
	fs.readFile('groundfloor', function (err, data) {
   		if (err) {
       		return console.error(err);
   		}
   		data = data.toString();
   		var i = 0, k = 0;
   		while(data[k]) {
   			if (data[k] == '\n'){
   				i += 1;
	   			groundfloor.push([])
   			}
   			else {
   				groundfloor[i].push(data[k]);
   			}
   			k += 1;
   		}
   		fs.readFile('firstfloor', function (err, data) {
		   if (err) {
		       return console.error(err);
		   }
		   data = data.toString();
		   var i = 0, k = 0;
		   while(data[k]) {
		   		if (data[k] == '\n'){
		   			i += 1;
		   			firstfloor.push([])
		   		}
		   		else {
		   			firstfloor[i].push(data[k]);
		   		}
		   		k += 1;
		   }
		   callback(groundfloor, firstfloor);
		});
	});
}

