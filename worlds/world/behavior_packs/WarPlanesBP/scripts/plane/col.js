import { world, system } from '@minecraft/server'

world.afterEvents.projectileHitBlock.subscribe((e) => {
    let ownerId = e.projectile.getDynamicProperty("ownerId")
    if (ownerId == undefined) {
        e.projectile.kill()
    }
    let owner = world.getEntity (ownerId)
    if (owner == undefined) {
        e.projectile.setDynamicProperty("ownerId", undefined)
        e.projectile.kill()
    } else {
        owner.addTag("collided")
        
    }
    
    world.sendMessage("collided")
    
})