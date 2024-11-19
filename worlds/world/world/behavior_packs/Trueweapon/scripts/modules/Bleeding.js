import { getRandomInt, sleep } from "../libraries/utils";
import { WeaponManager } from "../libraries/WeaponManager";
const Bleeding = new WeaponManager(/sharp:[0-9]+:[0-9]+:[0-9]+/);
const isBleeding = new Set();
Bleeding.registerAttack("bleeding", async (player, target, item) => {
    const [damage, duration, probability] = item.getTags().find(t => t.match(Bleeding.id_)).split(':').slice(1).map(t => Number(t));
    if (isBleeding.has(target.id) || Math.random() > (probability / 100))
        return;
    isBleeding.add(target.id);
    if (target.isPlayer())
        target.onScreenDisplay.setActionBar({ translate: `trueweapons.bleeding.line${getRandomInt(1, 4)}` });
    const sharpness = item.enchantable?.getEnchantment('sharpness')?.level ?? 0;
    for (let i = 0; i < duration; i++) {
        await sleep(20);
        if (!target.isValid())
            break;
        if (target.isPlayer() && !target.isSprinting && target.isSneaking)
            continue;
        const { dimension, location } = target;
        target.applyDamage(damage + sharpness);
        dimension.spawnParticle('minecraft:lava_drip_particle', location);
    }
    isBleeding.delete(target.id);
});
