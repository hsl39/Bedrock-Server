import { EquipmentSlot, system } from "@minecraft/server";
import { ArmorManager } from "../../modules/ArmorManager";
const HelmetCooldown = new Map();
const Helmet = new ArmorManager('pa:crying_helmet');
Helmet.registerTick('HelmetRegeneration', [EquipmentSlot.Head], (player) => {
    HelmetCooldown.set(player.id, system.runTimeout(() => HelmetCooldown.delete(player.id), 20 * 30));
    player.addEffect('regeneration', 20 * 5, {
        showParticles: false,
        amplifier: 1
    });
}, (p) => {
    return !HelmetCooldown.has(p.id) && p.health.currentValue <= 6;
});
const ChestplateCooldown = new Map();
const Chestplate = new ArmorManager('pa:crying_chestplate');
Chestplate.registerTick('ChestplateResistance', [EquipmentSlot.Chest], (player) => {
    ChestplateCooldown.set(player.id, system.runTimeout(() => HelmetCooldown.delete(player.id), 20 * 30));
    player.addEffect('resistance', 20 * 15, {
        showParticles: false,
        amplifier: 1
    });
}, (p) => {
    return !ChestplateCooldown.has(p.id) && p.health.currentValue <= 6;
});
const BootsCooldown = new Map();
const Boots = new ArmorManager('pa:crying_boots');
Boots.registerTick('BootsSpeed', [EquipmentSlot.Feet], (player) => {
    BootsCooldown.set(player.id, system.runTimeout(() => BootsCooldown.delete(player.id), 20 * 30));
    player.addEffect('speed', 20 * 15, {
        showParticles: false,
        amplifier: 1
    });
}, (p) => {
    return !BootsCooldown.has(p.id) && p.health.currentValue <= 6;
});
const AnyPiece = new ArmorManager('pa:crying_');
AnyPiece.registerTick('CryingFireResistance', [], (player) => {
    player.addEffect('fire_resistance', 10, {
        showParticles: false,
        amplifier: 1
    });
}, (p, pieces) => {
    return p.health.currentValue <= Object.values(pieces).filter(a => a?.typeId.startsWith('pa:crying_')).length * 6;
});
