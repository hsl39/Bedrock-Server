import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {Aircrafts} from "../Aircrafts.js"
import {takeOffInfo} from "./TakeOff.js"
import {easeTargetVelocity} from "../utils/easingFunction.js"
const Gravity = -0.6
export function setVelocityOnLanding (plane, rotationX) {
    let angleRatio = Math.max(rotationX, 0)
    angleRatio = 1 - (angleRatio/90)
    let currentSpeed = plane.getDynamicProperty("aircraft/current/speed")
    let newSpeed = currentSpeed * angleRatio
    plane.setDynamicProperty("aircraft/current/speed", newSpeed)
    if (currentSpeed < 0.35) {
        plane.setProperty("l4gg:has_taken_off", false)
    }
}
function colision (plane) {
    if (plane.isOnGround) {
        console.warn("collision at "+system.currentTick)
    }
}
function tp (plane) {
    plane.teleport (plane.location, {keepVelocity: true})
}
export function setVelocity (plane, rotation, targetSpeed, hasTakenOff) {
    //colision (plane)
    if (!hasTakenOff) {
        setPreTakeOffVelocity (plane, targetSpeed)
        return 
    }
    let speed = setCurrentSpeed (plane, targetSpeed)
    if (!speed || !rotation) {
        return
    }
    const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift
    
    plane.runCommand("effect @s slow_falling 1 1 true")
    
    let velocity = getEasedOutViewDirection (plane)
    velocity = adjustVelocityBasedOnAngle(velocity, rotation.x)
    velocity = VECTOR.normalize(velocity)
    velocity = VECTOR.multiplyByNum (velocity, speed)
    velocity.y = velocity.y * Math.min(speed/ minSpeedForLift, 1)
    velocity.y *= getDiminishingFactor(speed)
    let speedRatio = 1 - Math.min(speed/ minSpeedForLift, 1)
    let takeOffRotation = Aircrafts[plane.typeId].takeOffRotation
    /*
    if (!plane.hasTag("aircraft/takenOff") && rotation.x > takeOffRotation) {
        velocity.y = 0
    }
    */
    let downwardsPull = Gravity * speedRatio
    let xAngle = plane.getRotation()

    xAngle = NUMBER.clamp(Math.abs(xAngle.x * (1+speedRatio)) / 90, 0.09, 1)
    
    downwardsPull *= xAngle
    velocity.y += downwardsPull
    plane.setDynamicProperty("aircraft/gravity", downwardsPull)
    //plane.setDynamicProperty("aircraft/velocity", velocity)
    velocity= easeOutVelocity (plane, velocity)
    //plane.applyImpulse(velocity)
    
    let mgntd = VECTOR.getMagnitude(velocity)
    //let ratios = VECTOR.getAxisRatios (velocity)
    let ratios = calculateComponentRatios(velocity)
    let y = ratios.y * Math.sign(velocity.y) * mgntd
    //console.warn(velocity.y+" "+y.toFixed(3))
    
    plane.applyKnockback(velocity.x, velocity.z, (ratios.x + ratios.z) * mgntd, y)
    
}
function setPreTakeOffVelocity (plane, targetSpeed ) {
    let speed = setCurrentSpeed (plane, targetSpeed)
    let direction = plane.getViewDirection()
    if (speed <= 0) return
    let gravity = getGravity(plane, speed)
    let velocity = VECTOR.multiplyByNum (direction, speed)
    velocity.y += gravity
    velocity= easeOutVelocity (plane, velocity)
    let mgntd = VECTOR.getMagnitude(velocity)
    let ratios = calculateComponentRatios(velocity)
    let y = ratios.y * Math.sign(velocity.y) * mgntd
    plane.applyKnockback(velocity.x, velocity.z, (ratios.x + ratios.z) * mgntd, y)
} 

const EaseValue = 0.5
function getEasedOutViewDirection (plane) {
    let viewDirection = plane.getViewDirection()
    let deltaViewDirection = plane.getDynamicProperty("deltaViewDirection")
    if (deltaViewDirection) {
        return easeTargetVelocity(deltaViewDirection, viewDirection, EaseValue)
    }
    return viewDirection
}
function easeOutVelocity (plane, velocity) { 
    let deltaVelocity = plane.getDynamicProperty("aircraft/velocity")
    let easedVelocity = deltaVelocity ? easeTargetVelocity(deltaVelocity, velocity, 0.2) : velocity
    plane.setDynamicProperty("aircraft/velocity", easedVelocity)
    return easedVelocity
}

function getDiminishingFactor(speed) {
    //I use this so the vertical speed doesn't get too high
    const base = 100;
    const intensity = 0.4; // Adjust intensity as needed
    let diminished = base / (1 + speed * intensity);
    return diminished / 100;
}

const Acceleration= 0.015
const Deceleration= -0.003
const AccelerationOnGround = 0.009
const DecelerationOnGround = -0.009
function setCurrentSpeed (plane, targetSpeed) {
    let currentSpeed = plane.getDynamicProperty("aircraft/current/speed") || 0.0
    let airTime = plane.getDynamicProperty("adn/aircraft/airTime") || 0
    if (currentSpeed > targetSpeed) {
        let deceleration = plane.isOnGround && airTime < 80 ? DecelerationOnGround : Deceleration
        currentSpeed = currentSpeed + deceleration
        currentSpeed = Math.max(currentSpeed, 0.005)
    } else {
        let acceleration = plane.isOnGround ? AccelerationOnGround : Acceleration
        
        currentSpeed = Math.min(currentSpeed + acceleration, targetSpeed)
    }
    plane.setDynamicProperty("aircraft/current/speed", currentSpeed)
    
    return currentSpeed
}


const adjustVelocityBasedOnAngle = (vector, yAngleInDegrees) => {
    const { x, y, z } = vector;
    const yAngleInRadians = yAngleInDegrees * (Math.PI / 180);
    const proportionXZ = Math.cos(yAngleInRadians);
    const proportionY = Math.sin(yAngleInRadians);
    const newX = x * proportionXZ;
    const newZ = z * proportionXZ;
    let newY = y * proportionY;
    newY = Math.abs(newY) * -Math.sign(yAngleInDegrees)
    return { x: newX, y: newY, z: newZ };
};
function calculateComponentRatios(vector) {
    const { x, y, z } = vector;
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    const ratioX = Math.abs(x) / magnitude;
    const ratioY = Math.abs(y) / magnitude;
    const ratioZ = Math.abs(z) / magnitude;

    return {
        x: parseFloat(ratioX.toFixed(2)),
        y: parseFloat(ratioY.toFixed(2)), 
        z: parseFloat(ratioZ.toFixed(2))
    };
}
function getGravity (plane, currentSpeed) {
    //const maxSpeed = Aircrafts[plane.typeId].speed.max
    const gravity = -0.1
    const minForLift = Aircrafts[plane.typeId].speed.minForlift
    const takeOffDuration = takeOffInfo[plane.typeId].duration
    const commitPoint = takeOffInfo[plane.typeId].commitPoint
    const takeOffProgress = plane.getDynamicProperty("takeOffProgress") || 0
    let takeOffRatio = Math.min(takeOffProgress / ( takeOffDuration * commitPoint), 1)
    let speedRatio = Math.min((currentSpeed)/ minForLift, 1)
    let ratio = 1 - (takeOffRatio + speedRatio + speedRatio)/3
    //console.warn("ratio " +ratio)
    let result = Gravity * ratio
    return result
    
}
//Created by L4ggcrafter/ned2z