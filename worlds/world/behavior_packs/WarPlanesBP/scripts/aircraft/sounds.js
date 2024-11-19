import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
const soundDelays = {}
const MaxSpeedSound = 1.6;
const PlaneVolume = 0.45
export function playSoundEffects (plane, player, speed) {
    
    const currentTick = system.currentTick
    /*
    if (!soundDelays.hasOwnProperty(plane.id)) {
        soundDelays[plane.id] = {}
    }
    if (soundDelays[plane.id].propeller > currentTick && speed) return
    */
    if (currentTick % 2 > 0) return
    if (!speed || speed == 0) return
    const propellerSound = "plane.propeller"
    const planeSound = "plane.sound"
    let location = getLocation (player)
    let volume = speed / MaxSpeedSound
    volume *= PlaneVolume
    plane.dimension.playSound(propellerSound, location, {volume: volume})
    
    
    //planeSound
    //const onGroundValue = plane.isOnGround
    //player.runCommand(`playsound plane.sound @s`)
    plane.dimension.playSound(planeSound, location, {volume: volume})
    //soundDelays[plane.id].propeller = currentTick + 10
}
function getLocation (plane) {
    let direction = plane.getViewDirection()
    direction = VECTOR.multiplyByNum (direction, -14)
    let location = VECTOR.addWithVector(plane.location, direction)
    
    return location
}