//Created by L4ggcrafter/ned2z
import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "./mathUtils.js"
import {Rider} from "./riderFunctions.js"
import {setVelocity} from "./aircraft/general.js"
import {setRotation} from "./aircraft/Rotations.js"
import {collision} from "./plane/collision.js"
import {updateFuel} from "./aircraft/fuelSystem.js"
import {Rideable} from "./aircraft/rideable.js"
import {playSoundEffects} from "./aircraft/sounds.js" 
import {removeControls, setUpControls} from "./aircraft/controls.js"
import {takeOffPlane} from "./aircraft/TakeOff.js"
import {tick} from "./plane/tick.js"
import {landingHandler} from "./aircraft/landingHandler.js"

import {Aircrafts, minSpeedForLift, MaxAirTime, MaxTakeOffTime} from "./Aircrafts.js"


const Query = {
	families: [
		"l4gg-warplanes"
	]
}
system.runInterval(() => {
	let entities = world.getDimension("overworld").getEntities(Query);
	for (let plane of entities) {
	    tick(plane)
	    let rider = plane.getComponent("rideable").getRiders()
	    let privateContainerEntity = Rideable.getRiderByType(plane, "adn:private_container")
	    
	    if (!Rideable.hasRiderType(plane, "minecraft:player")) {
	        
	        onRiderLeave (plane, privateContainerEntity)
	        continue
	    }
	    rider = Rideable.getRiderByType(plane, "minecraft:player")
	    intitialize (plane, rider, privateContainerEntity)
	    const isFuelLevelOn = world.getDynamicProperty("adnAircraftFuelSystem")
	    if (isFuelLevelOn) {
	        const fuelLevel = updateFuel(plane, rider)
	        if (fuelLevel <= 0) {
	            decelerate (plane)
	        }
	    }
	    
	    const speed = plane.getProperty("adn:speed");
	    const rotationSpeed = Aircrafts[plane.typeId].rotationSpeed
	    const AGT = setAirAndGroundTime (plane)
	    const hasTakenOff = plane.getProperty("l4gg:has_taken_off")
	    if (!hasTakenOff) {
	        takeOffPlane (plane)
	    }
	    landingHandler(plane)
	    const rotation = setRotation(plane, rider, hasTakenOff)
	    setVelocity(plane, rotation, speed, hasTakenOff)
	    collision(plane, rider, privateContainerEntity)
	    playSoundEffects(plane, rider, speed)
	    //setTakenOffTag (plane)
	    //test(plane, rider)
	    
	    
	}
}, 0)
const decelerationRate = 0.05
function decelerate (plane) {
    const speed = plane.getProperty("adn:speed");
    if (speed <= 0) return
    let newSpeed = Math.max(speed - decelerationRate, 0)
    plane.setProperty("adn:speed", newSpeed)
}
function setAirAndGroundTime (plane) {
    const MaxGroundTime = 100
    let airTime = plane.getDynamicProperty("adn/airTime") || 0
    let groundTime = plane.getDynamicProperty("adn/groundTime") || 0
    if (plane.isOnGround) {
        airTime = 0
        groundTime = Math.min(groundTime + 1, MaxGroundTime)
    } else {
        groundTime = 0
        airTime = Math.min(airTime + 1, MaxAirTime)
    }
    
    plane.setDynamicProperty("adn/airTime", airTime)
    plane.setDynamicProperty("adn/groundTime", groundTime)
    return { airTime: airTime, groundTime: groundTime}
}

function onRiderLeave (plane, privateContainerEntity) {
    //world.sendMessage("rider left")
    //console.warn("rider is lefting")
    plane.triggerEvent("adn:gravity_on")
    plane.setProperty("adn:speed", 0)
    plane.setDynamicProperty("aircraft/rotation/x", 0)
    plane.setDynamicProperty("aircraft/current/speed", 0)
    plane.setProperty("l4gg:has_taken_off", false)
    let riderId = plane.getDynamicProperty("adn/rider/id")
    
    if (riderId != undefined) {
        let rider = world.getEntity(riderId)
        rider.setDynamicProperty("adn/ride/id", undefined)
        plane.setDynamicProperty("adn/rider/id", undefined)
        if (rider == undefined) return
        removeControls (rider, privateContainerEntity)
        console.warn("rider left")
        system.runTimeout(() => {
            plane.triggerEvent("adn:gravity_on")
        }, 20)
        
    }
}
function  intitialize (plane, rider, privateContainerEntity) {
    plane.runCommand("effect @s resistance 999999 3 true")
    rider.removeTag("vxRemoveCamera")
    let riderDynamicProperty = rider.getDynamicProperty("adn/ride/id")
    let planeDynamicProperty = plane.getDynamicProperty("adn/rider/id")
    if (riderDynamicProperty == plane.id && planeDynamicProperty == rider.id) return
    
    plane.setDynamicProperty("adn/rider/id", rider.id)
    rider.setDynamicProperty("adn/ride/id", plane.id)
    
    setUpControls(rider, plane, privateContainerEntity)

    plane.triggerEvent("adn:gravity_off")
    plane.triggerEvent("steering:locked")
    setUpFuel (plane, rider)
    system.runTimeout(() => {
        let steeringType = world.getDynamicProperty("defaultSteering")
         plane.triggerEvent(steeringType) 
    }, 20)
    
}
function setUpFuel (plane, rider) {
    let fuelLevel = plane.getProperty("adn:fuel")
    const isFuelLevelOn = world.getDynamicProperty("adnAircraftFuelSystem")
    if (!isFuelLevelOn || fuelLevel > 0) return
    rider.sendMessage("§cYour plane is out of fuel! §rUse §4Redstone§r to refuel by §l§nclicking§r on the plane when not riding it.")
}

function test (plane, rider) {
    if (rider.hasTag("test")) {
        let riderId = rider.getDynamicProperty("adn/ride/id")
        console.warn(riderId)
        let test = "\n"
        test += "cureent Plane Id "+plane.id+"\n\n"
        test += "Plane Id: "+rider.getDynamicProperty("adn/ride/id")
        test += "\n"
        test += "player id "+plane.getDynamicProperty("adn/rider/id")
        world.sendMessage(test)
        rider.removeTag("test")
    }
}