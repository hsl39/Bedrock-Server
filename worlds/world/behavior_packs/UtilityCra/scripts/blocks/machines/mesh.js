import { world, ItemStack } from '@minecraft/server'

const meshes = [
    { id: "twm:string_mesh" },
    { id: "twm:iron_mesh" },
    { id: "twm:diamond_mesh" },
    { id: "twm:netherite_mesh" }
]

const sievableBlocks = [
    { id: "gravel" },
    { id: "dirt" },
    { id: "sand" },
    { id: "grass" },
    { id: "soul_sand" },
    { id: "twm:crushed_netherrack" }
]

const lootTables = [
    `/gravel"`,
    `/dirt"`,
    `/sand"`,
    `/grass"`,
    `/soulsand"`,
    `/netherrack"`
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:mesh', {
        onPlayerInteract(e) {
            const { block, player } = e
            const equipment = player.getComponent('equippable')
            const selectItem = equipment.getEquipment('Mainhand')
            if ((selectItem != undefined) && (block.permutation.getState('twm:meshTier') == 0)) {
                const isMesh = meshes.find((mesh) => selectItem.matches(mesh.id))
                for (let i = 0; i < meshes.length; i++) {
                    if (isMesh == meshes[i]) {
                        block.setPermutation(block.permutation.withState('twm:meshTier', i + 1))
                        if (player.getGameMode() != 'creative') {
                            player.runCommand(`clear @s ${meshes[i].id} 0 1`)
                        }
                    }
                }
            } else if (block.permutation.getState('twm:meshTier') != 0 && selectItem != undefined) {
                let { x, y, z } = block.location
                x += Math.random() * 2; y += 1; z += Math.random() * 2
                let multi = block.permutation.getState('twm:meshTier')
                multi = (multi == 4) ? 5 : multi
                const isSievable = sievableBlocks.find((sievable) => selectItem.matches(sievable.id))
                let level = `"sieve/mesh_${block.permutation.getState('twm:meshTier')}`
                for (let i = 0; i < sievableBlocks.length; i++) {
                    if (isSievable == sievableBlocks[i]) {
                        player.runCommand(`loot spawn ${x} ${y} ${z} loot ${level}${lootTables[i]}`)
                        player.runCommand(`clear @s ${isSievable.id} 0 1`)
                    }
                }
            } else if ((block.permutation.getState('twm:meshTier') != 0) && selectItem == undefined && player.isSneaking) {
                let { x, y, z } = block.location
                x += .5; y += 1; z += .5
                for (let i = 1; i <= meshes.length; i++) {
                    if (i == block.permutation.getState('twm:meshTier')) {
                        world.getDimension(block.dimension.id).spawnItem(new ItemStack(`${meshes[i - 1].id}`, 1), { x, y, z })
                    }
                }
                block.setPermutation(block.permutation.withState('twm:meshTier', 0))
            }
        }
    })
})