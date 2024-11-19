import { WeaponManager } from "../libraries/WeaponManager";
import { system, world } from "@minecraft/server";
import { afterEvents, getRandomInt } from "../libraries/utils";
const Fracture = new WeaponManager('fracture');
Fracture.registerAttack('Bone Crusher', (player, target) => {
    if (Math.random() > .05)
        return;
    player.onScreenDisplay.setActionBar({ translate: `trueweapons.broken_bone.line${getRandomInt(1, 5)}` });
    player.playSound('true.player.dismembered', { pitch: 1.5 });
    player.addTag('true:fractured');
});
system.runInterval(() => {
    for (const player of world.getPlayers({ tags: ['true:fractured'] })) {
        const left = player.getScore('true:fractured');
        if (left <= 0) {
            player.removeTag('true:fractured');
            continue;
        }
        player.setScore('true:fractured', left - 1);
        const health = player.health;
        if (health.currentValue > 18)
            health.setCurrentValue(18);
    }
});
afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
    if (initialSpawn)
        return;
    player.removeTag('true:fractured');
    player.setScore('true:fractured', 0);
});
