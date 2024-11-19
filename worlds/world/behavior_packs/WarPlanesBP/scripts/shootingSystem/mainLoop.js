import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {shoot} from "./shootProjectile.js"
import {PlanesGunData, setUpGunsData, updatePlanesGunData} from "./planesGunsData.js"
import { PlaneGuns } from "./Guns.js"
const Query = {
	families: [
		"l4gg-fighterPlane"
	]
}
system.runInterval(() => {
	let entities = world.getDimension("overworld").getEntities(Query);
	
	for (let plane of entities) {
	    setUpGunsData(plane)
	    mainLoop (plane)
	}
	updatePlanesGunData ()
}, 1)
function mainLoop (plane) {
    
    if (!PlanesGunData.hasOwnProperty(plane.id)) return
    const planeData = PlanesGunData[plane.id]
    
    if (planeData.hasOwnProperty("machineGun")) {
        const GunType = "machineGun"
        let gunData = planeData.machineGun
        if (!gunData.isActive) return
        let currentAmmo = 100
        const PlaneGunOverheat = PlaneGuns[plane.typeId][GunType].overheat
        
        
        if (gunData.cooldown == 0 && gunData.overheatValue < PlaneGunOverheat) {
            fire (plane, GunType)
            const PlaneCooldown = PlaneGuns[plane.typeId][GunType].cooldown
            gunData.cooldown += PlaneCooldown
            gunData.overheatValue += 5 + Math.round(gunData.overheatValue/35)
        }
    }

    
}
function fire (plane, GunType) {
    
    
    shoot (plane, GunType)
    playAnimation (plane, GunType)
    playFireSound (plane, GunType)
}
function playAnimation (plane, GunType) {
    const animation = PlaneGuns[plane.typeId][GunType].fireAnimation
    plane.playAnimation(animation)
}
function playFireSound (plane, GunType) {
    const fireSound = "gun.fire"
    const volume = PlaneGuns[plane.typeId][GunType].sounds.fire.volume || 1
    const pitch = PlaneGuns[plane.typeId][GunType].sounds.fire.pitch || 1
    const count = PlaneGuns[plane.typeId][GunType].count
    plane.runCommand(`playsound ${fireSound} @a[r=30]  `)
    //plane.dimension.playSound(fireSound, plane.location, {volume: volume})
    let direction = plane.getViewDirection()
    direction = VECTOR.multiplyByNum (direction, -14)
    let location = VECTOR.addWithVector(plane.location, direction)
    plane.dimension.playSound(fireSound, location, {volume: 2})
}