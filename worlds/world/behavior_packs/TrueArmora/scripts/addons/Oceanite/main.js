import { system, world, Player, EquipmentSlot, EntityDamageCause, } from "@minecraft/server";
import { findItemsInventory, hasArmorSlot } from "./functions";
import WoodConvertions from "../../libraries/WoodConvertions";
import { getItem, items } from "./misc";
import { DamageItem } from "../../modules/Durability";
import oceanite from "./oceanite";
import { beforeEvents } from "../../libraries/utils";
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        oceanite.execute(player);
        if (system.currentTick % 20 != 0)
            continue;
        for (const item of findItemsInventory(player, items.map((item) => item.id))) {
            const playerInventoryContainer = player.inventory.container;
            item.item.setLore([`§r§3${getItem(item.item.typeId)?.lore}`]);
            playerInventoryContainer.setItem(item.slot, item.item);
        }
        for (const item of items) {
            const { id, slot, effect, command, condition: itemCondition, duration, amplifier } = item;
            if (!itemCondition(player))
                return;
            if (!hasArmorSlot(player, id, slot))
                continue;
            if (command)
                player.runCommandAsync(command);
            if (!effect)
                continue;
            player.addEffect(effect, duration, { amplifier, showParticles: false });
        }
    }
}, 0);
beforeEvents.itemUseOn.subscribe(({ source: player, itemStack: item, block }) => {
    if (!item.typeId.startsWith("true_on:"))
        return;
    const tags = block.getTags();
    const blockIdentifier = block.typeId;
    system.run(() => {
        switch (item.typeId.split(":")[1]) {
            case "seanite_hoe": {
                if (!tags.includes("grass") && !blockIdentifier.includes("dirt"))
                    return;
                player.playSound("step.gravel");
                break;
            }
            case "seanite_axe": {
                if (!Object.keys(WoodConvertions).includes(blockIdentifier))
                    return;
                player.playSound("use.wood");
                break;
            }
            case "seanite_shovel": {
                if (!tags.includes("grass") || blockIdentifier.includes("path"))
                    return;
                block.setType("minecraft:grass_path");
                player.playSound("step.grass");
                break;
            }
            default:
                return;
        }
        DamageItem(player, EquipmentSlot.Mainhand);
    });
});
world.afterEvents.entityHurt.subscribe(({ damageSource: { cause, damagingEntity: player }, hurtEntity }) => {
    if (!(player instanceof Player) || cause !== EntityDamageCause.entityAttack)
        return;
    const weapon = player.equippable.getEquipment(EquipmentSlot.Mainhand);
    DamageItem(player, EquipmentSlot.Mainhand);
    if (!weapon)
        return;
    if ((weapon.typeId != "true_on:seanite_sword" && weapon.typeId != "true_on:seanite_axe") || !player.isInWater)
        return;
    const { x, z } = player.getViewDirection();
    hurtEntity.applyKnockback(x, z, -0.3, 0);
});
