import { world, system } from '@minecraft/server'
import {Rideable} from "./rideable.js"

export function setUpPrivateContainer (entity) {
    let containerEntity = entity.dimension.spawnEntity("adn:private_container", entity.location)
    let bol = Rideable.addRider(entity, containerEntity)
    if (bol) {
        containerEntity.setDynamicProperty("adn/planeId", entity.id)
        entity.setDynamicProperty("adn/private_container", containerEntity.id)
    }
}