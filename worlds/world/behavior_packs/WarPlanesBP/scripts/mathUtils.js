
export const Angle = {
    difference: (angle1, angle2) => {
    angle1 = ((angle1 + 180) % 360) - 180;
    angle2 = ((angle2 + 180) % 360) - 180;
    let diff = angle2 - angle1;
    if (diff > 180) {
        diff -= 360;
    } else if (diff < -180) {
        diff += 360;
    }
    //diff = Math.min(Math.abs(diff), 175) * Math.sign(diff)
    return diff;
 },
 add: (angle1, angle2) => {
    angle1 = ((angle1 + 180) % 360) - 180;
    angle2 = ((angle2 + 180) % 360) - 180;
    let diff = angle2 + angle1;
    if (diff > 180) {
        diff -= 360;
    } else if (diff < -180) {
        diff += 360;
    }
    //diff = Math.min(Math.abs(diff), 175) * Math.sign(diff)
    return diff;
 },
 moveToward: (current, target, delta) => {
    let difference = (target - current) % 360;
    if (difference > 180) {
        difference -= 360;
    } else if (difference < -180) {
        difference += 360;
    }
    if (Math.abs(difference) <= delta) {
        current = target;
    } else {
        current += Math.sign(difference) * delta;
    }
    current = (current + 180) % 360;
    if (current < 0) {
        current += 360;
    }
    current -= 180;

    return current;
   },
   getYRadian(vector) {
       const { x, y, z } = vector;
       const magnitude = Math.sqrt(x * x + y * y + z * z);
       const normalizedY = y / magnitude;
       const angleY = Math.acos(normalizedY);
       return angleY;
    },
    radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    },
    degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
    },
    lerprotate(startAngle, endAngle, t) {
    t = Math.max(0, Math.min(1, t));
    startAngle = ((startAngle % 360) + 360) % 360;
    endAngle = ((endAngle % 360) + 360) % 360;

    if (startAngle > 180) startAngle -= 360;
    if (endAngle > 180) endAngle -= 360;

    let delta = endAngle - startAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    return startAngle + delta * t;
}
}
export const VECTOR = {
    create (x, y, z) {
		return {x: x, y: y, z:z}
	},
	getMagnitude (vector) { 
	    let magnitude = 0
	    for (let p in vector) {
	        magnitude += Math.pow(vector[p], 2)
	    }
	    return Math.sqrt(magnitude);
	},
    subtractWithVector(vector1, vector2) {
	let result = {}
	for (let prop in vector1) {
		result[prop] = vector1[prop] - vector2[prop]
	}
	return result;
        
    },
    normalize(vector) {
        let normalized = {};
        let magnitude = 0;
        
        for (let p in vector) {
            magnitude += vector[p] * vector[p];
        }
        
        magnitude = Math.sqrt(magnitude);
        
        if (magnitude === 0) {
            for (let p in vector) {
                normalized[p] = 0;
            }
        } else {
            for (let p in vector) {
                normalized[p] = vector[p] / magnitude;
            }
        }
        
        return normalized;
    },
    addWithVector(vector1, vector2) {
        let result = {};
        
        for (let prop in vector1) {
            result[prop] = vector1[prop] + vector2[prop];
        }
        
        return result;
    },
    multiplyByNum(vector1, num) {
        let result = {};
        
        for (let prop in vector1) {
            result[prop] = vector1[prop] * num;
        }
        
        return result;
    },
    rotateXZ(vector, angleDegrees) {
    const angleRadians = angleDegrees * (Math.PI / 180);
    const cosAngle = Math.cos(angleRadians);
    const sinAngle = Math.sin(angleRadians);

    const { x, y, z } = vector;
    const rotatedX = x * cosAngle - z * sinAngle;
    const rotatedZ = x * sinAngle + z * cosAngle;

    // Rounding to a fixed number of decimal places (e.g., 10 decimal places)
    const roundedX = Math.round(rotatedX * 1e10) / 1e10;
    const roundedZ = Math.round(rotatedZ * 1e10) / 1e10;

    return {
        x: roundedX,
        y: y,
        z: roundedZ
    }
    },
    getPointsOnVector(start, direction, length) {
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
        
    },
    getXZOrthogonal (vector, direction) {
	return {x: vector.z * (1 * direction), y:0, z: vector.x * (-1 * direction)
	}
},
    rotationToVector(X, Y) {
    const X_rad = Angle.degreesToRadians(X);
    const Y_rad = Angle.degreesToRadians(Y);

    const v_x = Math.cos(Y_rad) * Math.cos(X_rad);
    const v_y = Math.sin(X_rad);
    const v_z = Math.sin(Y_rad) * Math.cos(X_rad);

    return { x: v_x, y: v_y, z: v_z };
},
    rotateVectorByPitch(vector, pitchAngle) {
        const pitchRad = pitchAngle * (Math.PI / 180);
        const cosPitch = Math.cos(pitchRad);
        const sinPitch = Math.sin(pitchRad);
        const newY = vector.y * cosPitch - (Math.sqrt(vector.x * vector.x + vector.z * vector.z)) * sinPitch;
        const newXZMagnitude = vector.y * sinPitch + (Math.sqrt(vector.x * vector.x + vector.z * vector.z)) * cosPitch;
        const originalXZMagnitude = Math.sqrt(vector.x * vector.x + vector.z * vector.z);
        const scale = newXZMagnitude / (originalXZMagnitude || 1); 
        const newX = vector.x * scale;
        const newZ = vector.z * scale;
        const magnitude = Math.sqrt(newX * newX +newY * newY+ newZ * newZ);
        const normalizedVector = {
            x: newX/magnitude,
            y: newY/magnitude,
            z: newZ/magnitude 
        };
        return normalizedVector;
    },
    getAxisRatios(vector) {
        const { x, y, z } = vector;
        const magnitudeSquared = x * x + y * y + z * z;
        const ratioX = x * x / magnitudeSquared;
        const ratioY = y * y / magnitudeSquared;
        const ratioZ = z * z / magnitudeSquared;
        return {
            x: ratioX,
            y: ratioY,
            z: ratioZ
            
        };
        
    },
    getDotProduct(vector1, vector2) {
	let dotProduct = 0;
	for (let prop in vector1) {
		dotProduct += vector1[prop] * vector2[prop]
	}
	return dotProduct;
}
};
export const NUMBER = {
 	clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
  },
 	roundToNearestTenth(value) {
  return Math.round(value * 10) / 10;
  }
 }