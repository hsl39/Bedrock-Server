import { world, system, EntityDamageCause} from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {explodePlane} from "./utils.js"
import {removeControls} from "../aircraft/controls.js"
const PlanesMaxHealth = {
    "l4gg:spitfire": 40,
    "l4gg:sbd_dauntless": 40
}
export function landingHandler (plane) {
    const groundTime = plane.getDynamicProperty("adn/groundTime")
    if (groundTime <= 0 || groundTime >= 2) return
    let currentSpeed = plane.getDynamicProperty("aircraft/current/speed") || 0.0
    let rotationX = plane.getDynamicProperty("aircraft/rotation/x") || 0
    if (rotationX < 0) {
        let newSpeed = currentSpeed * 0.9
        plane.setDynamicProperty("aircraft/current/speed", newSpeed)
        return
    }
    let angleRatio = 1 - (rotationX/90)
    
    if (rotationX > 15) {
        setDamage (plane, currentSpeed, rotationX)
    }
    
    
    let newSpeed = Math.max((currentSpeed * angleRatio) -0.2, 0)
    plane.setDynamicProperty("aircraft/current/speed", newSpeed)
    //console.warn("COLLISION New speed "+newSpeed +" Angle "+rotationX)
    if (newSpeed < 0.35) {
        plane.setProperty("l4gg:has_taken_off", false)
    }
    
}

function setDamage (plane, currentSpeed, angle) {
    const collisionOn = world.getDynamicProperty("aircraftCollision")
    if (collisionOn == "off") return
    const MaxHealth = PlanesMaxHealth[plane.typeId]
    const anglePercent =  (angle/90 )
    let damage = MaxHealth * anglePercent
    //console.warn("damage "+damage)
    if (angle < 45) {
        damage = damage * (currentSpeed + anglePercent)
    } else {
        damage = damage * (currentSpeed + 1)
    }
    const healthComp = plane.getComponent("health")
    const currentHealth = healthComp.currentValue
    if (damage < currentHealth) {
        plane.applyDamage(damage, {cause: EntityDamageCause.override})
    } else {
        explodePlane(plane)
    }
    
}
