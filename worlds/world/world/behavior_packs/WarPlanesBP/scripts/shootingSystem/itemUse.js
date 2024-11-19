//By L4ggcrafter
import { world, system, ItemStack} from '@minecraft/server'
import {PlanesGunData} from "./planesGunsData.js"
import {PlaneGuns} from "./Guns.js"
import {Bombers} from "./bombers.js"
world.beforeEvents.itemUse.subscribe(({itemStack, source, useDuration}) => {
    if (itemStack.typeId != "l4gg:fire_gun") return
    let plane = getRidingPlane(source)
    if (!plane) return
    if (PlanesGunData[plane.id]?.machineGun) {
        PlanesGunData[plane.id].machineGun.isActive = true
        
    }
})

world.afterEvents.itemStopUse.subscribe(({itemStack, source, useDuration}) => {
    if (itemStack.typeId == "l4gg:fire_gun") {
        let plane = getRidingPlane(source)
        if (!plane) return
        if (PlanesGunData[plane.id]?.machineGun) {
            PlanesGunData[plane.id].machineGun.isActive = false
            
        }
    } else if (itemStack.typeId == "l4gg:drop_bomb") {
        let plane = getRidingPlane(source)
        if (!plane) return
        dropBomb (plane)
    }
})


function getRidingPlane (player) {
    let ridingCompt = player.getComponent("riding")
    if (ridingCompt) {
        return ridingCompt.entityRidingOn
    }
    return undefined
}
const BombersCooldown = {}

function dropBomb(plane) {
    if (!Bombers.hasOwnProperty(plane.typeId) || plane.isOnGround) return


    const cooldown = PlanesGunData[plane.id].bomberCooldown 

    // If cooldown is still active, decrease it and return
    if (cooldown > 0) {
        BombersCooldown[plane.id] = cooldown - 1
        console.warn("-BombersCooldown: " + BombersCooldown[plane.id])
        return
    }

    // Set the cooldown after dropping a bomb
    PlanesGunData[plane.id].bomberCooldown  = 16

    const bombId = "l4gg:light_bomb"
    const location = plane.location
    location.y -= 2

    // Spawn bomb entity
    let bomb = plane.dimension.spawnEntity(bombId, location)
    let projectile = bomb.getComponent("projectile")

    projectile.owner = plane
}