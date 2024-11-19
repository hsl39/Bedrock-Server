import { Block, EquipmentSlot, ItemStack, World } from "@minecraft/server";
import { system, world, Entity, Player } from "@minecraft/server";
export const Overworld = world.getDimension('overworld');
export const TheEnd = world.getDimension('the_end');
export const afterEvents = world.afterEvents;
export const beforeEvents = world.beforeEvents;
export function sleep(ticks) {
    return new Promise((resolve) => system.runTimeout(resolve, ticks));
}
export function repeat(times, callback) {
    for (let i = 0; i < times; i++) {
        callback();
    }
}
export function getOrientation(playerRotationY) {
    switch (true) {
        case playerRotationY > 70 && playerRotationY < 170:
            return 4;
        case playerRotationY > -45 && playerRotationY < 65:
            return 1;
        case playerRotationY > -100 && playerRotationY < -10:
            return 3;
        case playerRotationY >= 148 || playerRotationY < -100:
            return 2;
        default:
            return 0;
    }
}
export function getOrientationX(playerRotationX) {
    switch (true) {
        case playerRotationX > 20 && playerRotationX < -20:
            return -1;
        case playerRotationX > 37:
            return 1;
        case playerRotationX < -21:
            return 0;
        default:
            return -1;
    }
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getVolumePositions(from, to) {
    const minX = Math.min(from.x, to.x);
    const maxX = Math.max(from.x, to.x);
    const minY = Math.min(from.y, to.y);
    const maxY = Math.max(from.y, to.y);
    const minZ = Math.min(from.z, to.z);
    const maxZ = Math.max(from.z, to.z);
    const position = [];
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                position.push(new Vector(x, y, z));
            }
        }
    }
    return position;
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
        if (typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
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
World.prototype.deleteDynamicProperty = function (identifier) {
    this.setDynamicProperty(identifier);
};
// @ts-ignore
Entity.prototype.isPlayer = function () {
    return this.typeId === "minecraft:player";
};
Entity.prototype.getScore = function (objectiveID) {
    const _ = world.scoreboard;
    const scoreboard = _.getObjective(objectiveID) ?? _.addObjective(objectiveID);
    return scoreboard.hasParticipant(this) ? scoreboard.getScore(this) : 0;
};
Entity.prototype.setScore = function (objectiveID, score) {
    const _ = world.scoreboard;
    const scoreboard = _.getObjective(objectiveID) ?? _.addObjective(objectiveID);
    scoreboard.setScore(this, score);
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
Block.prototype.destroy = function (drop = true) {
    const gr = world.gameRules.doTileDrops;
    world.gameRules.doTileDrops = drop;
    const { dimension, x, y, z } = this;
    dimension.runCommand(`setblock ${x} ${y} ${z} air destroy`);
    world.gameRules.doTileDrops = gr;
};
