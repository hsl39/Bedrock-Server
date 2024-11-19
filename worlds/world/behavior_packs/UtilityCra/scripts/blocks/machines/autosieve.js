import { world, system, ItemStack } from '@minecraft/server'

const sievableBlocks = [
    { input: 'minecraft:gravel', output: '"sieve/mesh_3/gravel"' },
    { input: 'minecraft:dirt', output: '"sieve/mesh_3/dirt"' },
    { input: 'minecraft:sand', output: '"sieve/mesh_3/sand"' },
    { input: 'minecraft:grass', output: '"sieve/mesh_3/grass"' },
    { input: 'minecraft:soul_sand', output: '"sieve/mesh_3/soulsand"' },
    { input: 'twm:crushed_netherrack', output: '"sieve/mesh_3/netherrack"' }

]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:autosieve', {
        onPlace(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0.375, x += 0.5, z += 0.5
            block.dimension.spawnEntity('twm:autosieve', { x, y, z })
            block.dimension.runCommandAsync('tag @e[type=twm:autosieve] add machine')
        },
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0.375, x += 0.5, z += 0.5
            const autosieve = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.1, location: { x, y, z } })[0]
            if (autosieve != undefined) {
                const speed = block.permutation.getState('twm:speed')
                const inventory = autosieve.getComponent('minecraft:inventory').container
                if (inventory != undefined) {
                    const slot1 = inventory.getItem(0)
                    if (slot1 != undefined) {
                        let lootTable = null
                        const isSievable = sievableBlocks.find((sievable) => slot1.matches(sievable.input))
                        if (isSievable != undefined) {
                            for (let i = 0; i < sievableBlocks.length; i++) {
                                if (slot1.typeId == sievableBlocks[i].input) {
                                    if (inventory.getSlot(0).amount > 1) {
                                        slot1.amount--
                                        inventory.setItem(0, slot1)
                                    } else {
                                        inventory.setItem(0,)
                                    }
                                    lootTable = sievableBlocks[i].output
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
                                block.dimension.runCommand(`loot insert ${x} ${y} ${z} loot ${lootTable}`)
                            } else {
                                block.dimension.runCommand(`loot spawn ${x} ${y} ${z} loot ${lootTable}`)
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

