import { world, ItemStack } from '@minecraft/server'

const soils = [
    { id: 'twm:yellow_soil' },
    { id: 'twm:red_soil' },
    { id: 'twm:blue_soil' },
    { id: 'twm:black_soil' }
]

const saplings = [
    'minecraft:acacia_sapling',
    'twm:apple_sapling',
    'minecraft:bamboo',
    'minecraft:birch_sapling',
    'minecraft:cactus',
    'minecraft:cherry_sapling',
    'minecraft:dark_oak_sapling',
    'minecraft:jungle_sapling',
    'minecraft:kelp',
    'minecraft:mangrove_propagule',
    'minecraft:red_mushroom',
    'minecraft:oak_sapling',
    'minecraft:spruce_sapling',
    'minecraft:sugar_cane',
    'minecraft:warped_fungus',
    'minecraft:crimson_fungus'

]

const bonsais = [
    'twm:acacia_tree',
    'twm:apple_tree',
    'twm:bamboo',
    'twm:birch_tree',
    'twm:cactus',
    'twm:cherry_tree',
    'twm:darkoak_tree',
    'twm:jungle_tree',
    'twm:kelp',
    'twm:mangrove_tree',
    'twm:mushroom',
    'twm:oak_tree',
    'twm:spruce_tree',
    'twm:sugarcane',
    'twm:warped_tree',
    'twm:crimson_tree'
]

const lootTables = [
    `"bountiful_bonsais/acacia/acacia_`,
    `"bountiful_bonsais/apple/apple_`,
    `"bountiful_bonsais/bamboo/bamboo_`,
    `"bountiful_bonsais/birch/birch_`,
    `"bountiful_bonsais/cactus/cactus_`,
    `"bountiful_bonsais/cherry/cherry_`,
    `"bountiful_bonsais/darkoak/darkoak_`,
    `"bountiful_bonsais/jungle/jungle_`,
    `"bountiful_bonsais/kelp/kelp_`,
    `"bountiful_bonsais/mangrove/mangrove_`,
    `"bountiful_bonsais/mushroom/mushroom_`,
    `"bountiful_bonsais/oak/oak_`,
    `"bountiful_bonsais/spruce/spruce_`,
    `"bountiful_bonsais/sugarcane/sugarcane_`,
    `"bountiful_bonsais/warped/warped_`,
    `"bountiful_bonsais/crimson/crimson_`
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:bonsai', {
        onPlayerInteract(e) {
            const { block, player } = e
            let { x, y, z } = block.location
            y += 0.172, x += 0.5, z += 0.5
            const equipment = player.getComponent('equippable')
            const selectItem = equipment.getEquipment('Mainhand')
            if (selectItem != undefined && (block.permutation.getState('twm:soilTier') == 0)) {
                const isSoil = soils.find((soil) => selectItem.matches(soil.id))
                for (let i = 0; i < soils.length; i++) {
                    if (isSoil == soils[i]) {
                        block.setPermutation(block.permutation.withState('twm:soilTier', i + 1))
                        player.runCommand(`clear @s ${soils[i].id} 0 1`)
                    }
                }
            }
            if (selectItem != undefined && (block.permutation.getState('twm:soilTier') != 0) && (block.permutation.getState('twm:hasBonsai') == 0)) {
                const isSapling = saplings.find((sapling) => selectItem.matches(sapling))
                for (let i = 0; i < saplings.length; i++) {
                    if (isSapling == saplings[i]) {
                        block.dimension.spawnEntity(`${bonsais[i]}`, { x, y, z })
                        block.dimension.runCommandAsync(`tag @e[x=${x},y=${y},z=${z},r=0.5,type=!player] add bonsai`)
                        block.setPermutation(block.permutation.withState('twm:hasBonsai', 1))
                    }
                }
            }
            if (selectItem == undefined && (block.permutation.getState('twm:soilTier') != 0)) {
                block.dimension.spawnItem(new ItemStack(soils[block.permutation.getState('twm:soilTier') - 1].id, 1), block.location)
                block.setPermutation(block.permutation.withState('twm:soilTier', 0))
                block.dimension.runCommandAsync(`tag @e[x=${x},y=${y},z=${z},r=0.5] add despawn`)
                block.setPermutation(block.permutation.withState('twm:hasBonsai', 0))
            }
        },
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0.172, x += 0.5, z += 0.5
            const tier = block.permutation.getState('twm:soilTier')
            const entity = block.dimension.getEntities({ tags: ["bonsai"], maxDistance: 0.1, location: { x, y, z } })[0]
            if (entity != undefined) {
                let lootTable = null
                for (let i = 0; i < bonsais.length; i++) {
                    if (entity.typeId == bonsais[i]) {
                        lootTable = lootTables[i]
                        block.dimension.runCommand(`loot insert ${x - 0.5} ${y - 1.17} ${z - 0.5} loot ${lootTable}${tier}"`)
                        entity.playAnimation('animation.grow_tree')
                    }
                }
            }
        }
    })
})