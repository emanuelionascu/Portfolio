const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y){
        this.x = x;
        this.y = y;
    
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//Game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    if (score > 2) {
        speed = 11;
    }

    if (score > 5) {
        speed = 15;
    }
    setTimeout(drawGame, 1000/speed);
    
}

function isGameOver(){
    let gameOver = false;

    if(xVelocity === 0 && yVelocity === 0) {
        return false;
    }
    

    //Walls hit
    if(headX < 0 ) {
        gameOver = true;
    }
    else if(headX === tileCount) {
        gameOver = true;
    }
    else if(headY < 0 ) {
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if(gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "60px Verdana";
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0",  "red");
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "12px Verdana";
    ctx.fillText("Score " + score, canvas.width-50, 10);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = "lime"
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = "green";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if(appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //Up arrow
    if(event.keyCode == 38) {
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //Down arrow
    if(event.keyCode == 40) {
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //Left arrow
    if(event.keyCode == 37) {
        if(xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //Right arrow
    if(event.keyCode == 39) {
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();



