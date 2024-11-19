import { world, system } from '@minecraft/server'
import {addFuel} from "./aircraft/fuelSystem.js"
import {Aircrafts} from "./Aircrafts.js"

world.afterEvents.entityHitEntity.subscribe((e) => {
    if (Aircrafts.hasOwnProperty(e.hitEntity.typeId)) {
        addFuel (e.hitEntity, e.damagingEntity)
    }
})

