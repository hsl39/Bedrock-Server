import { world, system, ItemStack} from '@minecraft/server'
import {Rideable} from "../aircraft/rideable.js"
import {VECTOR} from "../mathUtils.js"
import {PlanesGunData, setUpGunsData, updatePlanesGunData} from "./planesGunsData.js"
import { PlaneGuns } from "./Guns.js"

export function shoot (plane, type) {
    const GunInfo = PlaneGuns[plane.typeId][type]
    const bulletId = GunInfo.projectile.id
    const power = GunInfo.projectile.power
    const player = Rideable.hasRiderType(plane, "minecraft:player")
    
    const gunCount = GunInfo.count
    const bulletPositions = GunInfo.positions
    const initialDistance = 1
    
    let velocity = plane.getVelocity()
    let viewDirection = plane.getViewDirection()
    const distanceVector = VECTOR.multiplyByNum(viewDirection, initialDistance)
    viewDirection.y = 0
    viewDirection = VECTOR.normalize(viewDirection)
    let orthogonalDirection = VECTOR.getXZOrthogonal(viewDirection, 1)
    
    let initialLocation = plane.location
    const verticalPosition = GunInfo.verticalPosition || 1.2
    initialLocation.y += verticalPosition
    initialLocation = VECTOR.addWithVector(initialLocation, distanceVector)
    initialLocation = VECTOR.addWithVector(initialLocation, velocity)
    //console.warn(JSON.stringify())
    for (let pos of bulletPositions) {
        let bulletLocation = VECTOR.multiplyByNum(orthogonalDirection, pos)
        bulletLocation = VECTOR.addWithVector(initialLocation, bulletLocation)
        let bullet = plane.dimension.spawnEntity(bulletId, bulletLocation)
        setUpProjectile (plane, bullet, player, type)
    }
}

function setUpProjectile (plane, bullet, player, type) {
    let info = PlaneGuns[plane.typeId][type].projectile
    let power = info.power
    let projectileCompt = bullet.getComponent("projectile")
    projectileCompt.owner = plane
    let direction = plane.getViewDirection()
    direction = VECTOR.multiplyByNum(direction, power)
    projectileCompt.shoot(direction, {uncertainty: info.uncertainty})
    const removeHitAmunity = world.getDynamicProperty("PlaneGunsCustomDamage")
    //bullet.nameTag = player.name
    if (removeHitAmunity) return
    bullet.triggerEvent("adn:full_damage")
}
