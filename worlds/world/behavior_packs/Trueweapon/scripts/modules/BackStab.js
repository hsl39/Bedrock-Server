import { WeaponManager } from "../libraries/WeaponManager";
const BackStab = new WeaponManager(/stabbing:([0-9]+)/);
BackStab.registerAttack("backstab", (player, target, item) => {
    const damage = item.getTags().find(t => t.match(BackStab.id_))?.[0].match(BackStab.id_)[1];
    if (!damage)
        return;
    const { y: rotY1 } = target.getRotation();
    const { y: rotY2 } = player.getRotation();
    if (!isInBack(rotY1, rotY2, 50))
        return;
    target.applyDamage(Number(damage));
});
function isInBack(rot1, rot2, threshold) {
    const adjustedYourRotation = ((rot2 + 180) % 360) - 180;
    const adjustedEntityRotation = ((rot1 + 180) % 360) - 180;
    const rotationDifference = Math.abs(adjustedYourRotation - adjustedEntityRotation);
    return rotationDifference <= threshold;
}
