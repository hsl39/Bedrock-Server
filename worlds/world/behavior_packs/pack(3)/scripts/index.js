import * as mc from '@minecraft/server';
import {
    isCreative,
    durabilityDamage,
    id,
    idLarge,
    breakBlocks
} from "./utils.js";

// Constants for patterns
const patterns = {
    "rc:3x3x1": {
        north: [-1, -1, 0, 1, 1, 0],
        south: [-1, -1, 0, 1, 1, 0],
        west: [0, -1, -1, 0, 1, 1],
        east: [0, -1, -1, 0, 1, 1],
        down: [-1, 0, -1, 1, 0, 1],
        up: [-1, 0, -1, 1, 0, 1]
    },
    "rc:3x3x2": {
        north: [-1, -1, 0, 1, 1, 1],
        south: [-1, -1, -1, 1, 1, 0],
        west: [0, -1, -1, 1, 1, 1],
        east: [-1, -1, -1, 0, 1, 1],
        down: [-1, 0, -1, 1, 1, 1],
        up: [-1, -1, -1, 1, 0, 1]
    },
    "rc:3x3x3": {
        north: [-1, -1, 0, 1, 1, 2],
        south: [-1, -1, -2, 1, 1, 0],
        west: [0, -1, -1, 2, 1, 1],
        east: [-2, -1, -1, 0, 1, 1],
        down: [-1, 0, -1, 1, 2, 1],
        up: [-1, -2, -1, 1, 0, 1]
    }
};

// Utility function to get mine pattern
function getMinePattern(id, direction) {
    return patterns[id] ? patterns[id][direction] : null;
}

// Function to handle durability
function handleDurability(player, hammer, damageTotalRemove) {
    if (!isCreative(player)) {
        const actualDurability = hammer.getComponent("minecraft:durability").maxDurability - hammer.getComponent("minecraft:durability").damage;
        if (actualDurability > damageTotalRemove) {
            hammer.getComponent("durability").damage += damageTotalRemove;
            player.getComponent("equippable").setEquipment("Mainhand", hammer);
        } else {
            player.runCommand("replaceitem entity @s slot.weapon.mainhand 0 air");
            player.runCommand("playsound random.break @s ~ ~ ~");
        }
    }
}

// Player break block event
mc.world.beforeEvents.playerBreakBlock.subscribe(data => {
    const player = data.player;
    const block = data.block;

    const direction = player.getBlockFromViewDirection()?.face.toLowerCase();
    mc.system.run(() => {
        const hammer = player.getComponent("equippable")?.getEquipment("Mainhand");
        if (!hammer?.typeId?.startsWith("ihg:")) return;
        durabilityDamage(player, hammer);

        const hammerId = id(player, hammer);
        const minePattern = getMinePattern(hammerId, direction);
        if (!minePattern) return;

        const level = hammer.getComponent("minecraft:enchantable")?.getEnchantment("unbreaking")?.level;
        const damageChance = Math.floor(Math.random() * 10);
        let damageTotalRemove = 1;

        if ((level === 1 && damageChance > 8) || (level === 2 && damageChance > 6) || (level === 3 && damageChance > 4)) {
            damageTotalRemove = 0;
        }

        handleDurability(player, hammer, damageTotalRemove);
        breakBlocks(block, hammer, minePattern, hammerId, player);
    });
});

// Item use on block event
mc.world.beforeEvents.itemUseOn.subscribe(data => {
    const player = data.source;
    const hammer = data.itemStack;
    mc.system.run(() => {
        if (!hammer?.typeId?.startsWith("ihg:")) return;

        const hammerTypeIdString = JSON.stringify(hammer?.typeId);
        const oldLog = console.log[hammerTypeIdString];
        console.log[hammerTypeIdString] = Date.now();
        if ((oldLog + 150) >= Date.now()) return;

        const direction = player.getBlockFromViewDirection()?.face.toLowerCase();
        const hammerId = idLarge(player, hammer);
        const minePattern = getMinePattern(hammerId, direction);
        if (!minePattern) return;

        breakBlocks(player.getBlockFromViewDirection().block, hammer, minePattern, hammerId, player);
    });
});

