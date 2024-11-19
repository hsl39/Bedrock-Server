import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
const Opt = {
	width: 4,
	height: 2.5,
	distance: 0,
	margin: 0.5,
	removeCorners: true
}
export function isColliding (dimension, location, direction, rotation, opt = Opt) {
    const {width, height, distance, margin, removeCorners} = Opt;
    
    let directionXZ = VECTOR.create(direction.x, 0, direction.z)
    directionXZ = VECTOR.normalize(directionXZ)
    let orthogonalXZ = VECTOR.getXZOrthogonal(directionXZ, 1)
    let startPoint = location
    startPoint.y += 0.5
    let addVec = VECTOR.multiplyByNum (direction, distance)
    startPoint = VECTOR.addWithVector(startPoint, addVec)
    
    //world.getDimension("overworld").spawnParticle("adn:test", startPoint)
    addVec = VECTOR.multiplyByNum (orthogonalXZ, -(width/2 - margin/2))
    startPoint = VECTOR.addWithVector(startPoint, addVec)
    
    let orthogonalY = rotateVectorByPitch(direction, -90)
    orthogonalY = VECTOR.normalize(orthogonalY)
    orthogonalY = VECTOR.multiplyByNum(orthogonalY, margin)
    
    
    addVec = VECTOR.multiplyByNum(orthogonalY, -height )
    startPoint = VECTOR.addWithVector(startPoint, addVec)
    let xCount = width / margin
    let yCount = height / margin
    
    for (let i = 0; i < xCount; i++) {
        
        let v = VECTOR.multiplyByNum(orthogonalXZ, margin * i)
        let loc = VECTOR.addWithVector(startPoint, v)
        for (let j = 0; j < yCount; j++) {
            v = orthogonalY
            
            
            loc = VECTOR.addWithVector(loc, v)
            //dimension.spawnParticle("adn:test", loc)
            let hasCollided = castRay(dimension, location, direction)
            
            if (hasCollided) return true
            
        }
    }
    
    return false
}
function castRay (dimension, location, direction, distance = 3) {
    let rayOption = {
        maxDistance: distance,
        includeLiquidBlocks: false,
        includePassableBlocks: false
    }
    let result = dimension.getBlockFromRay(location, direction, rayOption)
    
    
    if (result != undefined) return true
    return false
}
export function getRayLocations (dimension, location, direction, rotation, opt = Opt) {
    const {width, height, distance, margin, removeCorners} = Opt;
    
    let directionXZ = VECTOR.create(direction.x, 0, direction.z)
    directionXZ = VECTOR.normalize(directionXZ)
    let orthogonalXZ = VECTOR.getXZOrthogonal(directionXZ, 1)
    let startPoint = location
    startPoint.y += 1
    let addVec = VECTOR.multiplyByNum (direction, distance)
    startPoint = VECTOR.addWithVector(startPoint, addVec)
    
    //world.getDimension("overworld").spawnParticle("adn:test", startPoint)
    addVec = VECTOR.multiplyByNum (orthogonalXZ, -(width/2 - margin/2))
    startPoint = VECTOR.addWithVector(startPoint, addVec)
    
    let orthogonalY = rotateVectorByPitch(direction, -90)
    orthogonalY = VECTOR.normalize(orthogonalY)
    orthogonalY = VECTOR.multiplyByNum(orthogonalY, margin)
    
    
    addVec = VECTOR.multiplyByNum(orthogonalY, -height )
    startPoint = VECTOR.addWithVector(startPoint, addVec)
    let xCount = width / margin
    let yCount = height / margin
    let locations = []
    
    for (let i = 0; i < xCount; i++) {
        
        let v = VECTOR.multiplyByNum(orthogonalXZ, margin * i)
        let loc = VECTOR.addWithVector(startPoint, v)
        
        for (let j = 0; j < yCount; j++) {
            loc = VECTOR.addWithVector(loc, orthogonalY)
            
            locations.push(loc)
        }
    }
    if (removeCorners) {
        locations.splice(xCount * (yCount - 1), 1)
        locations.splice(yCount - 1, 1)
        
        locations.splice(0, 1)
        locations.splice(locations.length -1, 1)
        
    }
    
    return locations
}




function rotateVectorByPitch(vector, pitchAngle) {
    const pitchRad = pitchAngle * (Math.PI / 180);

    const cosPitch = Math.cos(pitchRad);
    const sinPitch = Math.sin(pitchRad);

    const newY = vector.y * cosPitch - (Math.sqrt(vector.x * vector.x + vector.z * vector.z)) * sinPitch;
    const newXZMagnitude = vector.y * sinPitch + (Math.sqrt(vector.x * vector.x + vector.z * vector.z)) * cosPitch;
    const originalXZMagnitude = Math.sqrt(vector.x * vector.x + vector.z * vector.z);
    const scale = newXZMagnitude / (originalXZMagnitude || 1); // Avoid division by zero

    const newX = vector.x * scale;
    const newZ = vector.z * scale;

    const magnitude = Math.sqrt(newX * newX +newY * newY+ newZ * newZ);
    const normalizedVector = {
        x: newX/magnitude,
        y: newY/magnitude,
        z: newZ/magnitude 
    };
    return normalizedVector;
}