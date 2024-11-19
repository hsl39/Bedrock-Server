import { EntityDamageCause, EquipmentSlot } from "@minecraft/server";
import { WeaponManager } from "../libraries/WeaponManager";
const Spear = new WeaponManager('true:is_spear');
Spear.registerAttack('Something', (player, target, _, damage) => {
    const offhand = player.equippable.getEquipment(EquipmentSlot.Offhand);
    if (!offhand)
        target.applyDamage(damage * .5, {
            cause: EntityDamageCause.override,
            damagingEntity: player,
        });
});
