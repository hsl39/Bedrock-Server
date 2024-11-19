import { world, ItemStack } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:cobble_generators', {
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            switch (block.permutation.getState('minecraft:facing_direction')) {
                case 'up':
                    y -= 1
                    break
                case 'down':
                    y += 1
                    break
                case 'north':
                    z += 1
                    break
                case 'south':
                    z -= 1
                    break
                case 'west':
                    x += 1
                    break
                case 'east':
                    x -= 1
                    break
            }
            const e0 = block.permutation.getState('twm:e0')
            const e1 = block.permutation.getState('twm:e1')
            const quantity = (e1 * 10) + (e0 * 1)
            const chest = block.dimension.getBlock({ x, y, z }).getComponent('minecraft:inventory')
            if (chest != undefined) {
                chest.container.addItem(new ItemStack('cobblestone', (1 + quantity)))
                block.setPermutation(block.permutation.withState('twm:e0', 0))
                block.setPermutation(block.permutation.withState('twm:e1', 0))
            } else {
                y += 0.375, x += 0.5, z += 0.5
                const entity = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.25, location: { x, y, z } })[0]
                if (entity != undefined && entity.getComponent('minecraft:inventory') != undefined) {
                    entity.getComponent('minecraft:inventory').container.addItem(new ItemStack('cobblestone', 1 + quantity))
                    block.setPermutation(block.permutation.withState('twm:e0', 0))
                    block.setPermutation(block.permutation.withState('twm:e1', 0))
                } else {
                    if (quantity < 64) {
                        if (e0 < 10) {
                            block.setPermutation(block.permutation.withState('twm:e0', (e0 + 1)))
                        } else {
                            block.setPermutation(block.permutation.withState('twm:e0', 0))
                            block.setPermutation(block.permutation.withState('twm:e1', (e1 + 1)))
                        }
                    }
                }
            }
        },
        onPlayerInteract(e) {
            const { block, player } = e
            const e0 = block.permutation.getState('twm:e0')
            const e1 = block.permutation.getState('twm:e1')
            const quantity = (e1 * 10) + (e0 * 1)
            const equipment = player.getComponent('equippable')
            const selectItem = equipment.getEquipment('Mainhand')
            if (selectItem == undefined && quantity > 0) {
                player.getComponent('minecraft:inventory').container.addItem(new ItemStack('cobblestone', (quantity)))
                block.setPermutation(block.permutation.withState('twm:e0', 0))
                block.setPermutation(block.permutation.withState('twm:e1', 0))
            }
        }
    })
})