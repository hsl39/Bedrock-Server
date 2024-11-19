import { world, system } from '@minecraft/server'

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('twm:harvest', {
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            let xtp = x, ytp = y, ztp = z
            let tx = 1, tz = 1
            let side = (block.permutation.getState('twm:range') * 2) + 3
            side = (side == 11) ? 9 : side
            switch (block.permutation.getState('minecraft:facing_direction')) {
                case 'up':
                    y--
                    ytp++
                    x += ((side - 1) / 2)
                    z -= ((side - 1) / 2) + 1
                    tx = -1
                    break
                case 'down':
                    y += 2
                    ytp--
                    x += ((side - 1) / 2)
                    z -= ((side - 1) / 2) + 1
                    tx = -1
                    break
                case 'north':
                    x += ((side - 1) / 2)
                    tx = -1
                    ztp--
                    break
                case 'south':
                    z -= (1 + side)
                    x += ((side - 1) / 2)
                    tx = -1
                    ztp++
                    break
                case 'west':
                    x += (((side - 1)) + 1)
                    z -= ((side - 1) / 2) + 1
                    tx = -1
                    xtp--
                    break
                case 'east':
                    x--
                    z -= ((side - 1) / 2) + 1
                    tx = -1
                    xtp++
                    break
            }
            let x2 = x, z2 = z, y2 = y
            for (let i = 1; i <= side; i++) {
                for (let j = 1; j <= side; j++) {
                    z += tz
                    block.dimension.runCommand(`execute positioned ${x} ${y} ${z} run function harvester`)
                }
                z -= side * tz
                x += tx
            }
            system.runTimeout(() => {
                block.dimension.runCommand(`tp @e[x=${x},y=${y - 1},z=${z},dx=${side},dz=${side},dy=${side},type=item] ${xtp} ${ytp} ${ztp} `)
            }, 10);

        }

    })
})