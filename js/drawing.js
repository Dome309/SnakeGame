const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const SNAKE_COLOR = "#0CC8FF";
const SNAKE_HEAD_COLOR = "#4200FF";
const TEXT_COLOR = "#FFFFFF";
const TEXT_COLOR_GAME_OVER = "#7A0086";
const FONT_STYLE_SCORE = "40px VT323";
const FONT_STYLE_GAME_OVER = "100px VT323";
const backGround = new Image();
backGround.src = "images/gameBoard.jpg";
const blueFood = new Image();
blueFood.src = "images/blueFood.png";
const purpleFood = new Image();
purpleFood.src = "images/purpleFood.png";

function drawSnakeBody(x, y, isHead = false) {
    ctx.fillStyle = isHead ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    ctx.strokeStyle = SNAKE_HEAD_COLOR;
    ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
}

function drawFood(x, y, img) {
    ctx.drawImage(img, x, y);
}

function draw() {
    ctx.drawImage(backGround, 0, 0);

    for (var i = 0; i < snake.length; i++) {
        drawSnakeBody(snake[i].x, snake[i].y, i === 0);
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
        gameOver();
        return;
    }

    snake.unshift(newHead);
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = FONT_STYLE_SCORE;
    ctx.fillText(score, 5.3 * CELL_SIZE, 1.6 * CELL_SIZE);
}
