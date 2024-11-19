export function getPointsOnVector(start, direction, length) {
    let points = [];

    // Normalize the direction vector
    let magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    let unitDirection = {
        x: direction.x / magnitude,
        y: direction.y / magnitude
    };

    // Calculate the end point of the vector
    let end = {
        x: start.x + unitDirection.x * length,
        y: start.y + unitDirection.y * length
    };

    // Bresenham's line algorithm to find all the integer points the line passes through
    let x1 = Math.round(start.x), y1 = Math.round(start.y);
    let x2 = Math.round(end.x), y2 = Math.round(end.y);
    let dx = Math.abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
    let dy = -Math.abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
    let err = dx + dy, e2;

    while (true) {
        points.push({ x: x1, y: y1 });

        if (x1 === x2 && y1 === y2) break;
        e2 = 2 * err;
        if (e2 >= dy) {
            err += dy;
            x1 += sx;
        }
        if (e2 <= dx) {
            err += dx;
            y1 += sy;
        }
    }
    return points;
}