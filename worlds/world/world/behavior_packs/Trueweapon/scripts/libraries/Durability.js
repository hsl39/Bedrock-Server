import { EquipmentSlot, GameMode } from "@minecraft/server";
export function DamageItem(player, item, damage = 1) {
    if (!item?.typeId.startsWith('true:') || player.getGameMode() === GameMode.creative)
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
