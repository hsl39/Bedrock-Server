import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {Aircrafts} from "../Aircrafts.js"
export const takeOffInfo = {
    "l4gg:spitfire": {
        duration: 70,
        requiredSpeed: Aircrafts["l4gg:spitfire"].speed.minForLift,
        commitPoint: 0.65,
        angle: 45
    },
    "l4gg:sbd_dauntless": {
        duration: 75,
        requiredSpeed: Aircrafts["l4gg:sbd_dauntless"].speed.minForLift,
        commitPoint: 0.65,
        angle: 45
    },
    "l4gg:bf109": {
        duration: 70,
        requiredSpeed: Aircrafts["l4gg:spitfire"].speed.minForLift,
        commitPoint: 0.65,
        angle: 45
    },
}
export function takeOffPlane (plane) {
    const currentSpeed = plane.getDynamicProperty("aircraft/current/speed")
    const duration = takeOffInfo[plane.typeId].duration
    const requiredSpeed = takeOffInfo[plane.typeId].requiredSpeed
    const commitPoint = takeOffInfo[plane.typeId].commitPoint
    const takeOffProgress = plane.getDynamicProperty("takeOffProgress") || 0
    const takeOffProgressPercent = takeOffProgress/duration
    
    setXRotation (plane, takeOffProgressPercent)
    if (currentSpeed < requiredSpeed) {
        decreaseProgress (plane, 4)
        return
    }
    let isDisrupted = false
    if (takeOffProgressPercent < commitPoint) {
        isDisrupted = checkDisruption (plane)
    }
    if (isDisrupted) return
    if (takeOffProgressPercent >= commitPoint) {
        let xRotation = plane.getDynamicProperty("aircraft/rotation/x") || 0
        xRotation -= 2
        plane.setDynamicProperty("aircraft/rotation/x", xRotation)
    } 
        
    plane.setDynamicProperty("takeOffProgress", takeOffProgress + 1)
    if (takeOffProgress >= duration) {
        completeTakeOff (plane)
        return
    }
    //console.warn("take off progress" + takeOffProgress)
}
function setXRotation (plane, takeOffProgressPercent) {
    if (plane.isOnGround) {
        let xRotation = plane.getDynamicProperty("aircraft/rotation/x") || 0
        xRotation = Math.min(xRotation, 0)
        plane.setDynamicProperty("aircraft/rotation/x", xRotation)
    } else if (takeOffProgressPercent < 0.6) {
        let xRotation = plane.getDynamicProperty("aircraft/rotation/x") || 0
        let velocity = plane.getVelocity()
        xRotation = NUMBER.clamp(xRotation + 30 * Math.abs(Math.min(velocity.y, 0)), -89, 89)
        plane.setDynamicProperty("aircraft/rotation/x", xRotation)
    }
}
function checkDisruption (plane) {
    const rate = 5
    let velocity = plane.getVelocity ()
    const horizontalSpeed = Math.sqrt(velocity.x**2 + velocity.z**2)
    let decreaseAmount = 0
    if (velocity.y < 0) {
        decreaseAmount += rate
    }
    if (horizontalSpeed < 0.4) {
        decreaseAmount += rate * 3
        
    }
    if (decreaseAmount > 0) {
        decreaseProgress (plane, decreaseAmount)
        return true
    }
    return false
}
function collision (plane) {
    
}
function decreaseProgress (plane, rate) {
    const progress =  plane.getDynamicProperty("takeOffProgress") || 0
    if (progress == 0) return
    plane.setDynamicProperty("takeOffProgress", Math.max(progress - rate, 0))
}
function completeTakeOff (plane) {
    plane.setDynamicProperty("takeOffProgress", undefined)
    plane.setProperty("l4gg:has_taken_off", true)
}
function getHorizontalVelocityDiff (plane) {
    let target = plane.setDynamicProperty("aircraft/velocity", easedVelocity)
    let actual = plane.getVelocity()
    target = Math.sqrt(target.x**2 + target.z**2)
    actual = Math.sqrt(actual.x**2 + actual.z**2)
    return actual/target
}