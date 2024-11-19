import { world, ItemStack, system } from '@minecraft/server'
const acceptedItems = [
    { id: 'minecraft:lava_bucket', value: 1000, liquid: 'lava', result: 'bucket' },
    { id: 'minecraft:water_bucket', value: 1000, liquid: 'water', result: 'bucket' },
    { id: 'minecraft:milk_bucket', value: 1000, liquid: 'milk', result: 'bucket' },
    { id: 'twm:lava_ball', value: 1000, liquid: 'lava', result: 'air' },
    { id: 'twm:water_ball', value: 1000, liquid: 'water', result: 'air' },
    { id: 'minecraft:experience_bottle', value: 8, liquid: 'xp', result: 'air' }
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:fluid_tanks', {
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0, x += 0.5, z += 0.5
            const tank = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0]
            if (tank != undefined) {
                const tankCap = tank.getComponent('minecraft:health')
                if (tankCap.currentValue == 1) {
                    tank.addTag('despawn')
                    block.setPermutation(block.permutation.withState('twm:hasliquid', false))
                }
            }
        },
        onPlayerInteract(e) {
            const { block, player } = e
            let { x, y, z } = block.location
            y += 0, x += 0.5, z += 0.5
            const mainhand = player.getComponent('equippable').getEquipment('Mainhand')
            if (mainhand != undefined) {
                let n = undefined
                for (let i = 0; i < acceptedItems.length; i++) {
                    if (mainhand.typeId == acceptedItems[i].id) {
                        n = i
                    }
                }
                if (block.permutation.getState('twm:hasliquid') == false && n != undefined) {
                    block.setPermutation(block.permutation.withState('twm:hasliquid', true))
                    block.dimension.spawnEntity(`twm:fluid_tank_${acceptedItems[n].liquid}`, { x, y, z })
                    block.dimension.runCommandAsync(`tag @e[type=twm:fluid_tank_${acceptedItems[n].liquid}] add tank`)
                    system.runTimeout(() => {
                        block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0].addTag(`${block.typeId}`)
                        const tankCap = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0].getComponent('minecraft:health')
                        tankCap.setCurrentValue(acceptedItems[n].value + 1)
                    }, 1);
                    if (player.getGameMode() != 'creative') {
                        player.runCommandAsync(`clear @s ${acceptedItems[n].id} 0 1`)
                        player.runCommandAsync(`give @s ${acceptedItems[n].result} 1`)
                    }
                } else {
                    if (block.permutation.getState('twm:hasliquid') != false) {
                        const tank = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0]
                        const tankCap = tank.getComponent('minecraft:health')
                        const liquid = tank.typeId.slice(15, tank.typeId.length)
                        if (n != undefined) {
                            if (liquid == acceptedItems[n].liquid && tankCap.currentValue <= (tankCap.effectiveMax - acceptedItems[n].value)) {
                                tankCap.setCurrentValue(tankCap.currentValue + acceptedItems[n].value)
                                if (player.getGameMode() != 'creative') {
                                    player.runCommandAsync(`clear @s ${acceptedItems[n].id} 0 1`)
                                    player.runCommandAsync(`give @s ${acceptedItems[n].result} 1`)
                                }
                            }
                        }
                        if (mainhand.typeId == 'minecraft:bucket' && tankCap.currentValue > 1000 && block.permutation.getState('twm:hasliquid') != false && (tank.typeId == 'twm:fluid_tank_lava' || tank.typeId == 'twm:fluid_tank_water' || tank.typeId == 'twm:fluid_tank_milk')) {
                            tankCap.setCurrentValue(tankCap.currentValue - 1000)
                            player.runCommandAsync(`clear @s bucket 0 1`)
                            player.runCommandAsync(`give @s ${liquid}_bucket 1`)
                        }
                    }
                }
            }
            system.runTimeout(() => {
                if (block.permutation.getState('twm:hasliquid') != false) {
                    const tank = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0]
                    const liquid = tank.typeId.slice(15, tank.typeId.length)
                    const liquidName = capitalizeWords(liquid)
                    const tankCapRead = tank.getComponent('minecraft:health')
                    const max = tankCapRead.effectiveMax
                    let actual = tankCapRead.currentValue
                    const percent = (Math.floor(((actual - 1) / (max - 1)) * 10000)) / 100
                    player.onScreenDisplay.setActionBar(`${liquidName}: ${actual - 1}mB  Capacity: ${percent}% of ${max - 1}mB`)

                } else { player.onScreenDisplay.setActionBar('Empty') }
            }, 2);
        },
        onPlayerDestroy(e) {
            const { block, player } = e
            let { x, y, z } = block.location
            y += 0, x += 0.5, z += 0.5

            const tank = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0]
            if (tank != undefined) {
                const tankItem = new ItemStack(`${tank.getTags()[1]}`, 1)
                const liquid = tank.typeId.slice(15, tank.typeId.length)
                const liquidName = capitalizeWords(liquid)
                const tankCap = tank.getComponent('minecraft:health')
                const amount = tankCap.currentValue
                const max = tankCap.effectiveMax
                const percent = (Math.floor(((amount - 1) / (max - 1)) * 10000)) / 100
                tank.addTag('despawn')
                tankItem.setLore([
                    `Liquid: ${liquidName}`,
                    `Amount: ${amount - 1}mB`,
                    `Capacity: ${percent}% of ${max - 1}mB`
                ])
                system.runTimeout(() => {
                    if (player.getGameMode() != 'creative') {
                        block.dimension.getEntities({ type: 'item', maxDistance: 2, location: { x, y, z } })[0].kill()
                    }
                    block.dimension.spawnItem(tankItem, { x, y, z })
                }, 1);
            }
        },
        beforeOnPlayerPlace(e) {
            const { player, block } = e
            let { x, y, z } = block.location
            y += 0, x += 0.5, z += 0.5
            const tankLore = player.getComponent('equippable').getEquipment('Mainhand').getLore()
            if (tankLore[0] != undefined && tankLore[1] != undefined) {
                const liquid = formatString(tankLore[0])
                const amount = parseInt(tankLore[1].slice(8, tankLore[1].length - 2))
                system.runTimeout(() => {
                    block.setPermutation(block.permutation.withState('twm:hasliquid', true))
                    block.dimension.spawnEntity(`twm:fluid_tank_${liquid}`, { x, y, z })
                    block.dimension.runCommandAsync(`tag @e[type=twm:fluid_tank_${liquid}] add tank`)
                    system.runTimeout(() => {
                        block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0].addTag(`${block.typeId}`)
                        const tankCap = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0].getComponent('minecraft:health')
                        tankCap.setCurrentValue(amount + 1)
                    }, 1);
                }, 1);
            }
        }
    })
})

function capitalizeWords(input) {
    return input.split('_').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}
function formatString(input) {
    let parts = input.split(": ");
    let formattedString = parts[1].toLowerCase().replace(/ /g, "_");
    return formattedString;
}