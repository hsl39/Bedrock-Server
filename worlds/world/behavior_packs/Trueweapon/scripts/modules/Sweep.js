import { EntityDamageCause, system } from "@minecraft/server";
import { WeaponManager } from "../libraries/WeaponManager";
import { Vector } from "../libraries/utils";
const Sweep = new WeaponManager(/^([^:]+):([^:]+):([^:]+)$/);
const cooldown = new Map();
Sweep.registerAttack('Sweep', (player, target_, item, damage) => {
    if (cooldown.has(player.id))
        return;
    const [type, delay, size_] = item.getTags().flatMap(t => t.match(Sweep.id_) ?? []).slice(1);
    if (!type.endsWith('_sweep'))
        return;
    cooldown.set(player.id, system.runTimeout(() => cooldown.delete(player.id), Number(delay)) * 20);
    const { dimension, location } = player;
    const head = new Vector(player.getHeadLocation());
    const view = new Vector(player.getViewDirection());
    const distance = Vector.distance(location, target_.location);
    const direction = Vector.subtract(target_.location, location).normalize();
    dimension.playSound('sound.attack.sweep', location);
    dimension.spawnParticle('true:' + type, head.add(view.multiply(distance)));
    const size = Number(size_ ?? 3);
    const rays = size ?? 3;
    const offset = Math.PI / (size * 2.2);
    const initial = -offset * (rays - 1) / 2;
    const knockback = item.getTags().flatMap(t => t.match(/knockback:(\b\d+(\.\d+)?\b)/) ?? [])?.[1];
    if (knockback)
        try {
            target_.applyKnockback(direction.x, direction.z, Number(knockback), .25);
        }
        catch {
            target_.applyImpulse(direction.multiply(Number(knockback)));
        }
    for (let i = 0; i < Math.floor(rays); i++) {
        const angle = initial + i * offset;
        const subdirection = Vector.multiply(rotateVector(direction, angle), distance);
        const position = subdirection.add(location);
        // dimension.spawnEntity('armor_stand', position);
        const targets = dimension.getEntities({ location: position, maxDistance: 1 });
        for (const target of targets) {
            if ([target_.id, player.id].includes(target.id))
                continue;
            const families = target.getComponent('type_family');
            if (!families || families.hasTypeFamily('inanimate'))
                continue;
            if (knockback)
                try {
                    target.applyKnockback(subdirection.x, subdirection.y, Number(knockback), .5);
                }
                catch {
                    target.applyImpulse(subdirection.multiply(Number(knockback)));
                }
            target.applyDamage(Math.floor(damage * .5), {
                cause: EntityDamageCause.entityAttack,
                damagingEntity: player
            });
        }
    }
});
function rotateVector(vector, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = vector.x * cos - vector.z * sin;
    const z = vector.x * sin + vector.z * cos;
    return new Vector(x, vector.y, z);
}
