import { EquipmentSlot } from "@minecraft/server";
import { Vector } from "../../../../libraries/utils";
import Warden from "./Warden";
Warden.registerHit('Standing here, I realize...', [EquipmentSlot.Legs], (player, { damagingEntity: other, damagingProjectile: projectile }, armor) => {
    if (projectile)
        return;
    const pieces = Object.values(armor).reduce((a, b) => b.typeId.match(Warden.id) ? a + 1 : a, 0);
    const { x, z } = other?.isValid() ? Vector.subtract(player.location, other.location) : Vector.down;
    const hand = other?.equippable?.getEquipment(EquipmentSlot.Mainhand);
    const ench = hand?.enchantable;
    const extra = ench?.getEnchantment(hand.typeId.includes('bow') ? 'punch' : 'knockback')?.level ?? 0;
    player.applyKnockback(x, z, .5 + (extra / 10), .25 - (.015 * pieces));
});
Warden.registerProjectileHit('Take down that snipper!', [EquipmentSlot.Legs], (player, hitInfo, armor) => {
    const pieces = Object.values(armor).reduce((a, b) => b.typeId.match(Warden.id) ? a + 1 : a, 0);
    const { x, z } = hitInfo.hitVector;
    const hand = hitInfo.source?.equippable?.getEquipment(EquipmentSlot.Mainhand);
    const ench = hand?.enchantable;
    const extra = ench?.getEnchantment(hand.typeId.includes('bow') ? 'punch' : 'knockback')?.level ?? 0;
    player.applyKnockback(x, z, .5 + (extra / 10), .25 - (.015 * pieces));
});
