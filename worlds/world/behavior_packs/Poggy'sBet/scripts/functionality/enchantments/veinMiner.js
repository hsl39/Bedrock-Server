import { mine } from "./functionality";
export const blocks = [
    {
        blocks: [
            {
                name: "minecraft:ancient_debris",
                mineable: [
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:ancient_debris",
                smelted: "minecraft:netherite_scrap",
            },
        ],
    },
    {
        blocks: [
            {
                name: "minecraft:nether_gold_ore",
                mineable: [
                    "minecraft:wood_tier",
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:gold_nugget",
                xp: true,
            },
        ],
        drop: {
            min: 1,
            max: 6,
        },
    },
    {
        blocks: [
            {
                name: "minecraft:coal_ore",
                mineable: [
                    "minecraft:wood_tier",
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:coal",
                xp: true,
            },
            {
                name: "minecraft:deepslate_coal_ore",
                mineable: [
                    "minecraft:wood_tier",
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:coal",
                xp: true,
            },
            {
                name: "minecraft:deepslate_diamond_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:diamond",
                xp: true,
            },
            {
                name: "minecraft:deepslate_emerald_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:emerald",
                xp: true,
            },
            {
                name: "minecraft:deepslate_gold_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:raw_gold",
                smelted: "minecraft:gold_ingot",
                xp: false,
            },
            {
                name: "minecraft:deepslate_iron_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:raw_iron",
                smelted: "minecraft:iron_ingot",
                xp: false,
            },
            {
                name: "better_on_bedrock:deepslate_stardust_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "better_on_bedrock:stardust",
                xp: false,
            },
            {
                name: "minecraft:diamond_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:diamond",
                xp: true,
            },
            {
                name: "minecraft:emerald_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:emerald",
                xp: true,
            },
            {
                name: "minecraft:gold_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:raw_gold",
                smelted: "minecraft:gold_ingot",
                xp: false,
            },
            {
                name: "minecraft:iron_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:raw_iron",
                smelted: "minecraft:iron_ingot",
                xp: false,
            },
            {
                name: "better_on_bedrock:stardust_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "better_on_bedrock:stardust",
                xp: false,
            },
            {
                name: "better_on_bedrock:alluminum_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "better_on_bedrock:raw_alluminum",
                smelted: "better_on_bedrock:alluminum_ingot",
                xp: false,
            },
            {
                name: "better_on_bedrock:tin_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "better_on_bedrock:raw_tin",
                smelted: "better_on_bedrock:tin_ingot",
                xp: false,
            },
            {
                name: "better_on_bedrock:ender_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "better_on_bedrock:enderium",
                smelted: "better_on_bedrock:enderium_smelted",
                xp: false,
            },
            {
                name: "minecraft:quartz_ore",
                mineable: [
                    "minecraft:wood_tier",
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:quartz",
                xp: true,
            },
        ],
        drop: {
            min: 1,
            max: 1,
        },
    },
    {
        blocks: [
            {
                name: "minecraft:deepslate_redstone_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:redstone",
                xp: true,
            },
            {
                name: "minecraft:lit_deepslate_redstone_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:redstone",
                xp: true,
            },
            {
                name: "minecraft:lit_redstone_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:redstone",
                xp: true,
            },
            {
                name: "minecraft:redstone_ore",
                mineable: [
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:redstone",
                xp: true,
            },
        ],
        drop: {
            min: 2,
            max: 2.5,
        },
    },
    {
        blocks: [
            {
                name: "minecraft:deepslate_lapis_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:lapis_lazuli",
                xp: true,
            },
            {
                name: "minecraft:lapis_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:lapis_lazuli",
                xp: true,
            },
        ],
        drop: {
            min: 4,
            max: 9,
        },
    },
    {
        blocks: [
            {
                name: "minecraft:deepslate_copper_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:raw_copper",
                smelted: "minecraft:copper_ingot",
            },
            {
                name: "minecraft:copper_ore",
                mineable: [
                    "minecraft:stone_tier",
                    "minecraft:iron_tier",
                    "minecraft:diamond_tier",
                    "minecraft:netherite_tier",
                ],
                drop: "minecraft:raw_copper",
                smelted: "minecraft:copper_ingot",
            },
        ],
        drop: {
            min: 2,
            max: 5,
        },
    },
];

/** @param { import("@minecraft/server").PlayerBreakBlockAfterEvent } data */
export function veinMiner({
    block, player, dimension,
    itemStackBeforeBreak: itemStack,
    itemStackAfterBreak: afterItemStack,
    brokenBlockPermutation: permutation,
}) {
    if (itemStack == undefined || !itemStack.getLore().includes("§r§7Vein Miner I") || player.isSneaking)
        return;

    mine(block, permutation.type.id, player, itemStack, blocks);
};