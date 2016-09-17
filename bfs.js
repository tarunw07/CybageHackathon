var parsefloors = require('./parsefloors.js');


function bfs(currentx, currenty, goalx, goaly, goalfloor, groundfloor, firstfloor, callback) {
	var temp;
	if(goalfloor != 0) {
		temp = find('2', groundfloor);
		goalx1 = temp[0];
		goaly1 = temp[1];
		temp = find('*', groundfloor);
		goalx2 = temp[0];
		goaly2 = temp[1];
		var finalpath = [];
		singleFloorBfs(currentx, currenty, goalx1, goaly1, groundfloor, function(path1) {
			//path1 -> start to goalx1, goaly1
			path1.splice(-1);
			finalpath += path1;
			singleFloorBfs(goalx1, goaly1, goalx2, goaly2, groundfloor, function(path2) {
				//path2 -> goalx1, goaly1 to goalx2, goaly2
				path2.splice(-1)
				finalpath += path2;
				singleFloorBfs(goalx2, goaly2, goalx, goaly, firstfloor, function(path3) {
					console.log(path3);
					finalpath += path3;
					callback(finalpath);
				});
			});
		});
	}
	else{
		singleFloorBfs(currentx, currenty, goalx, goaly, groundfloor, function(path_) {
			console.log(path_);
		})
	};	

}

//x, y are current coordinates....single Floor Bfs returns path from (x, y) to (goalx, goaly) where floor is 2 * 2 matrix
function singleFloorBfs(x, y, goalx, goaly, floor, callback) {
	var stack = [], path_ = [], temp, xmax, ymax, visited = {};
	stack.push([x, y, []]);
	xmax = floor.length;
	ymax = floor[0].length;
	visited[[x, y]];

	while(stack.length != 0) {
		temp = stack.pop()
		x = temp[0];
		y = temp[1];
		path_ = temp[2];
		path_.push([x, y]);
		if (x == goalx && y == goaly) {
			callback(path_);
			break;
		}	
		if(!isVisited(x + 1, y) && x + 1 < xmax && (floor[x + 1][y] == '.' || floor[x + 1][y] == '2')) {
			stack.push([x + 1, y, path_]);
			//add to visited
			visited[[x + 1, y]] = 1;
		}

		if(!isVisited(x - 1, y) && 0 <= x - 1 && (floor[x - 1][y] == '.' || floor[x - 1][y] == '2')) {
			stack.push([x - 1, y, path_]);
			//add to visited
			visited[[x - 1, y]] = 1;
		}

		if(!isVisited(x, y + 1) && y + 1 < ymax && (floor[x][y + 1] == '.' || floor[x][y + 1] == '2')) {
			stack.push([x, y + 1, path_]);
			visited[[x, y + 1]] = 1;
		}

		if(!isVisited(x, y - 1) && 0 <= y - 1 && (floor[x][y - 1] == '.' || floor[x][y - 1] == '2')) {
			stack.push([x, y - 1, path_]);
			visited[[x, y - 1]] = 1;
		}

	}

	function isVisited(x, y) {
		return visited[[x, y]] == 1;
	}

}

function find(ch, floor) {
	var i = 0, j = 0;
	for(var i = 0; i < floor.length; i++) {
		for(var j = 0; j < floor[i].length; j++) {
			if(floor[i][j] == ch )
				return [i, j]; 
		}
	}
}


parsefloors.getFloors(function (groundfloor, firstfloor) {
	bfs(9, 3, 8, 5, 1, groundfloor, firstfloor, function(path_) {
		console.log(path_);
	})
	//console.log(temp);
});