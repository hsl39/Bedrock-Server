

import { BlockPermutation,ItemStack,world, system } from "@minecraft/server";









world.beforeEvents.playerBreakBlock.subscribe((event) => {
if(!event.block?.typeId?.startsWith('ray:')) return;
    system.run(() => {
        const blockPermutation = event.block.permutation;
        const blockReplacements = {
            "ray:deepslate_coal_ore": "minecraft:deepslate_coal_ore",

            "ray:coal_ore": "minecraft:coal_ore",
            "ray:diamond_ore": "minecraft:diamond_ore",
            "ray:deepslate_diamond_ore": "minecraft:deepslate_diamond_ore",
            "ray:copper_ore": "minecraft:copper_ore",
            "ray:deepslate_copper_ore": "minecraft:deepslate_copper_ore",
            "ray:iron_ore": "minecraft:iron_ore",
            "ray:deepslate_iron_ore": "minecraft:deepslate_iron_ore",
            "ray:emerald_ore": "minecraft:emerald_ore",
            "ray:deepslate_emerald_ore": "minecraft:deepslate_emerald_ore",
            "ray:lapis_ore": "minecraft:lapis_ore",
            "ray:deepslate_lapis_ore": "minecraft:deepslate_lapis_ore",
            "ray:gold_ore": "minecraft:gold_ore",
            "ray:deepslate_gold_ore": "minecraft:deepslate_gold_ore"
        };
        
        Object.entries(blockReplacements).forEach(([originalBlock, replacementBlock]) => {
            if (blockPermutation.matches(originalBlock)) {
                event.block.dimension.getBlock(event.block.location).setPermutation(BlockPermutation.resolve(replacementBlock));

            }
        });

});

event.cancel = true;
});

world.afterEvents.playerPlaceBlock.subscribe(({ player, block }) => {
    const blockPermutation = block.permutation;

    const blockReplacements = {
        "minecraft:coal_ore": "ray:coal_ore",
        "minecraft:deepslate_coal_ore": "ray:deepslate_coal_ore",

        "minecraft:diamond_ore": "ray:diamond_ore",
        "minecraft:deepslate_diamond_ore": "ray:deepslate_diamond_ore",
        "minecraft:copper_ore": "ray:copper_ore",
        "minecraft:deepslate_copper_ore": "ray:deepslate_copper_ore",
        "minecraft:iron_ore": "ray:iron_ore",
        "minecraft:deepslate_iron_ore": "ray:deepslate_iron_ore",
        "minecraft:emerald_ore": "ray:emerald_ore",
        "minecraft:deepslate_emerald_ore": "ray:deepslate_emerald_ore",
        "minecraft:lapis_ore": "ray:lapis_ore",
        "minecraft:deepslate_lapis_ore": "ray:deepslate_lapis_ore",
        "minecraft:gold_ore": "ray:gold_ore",
        "minecraft:deepslate_gold_ore": "ray:deepslate_gold_ore"
    };

    Object.entries(blockReplacements).forEach(([originalBlock, replacementBlock]) => {
        if (blockPermutation.matches(originalBlock)) {
            const blockLocation = block.location;
            player.dimension.runCommand(`setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${replacementBlock}`);
        }
    });
});



system.runInterval(() => {
    let players = world.getAllPlayers();
    players.forEach(player => {
        const inventoryComponent = player.getComponent("minecraft:inventory");
        if (!inventoryComponent) return;

        const inventory = inventoryComponent.container;

        const oreReplacements = {
            "ray:coal_ore": "minecraft:coal_ore",
            "ray:deepslate_coal_ore": "minecraft:deepslate_coal_ore",

            "ray:diamond_ore": "minecraft:diamond_ore",
            "ray:deepslate_diamond_ore": "minecraft:deepslate_diamond_ore",
            "ray:copper_ore": "minecraft:copper_ore",
            "ray:deepslate_copper_ore": "minecraft:deepslate_copper_ore",
            "ray:iron_ore": "minecraft:iron_ore",
            "ray:deepslate_iron_ore": "minecraft:deepslate_iron_ore",
            "ray:emerald_ore": "minecraft:emerald_ore",
            "ray:deepslate_emerald_ore": "minecraft:deepslate_emerald_ore",
            "ray:lapis_ore": "minecraft:lapis_ore",
            "ray:deepslate_lapis_ore": "minecraft:deepslate_lapis_ore",
            "ray:gold_ore": "minecraft:gold_ore",
            "ray:deepslate_gold_ore": "minecraft:deepslate_gold_ore"
        };

        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (item && oreReplacements[item.typeId]) {
                const amount = item.amount;
                const replacementItem = new ItemStack(oreReplacements[item.typeId], amount);
                inventory.setItem(i, replacementItem);
            }
        }3
    });
}, 4);

