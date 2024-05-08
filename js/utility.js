function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
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
