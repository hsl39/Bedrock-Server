import { world, system, ItemStack, ItemLockMode } from '@minecraft/server'
import {setUpPrivateContainer} from "./aircraft/privateContainer.js"
const Planes = [
    "l4gg:spitfire",
    "l4gg:sbd_dauntless",
    "l4gg:bf109"
    ]

world.afterEvents.entitySpawn.subscribe((e) => {
    initializePlane (e.entity)
    
})
function  initializePlane (entity) {
    if (!Planes.includes(entity.typeId)) return
    const defaultSteering = world.getDynamicProperty("defaultSteering")
    entity.triggerEvent(defaultSteering)
    setUpPrivateContainer(entity)
    
}
function onPlayerSpawn (player) {
    world.sendMessage("test EntitySpwan Line 22")
    if (player.typeId != "minecraft:player") return
    world.sendMessage(player.name+" "+"just spawned")
    player.camera.reset()
    
}