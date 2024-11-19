import { getRandomInt } from "../libraries/utils";
import { WeaponManager } from "../libraries/WeaponManager";
const Contusion = new WeaponManager('contusion');
Contusion.registerAttack('Everything is spinning...', (player, target) => {
    if (!target.isPlayer() || Math.random() > 0.04)
        return;
    target.onScreenDisplay.setActionBar({ translate: `trueweapons.contusion.line${getRandomInt(1, 4)}` });
    target.camera.fade({ fadeColor: { red: 1, green: 1, blue: 1 }, fadeTime: { fadeInTime: .4, fadeOutTime: .7, holdTime: 1 } });
    target.playSound('true.player.contusion', { location: target.location });
});
