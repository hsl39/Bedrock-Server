import { afterEvents, beforeEvents, getOrientation, getOrientationX, sleep, Vector } from "../libraries/utils";
import { WeaponManager } from "../libraries/WeaponManager";
import { DamageItem } from "../libraries/Durability";
const Hammer = new WeaponManager('break:hammer');
const hammerTags = [
    "diamond_pick_diggable",
    "stone"
];
const hammerIDs = [
    "minecraft:copper_ore",
    "minecraft:deepslate_copper_ore",
    "minecraft:deepslate"
];
Hammer.registerBreakBlockEffect('3x3', (player, _, block) => {
    const { x, y, z, dimension } = block;
    const oY = getOrientation(player.getRotation().y);
    const oX = getOrientationX(player.getRotation().x);
    for (let dy = -1; dy <= 1; dy++) {
        for (let dxz = -1; dxz <= 1; dxz++) {
            if (!dy && !dxz)
                continue;
            const offset = oX >= 0 ?
                new Vector(x < 0 ? -dy : dy, 0, z < 0 ? -dxz : dxz)
                : new Vector(oY >= 3 ? 0 : x < 0 ? -dxz : dxz, y < 0 ? -dy : dy, oY < 3 ? 0 : z < 0 ? -dxz : dxz);
            const block = dimension.getBlock(Vector.add({ x, y, z }, offset));
            if (!block)
                continue;
            if (hammerTags.some(t => block.hasTag(t)) || hammerIDs.includes(block.typeId))
                block.destroy();
        }
    }
});
const Shovel = new WeaponManager('break:shovel');
const shovelTags = [
    "grass",
    "gravel",
    "dirt",
    "snow",
    "sand"
];
Shovel.registerBreakBlockEffect('3x3', (player, _, block) => {
    const { x, y, z, dimension } = block;
    const oY = getOrientation(player.getRotation().y);
    const oX = getOrientationX(player.getRotation().x);
    for (let dy = -1; dy <= 1; dy++) {
        for (let dxz = -1; dxz <= 1; dxz++) {
            if (!dy && !dxz)
                continue;
            const offset = oX >= 0 ?
                new Vector(x < 0 ? -dy : dy, 0, z < 0 ? -dxz : dxz)
                : new Vector(oY >= 3 ? 0 : x < 0 ? -dxz : dxz, y < 0 ? -dy : dy, oY < 3 ? 0 : z < 0 ? -dxz : dxz);
            const block = dimension.getBlock(Vector.add({ x, y, z }, offset));
            if (block && shovelTags.some(t => block.hasTag(t)))
                block.destroy();
        }
    }
});
const hoeTags = [
    "grass",
    "dirt"
];
beforeEvents.itemUseOn.subscribe(async (data) => {
    const { itemStack: item, block, source: player } = data;
    if (!item.getTags().includes('break:hoe'))
        return;
    data.cancel = true;
    const { location, dimension } = block;
    await sleep();
    let success = false;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
            const block = dimension.getBlock(Vector.add(location, { x: dx, y: 0, z: dz }));
            if (!block || !hoeTags.some(t => block.hasTag(t)) || block.typeId === 'minecraft:farmland')
                continue;
            block.setType('minecraft:farmland');
            success = true;
        }
    }
    if (!success)
        return;
    dimension.playSound('step.gravel', location);
    DamageItem(player, item);
});
afterEvents.playerBreakBlock.subscribe(({ player, itemStackBeforeBreak: item }) => DamageItem(player, item));
