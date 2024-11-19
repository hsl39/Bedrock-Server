
export const PlayerEquipment = {
    getItemHold (player) {
        let equipable = player.getComponent("equippable")
        return equipable.getEquipment("Mainhand")
    },
    setItemHold (player, item) {
        let equipable = player.getComponent("equippable")
        equipable.setEquipment("Mainhand", item)
        console.warn("equiped Component")
    }
}