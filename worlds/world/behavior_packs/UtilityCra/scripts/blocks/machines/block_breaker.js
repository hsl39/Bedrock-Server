import { world } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:block_breaker', {
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            switch (block.permutation.getState('minecraft:facing_direction')) {
                case 'up':
                    y--
                    break
                case 'down':
                    y++
                    break
                case 'north':
                    z++
                    break
                case 'south':
                    z--
                    break
                case 'west':
                    x++
                    break
                case 'east':
                    x--
                    break
            }

            block.dimension.runCommand(`execute unless block ${x} ${y} ${z} bedrock unless block ${x} ${y} ${z} end_portal_frame unless block ${x} ${y} ${z} end_portal unless block ${x} ${y} ${z} portal unless block ${x} ${y} ${z} reinforced_deepslate unless block ${x} ${y} ${z} command_block unless block ${x} ${y} ${z} chain_command_block unless block ${x} ${y} ${z} repeating_command_block run setblock ${x} ${y} ${z} air destroy`)
        }
    })
})