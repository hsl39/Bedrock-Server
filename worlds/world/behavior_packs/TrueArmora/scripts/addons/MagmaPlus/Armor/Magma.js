import { BlockPermutation, EntityDamageCause, EquipmentSlot, system } from "@minecraft/server";
import { ArmorManager, FullArmor } from "../../../libraries/ArmorManager";
import { repeat, Vector } from "../../../libraries/utils";
import { ToolTags } from "../libraries/constants";
const Magma = new ArmorManager('true_magma:');
/** Helmet */
const HelmetCooldown = new Map();
Magma.registerTick('FireMending', [EquipmentSlot.Head], (player) => {
    if (HelmetCooldown.has(player.id) || !player.dimension.getBlock(player.location)?.typeId.includes('lava'))
        return;
    HelmetCooldown.set(player.id, system.runTimeout(() => HelmetCooldown.delete(player.id), 10));
    const slot = player.equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
    const item = slot.getItem();
    if (!item || !item.typeId.startsWith('true_magma:') || !item.getTags().length)
        return;
    const durability = item.durability;
    if (!durability?.damage)
        return;
    durability.damage = Math.max(0, durability.damage - 10);
    slot.setItem(item);
});
/** Chestplate */
Magma.registerAttack('ExtraHit', [EquipmentSlot.Chest], (player, target) => {
    const item = player.equippable.getEquipment(EquipmentSlot.Mainhand);
    if (!item)
        return;
    const tags = item.getTags();
    if (!ToolTags.some(t => tags.includes(t)))
        return;
    // world.sendMessage(`${player.name} dealt 1 damage to ${target.nameTag || target.typeId}`);
    target.applyDamage(1, {
        cause: EntityDamageCause.override,
        damagingEntity: player,
    });
});
/** Leggings */
Magma.registerHit('FireFall', [EquipmentSlot.Legs], (player, { cause }) => {
    if (cause !== EntityDamageCause.fall)
        return;
    repeat(10, () => player.dimension.spawnParticle('minecraft:lava_particle', player.location));
    const targets = player.dimension.getEntities({
        excludeTypes: ['minecraft:item', 'minecraft:ender_crystal'],
        excludeFamilies: ['inanimate'],
        location: player.location,
        maxDistance: 4,
    });
    for (const target of targets) {
        if (target.id === player.id || !target.hasComponent('type_family'))
            continue;
        try {
            target.setOnFire(6, true);
        }
        catch { }
    }
});
/** Boots */
Magma.registerTick('DeathSteps', [EquipmentSlot.Feet], ({ isSneaking, dimension, location }) => {
    if (isSneaking)
        return;
    try {
        const block = dimension.getBlock(Vector.add(location, { y: -.2 }));
        if (!block.hasTag('grass') || block.permutation.getState('dirt_type') === 'coarse')
            return;
        block.setPermutation(BlockPermutation.resolve('dirt', { dirt_type: 'coarse' }));
        dimension.playSound('random.fizz', location, { volume: .2 });
    }
    catch { }
});
/** Immunities */
const Countdown = new Map();
Magma.registerTick('ExtingishFire', [], (player, pieces) => {
    player.removeEffect('wither');
    player.removeEffect('poison');
    const armor = Object.keys(pieces).length;
    if (armor === 4)
        return;
    if (!player.hasComponent('onfire'))
        return Countdown.delete(player.id);
    if (!Countdown.has(player.id))
        return Countdown.set(player.id, 20 * (5 - armor));
    ;
    const time = Countdown.get(player.id);
    if (time > 0)
        return Countdown.set(player.id, time - 1);
    player.extinguishFire(true);
});
Magma.registerTick('FireImmune', FullArmor, (player) => {
    player.addEffect('fire_resistance', 20 * 10 + 5, { showParticles: false });
});
/** Miscellaneous */
const MiscCooldown = new Map();
Magma.registerTick('InWater', [], ({ dimension, location, id }) => {
    if (MiscCooldown.has(id) || !dimension.getBlock(location)?.typeId.includes('water'))
        return;
    dimension.playSound('random.fizz', location);
    MiscCooldown.set(id, system.runTimeout(() => MiscCooldown.delete(id), 15));
});
