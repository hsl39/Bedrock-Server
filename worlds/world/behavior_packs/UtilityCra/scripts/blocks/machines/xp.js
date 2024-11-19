import { world, ItemStack, system } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:xp', {
        onPlayerInteract(e) {
            const { block } = e
            if (block.typeId == 'twm:xp_spout') {
                if (block.permutation.getState('twm:isOpen') == false) {
                    block.setPermutation(block.permutation.withState('twm:isOpen', true))
                } else { block.setPermutation(block.permutation.withState('twm:isOpen', false)) }
            }
        },
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location

            if (block.typeId == 'twm:xp_drain') {
                y += 0, x += 0.5, z += 0.5
                const player = block.dimension.getPlayers({ location: { x: x, y: y, z: z }, maxDistance: 0.8 })[0]
                const tankEntity = block.dimension.getEntities({ tags: ["tank"], location: { x: x, y: y - 1, z: z }, maxDistance: 0.1 })[0]
                const tank = block.below(1)
                if (player != undefined && tankEntity == undefined && tank.permutation.getState('twm:hasliquid') == false) {
                    if (player.getTotalXp() > 0) {
                        tank.setPermutation(tank.permutation.withState('twm:hasliquid', true))
                        y -= 1
                        block.dimension.spawnEntity(`twm:fluid_tank_xp`, { x, y, z })
                        block.dimension.runCommandAsync(`tag @e[type=twm:fluid_tank_xp] add tank`)
                        system.runTimeout(() => {
                            block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x: x, y: y, z: z } })[0].addTag(`${tank.typeId}`)
                            const tankCap = block.dimension.getEntities({ tags: ["tank"], maxDistance: 0.1, location: { x, y, z } })[0].getComponent('minecraft:health')
                            tankCap.setCurrentValue(2)
                        }, 1);
                        if (player.xpEarnedAtCurrentLevel == 0) {
                            player.addLevels(-1)
                            player.addExperience(player.totalXpNeededForNextLevel - 1)
                        } else {
                            player.addExperience(-1)
                        }
                    }
                }
                if (player != undefined && tankEntity != undefined && tank.permutation.getState('twm:hasliquid') == true) {
                    const tankCap = tankEntity.getComponent('minecraft:health')
                    if (player.getTotalXp() > 0 && tankCap.currentValue < tankCap.effectiveMax) {
                        y -= 1
                        if (player.xpEarnedAtCurrentLevel == 0) {
                            player.addLevels(-1)
                            player.addExperience(player.totalXpNeededForNextLevel - 1)
                            tankCap.setCurrentValue(tankCap.currentValue + 1)
                        } else {
                            const amount = (player.xpEarnedAtCurrentLevel >= 10) ? 10 : player.xpEarnedAtCurrentLevel
                            player.addExperience(-amount)
                            tankCap.setCurrentValue(tankCap.currentValue + amount)
                        }
                    }
                }
            }

            if (block.typeId == 'twm:xp_spout' && block.permutation.getState('twm:isOpen') == true) {
                let xs = 0, zs = 0
                switch (block.permutation.getState("minecraft:block_face")) {
                    case 'north':
                        z += 1
                        zs = 0.8
                        xs = 0.4
                        break
                    case 'south':
                        z -= 1
                        zs = 0.2
                        xs = 0.4
                        break
                    case 'west':
                        x += 1
                        xs = 0.6
                        zs = 0.5
                        break
                    case 'east':
                        x -= 1
                        xs = 0.1
                        zs = 0.5
                        break
                }
                y += 0, x += 0.5, z += 0.5
                const tankEntity = block.dimension.getEntities({ tags: ["tank"], location: { x: x, y: y, z: z }, maxDistance: 0.1 })[0]
                if (tankEntity != undefined) {
                    if (tankEntity.typeId != 'twm:fluid_tank_xp') return
                    const tankCap = tankEntity.getComponent('minecraft:health')
                    if (tankCap.currentValue > 1) {
                        tankCap.setCurrentValue(tankCap.currentValue - 1)
                        block.dimension.spawnEntity('xp_orb', { x: block.location.x + xs, y: block.location.y + 0.5, z: block.location.z + zs })
                    }
                }
            }
        }
    })
})