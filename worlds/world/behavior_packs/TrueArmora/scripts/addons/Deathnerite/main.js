import { findItemsWithId, getArmorItemIdentifier, hasEquipment, getArmor, calculateKnockback, getArmorTreshold } from "./functions";
import { system, world, EquipmentSlot, EntityDamageCause } from "@minecraft/server";
import { beforeEvents } from "../../libraries/utils";
import WoodConvertions from "../../libraries/WoodConvertions";
import { DamageItem } from "../../modules/Durability";
import Parcanite from "./armor/parcanite";
import constants from "./itemsConfig";
import AntiBurner from "./burn";
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        for (const [slot, options] of Object.entries(Parcanite).slice(1)) {
            if (typeof options === 'string')
                continue;
            const inventory = player.inventory.container;
            const equippable = player.equippable;
            const identifier = getArmorItemIdentifier(Parcanite.id, slot);
            // Inventory ---
            findItemsWithId(player, identifier).map(found => {
                found.itemStack.setLore(options.lore);
                inventory.setItem(found.slot, found.itemStack);
            });
            // Equipment ---
            if (!hasEquipment(player, slot, identifier))
                continue;
            options.command ? player.runCommandAsync(options.command) : null;
            // itemOptions?.effect ? player.addEffect(itemOptions.effect.id, itemOptions.effect.duration, itemOptions.effectOptions): null;
            if (!options.lore)
                continue;
            const armorItem = equippable.getEquipment(slot);
            armorItem?.setLore(options.lore);
            equippable.setEquipment(slot, armorItem);
        }
    }
}, 0);
world.afterEvents.entityHurt.subscribe(event => {
    const { hurtEntity, damageSource: { cause, damagingEntity } } = event;
    if (damagingEntity?.isPlayer() && cause === EntityDamageCause.entityAttack)
        DamageItem(damagingEntity, EquipmentSlot.Mainhand);
    if (!hurtEntity.isPlayer() || !damagingEntity)
        return;
    try {
        const { x, z } = hurtEntity.getViewDirection();
        const armorPieces = getArmor(hurtEntity).filter(item => getArmorTreshold(item) != -1);
        const knockbackTresh = armorPieces.map(item => getArmorTreshold(item)).reduce((prev, current) => prev + current);
        hurtEntity.applyKnockback(x, z, -calculateKnockback(damagingEntity.location, hurtEntity.location, knockbackTresh), 0);
    }
    catch { }
});
beforeEvents.itemUseOn.subscribe(({ source: player, itemStack: item, block }) => {
    if (!item.typeId.startsWith('true_dn:'))
        return;
    const tags = block.getTags();
    const blockIdentifier = block.typeId;
    system.run(() => {
        switch (true) {
            case constants.tools.hoe.includes(item.typeId): {
                if (!tags.includes('grass') && !blockIdentifier.includes('dirt'))
                    return;
                player.playSound('step.gravel');
                break;
            }
            case constants.tools.axe.includes(item.typeId): {
                if (!Object.keys(WoodConvertions).includes(blockIdentifier))
                    return;
                player.playSound('use.wood');
                break;
            }
            case constants.tools.shovel.includes(item.typeId): {
                if (!tags.includes('grass') || blockIdentifier.includes("path"))
                    return;
                block.setType("minecraft:grass_path");
                player.playSound('step.grass');
                break;
            }
            default: return;
        }
        DamageItem(player, EquipmentSlot.Mainhand);
    });
});
system.run(() => new AntiBurner(["parcanite", "deathnerite"]));
