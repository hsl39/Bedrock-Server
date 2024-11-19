import { world, system, ItemStack, ItemLockMode } from '@minecraft/server'
import {Aircrafts, minSpeedForLift} from "./Aircrafts.js"
import {removeControls} from "./aircraft/controls.js"
const Query = {
	families: [
		"warplane-private_container"
	]
}
system.runInterval(() => {
    let entities = world.getDimension("overworld").getEntities(Query);
	for (let container of entities) {
	    if (!container.isValid()) continue
	    if (isOwnerDead (container)) {
	        let player = container.getDynamicProperty("currentOwner")
	        if (!player) {
	            container.triggerEvent("adn:despawn")
	            continue
	        }
	        player = world.getEntity(player)
	        if (!player) {
	            container.triggerEvent("adn:despawn")
	            continue
	        }
	        removeControls(player, container)
	        console.warn("§2§lA Controls Removed")
	        container.triggerEvent("adn:despawn")
	        console.warn("§2§lA Plane Died")
	        
	    }
	}
},0)
function isOwnerDead (container) {
    let ownerId = container.getDynamicProperty("adn/planeId")
    if (!ownerId) {
        //container.triggerEvent("adn:despawn")
        return true
    }
    let owner = world.getEntity(ownerId)
    if (!owner) return true
    let health = owner.getComponent("health")
    return health.currentValue <= 0
}
 