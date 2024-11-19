import { EquipmentSlot } from "@minecraft/server";
const isInWater = (player) => player.isInWater;
export const items = [
    { id: "true_on:seanite_helmet", effect: "water_breathing", amplifier: 0, duration: 41, condition: isInWater, slot: EquipmentSlot.Head, lore: "\n+1 Aquatic Breathing" },
    { id: "true_on:seanite_chestplate", effect: "resistance", amplifier: 0, duration: 41, condition: isInWater, slot: EquipmentSlot.Chest, lore: "\n+1 Aquatic Protection" },
    { id: "true_on:seanite_leggings", command: "effect @s mining_fatigue 0 0 false", condition: isInWater, slot: EquipmentSlot.Legs, lore: "\n+1 Ancient Immunity" },
    { id: "true_on:seanite_boots", effect: "haste", amplifier: 1, duration: 41, condition: isInWater, slot: EquipmentSlot.Feet, lore: "\n+1 Aquatic Haste" }
];
export function getItem(id) {
    return items.find(item => item.id == id);
}
