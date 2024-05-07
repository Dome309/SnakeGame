const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const CELL_SIZE = 32;
const BG_COLOR = "#C000D3";
const SNAKE_COLOR = "#0CC8FF";
const SNAKE_HEAD_COLOR = "#4200FF";
const FOOD_COLOR = "#FFFFFF";
const TEXT_COLOR = "#FFFFFF";
const TEXT_COLOR_GAME_OVER = "#7A0086";
const FONT_STYLE_SCORE = "40px VT323";
const FONT_STYLE_GAME_OVER = "100px VT323";
const MIN_X = CELL_SIZE;
const MAX_X = 17 * CELL_SIZE;
const MIN_Y = 3 * CELL_SIZE;
const MAX_Y = 17 * CELL_SIZE;
const backGround = new Image();
backGround.src = "images/gameBoard.jpg";
const blueFood = new Image();
blueFood.src = "images/blueFood.png";
const purpleFood = new Image();
purpleFood.src = "images/purpleFood.png";

var score = 0;
var direction;
var snake = [];
snake[0] = {
    x: 9 * CELL_SIZE,
    y: 10 * CELL_SIZE
};
var foodSpawn = spawnFood();

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    var key = event.keyCode;
    if (key == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (key == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (key == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (key == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function drawSnakePart(x, y, isHead = false) {
    ctx.fillStyle = isHead ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    ctx.strokeStyle = SNAKE_HEAD_COLOR;
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
}

function drawFood(x, y, img) {
    ctx.drawImage(img, x, y);
}

function spawnFood() {
    var foodPosition;
    
        foodPosition = {
            x: Math.floor(Math.random() * 17 + 1) * CELL_SIZE,
            y: Math.floor(Math.random() * 15 + 3) * CELL_SIZE
        };

    return foodPosition;
}

function gameOver() {
    ctx.fillStyle = TEXT_COLOR_GAME_OVER;
    ctx.font = FONT_STYLE_GAME_OVER;
    var textWidth = ctx.measureText("Game Over").width;
    var textX = (gameBoard.width - textWidth) / 2;
    var textY = gameBoard.height / 2;
    ctx.fillText("Game Over", textX, textY);
}

function draw() {
    ctx.drawImage(backGround, 0, 0);

    for (var i = 0; i < snake.length; i++) {
        drawSnakePart(snake[i].x, snake[i].y, i === 0);
    }

    drawFood(foodSpawn.x, foodSpawn.y, blueFood);
    if (score % 5 == 0) {
        drawFood(foodSpawn.x, foodSpawn.y, purpleFood);
    }

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    var directionVector = getDirectionVector(direction);
    snakeX += directionVector.x;
    snakeY += directionVector.y;

    if (snakeX == foodSpawn.x && snakeY == foodSpawn.y) {
        score++;
        foodSpawn = spawnFood();
    } else {
        snake.pop();
    }

    var newHead = { x: snakeX, y: snakeY }

    if (snakeX < MIN_X || snakeX > MAX_X || snakeY < MIN_Y || snakeY > MAX_Y || collision(newHead, snake)) {
        clearInterval(game);
        gameOver();
        return;
    }

    snake.unshift(newHead);
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT_STYLE_SCORE;
    ctx.fillText(score, 5.3 * CELL_SIZE, 1.6 * CELL_SIZE);
}

function getDirectionVector(dir) {
    switch (dir) {
        case "LEFT":
            return { x: -CELL_SIZE, y: 0 };
        case "UP":
            return { x: 0, y: -CELL_SIZE };
        case "RIGHT":
            return { x: CELL_SIZE, y: 0 };
        case "DOWN":
            return { x: 0, y: CELL_SIZE };
        default:
            return { x: 0, y: 0 };
    }
}

var game = setInterval(draw, 100);
