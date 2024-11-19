// import { fences, planks, log, leaves, stone, getColor, blockLang } from "./blocks";

// export const crops = {
//   wheat: 7,
//   potatoes: 7,
//   carrots: 7,
//   beetroot: 7,
//   pitcher_crop: 4,
//   pumpkin_stem: 7,
//   melon_stem: 7,
//   sweet_berry_bush: 3,
// };

// export function validation(block) {
//   const { typeId, permutation } = block;
//   let name = typeId.split(":")[1];

//   const chiselType = permutation?.getState("chisel_type");
//   const damage = permutation?.getState("damage");
//   const doublePlantType = permutation?.getState("double_plant_type");
//   const flowerType = permutation?.getState("flower_type");
//   const newLeafType = permutation?.getState("new_leaf_type");
//   const oldLeafType = permutation?.getState("old_leaf_type");
//   const prismarineType = permutation?.getState("prismarine_block_type");
//   const sandType = permutation?.getState("sand_type");
//   const sandStoneType = permutation?.getState("sand_stone_type");
//   const saplingType = permutation?.getState("sapling_type");
//   const stoneBrickType = permutation?.getState("stone_brick_type");
//   const stoneType = permutation?.getState("stone_type");
//   const strippedBit = permutation?.getState("stripped_bit");
//   const tallGrassType = permutation?.getState("tall_grass_type");
//   const wallType = permutation?.getState("wall_block_type");
//   const woodType = permutation?.getState("wood_type");

//   if (planks.includes(name)) {
//     const [a, b] = name.split("_");
//     name = name != "dark_oak_planks" ? `${b}.${a}` : "planks.big_oak";
//   }
//   if (log.includes(name)) {
//     const [a, b] = name.split("_");
//     name = name != "dark_oak_log" ? `${b}.${a}` : "log.big_oak";
//   }
//   if (leaves.includes(name)) {
//     const [a, b] = name.split("_");
//     name = name != "dark_oak_leaves" ? `${b}.${a}` : "leaves.big_oak";
//   }
//   if (stone.includes(name)) {
//     name = `stone.${name}`
//   }
//   if (wallType) {
//     const type = {
//       cobblestone: ".normal",
//       mossy_cobblestone: ".mossy",
//     };
//     name += type[wallType] || `.${wallType}`;
//   }
//   if (fences[name]) name = fences[name];
//   if (name.includes("stained_glass")) {
//     let isPane = name.includes("stained_glass_pane");
//     let color = getColor(name);
//     name = isPane ? `stained_glass_pane.${color}` : `stained_glass.${color}`;
//   }
//   // slabs
//   if (stoneBrickType) name += `.${stoneBrickType}`;
//   if (prismarineType) {
//     name += `.${prismarineType.replace("default", "rough")}`;
//   }
//   if (sandStoneType) {
//     name += `.${sandStoneType.replace("heiroglyphs", "chiseled")}`;
//   }
//   if (chiselType) name += `.${chiselType}`;
//   if (name.includes("_wool") || name.includes("_carpet")) {
//     let color = getColor(name);
//     let type = name.includes("_wool") ? "wool" : "carpet";
//     name = `${type}.${color}`;
//   }
//   if (name.includes("concrete")) {
//     let type = name.includes("concrete_powder") ? "concretePowder" : "concrete";
//     let color = getColor(name);
//     name = `${type}.${color}`;
//   }

//   if (name.includes("_terracotta") && !name.includes("glazed")) {
//     let color = name.replace("_terracotta", "");
//     name = `stained_hardened_clay.${color === "light_blue" || color === "light_gray"
//       ? color === "light_blue"
//         ? (color = "lightBlue")
//         : "silver"
//       : color
//       }`;
//   }

//   if (blockLang[name]) name = blockLang[name]


//   return name;
// }

import { blocks } from "./blocks";

export const crops = {
  wheat: 7,
  potatoes: 7,
  carrots: 7,
  beetroot: 7,
  pitcher_crop: 4,
  pumpkin_stem: 7,
  melon_stem: 7,
  sweet_berry_bush: 3,
};

export function validation(block) {
  const { typeId, permutation } = block;

  let name = typeId.split(":")[1];

  return name;
}
