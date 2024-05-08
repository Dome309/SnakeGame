const CELL_SIZE = 32;
const MIN_X = CELL_SIZE;
const MAX_X = 17 * CELL_SIZE;
const MIN_Y = 3 * CELL_SIZE;
const MAX_Y = 17 * CELL_SIZE;
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

function spawnFood() {
    var foodPosition;

    foodPosition = {
        x: Math.floor(Math.random() * 17 + 1) * CELL_SIZE,
        y: Math.floor(Math.random() * 15 + 3) * CELL_SIZE
    };

    return foodPosition;
}

function gameOver() {
    clearInterval(game);
    ctx.fillStyle = TEXT_COLOR_GAME_OVER;
    ctx.font = FONT_STYLE_GAME_OVER;
    var textWidth = ctx.measureText("Game Over").width;
    var textX = (gameBoard.width - textWidth) / 2;
    var textY = gameBoard.height / 2;
    ctx.fillText("Game Over", textX, textY);
}

var game = setInterval(draw, 100);
