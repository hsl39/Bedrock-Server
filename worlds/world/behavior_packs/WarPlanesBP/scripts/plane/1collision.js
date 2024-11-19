import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {isColliding} from "../utils/raycastCollision.js"
import {removeControls} from "../aircraft/controls.js"
export function collision (entity, rider, privateContainerEntity) {
    let collisionDetectionOn = world.getDynamicProperty("aircraftCollision")
    let currentSpeed = entity.getDynamicProperty("aircraft/current/speed")
    if (collisionDetectionOn != "raycast" || currentSpeed < 0.5) return
    
    setUpCollision (entity)
    //setPosition (entity, 5)
    let collided = false
    if (entity.hasTag("collided")) {
        system.runTimeout(() => {
            rider.camera.clear()
        }, 20)
        rider.setDynamicProperty("adn/ride/id", undefined)
        entity.dimension.createExplosion(entity.location, 3, {causesFire: true, source: entity})
        removeControls(rider, privateContainerEntity)
        privateContainerEntity.triggerEvent("adn:despawn")
        entity.getComponent("rideable").ejectRiders()
        entity.kill()
        
    }
    
}
function setUpCollision (entity) {
    let viewDirection = entity.getViewDirection()
    let rotation = entity.getRotation()
    
    let hasCollided = isColliding(entity.dimension, entity.location, viewDirection, rotation)
    if (hasCollided) {
        entity.addTag("collided")
    }
    
}


function projectileBasedCollision (entity) {
    let collisionId = entity.getDynamicProperty("collisionId")
    if (collisionId == undefined) {
        summonCollision (entity)
        return
    }
    let collision = world.getEntity(collisionId)
    if (collision == undefined) summonCollision (entity)
}

function setPosition (entity, distance) {
    
    let collisionId = entity.getDynamicProperty("collisionId")
    let collision = world.getEntity(collisionId)
    collision.runCommand("effect @s slow_falling 1 1 true")
    let location = entity.location
    
    let direction = entity.getViewDirection()
    direction = VECTOR.multiplyByNum (direction, distance)
    location.y += Math.max(1.2 - Math.abs(direction.y), 0)
    location = VECTOR.addWithVector(location, direction)
    //collision.teleport(location, {})
    let velocity = VECTOR.subtractWithVector(location, collision.location)
    //velocity = VECTOR.multiplyByNum(velocity, 0.1)
    collision.applyImpulse(velocity)
    //console.warn(JSON.stringify(direction))
}

function summonCollision (entity) {
    //world.sendMessage("hello")
    let location  = entity.location
    location.y += 1
    let dummy = world.getDimension(entity.dimension.id).spawnEntity("adn:collision", location)
    entity.setDynamicProperty("collisionId", dummy.id)
    dummy.setDynamicProperty("ownerId", entity.id)
}