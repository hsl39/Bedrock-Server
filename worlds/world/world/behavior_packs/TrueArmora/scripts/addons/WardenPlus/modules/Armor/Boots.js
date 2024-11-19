import { EquipmentSlot } from "@minecraft/server";
import Warden from "./Warden";
Warden.registerTick('Warden Transmutation', [EquipmentSlot.Feet], (player) => {
    const { dimension, location } = player;
    const block = dimension.getBlock(location);
    if (!block?.matches('minecraft:sculk_vein'))
        return;
    block.setType('minecraft:air');
    dimension.spawnEntity('xp_orb', location);
});
