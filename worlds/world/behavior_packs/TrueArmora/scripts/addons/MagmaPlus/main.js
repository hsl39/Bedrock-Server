import { EquipmentSlot, BlockPermutation, ItemStack, system } from '@minecraft/server';
import { AutoSmeltRawOres, SmeltedConversions, WoodConvertions } from './libraries/constants';
import { afterEvents, beforeEvents, sleep } from '../../libraries/utils';
import { DamageItem } from '../../modules/Durability';
const cooldown = new Map();
beforeEvents.itemUseOn.subscribe((data) => {
    const { source: player, itemStack: item, block } = data;
    const pos = JSON.stringify(block.location);
    if (!item.typeId.startsWith('true_magma:'))
        return;
    data.cancel = true;
    if (cooldown.has(pos))
        return;
    const id = block.typeId;
    const tags = block.getTags();
    const type = item.typeId.split(/_|:/).pop();
    let next = block.permutation;
    let sound = '';
    switch (type) {
        case 'hoe': {
            if (id === 'minecraft:farmland' || !tags.includes('grass') || next.getState('dirt_type') === 'coarse')
                return;
            sound = 'random.fizz';
            next = BlockPermutation.resolve('dirt', { dirt_type: 'coarse' });
            break;
        }
        case 'axe': {
            const state = WoodConvertions[id];
            if (!state)
                return;
            sound = 'use.wood';
            next = BlockPermutation.resolve(state);
            break;
        }
        case 'shovel': {
            if (id === 'minecraft:grass_path' || (!tags.includes('dirt') && !tags.includes('grass')))
                return;
            sound = 'step.grass';
            next = BlockPermutation.resolve('minecraft:grass_path');
            break;
        }
        default: return;
    }
    cooldown.set(pos, system.runTimeout(() => cooldown.delete(pos), 5));
    system.run(() => {
        block.setPermutation(next);
        player.dimension.playSound(sound, block.location);
        DamageItem(player, item);
    });
});
beforeEvents.playerBreakBlock.subscribe(async ({ player, block, dimension, itemStack: item }) => {
    if (!item?.getTags().includes('true_magma:is_magma_tool'))
        return;
    if (!(block.typeId in SmeltedConversions)) {
        await sleep();
        return DamageItem(player, EquipmentSlot.Mainhand);
        ;
    }
    const center = block.center();
    await sleep();
    const drops = dimension.getEntities({ type: 'minecraft:item', maxDistance: 1.9, location: block.location });
    if (!drops.length)
        return;
    for (const drop of drops) {
        const { itemStack: item } = drop.getComponent('item');
        const conversion = AutoSmeltRawOres[item.typeId] || SmeltedConversions[item.typeId];
        if (!conversion)
            return;
        drop.remove();
        dimension.spawnItem(new ItemStack(conversion), center);
    }
    dimension.playSound('random.fizz', center);
    await sleep(4);
    // DamageItem(player, EquipmentSlot.Mainhand);
});
afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource: { damagingEntity: player } }) => {
    if (!player?.isPlayer() || !hurtEntity.isValid())
        return;
    const equippable = player.equippable;
    const hand = equippable.getEquipment(EquipmentSlot.Mainhand);
    if (!hand?.getTags().includes('true_magma:is_magma_tool'))
        return;
    hurtEntity.setOnFire(8, true);
});
import "./Armor/Magma";
