import { EquipmentSlot, system } from "@minecraft/server";
import { WeaponManager } from "../libraries/WeaponManager";
import { Vector } from "../libraries/utils";
const Weight = new WeaponManager(/weight:([0-9]+)/);
Weight.registerTick('I lost because my sword was heavy', (player, item) => {
    const weight = Number(item.getTags().reduce((p, c) => c.match(Weight.id_)?.[1] ?? p, '0'));
    const offhand = player.equippable.getEquipment(EquipmentSlot.Offhand);
    if (!offhand) {
        if (weight > 1)
            player.playAnimation('animation.player.sword_heavy');
        return;
    }
    const last = player.getDynamicProperty('weight');
    if (!last || system.currentTick - last > 5)
        player.onScreenDisplay.setActionBar({ translate: "trueweapons.weight.line" });
    player.setDynamicProperty('weight', system.currentTick);
    player.addEffect('slowness', 3, {
        showParticles: false,
        amplifier: weight,
    });
});
const Heavy = new WeaponManager(/weight:([2-9]+)/);
Heavy.registerAttack('Heavy Slash', (player, target) => {
    const { dimension } = player;
    const head = new Vector(player.getHeadLocation());
    const view = new Vector(player.getViewDirection());
    dimension.spawnParticle('pa:heavy_slash', head.add(view.multiply(2)));
});
