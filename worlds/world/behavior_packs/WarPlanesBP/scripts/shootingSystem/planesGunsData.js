import { world, system, ItemStack} from '@minecraft/server'
import { PlaneGuns } from "./Guns.js"
import {Bombers} from "./bombers.js"
export const PlanesGunData = {}

export function setUpGunsData(plane) {
    let id = plane.id
    if (!PlanesGunData.hasOwnProperty(id)) {
        PlanesGunData[id] = {}
        if (PlaneGuns[plane.typeId].hasOwnProperty("machineGun")) {
            PlanesGunData[id].machineGun = new Gun()
        }
        if (Bombers.hasOwnProperty(plane.typeId)) {
            PlanesGunData[id].bomberCooldown = 0
        }
    }
}

class Gun {
    constructor() {
        this.isActive = false
        this.overheatValue = 0
        this.cooldown = 0
    }
}


export function updatePlanesGunData() {
    for (let i in PlanesGunData) {
        let plane = PlanesGunData[i]
        if (plane.hasOwnProperty("machineGun")) {
            if (plane.machineGun.cooldown > 0) {
                plane.machineGun.cooldown--
            }
            if (plane.machineGun.overheatValue > 0) {
                plane.machineGun.overheatValue--
            }
        }
        if (plane.hasOwnProperty("bomberCooldown")) {
            if (plane.bomberCooldown > 0) {
                plane.bomberCooldown -= 1
            }
        }
    }
}
