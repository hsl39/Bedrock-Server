import { EquipmentSlot, ItemStack } from "@minecraft/server";
import { system, world, World, Entity, Player, Block } from "@minecraft/server";
export const afterEvents = world.afterEvents;
export const beforeEvents = world.beforeEvents;
export function sleep(ticks = 1) {
    return new Promise((resolve) => system.runTimeout(resolve, ticks));
}
export function repeat(times, callback) {
    for (let i = 0; i < times; i++) {
        callback();
    }
}
export function getInRadius(player) {
    return [...player.dimension.getEntities({ location: player.location, maxDistance: 8 })];
}
export function checkIfInRadius(entityId, entityList) {
    return entityList.find(e => e.id === entityId);
}
export function getAllInRadius() {
    let result = [];
    for (const player of world.getPlayers()) {
        result = result.concat(getInRadius(player));
    }
    return result;
}
export function inAnyRadius(entity, radius = 8) {
    for (const player of world.getPlayers()) {
        if (player.dimension.id !== entity.dimension.id)
            continue;
        if (Vector.distance(entity.location, player.location) > radius)
            continue;
        return true;
    }
    return false;
}
export function hasInInventory(player, itemId, getAll = false) {
    const inventoryContainer = player.inventory.container;
    const items = [];
    for (let i = 0; i < inventoryContainer.size; i++) {
        const item = inventoryContainer.getItem(i);
        if (!item || item?.typeId != itemId)
            continue;
        if (getAll)
            items.push({ slot: i, item });
        else
            return { slot: i, item };
    }
    return items;
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
    x;
    y;
    z;
    static up = { x: 0, y: 1, z: 0 };
    static down = { x: 0, y: -1, z: 0 };
    static forward = { x: 0, y: 0, z: 1 };
    static back = { x: 0, y: 0, z: -1 };
    static left = { x: -1, y: 0, z: 0 };
    static right = { x: 1, y: 0, z: 0 };
    static zero = { x: 0, y: 0, z: 0 };
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    floor() {
        return Vector.floor(this);
    }
    equals(other) {
        return Vector.equals(this, other);
    }
    length() {
        return Vector.length(this);
    }
    multiply(value) {
        // @ts-ignore
        return Vector.multiply(this, value);
    }
    add(other) {
        return Vector.add(this, other);
    }
    subtract(other) {
        return Vector.subtract(this, other);
    }
    cross(other) {
        return Vector.cross(this, other);
    }
    distance(other) {
        return Vector.distance(this, other);
    }
    normalize() {
        return Vector.normalize(this);
    }
    static floor(vector) {
        return new Vector(Math.floor(vector.x), Math.floor(vector.y), Math.floor(vector.z));
    }
    static equals(vectorA, vectorB) {
        return JSON.stringify(Vector.floor(vectorA)) === JSON.stringify(Vector.floor(vectorB));
    }
    static length(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }
    static multiply(vectorA, value) {
        return new Vector(vectorA.x * (typeof value === 'number' ? value : value.x ?? 1), vectorA.y * (typeof value === 'number' ? value : value.y ?? 1), vectorA.z * (typeof value === 'number' ? value : value.z ?? 1));
    }
    static add(vectorA, vectorB) {
        return new Vector(vectorA.x + (vectorB.x ?? 0), vectorA.y + (vectorB.y ?? 0), vectorA.z + (vectorB.z ?? 0));
    }
    static subtract(vectorA, vectorB) {
        return new Vector(vectorA.x - (vectorB.x ?? 0), vectorA.y - (vectorB.y ?? 0), vectorA.z - (vectorB.z ?? 0));
    }
    static cross(vectorA, vectorB) {
        return new Vector(vectorA.y * vectorB.z - vectorA.z * vectorB.y, vectorA.z * vectorB.x - vectorA.x * vectorB.z, vectorA.x * vectorB.y - vectorA.y * vectorB.x);
    }
    static distance(vectorA, vectorB) {
        return Math.sqrt(Math.pow(vectorA.x - vectorB.x, 2)
            + Math.pow(vectorA.y - vectorB.y, 2)
            + Math.pow(vectorA.z - vectorB.z, 2));
    }
    static normalize(vector) {
        const len = Vector.length(vector);
        return new Vector(vector.x / len, vector.y / len, vector.z / len);
    }
}
export var ArmorSlot;
(function (ArmorSlot) {
    ArmorSlot["Head"] = "helmet";
    ArmorSlot["Chest"] = "chestplate";
    ArmorSlot["Legs"] = "leggings";
    ArmorSlot["Feet"] = "boots";
})(ArmorSlot || (ArmorSlot = {}));
World.prototype.deleteDynamicProperty = function (identifier) {
    this.setDynamicProperty(identifier);
};
// @ts-ignore
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
    },
    equippable: {
        get: function () {
            return this.getComponent('equippable');
        }
    },
});
Object.defineProperties(Player.prototype, {
    inventory: {
        get: function () {
            const inventory = this.getComponent('inventory');
            if (inventory)
                return inventory;
            throw new Error('MC error: Please do /reload');
        }
    },
    equippable: {
        get: function () {
            const equippable = this.getComponent('equippable');
            if (equippable)
                return equippable;
            throw new Error('MC error: Please do /reload');
        }
    },
});
Player.prototype.getMainhand = function () {
    return this.equippable.getEquipment(EquipmentSlot.Mainhand);
};
Object.defineProperties(ItemStack.prototype, {
    durability: {
        get: function () {
            return this.getComponent('durability');
        }
    },
    enchantable: {
        get: function () {
            return this.getComponent('enchantable');
        }
    },
});
Object.defineProperties(Block.prototype, {
    inventory: {
        get: function () {
            return this.getComponent('inventory');
        }
    },
});
