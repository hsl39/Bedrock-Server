import { world, ItemStack } from '@minecraft/server';
const slabs = [
    { id: "better_on_bedrock:chorus_slab" },
    { id: "better_on_bedrock:dusk_slab" },
    { id: "better_on_bedrock:malbite_bricks_slab" },
    { id: "better_on_bedrock:malbite_smooth_slab" },
    { id: "better_on_bedrock:malbite_smoother_slab" },
    { id: "better_on_bedrock:voiding_slab" },
    { id: "better_on_bedrock:andesite_brick_slab" },
    { id: "better_on_bedrock:basalt_bricks_slab" },
    { id: "better_on_bedrock:chissled_basalt_bricks_slab" },
    { id: "better_on_bedrock:polished_basalt_slab" },
    { id: "better_on_bedrock:calcite_brick_slab" },
    { id: "better_on_bedrock:diorite_brick_slab" },
    { id: "better_on_bedrock:dripstone_brick_slab" },
    { id: "better_on_bedrock:granite_brick_slab" },
    { id: "better_on_bedrock:cobbled_sandstone_slab" },
    { id: "better_on_bedrock:sandstone_bricks_slab" },
    { id: "better_on_bedrock:smooth_sandstone_bricks_slab" },
    { id: "better_on_bedrock:smooth_sandstone_bricks_slab" },
    { id: "better_on_bedrock:soulsand_bricks_slab" },
    { id: "better_on_bedrock:cobbled_red_sandstone_slab" },
    { id: "better_on_bedrock:red_sandstone_bricks_slab" },
];

/** @type { import("@minecraft/server").BlockCustomComponent } */
export const events = {
    onPlayerDestroy: ({ block, player }) => {
        const isSlab = slabs.find((slab) => block.typeId(slab.id))
        // Check if player and equipment are valid
        if (!player || !player.getComponent('equippable')) {
            return;
        }

        // Get the item in the player's main hand
        const selectedItem = player.getComponent('equippable').getEquipment('Mainhand');

        // Check if the selected item is a pickaxe
        const isPickaxe = selectedItem && selectedItem.hasTag('minecraft:is_axe');

        // If the item is a pickaxe, spawn one slab in the block's position
        if (isPickaxe) {
            const slabItem = new ItemStack('better_on_bedrock:chorus_slab', 1);
            e.dimension.spawnItem(slabItem, block.location);
        }
    },
};