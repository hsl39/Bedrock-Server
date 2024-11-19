// export const planks = [
//   "oak_planks",
//   "spruce_planks",
//   "birch_planks",
//   "jungle_planks",
//   "acacia_planks",
//   "dark_oak_planks",
// ];

// export const log = [
//   "oak_log",
//   "spruce_log",
//   "birch_log",
//   "jungle_log",
//   "acacia_log",
//   "dark_oak_log",
// ];

// export const stone = [
//   "stone",
//   "andesite",
//   "granite",
//   "diorite",
// ];

// export const leaves = [
//   "oak_leaves",
//   "spruce_leaves",
//   "birch_leaves",
//   "jungle_leaves",
//   "acacia_leaves",
//   "dark_oak_leaves",
// ];

// export const fences = {
//   oak_fence: "fence",
//   spruce_fence: "spruceFence",
//   birch_fence: "birchFence",
//   birch_fence: "birchFence",
//   jungle_fence: "jungleFence",
//   acacia_fence: "acaciaFence",
//   dark_oak_fence: "darkOakFence",
// };

// export function getColor(name) {
//   const colorM = {
//     light_blue_wool: "lightBlue",
//     light_gray_wool: "silver",
//     light_blue_carpet: "lightBlue",
//     light_gray_carpet: "silver",
//     light_blue_concrete_powder: "lightBlue",
//     light_gray_concrete_powder: "silver",
//     light_blue_concrete: "lightBlue",
//     light_gray_concrete: "silver",
//   };
//   if (name.includes("stained_glass")) {
//     if (name.includes("light_blue")) {
//       return "light_blue";
//     } else if (name.includes("light_gray")) {
//       return "silver";
//     }
//   }

//   return colorM[name] || name.split("_")[0];
// }

// export const blockLang = {
//   "grass_block": "grass",
//   "tall_grass": "double_plant.grass",
//   "short_grass": "tallgrass.grass",
//   "coarse_dirt": "dirt.coarse",
//   "large_fern": "tallgrass.fern",
// }

export const blocks = {
  "minecraft:oak_planks": {
    lang: "tile.planks.oak.name",
    tool: "axe"
  },
  "minecraft:spruce_planks": {
    lang: "tile.planks.spruce.name",
    tool: "axe"
  },
  "minecraft:birch_planks": {
    lang: "tile.planks.birch.name",
    tool: "axe"
  },
  "minecraft:jungle_planks": {
    lang: "tile.planks.jungle.name",
    tool: "axe"
  },
  "minecraft:acacia_planks": {
    lang: "tile.planks.acacia.name",
    tool: "axe"
  },
  "minecraft:dark_oak_planks": {
    lang: "tile.planks.big_oak.name",
    tool: "axe"
  },
  "minecraft:mangrove_planks": {
    lang: "tile.mangrove_planks.name",
    tool: "axe"
  },
  "minecraft:cherry_planks": {
    lang: "tile.cherry_planks.name",
    tool: "axe"
  },
  "minecraft:bamboo_planks": {
    lang: "tile.bamboo_planks.name",
    tool: "axe"
  },
  "minecraft:bamboo_mosaic": {
    lang: "tile.bamboo_mosaic.name",
    tool: "axe"
  },
  "minecraft:crimson_planks": {
    lang: "tile.crimson_planks.name",
    tool: "axe"
  },
  "minecraft:warped_planks": {
    lang: "tile.warped_planks.name",
    tool: "axe"
  },

  "minecraft:cobblestone_wall": {
    lang: "tile.cobblestone_wall.normal.name",
    tool: "pickaxe"
  },
  "minecraft:mossy_cobblestone_wall": {
    lang: "tile.cobblestone_wall.mossy.name",
    tool: "pickaxe"
  },
  "minecraft:granite_wall": {
    lang: "tile.cobblestone_wall.granite.name",
    tool: "pickaxe"
  },
  "minecraft:diorite_wall": {
    lang: "tile.cobblestone_wall.diorite.name",
    tool: "pickaxe"
  },
  "minecraft:andesite_wall": {
    lang: "tile.cobblestone_wall.andesite.name",
    tool: "pickaxe"
  },
  "minecraft:sandstone_wall": {
    lang: "tile.cobblestone_wall.sandstone.name",
    tool: "pickaxe"
  },
  "minecraft:red_sandstone_wall": {
    lang: "tile.cobblestone_wall.red_sandstone.name",
    tool: "pickaxe"
  },
  "minecraft:stone_brick_wall": {
    lang: "tile.cobblestone_wall.stone_brick.name",
    tool: "pickaxe"
  },
  "minecraft:mossy_stone_brick_wall": {
    lang: "tile.cobblestone_wall.mossy_stone_brick.name",
    tool: "pickaxe"
  },
  "minecraft:brick_wall": {
    lang: "tile.cobblestone_wall.brick.name",
    tool: "pickaxe"
  },
  "minecraft:nether_brick_wall": {
    lang: "tile.cobblestone_wall.nether_brick.name",
    tool: "pickaxe"
  },
  "minecraft:red_nether_brick_wall": {
    lang: "tile.cobblestone_wall.red_nether_brick.name",
    tool: "pickaxe"
  },
  "minecraft:end_stone_brick_wall": {
    lang: "tile.cobblestone_wall.end_brick.name",
    tool: "pickaxe"
  },
  "minecraft:prismarine_wall": {
    lang: "tile.cobblestone_wall.prismarine.name",
    tool: "pickaxe"
  },
  "minecraft:blackstone_wall": {
    lang: "tile.blackstone_wall.name",
    tool: "pickaxe"
  },
  "minecraft:polished_blackstone_wall": {
    lang: "tile.polished_blackstone_wall.name",
    tool: "pickaxe"
  },
  "minecraft:polished_blackstone_brick_wall": {
    lang: "tile.polished_blackstone_brick_wall.name",
    tool: "pickaxe"
  },
  "minecraft:cobbled_deepslate_wall": {
    lang: "tile.cobbled_deepslate_wall.name",
    tool: "pickaxe"
  },
  "minecraft:deepslate_tile_wall": {
    lang: "tile.deepslate_tile_wall.name",
    tool: "pickaxe"
  },
  "minecraft:polished_deepslate_wall": {
    lang: "tile.polished_deepslate_wall.name",
    tool: "pickaxe"
  },
  "minecraft:deepslate_brick_wall": {
    lang: "tile.deepslate_brick_wall.name",
    tool: "pickaxe"
  },
  "minecraft:mud_brick_wall": {
    lang: "tile.mud_brick_wall.name",
    tool: "pickaxe"
  },

  "minecraft:oak_fence": {
    lang: "tile.fence.name",
    tool: "axe"
  },
  "minecraft:spruce_fence": {
    lang: "tile.spruceFence.name",
    tool: "axe"
  },
  "minecraft:birch_fence": {
    lang: "tile.birchFence.name",
    tool: "axe"
  },
  "minecraft:jungle_fence": {
    lang: "tile.jungleFence.name",
    tool: "axe"
  },
  "minecraft:acacia_fence": {
    lang: "tile.acaciaFence.name",
    tool: "axe"
  },
  "minecraft:dark_oak_fence": {
    lang: "tile.darkOakFence.name",
    tool: "axe"
  },
  "minecraft:mangrove_fence": {
    lang: "tile.mangrove_fence.name",
    tool: "axe"
  },
  "minecraft:cherry_fence": {
    lang: "tile.cherry_fence.name",
    tool: "axe"
  },
  "minecraft:bamboo_fence": {
    lang: "tile.bamboo_fence.name",
    tool: "axe"
  },
  "minecraft:nether_brick_fence": {
    lang: "tile.nether_brick_fence.name",
    tool: "axe"
  },
  "minecraft:crimson_fence": {
    lang: "tile.crimson_fence.name",
    tool: "axe"
  },
  "minecraft:warped_fence": {
    lang: "tile.warped_fence.name",
    tool: "axe"
  },

  "minecraft:fence_gate": {
    lang: "tile.fence_gate.name",
    tool: "axe"
  },
  "minecraft:spruce_fence_gate": {
    lang: "tile.spruce_fence_gate.name",
    tool: "axe"
  },
  "minecraft:birch_fence_gate": {
    lang: "tile.birch_fence_gate.name",
    tool: "axe"
  },
  "minecraft:jungle_fence_gate": {
    lang: "tile.jungle_fence_gate.name",
    tool: "axe"
  },
  "minecraft:acacia_fence_gate": {
    lang: "tile.acacia_fence_gate.name",
    tool: "axe"
  },
  "minecraft:dark_oak_fence_gate": {
    lang: "tile.dark_oak_fence_gate.name",
    tool: "axe"
  },
  "minecraft:mangrove_fence_gate": {
    lang: "tile.mangrove_fence_gate.name",
    tool: "axe"
  },
  "minecraft:cherry_fence_gate": {
    lang: "tile.cherry_fence_gate.name",
    tool: "axe"
  },
  "minecraft:bamboo_fence_gate": {
    lang: "tile.bamboo_fence_gate.name",
    tool: "axe"
  },
  "minecraft:crimson_fence_gate": {
    lang: "tile.crimson_fence_gate.name",
    tool: "axe"
  },
  "minecraft:warped_fence_gate": {
    lang: "tile.warped_fence_gate.name",
    tool: "axe"
  },

  //! STAIRS

  "minecraft:wooden_door": {
    lang: "item.wooden_door.name",
    tool: "axe"
  },
  "minecraft:spruce_door": {
    lang: "item.spruce_door.name",
    tool: "axe"
  },
  "minecraft:birch_door": {
    lang: "item.birch_door.name",
    tool: "axe"
  },
  "minecraft:jungle_door": {
    lang: "item.jungle_door.name",
    tool: "axe"
  },
  "minecraft:acacia_door": {
    lang: "item.acacia_door.name",
    tool: "axe"
  },
  "minecraft:dark_oak_door": {
    lang: "item.dark_oak_door.name",
    tool: "axe"
  },
  "minecraft:mangrove_door": {
    lang: "item.mangrove_door.name",
    tool: "axe"
  },
  "minecraft:cherry_door": {
    lang: "item.cherry_door.name",
    tool: "axe"
  },
  "minecraft:bamboo_door": {
    lang: "item.bamboo_door.name",
    tool: "axe"
  },
  "minecraft:iron_door": {
    lang: "item.iron_door.name",
    tool: "pickaxe"
  },
  "minecraft:crimson_door": {
    lang: "item.crimson_door.name",
    tool: "axe"
  },
  "minecraft:warped_door": {
    lang: "item.warped_door.name",
    tool: "axe"
  },

  "minecraft:grass_block": {
    lang: "tile.grass.name",
    tool: "shovel"
  },
  "minecraft:podzol": {
    lang: "tile.podzol.name",
    tool: "shovel"
  },
  "minecraft:mycelium": {
    lang: "tile.mycelium.name",
    tool: "shovel"
  },
  "minecraft:grass_path": {
    lang: "tile.grass_path.name",
    tool: "shovel"
  },
  "minecraft:dirt": {
    lang: "tile.dirt.name",
    tool: "shovel"
  },
  "minecraft:coarse_dirt": {
    lang: "tile.dirt.coarse.name",
    tool: "shovel"
  },
  "minecraft:dirt_with_roots": {
    lang: "tile.dirt_with_roots.name",
    tool: "shovel"
  },
  "minecraft:farmland": {
    lang: "tile.farmland.name",
    tool: "shovel"
  },

  "minecraft:clay": {
    lang: "tile.clay.name",
    tool: "shovel"
  },

  "minecraft:stone": {
    lang: "tile.stone.stone.name",
    tool: "pickaxe"
  },
  "minecraft:granite": {
    lang: "tile.stone.granite.name",
    tool: "pickaxe"
  },
  "minecraft:diorite": {
    lang: "tile.stone.diorite.name",
    tool: "pickaxe"
  },
  "minecraft:andesite": {
    lang: "tile.stone.andesite.name",
    tool: "pickaxe"
  },
  "minecraft:blackstone": {
    lang: "tile.blackstone.name",
    tool: "pickaxe"
  },
  "minecraft:deepslate": {
    lang: "tile.deepslate.name",
    tool: "pickaxe"
  },
  "minecraft:tuff": {
    lang: "tile.tuff.name",
    tool: "pickaxe"
  },
  "minecraft:basalt": {
    lang: "tile.basalt.name",
    tool: "pickaxe"
  },
  "minecraft:polished_granite": {
    lang: "tile.stone.graniteSmooth.name",
    tool: "pickaxe"
  },
  "minecraft:polished_diorite": {
    lang: "tile.stone.dioriteSmooth.name",
    tool: "pickaxe"
  },
  "minecraft:polished_andesite": {
    lang: "tile.stone.andesiteSmooth.name",
    tool: "pickaxe"
  },
  "minecraft:polished_blackstone": {
    lang: "tile.polished_blackstone.name",
    tool: "pickaxe"
  },
  "minecraft:polished_deepslate": {
    lang: "tile.polished_deepslate.name",
    tool: "pickaxe"
  },
  "minecraft:polished_tuff": {
    lang: "tile.polished_tuff.name",
    tool: "pickaxe"
  },
  "minecraft:polished_basalt": {
    lang: "tile.polished_basalt.name",
    tool: "pickaxe"
  },
  "minecraft:smooth_basalt": {
    lang: "tile.smooth_basalt.name",
    tool: "pickaxe"
  },

  "minecraft:gravel": {
    lang: "tile.gravel.name",
    tool: "shovel"
  },
  "minecraft:sand": {
    lang: "tile.sand.name",
    tool: "shovel"
  },

  "minecraft:oak_log": {
    lang: "tile.log.oak.name",
    tool: "axe"
  },
  "minecraft:stripped_oak_log": {
    lang: "tile.stripped_oak_log.name",
    tool: "axe"
  },
  "minecraft:spruce_log": {
    lang: "tile.log.spruce.name",
    tool: "axe"
  },
  "minecraft:stripped_spruce_log": {
    lang: "tile.stripped_spruce_log.name",
    tool: "axe"
  },
  "minecraft:birch_log": {
    lang: "tile.log.birch.name",
    tool: "axe"
  },
  "minecraft:stripped_birch_log": {
    lang: "tile.stripped_birch_log.name",
    tool: "axe"
  },
  "minecraft:jungle_log": {
    lang: "tile.log.jungle.name",
    tool: "axe"
  },
  "minecraft:stripped_jungle_log": {
    lang: "tile.stripped_jungle_log.name",
    tool: "axe"
  },
  "minecraft:acacia_log": {
    lang: "tile.log.acacia.name",
    tool: "axe"
  },
  "minecraft:stripped_acacia_log": {
    lang: "tile.stripped_acacia_log.name",
    tool: "axe"
  },
  "minecraft:dark_oak_log": {
    lang: "tile.log.big_oak.name",
    tool: "axe"
  },
  "minecraft:stripped_dark_oak_log": {
    lang: "tile.stripped_dark_oak_log.name",
    tool: "axe"
  },
  "minecraft:mangrove_log": {
    lang: "tile.mangrove_log.name",
    tool: "axe"
  },
  "minecraft:stripped_mangrove_log": {
    lang: "tile.stripped_mangrove_log.name",
    tool: "axe"
  },
  "minecraft:cherry_log": {
    lang: "tile.cherry_log.name",
    tool: "axe"
  },
  "minecraft:stripped_cherry_log": {
    lang: "tile.stripped_cherry_log.name",
    tool: "axe"
  },
  "minecraft:crimson_stem": {
    lang: "tile.crimson_stem.name",
    tool: "axe"
  },
  "minecraft:stripped_crimson_stem": {
    lang: "tile.stripped_crimson_stem.name",
    tool: "axe"
  },
  "minecraft:warped_stem": {
    lang: "tile.warped_stem.name",
    tool: "axe"
  },
  "minecraft:stripped_warped_stem": {
    lang: "tile.stripped_warped_stem.name",
    tool: "axe"
  },

  "minecraft:oak_leaves": {
    lang: "tile.leaves.oak.name",
    tool: "shears"
  },
  "minecraft:spruce_leaves": {
    lang: "tile.leaves.spruce.name",
    tool: "shears"
  },
  "minecraft:birch_leaves": {
    lang: "tile.leaves.birch.name",
    tool: "shears"
  },
  "minecraft:jungle_leaves": {
    lang: "tile.leaves.jungle.name",
    tool: "shears"
  },
  "minecraft:acacia_leaves": {
    lang: "tile.leaves.acacia.name",
    tool: "shears"
  },
  "minecraft:dark_oak_leaves": {
    lang: "tile.leaves.big_oak.name",
    tool: "shears"
  },
  "minecraft:mangrove_leaves": {
    lang: "tile.mangrove_leaves.name",
    tool: "shears"
  },
  "minecraft:cherry_leaves": {
    lang: "tile.cherry_leaves.name",
    tool: "shears"
  },
  "minecraft:azalea_leaves": {
    lang: "tile.azalea_leaves.name",
    tool: "shears"
  },
  "minecraft:azalea_leaves_flowered": {
    lang: "tile.azalea_leaves_flowered.name",
    tool: "shears"
  },

  "minecraft:fern": {
    lang: "tile.tallgrass.fern.name",
    tool: "shears"
  },
  "minecraft:large_fern": {
    lang: "tile.double_plant.fern.name",
    tool: "shears"
  },
  "minecraft:short_grass": {
    lang: "tile.grass.name",
    tool: "shears"
  },
  "minecraft:tall_grass": {
    lang: "tile.double_plant.grass.name",
    tool: "shears"
  },
  "minecraft:nether_sprouts": {
    lang: "tile.nether_sprouts.name",
    tool: "shears"
  },

  "minecraft:seagrass": {
    lang: "tile.seagrass.seagrass.name",
    tool: "shears"
  },

}