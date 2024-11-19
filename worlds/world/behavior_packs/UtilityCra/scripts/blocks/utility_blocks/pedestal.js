import { world, ItemStack } from '@minecraft/server'

function probability(num) {
    let den = (num + 1) * 25
    let rand = Math.ceil(Math.random() * den)
    if (rand == 1) {
        return true
    } else {
        return false
    }
}

world.beforeEvents.worldInitialize.subscribe(eventata => {
    eventata.blockComponentRegistry.registerCustomComponent('twm:pedestal', {
        onTick(e) {
            const { block } = e
            let { x, y, z } = block.location
            let side = 9
            x += ((side - 1) / 2)
            z -= ((side - 1) / 2) + 1
            let tx = -1
            if (block.permutation.getState('twm:hasItem') == 1) {
                for (let i = 1; i <= side; i++) {
                    for (let j = 1; j <= side; j++) {
                        z += 1
                        const crop = block.dimension.getBlock({ x, y, z })
                        const moddedState = crop.permutation.getState('twm:age')
                        const vanillaState = crop.permutation.getState('growth')
                        if (moddedState != undefined) {
                            if (moddedState < 5) {
                                let tier = crop.permutation.getState('twm:tier')
                                if (probability(tier)) {
                                    crop.setPermutation(crop.permutation.withState('twm:age', moddedState + 1))
                                }
                            }
                        } else if (vanillaState != undefined) {
                            if (vanillaState < 7) {
                                if (probability(0)) {
                                    crop.setPermutation(crop.permutation.withState('growth', vanillaState + 1))
                                }
                            }
                        }
                    }
                    z -= side * 1
                    x += tx
                }
            }
        }
    })
})