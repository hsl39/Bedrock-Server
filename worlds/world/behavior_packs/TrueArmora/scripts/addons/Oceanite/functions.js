export function hasArmorSlot(player, id, slot) {
    const equipment = player.equippable;
    return equipment.getEquipment(slot)?.typeId == id;
}
export function findItemsInventory(player, itemIds) {
    const items = [];
    const inventory = player.inventory.container;
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (!item || !itemIds.includes(item?.typeId))
            continue;
        items.push({ item, slot: i });
    }
    return items;
}
