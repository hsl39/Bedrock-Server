import {world} from '@minecraft/server';
import {showMenu} from "./workbench/main.js"
world.beforeEvents.worldInitialize.subscribe((e) => {
    e.blockComponentRegistry.registerCustomComponent("l4gg:warplane_workbench", {
        onPlayerInteract: event => {
            const {block, dimension, face, faceLocation, player } = event;
            if (player.isSneaking) return
            showMenu(player, block)
            
        }
    })
})