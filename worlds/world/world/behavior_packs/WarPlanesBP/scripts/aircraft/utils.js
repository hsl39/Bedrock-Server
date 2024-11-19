import { world, system } from '@minecraft/server'
import {Rideable} from "./rideable.js"
import {removeControls} from "./controls.js"
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"

import {Aircrafts} from "../Aircrafts.js"

export function setHealthOnLanding (plane, angle) {
    let isEnabled = world.getDynamicProperty("adnAircraftDamageOnNoseDive")
    //console.warn(isEnabled)
    if (!isEnabled || angle < 20) return
    const baseDamage = 40
    let velocity = plane.setDynamicProperty("aircraft/velocity")
    let speed = VECTOR.getMagnitude(velocity)
    let damage =  Math.round(baseDamage * (angle/90))
    const healthComp = plane.getComponent("health")
    const currentHealth = healthComp.currentValue
    //console.warn("damage: "+damage+" speed: "+speed)
    
    if (damage < currentHealth) {
        plane.runCommand(`damage @s ${damage}`)
    } else {
        explodePlane(plane)
    }
    
}
export function explodePlane(plane) {
    let rider = Rideable.getRiderByType(plane, "minecraft:player")
    rider.addTag("vxRemoveCamera")
    killPrivateInventory (plane, rider)
        system.runTimeout(() => {
            rider.camera.clear()
        }, 10)
        
        rider.setDynamicProperty("adn/ride/id", undefined)
        plane.dimension.createExplosion(plane.location, 3, {causesFire: true, source: plane})
        plane.kill()

}
function killPrivateInventory (plane, rider) {
    let privateContainerEntity = Rideable.getRiderByType(plane, "adn:private_container")
	removeControls(rider, privateContainerEntity)
    privateContainerEntity.triggerEvent("adn:despawn")
	
}