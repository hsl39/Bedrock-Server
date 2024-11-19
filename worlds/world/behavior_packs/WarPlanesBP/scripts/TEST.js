
import { world, system, EntityComponentTypes} from '@minecraft/server'
import {VECTOR} from "./mathUtils.js"


system.runInterval(() => {
    let players = world.getAllPlayers()
    for (let player of players) {
        continue
        let rotation = player.getRotation()
        // player.setRotation({x: rotation.x, y: rotation.y + 1})
        let tpOption = {
            
            rotation: {x: rotation.x, y: rotation.y + 2}
        }
        //player.teleport (player.location, tpOption)
        
        let facingLoc = player.getViewDirection()
        facingLoc = VECTOR.rotateXZ(facingLoc, 2)
        facingLoc = VECTOR.addWithVector(player.location, facingLoc)
        
        player.runCommand(`tp @s ~~~ facing ${facingLoc.x} ${facingLoc.y} ${facingLoc.z}`)
        player.onScreenDisplay.setActionBar("rotation= x: "+ rotation.x.toFixed(2)+" y: "+rotation.y.toFixed(2))
    }
}, 4)
world.afterEvents.entityHurt.subscribe((e) => {
    if (e.damageSource.cause != 'entityAttack') return
    world.sendMessage("[Test] damage: "+ e.damage)
})

