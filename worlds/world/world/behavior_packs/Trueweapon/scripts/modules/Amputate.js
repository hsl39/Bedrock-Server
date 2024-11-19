import { EquipmentSlot, ItemLockMode, ItemStack, system, world } from "@minecraft/server";
import { WeaponManager } from "../libraries/WeaponManager";
import { afterEvents } from "../libraries/utils";
const Amputate = new WeaponManager('minecraft:is_sword');
Amputate.registerAttack('amputate_attack', (_p, target, _i, damage) => {
    if (!damage || !target.isPlayer() || target.hasTag('true:amputated'))
        return;
    if (target.health.currentValue > 9 || Math.random() > .1)
        return;
    const { dimension, location } = target;
    const equippable = target.equippable;
    const offhand = equippable.getEquipmentSlot(EquipmentSlot.Offhand);
    if (offhand.hasItem()) {
        const item = offhand.getItem();
        const success = target.inventory.container?.addItem(item);
        if (!success)
            dimension.spawnItem(item, location);
    }
    const barrier = new ItemStack('true:barrier');
    barrier.lockMode = ItemLockMode.slot;
    offhand.setItem(barrier);
    dimension.playSound('true.player.dismembered', location);
    target.playAnimation('animation.player.amputation');
    target.addTag('true:amputated');
});
system.runInterval(() => {
    for (const player of world.getPlayers({ tags: ['true:amputated'] })) {
        if (!player.isValid())
            continue;
        player.playAnimation("animation.player.amputation");
    }
});
afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
    if (initialSpawn)
        return;
    player.removeTag('true:amputated');
    const offhand = player.equippable.getEquipmentSlot(EquipmentSlot.Offhand);
    if (offhand.hasItem() && offhand.typeId === 'true:barrier')
        offhand.setItem();
});
