import { EquipmentSlot } from "@minecraft/server";
import { ArmorSlot } from "../../libraries/utils";
import itemsConfig from "./itemsConfig";
export function hasEquipment(player, equipmentSlot, match) {
    const equippable = player.equippable;
    const itemStack = equippable.getEquipment(equipmentSlot);
    return itemStack?.typeId.match(match);
}
export function findItemsWithId(player, match) {
    const inventory = player.inventory.container;
    const items = [];
    for (let slot = 0; slot < inventory.size; slot++) {
        const itemStack = inventory.getItem(slot);
        if (!itemStack || !itemStack?.typeId.match(match))
            continue;
        items.push({ slot, itemStack });
    }
    return items;
}
export function getArmorItemIdentifier(itemPrefix, armorSlot) {
    return `${itemPrefix}_${ArmorSlot[armorSlot]}`;
}
export function getArmor(player) {
    const equippable = player.equippable;
    const itemStacks = [];
    for (const slot of Object.values(EquipmentSlot).slice(0, -2)) {
        const item = equippable.getEquipment(slot);
        if (!item)
            continue;
        itemStacks.push(item);
    }
    return itemStacks;
}
export function calculateKnockback(attackerPosition, playerFinalPosition, threshold = 0.1) {
    const dx = playerFinalPosition.x - attackerPosition.x;
    const dy = playerFinalPosition.y - attackerPosition.y;
    const dz = playerFinalPosition.z - attackerPosition.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const knockback = distance * threshold; // Scale factor to adjust the knockback
    return knockback;
}
export function getArmorTreshold(itemStack) {
    return Object.entries(itemsConfig.armorKnockbacks).map(([k, v]) => itemStack.typeId.includes(k) ? v : -1).find(n => n != -1) ?? -1;
}
