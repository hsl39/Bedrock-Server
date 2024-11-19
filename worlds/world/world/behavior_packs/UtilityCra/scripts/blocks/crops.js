import { world, ItemStack } from '@minecraft/server'

const crops = [
    'twm:coal_crop',
    'twm:copper_crop',
    'twm:dyes_crop',
    'twm:glass_crop',
    'twm:gunpowder_crop',
    'twm:iron_crop',
    'twm:leather_crop',
    'twm:prismarine_crystal_crop',
    'twm:prismarine_shards_crop',
    'twm:water_crop',
    'twm:wool_crop',
    'twm:ghast_crop',
    'twm:glowstone_crop',
    'twm:gold_crop',
    'twm:honey_crop',
    'twm:lapis_crop',
    'twm:lava_crop',
    'twm:quartz_crop',
    'twm:redstone_crop',
    'twm:slime_crop',
    'twm:amethyst_crop',
    'twm:blaze_crop',
    'twm:diamond_crop',
    'twm:emerald_crop',
    'twm:enderpearl_crop',
    'twm:obsidian_crop',
    'twm:netherite_crop',
    'twm:netherstar_crop',
    'twm:shulker_crop',
    'twm:totem_crop',
    'twm:wither_crop'
]
const seeds = [
    'twm:coal_seeds',
    'twm:copper_seeds',
    'twm:dyes_seeds',
    'twm:glass_seeds',
    'twm:gunpowder_seeds',
    'twm:iron_seeds',
    'twm:leather_seeds',
    'twm:prismarine_crystals_seeds',
    'twm:prismarine_shards_seeds',
    'twm:water_seeds',
    'twm:wool_seeds',
    'twm:ghast_seeds',
    'twm:glowstone_seeds',
    'twm:gold_seeds',
    'twm:honey_seeds',
    'twm:lapis_seeds',
    'twm:lava_seeds',
    'twm:quartz_seeds',
    'twm:redstone_seeds',
    'twm:slime_seeds',
    'twm:amethyst_seeds',
    'twm:blaze_seeds',
    'twm:diamond_seeds',
    'twm:emerald_seeds',
    'twm:enderpearl_seeds',
    'twm:obsidian_seeds',
    'twm:netherite_seeds',
    'twm:nether_star_seeds',
    'twm:shulker_seeds',
    'twm:totem_seeds',
    'twm:wither_seeds'
]
const lootTables = [
    '"bountiful_crops/coalLoot/coal_crop"',
    '"bountiful_crops/copperLoot/copper_crop"',
    '"bountiful_crops/dyesLoot/dyes_crop"',
    '"bountiful_crops/glassLoot/glass_crop"',
    '"bountiful_crops/gunpowderLoot/gunpowder_crop"',
    '"bountiful_crops/ironLoot/iron_crop"',
    '"bountiful_crops/leatherLoot/leather_crop"',
    '"bountiful_crops/prismarineCRLoot/prismarine_crystals_crop"',
    '"bountiful_crops/prismarineSHLoot/prismarine_shards_crop"',
    '"bountiful_crops/waterLoot/water_crop"',
    '"bountiful_crops/woolLoot/wool_crop"',
    '"bountiful_crops/ghastLoot/ghast_tear_crop"',
    '"bountiful_crops/glowstoneLoot/glowstone_crop"',
    '"bountiful_crops/goldLoot/gold_crop"',
    '"bountiful_crops/honeyLoot/honey_crop"',
    '"bountiful_crops/lapisLoot/lapis_crop"',
    '"bountiful_crops/lavaLoot/lava_crop"',
    '"bountiful_crops/quartzLoot/quartz_crop"',
    '"bountiful_crops/redstoneLoot/redstone_crop"',
    '"bountiful_crops/slimeLoot/slime_crop"',
    '"bountiful_crops/amethystLoot/amethyst_crop"',
    '"bountiful_crops/blazeLoot/blaze_crop"',
    '"bountiful_crops/diamondLoot/diamond_crop"',
    '"bountiful_crops/emeraldLoot/emerald_crop"',
    '"bountiful_crops/enderpearlLoot/enderpearl_crop"',
    '"bountiful_crops/obsidianLoot/obsidian_crop"',
    '"bountiful_crops/netheriteLoot/netherite_crop"',
    '"bountiful_crops/netherstarLoot/netherstar_crop"',
    '"bountiful_crops/shulkerLoot/shulker_crop"',
    '"bountiful_crops/totemLoot/totem_crop"',
    '"bountiful_crops/witherLoot/wither_crop"'
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:grow', {
        onTick(e) {
            const { block } = e
            const age = block.permutation.getState('twm:age')
            if (age < 5) {
                block.setPermutation(block.permutation.withState('twm:age', age + 1))
            }
        },
        onPlayerDestroy(e) {
            const { block, destroyedBlockPermutation } = e
            let { x, y, z } = block.location
            const blockId = destroyedBlockPermutation.type.id

            if (destroyedBlockPermutation.getState('twm:age') < 5) return

            for (let i = 0; i < seeds.length; i++) {
                if (crops[i] == blockId) {
                    block.dimension.spawnItem(new ItemStack(`${seeds[i]}`, 1), { x, y, z })
                }
            }

        },
        onPlayerInteract(e) {
            const { block, player } = e
            let { x, y, z } = block.location
            const selectitem = player.getComponent('equippable').getEquipment('Mainhand')
            if (selectitem == undefined) {
                player.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run function harvester`)
                return
            }
            if (selectitem.hasTag('twm:is_aiot')) {
                block.dimension.runCommandAsync(`fill ${x - 1} ${y} ${z - 1} ${x + 1} ${y} ${z + 1} farmland replace dirt`)
                block.dimension.runCommandAsync(`fill ${x - 1} ${y} ${z - 1} ${x + 1} ${y} ${z + 1} farmland replace grass`)
                block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} run function tractor`)
            }
        }
    })
})