import { EquipmentSlot, system, world } from "@minecraft/server";
import { afterEvents } from "../libraries/utils";
export const RegisteredArmors = new Map();
export class ArmorManager {
    id;
    unbreakable;
    ticks = {};
    attacks = {};
    hits = {};
    projectileHits = {};
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
    registerHit(id, slots, callback, condition) {
        if (this.hits[id])
            throw new Error(`Hit Event with ID: "${id}" already registered.`);
        this.hits[id] = { callback, slots, condition };
        RegisteredArmors.set(this.id, this);
    }
    registerProjectileHit(id, slots, callback, condition) {
        if (this.projectileHits[id])
            throw new Error(`Hit Event with ID: "${id}" already registered.`);
        this.projectileHits[id] = { callback, slots, condition };
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
    if (!player?.isPlayer() || !target.isValid() || target.matches({ families: ['inanimate'] }))
        return;
    const equippable = player.equippable;
    const armor = {};
    Object.values(EquipmentSlot).forEach(s => {
        if (['Mainhand', 'Offhand'].includes(s))
            return;
        const item = equippable.getEquipment(s);
        if (item)
            armor[s] = item;
    });
    for (const Armor of RegisteredArmors.values()) {
        for (const { slots, condition, callback } of Object.values(Armor.attacks)) {
            const check = slots.every(s => armor[s]?.typeId.startsWith(Armor.id));
            if (!check || (condition && condition(player, armor)))
                continue;
            callback(player, target, armor);
        }
    }
});
afterEvents.entityHurt.subscribe(({ hurtEntity: player, damageSource: source }) => {
    if (!player?.isPlayer())
        return;
    const equippable = player.equippable;
    const armor = {};
    Object.values(EquipmentSlot).forEach(s => {
        if (['Mainhand', 'Offhand'].includes(s))
            return;
        const item = equippable.getEquipment(s);
        if (item)
            armor[s] = item;
    });
    for (const Armor of RegisteredArmors.values()) {
        for (const { slots, condition, callback } of Object.values(Armor.hits)) {
            const check = slots.length ? slots.every(s => armor[s]?.typeId.match(Armor.id)) : Object.values(armor).some(i => i?.typeId.match(Armor.id));
            if (!check || (condition && condition(player, source, armor)))
                continue;
            callback(player, source, armor);
        }
    }
});
afterEvents.projectileHitEntity.subscribe((data) => {
    const { entity: player } = data.getEntityHit();
    if (!player?.isPlayer())
        return;
    const equippable = player.equippable;
    const armor = {};
    Object.values(EquipmentSlot).forEach(s => {
        if (['Mainhand', 'Offhand'].includes(s))
            return;
        const item = equippable.getEquipment(s);
        if (item)
            armor[s] = item;
    });
    for (const Armor of RegisteredArmors.values()) {
        for (const { slots, condition, callback } of Object.values(Armor.projectileHits)) {
            const check = slots.length ? slots.every(s => armor[s]?.typeId.match(Armor.id)) : Object.values(armor).some(i => i?.typeId.match(Armor.id));
            if (!check || (condition && condition(player, data, armor)))
                continue;
            callback(player, data, armor);
        }
    }
});
afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity: player, cause }, deadEntity: target }) => {
    if (!player?.isPlayer())
        return;
    const equippable = player.equippable;
    const armor = {};
    Object.values(EquipmentSlot).forEach(s => {
        if (['Mainhand', 'Offhand'].includes(s))
            return;
        const item = equippable.getEquipment(s);
        if (item)
            armor[s] = item;
    });
    for (const Armor of RegisteredArmors.values()) {
        for (const { slots, condition, callback } of Object.values(Armor.killEffects)) {
            const check = slots.length ? slots.every(s => armor[s]?.typeId.match(Armor.id)) : Object.values(armor).some(i => i?.typeId.match(Armor.id));
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
        Object.values(EquipmentSlot).forEach(s => {
            if (['Mainhand', 'Offhand'].includes(s))
                return;
            const item = equippable.getEquipment(s);
            if (item)
                armor[s] = item;
        });
        for (const Armor of RegisteredArmors.values()) {
            for (const { slots, condition, callback } of Object.values(Armor.ticks)) {
                const check = slots.length ? slots.every(s => armor[s]?.typeId.match(Armor.id)) : Object.values(armor).some(i => i?.typeId.match(Armor.id));
                if (!check || (condition && !condition(player, armor)))
                    continue;
                callback(player, armor);
            }
        }
    }
});
export const FullArmor = [
    EquipmentSlot.Head,
    EquipmentSlot.Chest,
    EquipmentSlot.Legs,
    EquipmentSlot.Feet
];
