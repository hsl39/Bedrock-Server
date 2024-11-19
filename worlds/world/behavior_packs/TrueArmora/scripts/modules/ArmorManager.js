import { EquipmentSlot, system, world } from "@minecraft/server";
import { afterEvents } from "../libraries/utils";
export const RegisteredArmors = new Map();
export class ArmorManager {
    id;
    unbreakable;
    ticks = {};
    attacks = {};
    killEffects = {};
    constructor(namespace, unbreakable = false) {
        this.id = namespace;
        this.unbreakable = unbreakable;
        RegisteredArmors.set(this.id, this);
    }
    registerTick(id, slots, callback, condition) {
        if (this.ticks[id])
            throw new Error(`Break Block Effect with ID: "${id}" already registered.`);
        this.ticks[id] = { callback, slots, condition };
        RegisteredArmors.set(this.id, this);
    }
    registerAttack(id, slots, callback, condition) {
        if (this.attacks[id])
            throw new Error(`Attack with ID: "${id}" already registered.`);
        this.attacks[id] = { callback, slots, condition };
        RegisteredArmors.set(this.id, this);
    }
    registerKillEffect(id, slots, callback, condition) {
        if (this.killEffects[id])
            throw new Error(`Kill Effect with ID: "${id}" already registered.`);
        this.killEffects[id] = { callback, slots, condition };
        RegisteredArmors.set(this.id, this);
    }
}
afterEvents.entityHitEntity.subscribe(({ damagingEntity: player, hitEntity: target }) => {
    if (!player?.isPlayer() || target.matches({ families: ['inanimate'] }))
        return;
    const equippable = player.equippable;
    const armor = {};
    Object.values(EquipmentSlot).forEach(s => armor[s] = equippable.getEquipment(s));
    for (const Armor of RegisteredArmors.values()) {
        for (const { slots, condition, callback } of Object.values(Armor.attacks)) {
            const check = slots.every(s => armor[s]?.typeId.startsWith(Armor.id));
            if (!check || (condition && condition(player, armor)))
                continue;
            callback(player, target, armor);
        }
    }
});
afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity: player, cause }, deadEntity: target }) => {
    if (!player?.isPlayer())
        return;
    const equippable = player.equippable;
    const armor = {};
    Object.values(EquipmentSlot).forEach(s => armor[s] = equippable.getEquipment(s));
    for (const Armor of RegisteredArmors.values()) {
        for (const { slots, condition, callback } of Object.values(Armor.killEffects)) {
            const check = slots.every(s => armor[s]?.typeId.startsWith(Armor.id));
            if (!check || (condition && condition(player, armor)))
                continue;
            callback(player, target, armor, cause);
        }
    }
});
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const equippable = player.equippable;
        const armor = {};
        Object.values(EquipmentSlot).forEach(s => !['Mainhand', 'Offhand'].includes(s) && (armor[s] = equippable.getEquipment(s)));
        for (const Armor of RegisteredArmors.values()) {
            for (const { slots, condition, callback } of Object.values(Armor.ticks)) {
                const check = slots.every(s => armor[s]?.typeId.startsWith(Armor.id));
                if (!check || (condition && !condition(player, armor)))
                    continue;
                callback(player, armor);
            }
        }
    }
});
