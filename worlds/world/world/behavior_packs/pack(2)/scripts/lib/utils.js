import { EquipmentSlot } from "@minecraft/server";
import { system, world, Entity, Player } from "@minecraft/server";
export const afterEvents = world.afterEvents;
export const beforeEvents = world.beforeEvents;
export function sleep(ticks) {
    return new Promise((resolve) => system.runTimeout(resolve, ticks));
}
export function cloneItemStackInfo(item, next) {
    next.nameTag = item.nameTag;
    next.amount = item.amount;
    next.keepOnDeath = item.keepOnDeath;
    next.lockMode = item.lockMode;
    next.setCanDestroy(item.getCanDestroy());
    next.setLore(item.getLore());
    const durability1 = item.getComponent('durability');
    const durability2 = next.getComponent('durability');
    durability2.damage = durability1.damage;
    const ench1 = item.getComponent('enchantable');
    if (ench1) {
        const ench2 = next.getComponent('enchantable');
        ench2?.addEnchantments(ench1.getEnchantments());
    }
    return next;
}
export class Vector {
    static up = { x: 0, y: 1, z: 0 };
    static down = { x: 0, y: -1, z: 0 };
    static forward = { x: 0, y: 0, z: 1 };
    static back = { x: 0, y: 0, z: -1 };
    static left = { x: -1, y: 0, z: 0 };
    static right = { x: 1, y: 0, z: 0 };
    static zero = { x: 0, y: 0, z: 0 };
    static multiply(vectorA, value) {
        return {
            x: vectorA.x * (typeof value === 'number' ? value : value.x ?? 1),
            y: vectorA.y * (typeof value === 'number' ? value : value.y ?? 1),
            z: vectorA.z * (typeof value === 'number' ? value : value.z ?? 1)
        };
    }
    static add(vectorA, vectorB) {
        return {
            x: vectorA.x + (vectorB.x ?? 0),
            y: vectorA.y + (vectorB.y ?? 0),
            z: vectorA.z + (vectorB.z ?? 0)
        };
    }
    static subtract(vectorA, vectorB) {
        return {
            x: vectorA.x - (vectorB.x ?? 0),
            y: vectorA.y - (vectorB.y ?? 0),
            z: vectorA.z - (vectorB.z ?? 0)
        };
    }
    static distance(vectorA, vectorB) {
        return Math.sqrt(Math.pow(vectorA.x - vectorB.x, 2)
            + Math.pow(vectorA.y - vectorB.y, 2)
            + Math.pow(vectorA.z - vectorB.z, 2));
    }
}
Entity.prototype.isPlayer = function () {
    return this.typeId === "minecraft:player";
};
Object.defineProperties(Entity.prototype, {
    health: {
        get: function () {
            return this.getComponent('health');
        }
    },
    inventory: {
        get: function () {
            return this.getComponent('inventory');
        }
    }
});
Object.defineProperty(Player.prototype, 'equippable', {
    get: function () {
        return this.getComponent('equippable');
    },
    enumerable: true,
    configurable: false
});
Player.prototype.getMainhand = function () {
    return this.equippable.getEquipment(EquipmentSlot.Mainhand);
};
