import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {explodePlane} from "../aircraft/utils.js"
import {removeControls} from "../aircraft/controls.js"
export function setCollision (plane, hasTakenOff) {
    const groundTime = plane.getDynamicProperty("adn/groundTime")
    let currentSpeed = plane.getDynamicProperty("aircraft/current/speed") || 0.0
    if (groundTime == 0){
        
    }
    
    
}
function onLanded (plane, currentSpeed) {
    let rotation
    l
}