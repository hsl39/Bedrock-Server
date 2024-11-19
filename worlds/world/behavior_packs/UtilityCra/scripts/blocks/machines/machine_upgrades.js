import { world, ItemStack } from '@minecraft/server'

const upgrades = [
    { id: 'twm:wrench' },
    { id: 'twm:speed_upgrade' },
    { id: 'twm:range_upgrade' },
    { id: 'twm:quantity_upgrade' },
    { id: 'twm:energy_upgrade' }
]

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:machine_upgrades', {
        onPlayerInteract(e) {
            const { block, player } = e
            const equipment = player.getComponent('equippable')
            const selectItem = equipment.getEquipment('Mainhand')

            //Actual upgrade level before upgrading it
            let speedActual = block.permutation.getState('twm:speed')
            let rangeActual = block.permutation.getState('twm:range')
            let quantityActual = block.permutation.getState('twm:quantity')
            let energyActual = block.permutation.getState('twm:energy')

            const heldItem = (selectItem == undefined) ? undefined : upgrades.find((upgrade) => selectItem.matches(upgrade.id))

            //Tells actual levels of the machine
            if (selectItem == undefined && speedActual != undefined) {
                player.sendMessage(`§aSpeed §flevel ${speedActual}`)
            }
            if (selectItem == undefined && rangeActual != undefined) {
                player.sendMessage(`§9Range §flevel ${rangeActual}`)
            }
            if (selectItem == undefined && quantityActual != undefined) {
                player.sendMessage(`§3Quantity §flevel ${quantityActual}`)
            }
            if (selectItem == undefined && energyActual != undefined) {
                player.sendMessage(`§3Energy §flevel ${energyActual}`)
            }

            //Upgrades the machines with the corresponding upgrade or Resets the upgrades of the machine
            switch (heldItem) {
                //Reset
                case (upgrades[0]):
                    let { x, y, z } = block.location
                    x += .5; y += 1; z += .5
                    if (speedActual != undefined && speedActual != 0) {
                        world.getDimension(block.dimension.id).spawnItem(new ItemStack('twm:speed_upgrade', speedActual), { x, y, z })
                        block.setPermutation(block.permutation.withState('twm:speed', 0))
                        player.sendMessage('§aSpeed §flevel reseted')
                    }
                    if (rangeActual != undefined && rangeActual != 0) {
                        world.getDimension(block.dimension.id).spawnItem(new ItemStack('twm:range_upgrade', rangeActual), { x, y, z })
                        block.setPermutation(block.permutation.withState('twm:range', 0))
                        player.sendMessage('§9Range §flevel reseted')
                    }
                    if (quantityActual != undefined && quantityActual != 0) {
                        world.getDimension(block.dimension.id).spawnItem(new ItemStack('twm:quantity_upgrade', quantityActual), { x, y, z })
                        block.setPermutation(block.permutation.withState('twm:quantity', 0))
                        player.sendMessage('§3Quantity §flevel reseted')
                    }
                    if (energyActual != undefined && energyActual != 0) {
                        world.getDimension(block.dimension.id).spawnItem(new ItemStack('twm:energy_upgrade', energyActual), { x, y, z })
                        block.setPermutation(block.permutation.withState('twm:energy', 0))
                        player.sendMessage('§3Energy §flevel reseted')
                    }
                    break
                //Ugrade
                case (upgrades[1]):
                    if (speedActual != undefined) {
                        if (speedActual < 4) {
                            block.setPermutation(block.permutation.withState('twm:speed', speedActual + 1))
                            player.sendMessage(`§aSpeed §flevel ${speedActual + 1}`)
                            if (player.getGameMode() != 'creative') {
                                player.runCommand(`clear @s ${upgrades[1].id} 0 1`)
                            }
                        } else { player.sendMessage('Cant upgrade, it already has max §aSpeed §flevel') }
                    } else { player.sendMessage('This machine doesnt allow §aSpeed §fUpgrades') }
                    break
                case (upgrades[2]):
                    if (rangeActual != undefined) {
                        if (rangeActual < 4) {
                            block.setPermutation(block.permutation.withState('twm:range', rangeActual + 1))
                            player.sendMessage(`§9range §flevel ${rangeActual + 1}`)
                            if (player.getGameMode() != 'creative') {
                                player.runCommand(`clear @s ${upgrades[2].id} 0 1`)
                            }
                        } else { player.sendMessage('Cant upgrade, it already has max §9Range §flevel') }
                    } else { player.sendMessage('This machine doesnt allow §9Range §fUpgrades') }
                    break
                case (upgrades[3]):
                    if (quantityActual != undefined) {
                        if (quantityActual < 4) {
                            block.setPermutation(block.permutation.withState('twm:quantity', quantityActual + 1))
                            player.sendMessage(`§3Quantity §flevel ${quantityActual + 1}`)
                            if (player.getGameMode() != 'creative') {
                                player.runCommand(`clear @s ${upgrades[3].id} 0 1`)
                            }
                        } else { player.sendMessage('Cant upgrade, it already has max §3Quantity §flevel') }
                    } else { player.sendMessage('This machine doesnt allow §3Quantity §fUpgrades') }
                    break
                case (upgrades[4]):
                    if (energyActual != undefined) {
                        if (energyActual < 4) {
                            block.setPermutation(block.permutation.withState('twm:energy', energyActual + 1))
                            player.sendMessage(`§3Energy §flevel ${energyActual + 1}`)
                            if (player.getGameMode() != 'creative') {
                                player.runCommand(`clear @s ${upgrades[4].id} 0 1`)
                            }
                        } else { player.sendMessage('Cant upgrade, it already has max §4Energy §flevel') }
                    } else { player.sendMessage('This upgrade will be implemented soon') }
                    break
            }
        }
    })
})
