import { EntityDamageCause, EquipmentSlot, ItemStack, system } from "@minecraft/server";
import { afterEvents, Vector } from "../../libraries/utils";
import { ArmorManager } from "../../libraries/ArmorManager";
const Dark = new ArmorManager('pa:dark_steel');
Dark.registerAttack('Let the true meaning of "almighty" be carved into your soul.', [], (player, target, armor) => {
    const pieces = Object.values(armor).reduce((a, b) => b.typeId.match('pa:dark_steel_') ? a + 1 : a, 0);
    const ID = player.equippable.getEquipment(EquipmentSlot.Mainhand)?.typeId;
    target.applyDamage(pieces * (ID?.startsWith('pa:dark_steel_') ? 2 : 1), {
        cause: EntityDamageCause.override,
        damagingEntity: player,
    });
});
Dark.registerHit('Standing here, I realize...', [], (player, { damagingEntity: other, damagingProjectile: projectile }, armor) => {
    if (projectile)
        return;
    const pieces = Object.values(armor).reduce((a, b) => b.typeId.match('pa:dark_steel_') ? a + 1 : a, 0);
    const { x, z } = other?.isValid() ? Vector.subtract(player.location, other.location) : Vector.down;
    const hand = other?.equippable?.getEquipment(EquipmentSlot.Mainhand);
    const ench = hand?.getComponent('enchantable');
    const extra = ench?.getEnchantment(hand.typeId.includes('bow') ? 'punch' : 'knockback')?.level ?? 0;
    player.applyKnockback(x, z, ((5 - pieces) / 10) + (extra / 10), 0.25);
});
Dark.registerProjectileHit('Take down that snipper!', [], (player, hitInfo, armor) => {
    const pieces = Object.values(armor).reduce((a, b) => b.typeId.match('pa:dark_steel_') ? a + 1 : a, 0);
    const { x, z } = hitInfo.hitVector;
    const hand = hitInfo.source?.equippable?.getEquipment(EquipmentSlot.Mainhand);
    const ench = hand?.getComponent('enchantable');
    const extra = ench?.getEnchantment(hand.typeId.includes('bow') ? 'punch' : 'knockback')?.level ?? 0;
    player.applyKnockback(x, z, ((5 - pieces) / 10) + (extra / 10), 0.25);
});
const AntiDarkness = new Map();
Dark.registerTick('Turn on the lights', [], (player) => {
    AntiDarkness.set(player.id, system.runTimeout(() => AntiDarkness.delete(player.id), 20 * 20));
    player.playSound('mob.enderdragon.growl', { pitch: .5 });
    player.removeEffect('darkness');
}, p => !AntiDarkness.has(p.id) && !!p.getEffect('darkness'));
afterEvents.playerBreakBlock.subscribe(({ block, brokenBlockPermutation }) => {
    if (brokenBlockPermutation.matches('pa:dark_essence_ore'))
        block.dimension.spawnEntity('pa:dark_essence', block.location);
});
system.afterEvents.scriptEventReceive.subscribe(({ id, message, sourceEntity: player }) => {
    if (id.split(':')[1] !== 'steel' || !player?.isPlayer())
        return;
    if (message !== 'essence')
        return;
    const hand = player.equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
    if (hand?.typeId !== 'minecraft:glass_bottle')
        return;
    hand.amount > 1 ? hand.amount-- : hand.setItem();
    const potion = new ItemStack('pa:dark_essence');
    const inv = player.inventory.container;
    if (inv.emptySlotsCount)
        return inv.addItem(potion);
    const item = player.dimension.spawnItem(potion, player.location);
    item.applyImpulse(player.getViewDirection());
}, { namespaces: ['true'] });
