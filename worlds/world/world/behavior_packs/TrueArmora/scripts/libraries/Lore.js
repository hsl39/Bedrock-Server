import { EquipmentSlot, system, world } from "@minecraft/server";
import { sleep } from "./utils";
import Lore from "../Lore";
export async function SetLore() {
    const players = world.getPlayers();
    for (const player of players) {
        const inv = player.inventory.container;
        if (!inv)
            continue;
        for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);
            if (!item)
                continue;
            const lore = Lore[item.typeId];
            if (!lore || item.getLore().join() === lore.join())
                continue;
            item.setLore(lore);
            inv.setItem(i, item);
        }
        const equipment = player.equippable;
        if (!equipment)
            continue;
        for (const slot of Object.values(EquipmentSlot)) {
            if (slot === EquipmentSlot.Mainhand)
                continue;
            const item = equipment.getEquipment(slot);
            if (!item)
                continue;
            const lore = Lore[item.typeId];
            if (!lore || item.getLore().join() === lore.join())
                continue;
            item.setLore(lore);
            equipment.setEquipment(slot, item);
        }
        await sleep();
    }
    system.run(SetLore);
}
