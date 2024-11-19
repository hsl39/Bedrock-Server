import { world } from '@minecraft/server'


world.afterEvents.playerPlaceBlock.subscribe((data) => {
    const { player, block } = data
    const mainhand = player.selectedSlotIndex
    const inv = player.getComponent('minecraft:inventory')
    if (inv.container.getItem(mainhand) != undefined) {
        if (inv.container.getItem(mainhand).amount != 1 || player.getGameMode() == 'creative') return
        for (let i = 0; i < inv.inventorySize; i++) {
            if (inv.container.getItem(i)) {
                if (inv.container.getItem(i).typeId == block.typeId) {
                    inv.container.swapItems(i, player.selectedSlotIndex, inv.container)
                    break
                }
            }
        }
    }
})
world.afterEvents.itemUse.subscribe((data) => {
    const { source, itemStack } = data
    if (itemStack.amount != 1 || source.getGameMode() == 'creative') return
    const inv = source.getComponent('minecraft:inventory')
    for (let i = 0; i < inv.inventorySize; i++) {
        if (inv.container.getItem(i)) {
            if (inv.container.getItem(i).typeId == itemStack.typeId) {
                inv.container.swapItems(i, source.selectedSlotIndex, inv.container)
                break
            }
        }
    }
})