import { EquipmentSlot, ItemStack, system, world } from "@minecraft/server";
import { cloneItemStackInfo, sleep } from "../libraries/utils";
export const nextState = {
    'true_cop:copper_': {
        to: 'true_cop:exposed_copper_',
        ticks: 20 * 60 * 20,
    },
    'true_cop:exposed_copper_': {
        to: 'true_cop:weathered_copper_',
        ticks: 20 * 60 * 20,
    },
    'true_cop:weathered_copper_': {
        to: 'true_cop:oxidized_copper_',
        ticks: 20 * 60 * 20,
    },
};
export async function Oxidise() {
    for (const player of world.getPlayers()) {
        const inv = player.inventory.container;
        for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);
            if (!item || !item.typeId.startsWith('true_cop:'))
                continue;
            const next = ProcessItem(item);
            if (next)
                inv.setItem(i, next);
        }
        const equipment = player.equippable;
        for (const slot of Object.values(EquipmentSlot)) {
            if (slot === EquipmentSlot.Mainhand)
                continue;
            const item = equipment.getEquipment(slot);
            if (!item || !item.typeId.startsWith('true_cop:'))
                continue;
            const next = ProcessItem(item);
            if (next)
                equipment.setEquipment(slot, next);
        }
        await sleep(1);
    }
    system.run(Oxidise);
}
function ProcessItem(item) {
    if (item.getDynamicProperty('waxed'))
        return;
    let date = item.getDynamicProperty('ticks');
    if (!date) {
        item.setDynamicProperty('ticks', system.currentTick);
        date = system.currentTick;
        return item;
    }
    try {
        for (const [from, { to, ticks }] of Object.entries(nextState)) {
            if (!item.typeId.startsWith(from))
                continue;
            if (system.currentTick - date < ticks)
                continue;
            return cloneItemStackInfo(item, new ItemStack(item.typeId.replace(from, to)));
        }
    }
    catch (e) { }
}
