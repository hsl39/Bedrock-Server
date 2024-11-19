import "./addons/Deathnerite/main";
import "./addons/EmeraldPlus/main";
import "./addons/CopperPlus/main";
import "./addons/QuartzPlus/main";
import "./addons/WardenPlus/main";
import "./addons/MagmaPlus/main";
import "./addons/SteelPlus/main";
import "./addons/Oceanite/main";
import { SetLore } from "./libraries/Lore";
import { BlockPermutation, EquipmentSlot, system } from "@minecraft/server";
import { DamageItem } from "./modules/Durability";
import { afterEvents, beforeEvents } from "./libraries/utils";
import WoodConvertions from "./libraries/WoodConvertions";
SetLore();
afterEvents.playerBreakBlock.subscribe(({ player }) => DamageItem(player, EquipmentSlot.Mainhand));
afterEvents.itemUseOn.subscribe(({ source }) => DamageItem(source, EquipmentSlot.Mainhand));
const cooldown = new Map();
beforeEvents.itemUseOn.subscribe((data) => {
    const { source: player, itemStack: item, block } = data;
    const pos = JSON.stringify(block.location);
    if (!item.typeId.match(/(true_cop|true_dn|pa|true|true_ep|true_on|wb):/))
        return;
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
            sound = 'step.gravel';
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
    data.cancel = true;
    system.run(() => {
        block.setPermutation(next);
        player.dimension.playSound(sound, block.location);
        DamageItem(player, item);
    });
});
