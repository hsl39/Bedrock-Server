import { WeaponManager } from "../libraries/WeaponManager";
const Weakness = new WeaponManager(/fatigue:[0-9]+:[0-9]+/);
Weakness.registerAttack("weakness_attack", (player, item) => {
    const [duration, amplifier] = item.getTags().find(t => t.match(Weakness.id_)).split(':').slice(1).map(t => Number(t));
    player.addEffect('weakness', duration, {
        showParticles: false,
        amplifier,
    });
});
