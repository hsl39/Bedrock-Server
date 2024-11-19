import { world, system, ItemStack } from '@minecraft/server'

const crusheableBlocks = [
    { input: 'minecraft:cobblestone', output: 'minecraft:gravel' },
    { input: 'minecraft:gravel', output: 'minecraft:dirt' },
    { input: 'minecraft:dirt', output: 'minecraft:sand' },
    { input: 'minecraft:netherrack', output: 'twm:crushed_netherrack' }
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:crusher', {
        onPlace(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0.375, x += 0.5, z += 0.5
            block.dimension.spawnEntity('twm:crusher', { x, y, z })
            block.dimension.runCommandAsync('tag @e[type=twm:crusher] add machine')
        },
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0.375, x += 0.5, z += 0.5
            const crusher = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.1, location: { x, y, z } })[0]
            if (crusher != undefined) {
                const speed = block.permutation.getState('twm:speed')
                const inventory = crusher.getComponent('minecraft:inventory').container
                if (inventory != undefined) {
                    const slot1 = inventory.getItem(0)
                    if (slot1 != undefined) {
                        let crushedBlock = null
                        const iscrusheable = crusheableBlocks.find((crusheable) => slot1.matches(crusheable.input))
                        if (iscrusheable != undefined) {
                            for (let i = 0; i < crusheableBlocks.length; i++) {
                                if (slot1.typeId == crusheableBlocks[i].input) {
                                    if (inventory.getSlot(0).amount > 1) {
                                        slot1.amount--
                                        inventory.setItem(0, slot1)
                                    } else {
                                        inventory.setItem(0,)
                                    }
                                    crushedBlock = crusheableBlocks[i].output
                                }
                            }
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
                            const chest = block.dimension.getBlock({ x, y, z }).getComponent('minecraft:inventory')
                            if (chest != undefined) {
                                chest.container.addItem(new ItemStack(`${crushedBlock}`, 1))
                            } else {
                                const entity = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.1, location: { x, y, z } })[0]
                                if (entity != undefined && entity.getComponent('minecraft:inventory') != undefined) {
                                    entity.getComponent('minecraft:inventory').container.addItem(new ItemStack(`${crushedBlock}`, 1))
                                } else {
                                    block.dimension.spawnItem(new ItemStack(`${crushedBlock}`, 1), { x, y, z })
                                }
                            }
                        }
                    }
                }
            }
        },
        onPlayerDestroy(e) {
            const { block } = e
            let { x, y, z } = block.location
            x += 0.5, z += 0.5, y += 0.375
            const inv = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.1, location: { x, y, z } })[0].getComponent('minecraft:inventory').container
            for (let j = 0; j < inv.size; j++) {
                if (inv.getItem(j) != undefined) {
                    let item = inv.getItem(j)
                    block.dimension.spawnItem(item, { x, y, z })
                }
            }
        }
    })
})

