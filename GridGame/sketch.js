let grid;
let score=0;
// to display color and size  for the  different numbers in the grid
let colorsSizes={
	"2": {
		size:64,
		color:"#00000"
	},
	"4":  {
		size:64,
		color:"#00000"
	},
	"8":  {
		size:64,
		color:"#00000"
	}, 
	"16":  {
		size:64,
		color:"#00000"
	}, 
	"32":  {
		size:64,
		color:"#00000"
	}, 
	"64":  {
		size:64,
		color:"#00000"
	},
	"128":  {
		size:36,
		color:"#00000"
	},
	"256":  {
		size:36,
		color:"#00000"
	},
	"512":  {
		size:64,
		color:"#00000"
	},
	"1024":  {
		size:18,
		color:"#00000"
	},
	"2048":  {
		size:18,
		color:"#00000"
	}
}

// to check whether the ganme is won or not by checking the tile value is equal to 2048
function isGameWon() {
	for (let i=0;i<4;i++) {
		for (let j=0;j<4;j++) {
			if (grid[i][j]==2048) {
				return true;
			}
		}
	}
	return false;
}

// to check whether the game is over or not by checking whether grid is full 
function isGameOver() {
	for (let i=0;i<4;i++) {
		for (let j=0;j<4;j++) {
			if (grid[i][j]==0) {
				return false;
			}
			if (i!=3 && grid[i][j]===grid[i][j+1]) {
				return false;
			}
			if (j!=3 && grid[i][j]===grid[i+1][j]) {
				return false;
			}

		}
	}
	return true;
}

//create blank grid

function blankGrid() {
	return [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
	];
}
// draw  the grid on the web page
function setup() {
	createCanvas(400,400);
	noLoop();
	grid=blankGrid();
	console.table(grid)
	addNumber();
	addNumber();
	//console.table(grid);
	updateCanvas();



}


// add the numbers if two same numbers appear in one row in consequent tiles
function addNumber() {
	let options=[];
	for (let i=0;i<4;i++) {
	for (let j=0;j<4;j++) {
	if (grid[i][j] ===0) {
	options.push({
	x:i,
	y:j
	});
	}
	}
	}

	if (options.length >0) {
	let spot=random(options);
	let r=random(1);
	grid[spot.x][spot.y]=r>0.5 ? 256 : 512;
   }
}

// to compare the tile values
function compare(a,b) {
	for (let i=0;i<4;i++) {
		for (let j=0;j<4;j++) {
			if (a[i][j]!==b[i][j]) {
				return true;
			}
		}
	}
	return false;
}
// to copy the grid and return a copy to compare
function copyGrid(grid) {
	let extra=blankGrid();
	for (let i=0;i<4;i++) {
		for (let j=0;j<4;j++) {
			extra[i][j]=grid[i][j];
		}
	}
	return extra;
}

// to reverse the grid
function flipGrid(grid) {
	for (let i=0;i<4;i++) {
		grid[i].reverse();
	}
	return grid;
}

// to rotate the grid
function rotateGrid(grid) {
	// body...
	let newGrid=blankGrid();
	for (let i=0;i<4;i++) {
		for (let j=0;j<4;j++) {
			newGrid[i][j]=grid[j][i];

		}
	}
	return newGrid;
}

// one "move" 
// play the game by the arrow keys
function keyPressed() {

	console.log(keyCode);
	let flipped=false;
	let rotated=false;
	let palyed=true;
	if (keyCode===DOWN_ARROW) {
		//do nothing
		played=true;
	} else if (keyCode===UP_ARROW) {
				grid=flipGrid(grid);
				flipped=true;
	} else if  (keyCode===RIGHT_ARROW) {
				grid=rotateGrid(grid);
				rotated=true;
	} else if  (keyCode===LEFT_ARROW) {
				grid=rotateGrid(grid);
				grid=flipGrid(grid);
				rotated=true;
				flipped=true;
	} else {
		played=false;
	}

		if (played) {
		let past=copyGrid(grid)
		for (let i=0;i<4;i++){
			grid[i]=operate(grid[i]);
		}
		let changed =compare(past,grid);
		
		if (flipped) {
			grid=flipGrid(grid);
		}
		if (rotated) {
		grid=rotateGrid(grid);
		grid=rotateGrid(grid);
		grid=rotateGrid(grid);

		}

		if (changed) {
			addNumber();

		}
		updateCanvas();


		let gameover=isGameOver();
		if (gameover) {
			console.log(" GAME OVER");
			//alert("GAME OVER");
			 //text("GAME OVER", 50,50)

		}
		let gamewon=isGameWon();
		if (gamewon) {
			console.log("GAME WON");
			//alert("GAME WON");
			//text("GAME OVER", 50,50)

		}


	} 

}

// to side the tiles and combine if they appear in same row 
function operate(row){
	row=slide(row);
	row=combine(row);
	row=slide(row);
	return row;

}

// update the canvas everytime a tile is moved and update the score
function updateCanvas() {
	background(255);
	drawGrid();
	select('#score').html(score);

}
//making a new array
function slide(row) {
	let arr=row.filter(val => val);
	let missing=4-arr.length;
	let zeros=Array(missing).fill(0);
	arr=zeros.concat(arr);
	return arr;
}
//operating on array
function combine(row) {
	for(let i=3;i>=1;i--){
		let a=row[i];
		let b=row[i-1];
		if(a==b) {
			row[i]=a+b;
			score+=row[i];
			row[i-1]=0;
		   // break;
			}
		}
		return row;
	}

// to draw the grid on the screen 
function drawGrid(){
	let w=100;
	for (let i=0;i<4;i++){
	for(let j=0;j<4;j++){
	noFill();
	strokeWeight(2);
	let val=grid[i][j];
	let s=val.toString();
	stroke(0);

	if (val !=0) {
	fill(colorsSizes[s].color);
	} else {
		noFill();
	}
	
	rect(i*w,j*w,w,w);
	if (grid[i][j]!==0){
	textAlign(CENTER,CENTER);
	let s="" +val;
	let len=s.length -1;
	noStroke(0);
	fill(0);
	textSize(colorsSizes[s].size);
	text(val,i*w+w/2,j*w+w/2);
	}


	}
   }
}
