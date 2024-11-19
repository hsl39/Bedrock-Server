import { EquipmentSlot, GameMode } from "@minecraft/server";
export function DamageItem(player, slot, damage = 1) {
    const equip = player.equippable;
    const item = typeof slot === 'string' ? equip.getEquipment(slot) : slot;
    if (!item?.typeId.match(/(true_cop|true_dn|pa|true|true_ep|true_on|wb):/) || player.getGameMode() === GameMode.creative)
        return;
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
    equip.setEquipment(typeof slot === 'string' ? slot : EquipmentSlot.Mainhand, item);
    return false;
}
