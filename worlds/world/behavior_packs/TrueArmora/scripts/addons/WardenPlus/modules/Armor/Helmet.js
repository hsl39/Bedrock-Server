import { EquipmentSlot, system, world } from "@minecraft/server";
import Warden from "./Warden";
const timers = new Map();
const souls = new Map();
Warden.registerTick('Soul Sensor', [EquipmentSlot.Head], (player) => {
    player.addEffect('water_breathing', 3, { showParticles: false });
    if (!player.isSneaking || timers.has(player.id))
        return;
    timers.set(player.id, 0);
    const interval = system.runInterval(() => {
        if (!player.isSneaking) {
            timers.delete(player.id);
            system.clearRun(interval);
            return;
        }
        const time = timers.get(player.id);
        const { dimension, location } = player;
        if (time > 2) {
            if (time < 4) {
                dimension.playSound('power.on.sculk_sensor', location);
                player.addEffect('darkness', 20 * 4);
            }
            const targets = dimension.getEntities({
                location,
                maxDistance: 8,
                excludeFamilies: ['inanimate'],
                excludeTypes: [
                    'minecraft:item',
                    'minecraft:ender_crystal',
                ],
            });
            for (const target of targets) {
                if (target.id === player.id || souls.has(target.id))
                    continue;
                const soul = dimension.spawnEntity("pa:dummy_soul", target.location);
                souls.set(target.id, soul);
            }
        }
        timers.set(player.id, time + 1);
    }, 20);
});
system.runInterval(() => {
    for (const [id, soul] of souls.entries()) {
        const entity = world.getEntity(id);
        if (entity?.isValid() && soul.isValid()) {
            soul.teleport(entity.location, { dimension: entity.dimension });
            continue;
        }
        try {
            soul.remove();
        }
        catch { }
        souls.delete(id);
    }
});
