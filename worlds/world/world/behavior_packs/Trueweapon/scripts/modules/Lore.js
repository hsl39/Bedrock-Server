import { system, world } from "@minecraft/server";
import { sleep } from "../libraries/utils";
const PrefixLores = {
    "netherite": "§r§d Fire Resistance"
};
const SimpleLores = {
    'minecraft:is_sword': '§r§d Sword',
    'minecraft:is_axe': '§r§d Axe',
    'minecraft:is_hoe': '§r§d Hoe',
    'minecraft:is_shovel': '§r§d Shovel',
    'minecraft:is_pickaxe': '§r§d Pickaxe',
    'true:is_spear': '§r§d Spear',
    'true:is_blunt': '§r§d Blunt',
    'weight:0': '§r§d Light',
    'weight:1': '§r§d Heavy',
    'weight:2': '§r§d Very Heavy',
    'weight:3': '§r§dUnsustainable',
    'fracture': '§r§d Broken Bones',
};
const vanillaTags = [
    "minecraft:is_sword",
    "minecraft:is_axe",
    "minecraft:is_hoe",
    "minecrafT:is_pickaxe",
    "minecraft:is_shovel"
];
const RegexpLores = {
    "§r§d Sweeping": /[A-z]+_sweep:[0-9]+/,
    "§r§d Bleeding": /sharp:[0-9]+:[0-9]+:[0-9]+/,
    "§r§d Stabbing": /stabbing:[0-9]+/
};
export async function SetLore() {
    const players = world.getPlayers();
    for (const player of players) {
        const inv = player.inventory.container;
        if (!inv)
            continue;
        for (let i = 0; i < inv.size; i++) {
            const slot = inv.getSlot(i);
            if (!slot.hasItem())
                continue;
            const tags = slot.getTags();
            const lores = [
                ...Object.entries(PrefixLores).flatMap(([p, l]) => slot.typeId.split(':')[1].startsWith(p) ? l : []),
                ...Object.entries(SimpleLores).flatMap(([r, l]) => tags.some(t => t.match(r)) ? l : []),
                ...Object.entries(RegexpLores).flatMap(([l, r]) => tags.some(t => t.match(r)) ? l : []),
            ];
            if ((slot.typeId.startsWith('minecraft:') && tags.some(t => vanillaTags.includes(t))) ||
                (slot.typeId.startsWith('true:') && !tags.some(t => t.startsWith('weight:'))))
                lores.push('§r§d Medium');
            const current = slot.getLore();
            if (!lores.length || current.join().includes(lores.join()))
                continue;
            slot.setLore(current.concat(lores));
        }
        await sleep();
    }
    system.run(SetLore);
}
