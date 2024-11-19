import { world, ItemStack } from '@minecraft/server'

const spawnerEntities = [
    'minecraft:blaze',
    'minecraft:chicken',
    'minecraft:cow',
    'minecraft:creeper',
    'minecraft:enderman',
    'minecraft:hoglin',
    'minecraft:magma_cube',
    'minecraft:mooshroom',
    'minecraft:pig',
    'minecraft:sheep',
    'minecraft:skeleton',
    'minecraft:slime',
    'minecraft:spider',
    'minecraft:wither_skeleton',
    'minecraft:zombie'
]

//Obtains the identifier and capitalizes each word
function capitalize(str) {
    let name = str.split(':')[1]
    let result = name.charAt(0).toUpperCase() + name.slice(1)
    if (result.indexOf('_') == -1) return result

    let temp = result.split('_').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
    return temp
}

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.itemComponentRegistry.registerCustomComponent('twm:essence', {
        onUse(e) {
            const { source } = e
            let isEntity = source.getEntitiesFromViewDirection({ maxDistance: 2 })[0]
            if (isEntity == undefined) return
            let entity = isEntity.entity
            for (let i = 0; i < spawnerEntities.length; i++) {
                if (entity.typeId == spawnerEntities[i]) {
                    let entityId = entity.typeId
                    let { x, y, z } = entity.location
                    let essenceItem = new ItemStack(`twm:essence_vessel`, 1)
                    essenceItem.setLore([
                        `Mob: ${capitalize(entityId)}`,
                        '0%'
                    ])
                    entity.remove()
                    source.runCommandAsync(`clear @s twm:essence_vessel 0 1`)
                    source.dimension.spawnItem(essenceItem, { x, y, z })
                    break
                }
            }
        }
    })
})