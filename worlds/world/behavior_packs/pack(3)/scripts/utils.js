import * as mc from "@minecraft/server";
import { EbreakBlocks, onlyIronBreake, onlyStoneBreake, onlyDiamondBreake } from "./blocks.js";

// Utility function to get hammer ID based on type
function getHammerId(player, item) {
    if (!player.isSneaking) return;
    const hammerTypes = {
        "ihg:wooden_hammer": "rc:3x3x1",
        "ihg:stone_hammer": "rc:3x3x1",
        "ihg:gold_hammer": "rc:3x3x1",
        "ihg:iron_hammer": "rc:3x3x1",
        "ihg:diamond_hammer": "rc:3x3x1",
        "ihg:netherite_hammer": "rc:3x3x2"
    };
    return hammerTypes[item?.typeId];
}

// Utility function to get large hammer ID
function getLargeHammerId(player, item) {
    if (!player.isSneaking) return;
    const largeHammerTypes = {
        "ihg:iron_hammer": "rc:3x3x2",
        "ihg:diamond_hammer": "rc:3x3x2",
        "ihg:netherite_hammer": "rc:3x3x3"
    };
    return largeHammerTypes[item?.typeId];
}

// Check if the player is in creative mode
const isCreative = (player) => player.runCommand("testfor @s[m=1]").successCount === 1;

function randomChance(chance) {
    const randomNumber = Math.random();
    return randomNumber < chance
}
// Handle durability damage
function durabilityDamage(player, item, damageTotalRemove = 1) {
    if (isCreative(player)) return;
    if (!(item?.typeId.includes("hammer") && item?.typeId?.startsWith("ihg:"))) return;
    const durabilityComponent = item.getComponent('minecraft:durability');
    const unbreakingLevel = item.getComponent(mc.ItemComponentTypes?.Enchantable)?.getEnchantment("unbreaking")?.level || 0
    if (durabilityComponent?.damage + 1 < durabilityComponent?.maxDurability) {
        if (
            (unbreakingLevel == 0 && randomChance(1)) ||
            (unbreakingLevel == 1 && randomChance(0.5)) ||
            (unbreakingLevel == 2 && randomChance(0.33)) ||
            (unbreakingLevel == 3 && randomChance(0.25))
        ) durabilityComponent.damage += damageTotalRemove
    } else {
        player.playSound("random.break")
        item = new mc.ItemStack('minecraft:air')
    }
    player.getComponent("equippable").setEquipment("Mainhand", item)
}

// Break blocks based on hammer type and pattern
function breakBlocks(block, hammerType, minePattern, hammerId, entity) {
    const blockLocation = block.location;
    const blockList = {
        "ihg:wooden_hammer": [...EbreakBlocks],
        "ihg:stone_hammer": [...EbreakBlocks, ...onlyStoneBreake],
        "ihg:gold_hammer": [...EbreakBlocks, ...onlyStoneBreake],
        "ihg:iron_hammer": [...EbreakBlocks, ...onlyStoneBreake, ...onlyIronBreake],
        "ihg:diamond_hammer": [...onlyDiamondBreake, ...onlyStoneBreake, ...EbreakBlocks, ...onlyIronBreake],
        "ihg:netherite_hammer": [...onlyDiamondBreake, ...onlyStoneBreake, ...EbreakBlocks, ...onlyIronBreake]
    };
    const blockTypesToBreak = blockList[hammerType.typeId];

    for (let x = minePattern[0]; x <= minePattern[3]; x++) {
        for (let y = minePattern[1]; y <= minePattern[4]; y++) {
            for (let z = minePattern[2]; z <= minePattern[5]; z++) {
                const location = { x: blockLocation.x + x, y: blockLocation.y + y, z: blockLocation.z + z };
                const replaceBlock = block.dimension.getBlock(location);
                if (replaceBlock.isValid() && entity.isSneaking) {
                    for (const currentId of blockTypesToBreak) {
                        if (entity.runCommand(`testforblock ${location.x} ${location.y} ${location.z} ${currentId}`).successCount > 0) {
                                let item = entity?.getComponent("equippable")?.getEquipment("Mainhand")
                            if (item){
                                const silkTouchLevel = item.getComponent(mc.ItemComponentTypes?.Enchantable)?.getEnchantment("silk_touch")?.level || 0
                                const fortuneLevel = item.getComponent(mc.ItemComponentTypes?.Enchantable)?.getEnchantment("fortune")?.level || 0
                                if (fortuneLevel > 0){
                                    entity.runCommand(`setblock ${location.x} ${location.y} ${location.z} air destroy`);
                                    let fortuneItem = replaceBlock.dimension.getEntities({location:location, maxDistante:1, type: "minecraft:item"})[0]?.getComponent("item").itemStack
                                    if (fortuneItem){
                                        if (
                                            (fortuneLevel == 0 && randomChance(0)) ||
                                            (fortuneLevel == 1 && randomChance(0.40)) ||
                                            (fortuneLevel == 2 && randomChance(0.40)) ||
                                            (fortuneLevel == 3 && randomChance(0.40))
                                        ) {
                                            block.dimension.spawnItem(new mc.ItemStack(fortuneItem.typeId, fortuneLevel), replaceBlock.center())
                                        }
                                    }
                                } else
                                if (silkTouchLevel > 0){
                                    block.dimension.spawnItem(new mc.ItemStack(replaceBlock?.getItemStack()?.typeId), replaceBlock.center());
                                    entity.runCommand(`setblock ${location.x} ${location.y} ${location.z} air`);
                                } else entity.runCommand(`fill ${location.x} ${location.y} ${location.z} ${location.x} ${location.y} ${location.z} air destroy`);
                                durabilityDamage(entity, hammerType);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

export {
    isCreative,
    durabilityDamage,
    getHammerId as id,
    getLargeHammerId as idLarge,
    breakBlocks
};
