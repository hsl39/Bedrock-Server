const Deathnerite = {
    'true_dn:parcanite_helmet': ["§r§4+1 Tireless"],
    'true_dn:parcanite_chestplate': ["§r§4+1 Wither Immunity"],
    'true_dn:parcanite_leggings': ["§r§4+1 Darkness Mastery"],
    'true_dn:parcanite_boots': ["§r§4+1 Unstoppable"],
};
const WardenPlus = {};
const Oceanite = {
    'true_on:seanite_helmet': ['\n+1 Aquatic Breathing'],
    'true_on:seanite_chestplate': ['\n+1 Aquatic Protection'],
    'true_on:seanite_leggings': ['\n+1 Ancient Immunity'],
    'true_on:seanite_boots': ['\n+1 Aquatic Haste'],
};
const DarkArmor = [
    '§r§8+1 Dark Power',
    '§r§9+1 Knockback resistance'
];
const SteelPlus = {
    'pa:dark_steel_helmet': DarkArmor,
    'pa:dark_steel_chestplate': DarkArmor,
    'pa:dark_steel_leggings': DarkArmor,
    'pa:dark_steel_boots': DarkArmor,
};
export default {
    ...Deathnerite,
    ...WardenPlus,
    ...Oceanite,
    ...SteelPlus,
};
