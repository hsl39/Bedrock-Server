import { world, system, ItemStack, ItemLockMode } from '@minecraft/server'
import {Aircrafts, minSpeedForLift} from "./Aircrafts.js"
import {removeControls} from "./aircraft/controls.js"

world.beforeEvents.entityRemove.subscribe(({removedEntity}) => {
    if (Aircrafts.hasOwnProperty(removedEntity.typeId)) {
        system.run(() => {
        //onDeath(removedEntity.id)
        //killPrivateContainer()
        })
    }
})

function onDeath(planeId) {
    let players = world.getAllPlayers()
    for (let player of players) {
        let propId = player.getDynamicProperty("adn/ride/id")
        if (propId == planeId) {
            player.camera.clear()
            player.setDynamicProperty("adn/ride/id", undefined)
            let container = player.getDynamicProperty("adn/private_container")
            
            if (container == undefined) return
            container = world.getEntity(container)
            console.warn(container.typeId)
            //if (container == undefined) return
            
            removeControls(player, container)
            container.triggerEvent("adn:despawn")
                console.warn("§2GG")
            
            return
        }
    }
}

function killPrivateContainer () {
    const Query = {
	families: [
		"private_container"
	]
}
    let entities = world.getDimension("overworld").getEntities(Query);
    
    for (let c of entities) {
        let planeId = c.getDynamicProperty("adn/planeId")
        if (planeId == undefined) {
            c.triggerEvent("adn:despawn")
            return
        }
        let plane = world.getEntity(planeId);
        if (plane == undefined) c.triggerEvent("adn:despawn")
    }
    console.warn("§4Conatiner killed")
}