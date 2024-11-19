import { world, system, ItemStack} from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "./mathUtils.js"
import {Aircrafts} from "./Aircrafts.js"
import {getRidingEntity} from "./player/Componentsfunctions.js"
const print = (text) => {
	world.getDimension("overworld").runCommand(`say `+text)
}

world.afterEvents.itemUse.subscribe(({itemStack, source }) => {
    //source.sendMessage("hello world")
    if (itemStack.typeId == "l4gg:accelerator") {
        let ride = getRidingEntity(source)
        if (!ride || !Aircrafts.hasOwnProperty(ride.typeId)) return
        setAircraftSpeed(ride, Aircrafts[ride.typeId].acceleration)
    } else if (itemStack.typeId == "l4gg:decelerator") {
        let ride = getRidingEntity(source)
        if (!ride || !Aircrafts.hasOwnProperty(ride.typeId)) return
        setAircraftSpeed(ride, Aircrafts[ride.typeId].brakes)
    }
})


function setAircraftSpeed(plane, addSpeed) {
    const isFuelLevelOn = world.getDynamicProperty("adnAircraftFuelSystem")
    let fuelLevel = plane.getProperty("adn:fuel") 
    if (isFuelLevelOn && fuelLevel <= 0) return
    const maxSpeed = Aircrafts[plane.typeId].speed.max
    
    let current = plane.getProperty("adn:speed") + addSpeed
    current = NUMBER.clamp(current, 0.001, maxSpeed)
    
    plane.setProperty("adn:speed", current)
    //rider.sendMessage(current)
    
}