import { EquipmentSlot, GameMode } from "@minecraft/server";
export function DamageItem(player, item, damage = 1) {
    if (!item?.typeId.startsWith('wb:') || player.getGameMode() === GameMode.creative)
        return false;
    const equip = player.equippable;
    const durability = item.getComponent('durability');
    if (!durability)
        return false;
    if (durability.damage + damage > durability.maxDurability) {
        equip.setEquipment(EquipmentSlot.Mainhand);
        player.playSound('random.break');
        return true;
    }
    const enchantable = item.getComponent('enchantable');
    const unbreaking = enchantable?.getEnchantment('unbreaking')?.level ?? 0;
    if (Math.random() * 100 <= (100 / (unbreaking + 1)))
        durability.damage += damage;
    equip.setEquipment(EquipmentSlot.Mainhand, item);
    return false;
}
export function DamageAnyItem(player, item, damage = 1) {
    if (!item || player.getGameMode() === GameMode.creative)
        return;
    const equip = player.equippable;
    const durability = item.getComponent('durability');
    if (!durability)
        return;
    if (durability.damage + damage > durability.maxDurability) {
        equip.setEquipment(EquipmentSlot.Mainhand);
        return player.playSound('random.break');
    }
    const enchantable = item.getComponent('enchantable');
    const unbreaking = enchantable?.getEnchantment('unbreaking')?.level ?? 0;
    if (Math.random() * 100 <= (100 / (unbreaking + 1)))
        durability.damage += damage;
    equip.setEquipment(EquipmentSlot.Mainhand, item);
}
