import { getOrientation, getOrientationX, Vector } from "../libraries/utils";
import { WeaponManager } from "../libraries/WeaponManager";
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
