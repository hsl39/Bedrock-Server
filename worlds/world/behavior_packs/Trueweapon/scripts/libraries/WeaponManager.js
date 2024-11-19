import { EquipmentSlot, GameMode, system, world } from "@minecraft/server";
import { afterEvents } from "../libraries/utils";
import { DamageItem } from "./Durability";
export const RegisteredWeapons = new Map();
export class WeaponManager {
    id_;
    unbreakable;
    ticks = {};
    attacks = {};
    abilities = {};
    killEffects = {};
    breakBlockEffects = {};
    constructor(namespace, unbreakable = false) {
        this.id_ = namespace;
        if (RegisteredWeapons.has(this.id))
            throw new Error(`Weapon with id "${this.id}" is already registered`);
        this.unbreakable = unbreakable;
        RegisteredWeapons.set(this.id, this);
    }
    get id() {
        return typeof this.id_ === 'string' ? this.id_ : this.id_.source;
    }
    registerTick(id, callback, condition) {
        if (this.ticks[id])
            throw new Error(`Tick Event with ID: "${id}" already registered.`);
        this.ticks[id] = { callback, condition };
        RegisteredWeapons.set(this.id, this);
    }
    registerAttack(id, callback, condition) {
        if (this.attacks[id])
            throw new Error(`Attack with ID: "${id}" already registered.`);
        this.attacks[id] = { callback, condition };
        RegisteredWeapons.set(this.id, this);
    }
    registerAbility(id, callback, consume, cooldown = 0, condition, playAnimation = true) {
        if (this.abilities[id])
            throw new Error(`Ability with ID: "${id}" already registered.`);
        this.abilities[id] = { callback, consume, cooldown, condition, playAnimation };
        RegisteredWeapons.set(this.id, this);
    }
    registerKillEffect(id, callback, condition) {
        if (this.killEffects[id])
            throw new Error(`Kill Effect with ID: "${id}" already registered.`);
        this.killEffects[id] = { callback, condition };
        RegisteredWeapons.set(this.id, this);
    }
    registerBreakBlockEffect(id, callback, condition) {
        if (this.breakBlockEffects[id])
            throw new Error(`Break Block Effect with ID: "${id}" already registered.`);
        this.breakBlockEffects[id] = { callback, condition };
        RegisteredWeapons.set(this.id, this);
    }
}
afterEvents.entityHurt.subscribe(({ damageSource: { damagingEntity: player }, hurtEntity: target, damage }) => {
    if (!player?.isPlayer() || !target.isValid() || target.matches({ families: ['inanimate'] }))
        return;
    const hand = player.getMainhand();
    if (!hand)
        return;
    for (const Weapon of RegisteredWeapons.values()) {
        if (!hand.getTags().some(t => t.match(Weapon.id_)))
            continue;
        for (const { callback, condition } of Object.values(Weapon.attacks)) {
            if (condition && !condition(player, hand))
                continue;
            callback(player, target, hand, damage);
        }
    }
});
const abilityCooldown = new Map();
afterEvents.itemUse.subscribe(({ source: player, itemStack: hand }) => {
    if (!player.isPlayer())
        return;
    for (const Weapon of RegisteredWeapons.values()) {
        if (!hand.getTags().some(t => t.match(Weapon.id_)))
            continue;
        for (const [ID_, { callback, condition, cooldown, consume }] of Object.entries(Weapon.abilities)) {
            if (condition && !condition(player, hand))
                continue;
            const ID = `${player.id}:${hand.typeId}:${ID_}`;
            if (abilityCooldown.has(ID)) {
                const diff = Date.now() - abilityCooldown.get(ID);
                const left = cooldown - (diff / 1000);
                if (left > 0) {
                    player.onScreenDisplay.setActionBar(`§cCooldown left: ${left.toFixed(1)}s`);
                    return player.playSound('note.didgeridoo');
                }
            }
            if (cooldown) {
                abilityCooldown.set(ID, Date.now());
                system.runTimeout(() => abilityCooldown.delete(ID), 20 * cooldown);
            }
            callback(player, hand);
            if (!consume || player.matches({ gameMode: GameMode.creative }))
                continue;
            DamageItem(player, hand);
        }
    }
});
afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity: player, cause }, deadEntity: target }) => {
    if (!player?.isPlayer())
        return;
    const hand = player.getMainhand();
    if (!hand)
        return;
    for (const Weapon of RegisteredWeapons.values()) {
        if (!hand.getTags().some(t => t.match(Weapon.id_)))
            continue;
        for (const { callback, condition } of Object.values(Weapon.killEffects)) {
            if (condition && !condition(player, hand))
                continue;
            callback(player, target, hand, cause);
        }
    }
});
afterEvents.playerBreakBlock.subscribe(({ player, itemStackBeforeBreak: hand, block, brokenBlockPermutation }) => {
    if (!hand)
        return;
    for (const Weapon of RegisteredWeapons.values()) {
        if (!hand.getTags().some(t => t.match(Weapon.id_)))
            continue;
        for (const { callback, condition } of Object.values(Weapon.breakBlockEffects)) {
            if (condition && !condition(player, hand, brokenBlockPermutation))
                continue;
            callback(player, hand, block, brokenBlockPermutation);
        }
    }
});
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const equippable = player.equippable;
        const hand = equippable?.getEquipment(EquipmentSlot.Mainhand);
        if (!hand)
            continue;
        for (const Weapon of RegisteredWeapons.values()) {
            if (!hand.getTags().some(t => t.match(Weapon.id_)))
                continue;
            for (const { condition, callback } of Object.values(Weapon.ticks)) {
                if (condition && !condition(player, hand))
                    continue;
                callback(player, hand);
            }
        }
    }
});
