import { world, ItemStack } from '@minecraft/server'

const blocks = [
    "minecraft:cobblestone",
    "minecraft:gravel",
    "minecraft:dirt",
    "minecraft:sand"
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.itemComponentRegistry.registerCustomComponent('twm:hammer', {
        onMineBlock(e) {
            const { block, minedBlockPermutation } = e
            let { x, y, z } = block.location
            x += 0.5, z += 0.5, y += 0.2
            const minedBlockId = minedBlockPermutation.type.id
            if (minedBlockId == 'minecraft:netherrack') {
                const closest = block.dimension.getEntities({ type: 'item', maxDistance: 2, location: { x, y, z } })[0]
                closest.kill()
                block.dimension.spawnItem(new ItemStack(`twm:crushed_netherrack`, 1), { x, y, z })
            } else {
                for (let i = 0; i < blocks.length - 1; i++) {
                    if (minedBlockId == blocks[i]) {
                        const closest = block.dimension.getEntities({ type: 'item', maxDistance: 2, location: { x, y, z } })[0]
                        closest.kill()
                        block.dimension.spawnItem(new ItemStack(`${blocks[i + 1]}`, 1), { x, y, z })
                    }
                }
            }
        }
    })
})