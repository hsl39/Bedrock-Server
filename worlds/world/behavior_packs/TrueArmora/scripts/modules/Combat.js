import { EntityDamageCause, EquipmentSlot, ItemStack, system } from "@minecraft/server";
import { Vector, cloneItemStackInfo } from "../libraries/utils";
export function Combat({ hurtEntity: target, damageSource: { cause, damagingEntity: player } }) {
    if (!target.isValid())
        return;
    if (target.isPlayer() && cause === EntityDamageCause.lightning) {
        const equippable = target.equippable;
        const item = equippable.getEquipment(EquipmentSlot.Mainhand);
        if (item?.typeId !== 'true_cop:copper_sword')
            return;
        return equippable.setEquipment(EquipmentSlot.Mainhand, cloneItemStackInfo(item, new ItemStack('true_cop:thunder_sword')));
    }
    if (!player?.isPlayer() || cause !== EntityDamageCause.entityAttack)
        return;
    const equippable = player.equippable;
    const item = equippable.getEquipment(EquipmentSlot.Mainhand);
    if (item?.typeId !== 'true_cop:thunder_sword' || !target.getComponent('health')?.currentValue)
        return;
    const count = (player.getDynamicProperty('thunder_sword') ?? 0) + 1;
    if (count < 3)
        return player.setDynamicProperty('thunder_sword', count);
    // player.addEffect('fire_resistance', 30, { showParticles: false });
    target.dimension.spawnEntity('minecraft:lightning_bolt', Vector.add(target.location, Vector.multiply({ ...player.getViewDirection(), y: 0 }, 1.2)));
    system.runTimeout(() => player.extinguishFire(false), 5);
    player.setDynamicProperty('thunder_sword', 0);
}
