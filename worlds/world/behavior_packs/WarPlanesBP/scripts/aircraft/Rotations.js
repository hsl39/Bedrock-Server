import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {Aircrafts, MaxAirTime} from "../Aircrafts.js"
import {setVelocityOnLanding} from "./general.js"
import {setHealthOnLanding} from "./utils.js"

export function setRotation (plane, player, hasTakeOff) {
    const currentSpeed = plane.getDynamicProperty("aircraft/current/speed")
    if (!currentSpeed) return undefined
    const hasTakenOff = plane.getProperty("l4gg:has_taken_off")
    const TargetRotation = player.getRotation()
    const ROTATION = {}
    if (true) {
    }
    
    
    ROTATION.y = getYRotation(plane, player, TargetRotation.y, currentSpeed)
    if (hasTakenOff) {
        ROTATION.x = getXRotation(plane, player, TargetRotation.x, currentSpeed)
    } else {
        //Setting the X Rotation Will be done at ./TakeOff.js
        ROTATION.x = plane.getDynamicProperty("aircraft/rotation/x") || 0
    }
    plane.setRotation(ROTATION)
    return ROTATION
}
function getYRotation (plane, rider, targetRotation, currentSpeed) {
    const currentRotation = plane.getRotation().y
    let rotationSpeed
    if (plane.isOnGround) {
       rotationSpeed = getGroundRotationValue (plane, currentSpeed)
    } else {
        rotationSpeed = getRotationValue (plane, currentSpeed, "y")
    }
    
    let difference = Angle.difference( currentRotation, targetRotation)
    difference /=4
    let rotationAmount = Math.min(Math.abs(difference), rotationSpeed) * Math.sign(difference)
    let rotation = currentRotation + rotationAmount
    return rotation
}

function getXRotation (plane, rider, targetRotation, currentSpeed) {
    let groundTime = plane.getDynamicProperty("adn/groundTime")
    const lowSpeed = Aircrafts[plane.typeId].speed.low
    if (groundTime == 1) {
        //use this to check its been on the ground for only one tick
        return getXRotationOnHitGround (plane)
    } else if (currentSpeed < lowSpeed && !plane.isOnGround) {
        return setXRotOnLowSpeed(plane, rider, targetRotation, currentSpeed)
    }
    const X = getXRotationMain (plane, rider, targetRotation, currentSpeed)
    return X
}
function getXRotationOnHitGround (plane, rider, targetRotation) {
    /*
    const CurrentRotation = plane.getDynamicProperty("aircraft/rotation/x")
    setHealthOnLanding(plane, CurrentRotation)
    setVelocityOnLanding(plane, CurrentRotation)
    */
    plane.setDynamicProperty("aircraft/rotation/x", 0)
    return 0
}

function getXRotationMain (plane, rider, targetRotation, currentSpeed) {
    const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift
    const MaxRotationSpeed = Aircrafts[plane.typeId].speed.x
    const MinRotationSpeed = Aircrafts[plane.typeId].rotationSpeed.xMin
    let airTime = plane.getDynamicProperty("adn/airTime")
    let groundTime = plane.getDynamicProperty("adn/groundTime")
    if (groundTime > 5) {
        //Use so that the plane doesn't face downwards when in the ground
        targetRotation = NUMBER.clamp(targetRotation, -25, 0)
    }
    
    let currentRot = plane.getDynamicProperty("aircraft/rotation/x") || 0
    
    let rotAmount = getRotationValue(plane, currentSpeed, "x")
    
    
    rotAmount = Math.max(rotAmount, MinRotationSpeed)
    //rotAmount = rotAmount * Math.max(airTime / MaxAirTime, 0.1)
    let rotX = Angle.moveToward(currentRot, targetRotation, rotAmount)
    rotX = clampRotationBasedOnSpeed(plane, rotX, currentSpeed, minSpeedForLift)
    
    plane.setDynamicProperty("aircraft/rotation/x", rotX)
    return rotX
}
function preTakeOffRotation (plane, rider, currentSpeed) {
    const delayAfterTakeOff = 20
    const takeOffTime = Aircrafts[plane.typeId].takeOff.duration || 40
    const maxAngle = Aircrafts[plane.typeId].takeOff.duration || 30
    const minSpeed = Aircrafts[plane.typeId].takeOff.minSpeed
    
}


function setXRotOnLowSpeed (plane, rider, riderRot, currentSpeed) {
    const maxDownwardPull = 12
    const minDownwardPull = 0.5
    const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift
    const lowSpeed = Aircrafts[plane.typeId].speed.low
    
    
    let currentRot = plane.getDynamicProperty("aircraft/rotation/x") || 0
    const speedRatio = 1 - (currentSpeed/lowSpeed)
    let downwardPullRate = maxDownwardPull * speedRatio
    
    if (riderRot.x < 0) {
        let upwardPull = riderRot.x
        let clamp = 90 * (currentSpeed/minSpeedForLift)
        upwardPull = NUMBER.clamp(upwardPull, -clamp, 0)
        upwardPull *= (currentSpeed/lowSpeed)
        downwardPullRate = Math.max(downwardPullRate + upwardPull, minDownwardPull)
        //console.warn("d "+downwardPullRate+"u "+upwardPull)
    }
    
    
    
    let rotX = Angle.moveToward(currentRot, 90, downwardPullRate)
    plane.setDynamicProperty("aircraft/rotation/x", rotX)
    return rotX
}

const preTakeOffClamp = -60
function getRealTimeHorizontalSpeed (plane) {
    let velocity = plane.getVelocity()
    velocity.y = 0
    let speed = VECTOR.getMagnitude(velocity)
    
    return speed
}
function clampRotationBasedOnSpeed (plane, angle, currentSpeed, MaxSpeed) {
    const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift
    let clampValue = -90 * (currentSpeed / minSpeedForLift)
    return Math.max(angle, clampValue)
}
function getGroundRotationValue (plane, currentSpeed) {
    const MaxSpeed = Aircrafts[plane.typeId].speed.max
    const MaxRotationSpeed = Aircrafts[plane.typeId].rotationSpeed.groundRotation
    let speedRatio = currentSpeed/MaxSpeed
    let result = MaxRotationSpeed * speedRatio
    return result
}
function getRotationValue (plane, currentSpeed, axis) {
    const MaxSpeed = Aircrafts[plane.typeId].speed.max
    const MaxRotation = Aircrafts[plane.typeId].rotationSpeed[axis]
    const MinRotation = Aircrafts[plane.typeId].rotationSpeed[axis+"Min"]
    let result = getRotationAdjustment(currentSpeed, MaxSpeed)
    return Math.max(result * MaxRotation, MinRotation)
}

function getRotationAdjustment(speed, maxSpeed) {
	const maxAdd = 0.25
	let ratio = (speed/(maxSpeed + maxAdd)) 
	let result = Math.sin(ratio * 3.1);
result = parseFloat(result.toFixed(2));
return result
}
//Created by L4ggcrafter/ned2z