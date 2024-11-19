import { EntityDamageCause, EquipmentSlot, ItemStack } from "@minecraft/server";
import { afterEvents } from "../libraries/utils";
import { DamageItem } from "./Durability";
afterEvents.entityHurt.subscribe(({ hurtEntity: target, damageSource: { damagingEntity, cause } }) => {
    if (damagingEntity?.isPlayer()) {
        const mainhand = damagingEntity.getMainhand();
        if (mainhand?.typeId.startsWith('true_cop:') && !mainhand.getTags().includes('minecraft:is_sword'))
            DamageItem(damagingEntity, EquipmentSlot.Mainhand, 2);
    }
    if (cause !== EntityDamageCause.lightning || !target.isPlayer())
        return;
    try {
        const equipment = target.equippable;
        for (const slot of Object.values(EquipmentSlot)) {
            const item = equipment.getEquipment(slot);
            if (!item)
                continue;
            const match = item.typeId.match(/true_cop:\S*_copper_/);
            if (!match || item.getDynamicProperty('waxed'))
                continue;
            const next = new ItemStack(item.typeId.replace(match[0], 'true_cop:copper_'));
            next.nameTag = item.nameTag;
            next.amount = item.amount;
            next.keepOnDeath = item.keepOnDeath;
            next.lockMode = item.lockMode;
            next.setCanDestroy(item.getCanDestroy());
            next.setLore(item.getLore());
            const durability1 = item.getComponent('durability');
            const durability2 = next.getComponent('durability');
            durability2.damage = durability1.damage;
            const ench1 = item.getComponent('enchantable');
            if (ench1) {
                const ench2 = next.getComponent('enchantable');
                ench2?.addEnchantments(ench1.getEnchantments());
            }
            equipment.setEquipment(slot, next);
        }
    }
    catch (e) { }
});
afterEvents.itemUse.subscribe(({ source: player, itemStack }) => {
    if (itemStack.typeId !== 'minecraft:honeycomb')
        return;
    const equipment = player.equippable;
    let waxed = false;
    for (const slot of Object.values(EquipmentSlot)) {
        const item = equipment.getEquipment(slot);
        if (!item)
            continue;
        const match = item.typeId.match(/true_cop:\S*copper_/);
        if (!match || item.getDynamicProperty('waxed'))
            continue;
        item.setDynamicProperty('waxed', true);
        item.setDynamicProperty('ticks');
        item.setLore([...item.getLore(), `§r§6[WAXED]`]);
        equipment.setEquipment(slot, item);
        if (itemStack.amount === 1) {
            equipment.setEquipment(EquipmentSlot.Mainhand);
            return player.playSound('copper.wax.on');
        }
        itemStack.amount--;
        waxed = true;
    }
    const inv = player.inventory.container;
    for (let i = 0; i < inv.size; i++) {
        const item = inv.getItem(i);
        if (!item)
            continue;
        const match = item.typeId.match(/true_cop:\S*copper_/);
        if (!match || item.getDynamicProperty('waxed'))
            continue;
        item.setDynamicProperty('waxed', true);
        item.setDynamicProperty('ticks');
        item.setLore([...item.getLore(), `§r§6[WAXED]`]);
        inv.setItem(i, item);
        if (itemStack.amount === 1) {
            equipment.setEquipment(EquipmentSlot.Mainhand);
            return player.playSound('copper.wax.on');
        }
        itemStack.amount--;
        waxed = true;
    }
    if (!waxed) {
        const view = player.getEntitiesFromViewDirection({ maxDistance: 4 });
        for (const { entity } of view) {
            if (entity.typeId !== 'minecraft:item')
                continue;
            const item = entity.getComponent('item').itemStack;
            const match = item.typeId.match(/true_cop:\S*copper_/);
            if (!match || item.getDynamicProperty('waxed'))
                continue;
            item.setDynamicProperty('waxed', true);
            item.setDynamicProperty('ticks');
            item.setLore([...item.getLore(), `§6[WAXED]`]);
            entity.dimension.spawnItem(item, entity.location);
            entity.remove();
            if (itemStack.amount === 1) {
                equipment.setEquipment(EquipmentSlot.Mainhand);
                return player.playSound('copper.wax.on');
            }
            itemStack.amount--;
            waxed = true;
        }
    }
    if (!waxed)
        return;
    equipment.setEquipment(EquipmentSlot.Mainhand, itemStack);
    player.playSound('copper.wax.on');
});
