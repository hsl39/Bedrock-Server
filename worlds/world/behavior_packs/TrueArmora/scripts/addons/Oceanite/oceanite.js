import { EquipmentSlot } from "@minecraft/server";
class OceaniteArmor {
    baseId;
    constructor() {
        this.baseId = "true_on:seanite";
    }
    execute(player) {
        const armorParts = this._getArmorParts(player);
        if (armorParts.length < 1)
            return;
        if (!player.isInWater || !player.isSwimming)
            return;
        const { x, y, z } = player.getViewDirection();
        return player.applyKnockback(x, z, this._getVelocityBoost(0.1, armorParts), y / 3);
        // if (y < -0.2) return player.applyKnockback(x, z, this._getVelocityBoost(0.1, armorParts), -0.15);
        // if (y > 0.3) return player.applyKnockback(x, z, this._getVelocityBoost(0.1, armorParts), 0.15);
        // return player.applyKnockback(x, z, this._getVelocityBoost(0.1, armorParts), 0);
    }
    _getArmorParts(player) {
        const equippable = player.equippable;
        const slots = Object.values(EquipmentSlot);
        return slots.flatMap((slot) => {
            if (slot.includes('hand'))
                return [];
            const item = equippable.getEquipment(slot);
            return item?.typeId.includes(this.baseId) ? item : [];
        });
    }
    _getVelocityBoost(baseSpeed, armorPieces) {
        return baseSpeed + (0.3 * (armorPieces.length));
    }
}
export default new OceaniteArmor();
