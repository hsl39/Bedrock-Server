
export const PlayerEquipment = {
    getItemHold (player) {
        let equipable = player.getComponent("equippable")
        return equipable.getEquipment("Mainhand")
    },
    setItemHold (player, item) {
        let equipable = player.getComponent("equippable")
        equipable.setEquipment("Mainhand", item)
    }
}
export const PlayerInventory = {
    setItemAtSlot(player, slot, item) {
        const inventory = player.getComponent("inventory").container
        inventory.setItem(slot, item)
    }
}