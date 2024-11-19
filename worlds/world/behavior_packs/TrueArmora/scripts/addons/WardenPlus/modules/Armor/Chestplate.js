import { EquipmentSlot } from "@minecraft/server";
import Warden from "./Warden";
Warden.registerTick('Fire Resistance', [EquipmentSlot.Chest], (player) => {
    player.addEffect('fire_resistance', 3, { showParticles: false });
});
