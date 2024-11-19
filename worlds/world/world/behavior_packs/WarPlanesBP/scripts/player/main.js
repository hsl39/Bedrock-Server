import { world, system } from '@minecraft/server'
import {NUMBER, Angle, VECTOR} from "../mathUtils.js"
import {Aircrafts, minSpeedForLift, MaxAirTime, MaxTakeOffTime} from "../Aircrafts.js"
import {getRidingEntity} from "./Componentsfunctions.js"
import {PlayerEquipment} from "./playerComponents.js"
import * as RidingPlane from "./RidingPlane.js"

system.runInterval(() => {
	let Players = world.getAllPlayers()
	for (let player of Players) {
	    const plane = getRidingEntity(player)
	    if (plane && Aircrafts.hasOwnProperty(plane.typeId)) {
	        playerRidingLoop (player, plane)
	        onEnterPlane (player, plane) 
	    } else {
	        onExitPlane (player)
	    }
	}
}, 0)

function playerRidingLoop (player, plane) {
    const itemHold = PlayerEquipment.getItemHold(player)
    RidingPlane.setCamera(player, plane, itemHold)
    
    RidingPlane.setActionbar (player, plane, itemHold)
	RidingPlane.playRiderAnimation (player, plane)
}
function onEnterPlane (player, plane) {
    const RidingPlane =  player.getDynamicProperty("l4gg-RidingPlane")
    if (RidingPlane) return
    //player.runCommand("camera @s set minecraft:follow_orbit view_offset 0 1")
    player.setDynamicProperty("l4gg-RidingPlane", plane.id)
}
function onExitPlane (player) {
    const RidingPlane =  player.getDynamicProperty("l4gg-RidingPlane")
    if (!RidingPlane) return
    player.camera.clear()
    player.setDynamicProperty("l4gg-RidingPlane", undefined)
    system.runTimeout(() => {player.camera.clear()}, 30)
}
function clearCustomCamera (player) {
    const hasCustomCamera = player.getDynamicProperty("l4gg-hasCustomCamera")
    if (hasCustomCamera) {
        player.setDynamicProperty("l4gg-hasCustomCamera", undefined)
        console.warn("camera clear")
        player.camera.clear()
    }
}