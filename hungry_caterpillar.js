//a const variable is immutable meaning its va;ue cannot be reassigned
//create a variable called canvas that stores the html canvas
const canvas = document.getElementById('gameCanvas');
//ctx gets a method that returns a 2d drawing context for the canvas
const ctx = canvas.getContext('2d');
//startScreen gets the startScreen div element in the html file
//basically it stores the div with the id-startScreen 
const startScreen = document.getElementById('startScreen');

//set the width of the canvas to 600
canvas.width = 600;
//set the height of the canvas to 400
canvas.height = 400;

//creata an array called caterpillar
//this array will be used to creat the body of the caterpillar
let caterpillar = [];
//set the length of the caterpillar
let caterpillarLength = 15;
//set the speed of the caterpillar to 10
let caterpillarSpeed = 10;
//set the score to zero
let score = 0;
//set the state of the game 
let gameStarted = false;
//set the caterpillar to move to the right
let dx = caterpillarSpeed;
//set the horizontal movement of the caterpillar to zero
let dy = 0;
//add paused flag
let paused = false

//create function to create the caterpillar
function createCaterpillar() {
	//create a loop that loops for as much as the value of caterpillarLength
	//so in this case it will loop through 15 times which is the value of caterpilarLength
    for (let i = 0; i < caterpillarLength; i++) {
		//everytime the loop loops a small circle will be pushed into the caterpillar array
		//the x object is the horizontal position of the circle dots and 
		//the y object is the vertical position of the circle dots
		//so basically small circles will be created one after another 15 times and put 
		//in the caterpillar array so the 3 is the space between each circle
        caterpillar.push({ x: canvas.width / 2 - i * 4, y: canvas.height / 2 });
    }
}

//an object called leaf is created and its properties are its 
//horizontal(x) and vertical(y) position on the canvas 
//it just appears at random positions in the canvas
let leaf = {
    x: Math.floor(Math.random() * (canvas.width - 30)),
    y: Math.floor(Math.random() * (canvas.height - 30))
};

//create a function drawLeaf() to draw the leaf
function drawLeaf() {
	//give the leaf a green color
    ctx.fillStyle = 'green';
	//start drawing the leaf
    ctx.beginPath();
	// Start point (left center of the leaf)
    ctx.moveTo(leaf.x, leaf.y + 10);  
	//draw top curve of leaf
    ctx.bezierCurveTo(leaf.x, leaf.y, leaf.x + 20, leaf.y, leaf.x + 30, leaf.y + 10);
	//draw bottom curve of leaf
    ctx.bezierCurveTo(leaf.x + 20, leaf.y + 20, leaf.x, leaf.y + 20, leaf.x, leaf.y + 10);
	//fill the leaf with hreen
    ctx.fill();
}

//create a function drawCaterpillar() to draw the caterpillae
function drawCaterpillar() {
	//this creates the head of the caterpillar
	//so the caterpillar's head will be black
    ctx.fillStyle = 'black';
	//begin drawing
    ctx.beginPath();
	//create the first circle of the caterpillar array
    ctx.arc(caterpillar[0].x + 10, caterpillar[0].y + 10, 10, 0, Math.PI * 2);
	//make the first circle black
    ctx.fill();
	//for the rest of the circles they'll be brown
    ctx.fillStyle = '#80461B';
	//create a loop to loop through the caterpillar array 
    for (let i = 1; i < caterpillar.length; i++) {
		//begin drawing
        ctx.beginPath();
		//draw the rest of the circles in the caterpillar array
        ctx.arc(caterpillar[i].x + 9, caterpillar[i].y + 9, 9, 0, Math.PI * 2);
		//all the other circles which is the carterpillar's body will be brown
        ctx.fill();
    }
}

//create a function called updateCaterpillar()
//this will update the pistion of the caterpillar as it moves
function updateCaterpillar() {
	//an object called head is creeted
	//the properties of this object positions the head of the caterpillar
    const head = { x: caterpillar[0].x + dx, y: caterpillar[0].y + dy };
	//put the head object as the first item of the caterpillar array
    caterpillar.unshift(head);
	
	//if head's horizontal position is less than the leaf's horizontal position plus 30 and
    if (head.x < leaf.x + 30 &&
		//if head's horizontal position is plus 20 is more than the leaf's horizontal position and
        head.x + 20 > leaf.x &&
		//if head's vertical position is less than the leaf's vertical position plus 20 and
        head.y < leaf.y + 20 &&
		//if head's vertical position plus 20 is less than the leaf's vertical poistion
		//basically whenever the caterpillar eats the leaf
        head.y + 20 > leaf.y) {
		//call the placeLeaf() function to move the leaf to a new location
        placeLeaf();
		//add 10 to score
        score += 10;
		//increase the caterpillar's speed by 0.5
        caterpillarSpeed += 0.5;
    } else {
		//remove the last segment of the caterpillar
        caterpillar.pop();
    }
}

//create a function called placeLeaf()
//this function basically moves the leaf to a new random location
//whenever the caterpillar eats it.
function placeLeaf() {
    leaf.x = Math.floor(Math.random() * (canvas.width - 30));
    leaf.y = Math.floor(Math.random() * (canvas.height - 20));
}

//create a function called isGameOver()
function isGameOver() {
	//create a variable called head that stores the head of the caterpillar
	//which is the first circle in the caterpillar array
    const head = caterpillar[0];
	//Check if the head is outside the canvas boundaries
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        //If any condition is true, the head is out of bounds, so return true
		return true;
    }
	//create a loop that loops through the caterpillar's body or caterpillar array
    for (let i = 1; i < caterpillar.length; i++) {
		//Check if head is at the same position as the current segment of the caterpillar
        if (head.x === caterpillar[i].x && head.y === caterpillar[i].y) {
			//if both the x and y coordinates match, return true to indicate a collision
            return true;
        }
    }
	//if there are no collisions return false
    return false;
}

//create a function called gameOver()
function gameOver() {
	//choose yellow as the fill color
    ctx.fillStyle = 'yellow';
	//fill the entire canvas with yellow
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	//choose black as the fill color for the text
    ctx.fillStyle = 'black';
	//set the font size to 30 pixels and use Arial font
    ctx.font = '30px Arial';
	//center the text horizontally
    ctx.textAlign = 'center';
	//draw the text "GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

//create a function called drawScore()
function drawScore() {
	//choose black as the fill color
    ctx.fillStyle = 'black';
	//set the font size to 20 pixels and use Arial font
    ctx.font = '20px Arial';
	//display the score on the canvas 
	//set the position of the score at the top right corner of the canvas
	//set the font size of the score to 30 pixels
    ctx.fillText('Score: ' + score, canvas.width - 100, 30);
}

//create a function called clearCanvas()
function clearCanvas() {
	//clear the entire canvas, removing all previously drawn content
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//create a function called gameLoop()
function gameLoop() {
	//if the isGameOver() function returns true
    if (isGameOver()) {
		//call the gameOver() function
        gameOver();
		//exit current function
        return;
    }
	//if game is paused stop game
	if(paused) return;
	
	//call the clearCanvas() function to clear the canvas
    clearCanvas();
	//call the drawLeaf() function to draw the leaf
    drawLeaf();
	//call the updateCaterpillar() function
    updateCaterpillar();
	//call the drawCaterpillar() function
    drawCaterpillar();
	//call the drawScore function()
    drawScore();

	//set a timeout to call requestAnimationFrame with gameLoop after a delay based on caterpillarSpeed
    setTimeout(() => {
		//request the browser to call gameLoop to update the animation
        requestAnimationFrame(gameLoop);
		//the request will be carried out after 
		//1000miliseconds divided by the value of caterpillarSpeed 
    }, 1000 / caterpillarSpeed);
}

//create a function called startGame
function startGame() {
	//if the value of gameStarted is true
	//the ! indicates that gameStarted is not false 
	//which was the initial value of gameStarted
    if (!gameStarted) {
		//gameStarted is now set to true
        gameStarted = true;
		//hide the start screen by setting its display style to 'none'
        startScreen.style.display = 'none';
		//call createCaterpillar() function
        createCaterpillar();
		//call gameLoop()
        gameLoop();
    }
}

//create a function called togglePause()
function togglePause() {
	//the variable paused is now set to true
    paused = !paused;
	//if true
    if (!paused) {
		// Resume the game loop if unpaused
        gameLoop(); 
    }
}

//add an event listener for keydown events
document.addEventListener('keydown', event => {
	//if the spacebar is pressed
    if (event.code === 'Space') {
		//if gameStarted is true start game
		if(!gameStarted) {
			startGame();
		//if gameStarted is false
		} else {
			//call the togglePause() function
			//or basically pause game
			togglePause();
		}
    }
	
	if(!paused){
		//if the up arrow is pressed and the caterpillar is not moving
		//vertically, move up
		if (event.code === 'ArrowUp' && dy === 0) {
			dx = 0;
			dy = -caterpillarSpeed;
		}
	
		//if the down arrow is pressed and the caterpillar is not moving vertically,
		//move down
		if (event.code === 'ArrowDown' && dy === 0) {
			dx = 0;
			dy = caterpillarSpeed;
		}
	
		//if the left arrow is pressed and the caterpillar is not moving horizontally,
		//move left
		if (event.code === 'ArrowLeft' && dx === 0) {
			dx = -caterpillarSpeed;
			dy = 0;
		}
	
		//if the left arrow is pressed and the caterpillar is not moving horizontally,
		//move right
		if (event.code === 'ArrowRight' && dx === 0) {
			dx = caterpillarSpeed;
			dy = 0;
		}
	}
});
