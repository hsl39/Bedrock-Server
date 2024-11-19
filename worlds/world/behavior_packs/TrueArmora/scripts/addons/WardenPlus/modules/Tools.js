import { afterEvents, repeat, sleep, Vector } from "../../../libraries/utils";
import { BlockPermutation, GameMode, ItemStack } from "@minecraft/server";
import { WeaponManager } from "../../../libraries/WeaponManager";
import { DamageItem } from "../../../modules/Durability";
/** ========================= Pickaxe / Shove / Hoe ========================= */
const Pickaxe = new WeaponManager(/wb:warden_(pickaxe|shovel|hoe)/);
const sculk = new ItemStack('sculk');
Pickaxe.registerBreakBlockEffect('Sculking all around', async (player, _, block, old) => {
    if (player.getGameMode() === GameMode.creative || (!old.hasTag('dirt') && !old.hasTag('grass')))
        return;
    const center = block.center();
    const spawned = new Set();
    const event = afterEvents.entitySpawn.subscribe(({ entity }) => {
        if (!entity.isValid() || spawned.has(entity.id) || entity.typeId !== 'minecraft:item')
            return;
        const distance = Vector.distance(center, entity.location);
        if (distance > .7)
            return;
        spawned.add(entity.id);
        entity.remove();
    });
    await sleep();
    afterEvents.entitySpawn.unsubscribe(event);
    if (!spawned.size)
        return;
    block.dimension.spawnItem(sculk, center);
});
/** ========================= Hoe ========================= */
const Hoe = new WeaponManager('wb:warden_hoe');
Hoe.registerBreakBlockEffect('Sculk Miner', async (_, item, block, old) => {
    if (!old.matches('minecraft:sculk'))
        return;
    const { dimension, location } = block;
    const silkTouch = item.enchantable?.getEnchantment('silk_touch');
    const positions = new Set();
    run(location);
    async function run(origin) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    const block = dimension.getBlock(new Vector(dx, dy, dz).add(origin));
                    if (!block?.matches('minecraft:sculk') || positions.has(block.location))
                        continue;
                    const { x, y, z } = block.location;
                    dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`);
                    if (silkTouch)
                        dimension.spawnItem(sculk, block.center());
                    positions.add(block.location);
                    await sleep(2);
                    run(block);
                }
            }
        }
    }
});
/** ========================= All Tools ========================= */
const Tools = new WeaponManager('wb:warden_');
const breaking = new Map();
Tools.registerBreakBlockEffect('Experience on Break', async (player, item) => {
    await sleep(2);
    const durability = item.durability;
    if (breaking.get(player.id) === durability?.damage)
        return;
    const broken = DamageItem(player, item);
    if (!broken)
        return;
    breaking.set(player.id, durability.damage);
    repeat(3, () => player.dimension.spawnEntity('xp_orb', player.location));
    breaking.delete(player.id);
});
Tools.registerKillEffect('Sculking', async (_, target) => {
    if (!target.isValid())
        return;
    const { dimension, location: { x: ax, y, z: az } } = target;
    for (let x = ax - 1; x <= ax + 1; x++) {
        for (let z = az - 1; z <= az + 1; z++) {
            if (x === ax || z === az) {
                const block1 = dimension.getBlock({ x, y: y - 1, z });
                if (!block1.isAir && !block1.isLiquid && !block1.matches('minecraft:bedrock'))
                    block1.setType('minecraft:sculk');
            }
            if (x !== ax && z !== az) {
                const block2 = dimension.getBlock({ x, y, z });
                if (block2.isAir)
                    block2.setPermutation(Vein);
            }
        }
    }
});
const Vein = BlockPermutation.resolve('minecraft:sculk_vein', {
    'multi_face_direction_bits': 1
});
