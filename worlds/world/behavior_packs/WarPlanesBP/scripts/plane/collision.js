import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {isColliding} from "../utils/raycastCollision.js"
import {explodePlane} from "../aircraft/utils.js"
import {removeControls} from "../aircraft/controls.js"
export function collision (entity, rider, privateContainerEntity) {
    let collisionDetectionOn = world.getDynamicProperty("aircraftCollision")
    let currentSpeed = entity.getDynamicProperty("aircraft/current/speed")
    const hasTakenOff = entity.getProperty("l4gg:has_taken_off")
    if (collisionDetectionOn == "off" || !collisionDetectionOn) return
    
    if (currentSpeed < 0.5 && !hasTakenOff) {
        return
    } else if (collisionDetectionOn == "raycast") {
        raycastCollision (entity)
    } else if (collisionDetectionOn == "velocity") {
        velocityCollision(entity, rider)
    }
    
    
    let collided = false
    if (entity.hasTag("collided")) {
        system.runTimeout(() => {
            rider.camera.clear
        }, 20)
        rider.setDynamicProperty("adn/ride/id", undefined)
        entity.dimension.createExplosion(entity.location, 3, {causesFire: true, source: entity})
        removeControls(rider, privateContainerEntity)
        privateContainerEntity.triggerEvent("adn:despawn")
        entity.getComponent("rideable").ejectRiders()
        entity.kill()
        
    }
    
}
let HighestAngleDiff = 0
function testAngleDiff (angleDifference) {
    if (angleDifference > HighestAngleDiff) {
        HighestAngleDiff = angleDifference
        world.sendMessage("§4Highest Angle diff recirdedorded "+HighestAngleDiff)
    }
}
function velocityCollision (plane, rider) {
    let velocity = plane.getVelocity()
    let dynamicVelocity = plane.getDynamicProperty("aircraft/velocity")
    let m1 = VECTOR.getMagnitude(velocity)
    let m2 = VECTOR.getMagnitude(dynamicVelocity)
    if (plane.isOnGround) {
        let gravity = plane.getDynamicProperty("aircraft/gravity")
        velocity.y = 0
        dynamicVelocity.y = 0
    }
    velocity = VECTOR.normalize(velocity)
    dynamicVelocity = VECTOR.normalize(dynamicVelocity)
    let dotProduct = VECTOR.getDotProduct(dynamicVelocity, velocity)
    let angleDifference = dotProductToAngle(dotProduct, 1, 1)
    let planeRotation = plane.getRotation()
    let riderRotation = rider.getRotation()
    let planeRiderAngleDiff = Math.abs(Angle.difference(plane.getDynamicProperty("aircraft/rotation/x") || 0, riderRotation.x))
    planeRiderAngleDiff += Math.abs(Angle.difference(planeRotation.y, riderRotation.y))
    planeRiderAngleDiff /= 270
    
    angleDifference *= Math.min(1 - planeRiderAngleDiff, 1)
    if (angleDifference > 45) {
        console.warn(angleDifference)
        explodePlane(plane)
    }
    
    let log = "vel m: "+m1.toFixed(2)
    log += " dy vel m: "+m2.toFixed(2)
    log += " diff: "+angleDifference.toFixed(2)
    log += " p r diff "+planeRiderAngleDiff.toFixed(1)
    if (!rider.hasTag("l4gg-dev")) return
    testAngleDiff (angleDifference)
    plane.setDynamicProperty("collision/log", log)
}
function raycastCollision (entity) {
    let viewDirection = entity.getViewDirection()
    let rotation = entity.getRotation()
    
    let hasCollided = isColliding(entity.dimension, entity.location, viewDirection, rotation)
    if (hasCollided) {
        explodePlane(entity)
    }
    
}


function dotProductToAngle(dotProduct, magnitudeA, magnitudeB) {
    const cosTheta = dotProduct / (magnitudeA * magnitudeB);

    const clampedCosTheta = Math.min(1, Math.max(-1, cosTheta));
    const angleRad = Math.acos(clampedCosTheta);

    let angleDeg = angleRad * (180 / Math.PI);
    if (dotProduct < 0) {
        angleDeg = -angleDeg;
    }
    
    return angleDeg;
}