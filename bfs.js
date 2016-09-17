var parsefloors = require('./parsefloors.js');

parsefloors.getFloors(function (groundfloor, firstfloor) {
	console.log(firstfloor);
	console.log(groundfloor);
});