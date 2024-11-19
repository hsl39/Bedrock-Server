import { EquipmentSlot, ItemLockMode } from '@minecraft/server';
export function getItemsWithFilter(entity, filterFunction) {
    const inventory = entity.inventory?.container;
    if (!inventory)
        return [];
    const items = [];
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (!item)
            continue;
        if (filterFunction && !filterFunction(item))
            continue;
        items.push({ item, slot: i });
    }
    return items;
}
export function blockBackpacks(player, slotData) {
    const inventory = player.inventory.container;
    const { item, slot } = slotData;
    if (item.lockMode === ItemLockMode.slot)
        return;
    item.lockMode = ItemLockMode.slot;
    inventory.setItem(slot, item);
}
export function unblockBackpacks(player, slotData) {
    const inventory = player.inventory.container;
    const { item, slot } = slotData;
    item.lockMode = ItemLockMode.none;
    inventory.setItem(slot, item);
}
export function getBackpackItem(player) {
    const equippable = player.equippable;
    const item = equippable.getEquipment(EquipmentSlot.Mainhand);
    if (item?.typeId.includes('heavy:multi_backpack'))
        return item;
}
export function isVectorDifferent(vec1, vec2) {
    return (Object.values(vec1)
        .map((value, index) => Math.abs(value - Object.values(vec2)[index]))
        .reduce((acc, current) => acc + current, 0) > 0.8);
}
;
;
