import { world } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:mechanic_hoppers', {
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            x += 0.5, z += 0.5, y += 0.375
            let speed = (2 ** block.permutation.getState('twm:speed'))
            const hopperInv = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.1, location: { x, y, z } })[0].getComponent('minecraft:inventory').container

            let initialchest = undefined
            if (block.typeId == 'twm:mechanic_hopper') {
                y += 1
                initialchest = block.above(1).getComponent('minecraft:inventory')
            }
            if (block.typeId == 'twm:mechanic_upper') {
                y -= 1
                initialchest = block.below(1).getComponent('minecraft:inventory')
            }

            const initialentity = block.dimension.getEntities({ tags: ["machine"], maxDistance: 0.1, location: { x, y, z } })[0]
            const items = block.dimension.getEntities({ type: 'item', location: { x, y: y - 0.5, z }, maxDistance: 0.75 })
            const initialInv = (initialchest != undefined) ? initialchest.container : ((initialentity != undefined) ? initialentity.getComponent('minecraft:inventory').container : undefined)

            if (initialInv != undefined && hopperInv.emptySlotsCount != 0) {
                for (let i = 0; i < initialInv.size; i++) {
                    if (initialInv.getItem(i) && hopperInv.emptySlotsCount != 0) {
                        let item = initialInv.getItem(i), itemnew = initialInv.getItem(i)
                        speed = (speed <= item.amount) ? speed : item.amount
                        itemnew.amount = speed
                        hopperInv.addItem(itemnew)
                        if (initialInv.getSlot(i).amount > speed) {
                            item.amount -= speed
                            initialInv.setItem(i, item)
                        } else {
                            initialInv.setItem(i,)
                        }
                        break
                    }
                }
            } else {
                if (items[0] != undefined && hopperInv.emptySlotsCount != 0) {
                    for (let i = 0; i < items.length; i++) {
                        if (hopperInv.emptySlotsCount != 0) {
                            let item = items[i].getComponent('item').itemStack
                            hopperInv.addItem(item)
                            items[i].kill()
                            break
                        }
                    }
                }
            }
            if (block.typeId == 'twm:mechanic_hopper' && (block.permutation.getState('minecraft:block_face') == 'up' || block.permutation.getState('minecraft:block_face') == 'down')) {
                y -= 2
            }
            if (block.typeId == 'twm:mechanic_upper' && (block.permutation.getState('minecraft:block_face') == 'up' || block.permutation.getState('minecraft:block_face') == 'down')) {
                y += 2
            }

            if (block.permutation.getState('minecraft:block_face') != 'up' && block.permutation.getState('minecraft:block_face') != 'down') {
                y = (block.typeId == 'twm:mechanic_hopper') ? y = y - 1 : y += 1
                switch (block.permutation.getState('minecraft:block_face')) {
                    case 'north':
                        z += 1
                        break
                    case 'south':
                        z -= 1
                        break
                    case 'east':
                        x -= 1
                        break
                    case 'west':
                        x += 1
                        break
                }
            }
            const nextchest = block.dimension.getBlock({ x, y, z }).getComponent('minecraft:inventory')
            const nextentity = block.dimension.getEntities({ tags: ["machine"], location: { x, y, z }, maxDistance: 0.1 })[0]
            const nextInv = (nextchest != undefined) ? nextchest.container : ((nextentity != undefined) ? nextentity.getComponent('minecraft:inventory').container : undefined)

            if (nextInv != undefined) {
                for (let j = 0; j < hopperInv.size; j++) {
                    if (hopperInv.getItem(j) != undefined && nextInv.emptySlotsCount != 0) {
                        let item = hopperInv.getItem(j), itemnew = hopperInv.getItem(j)
                        speed = (speed <= item.amount) ? speed : item.amount
                        itemnew.amount = speed
                        nextInv.addItem(itemnew)
                        if (hopperInv.getSlot(j).amount > speed) {
                            item.amount -= speed
                            hopperInv.setItem(j, item)
                        } else {
                            hopperInv.setItem(j,)
                        }
                        break
                    }
                }
            }
        },
        onPlace(e) {
            const { block } = e
            let { x, y, z } = block.location
            x += 0.5, z += 0.5, y += 0.375
            block.dimension.spawnEntity('twm:mechanic_hopper', { x, y, z })
            block.dimension.runCommandAsync('tag @e[type=twm:mechanic_hopper] add machine')
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