import { world, system } from '@minecraft/server'

const PlaneCameraPrperties = {
    "squid7377093:a320_ba": {
        height: 4,
        distance: -20
    }
}
system.runInterval(() => {
	let Players = world.getAllPlayers()
	for (let player of Players) {
	    const plane = getRidingEntity(player)
	    if (plane && PlaneCameraPrperties.hasOwnProperty(plane.typeId)) {
	        playCamera (player, plane)
	    } else {
	        clearCamera(player, plane)
	    }
	}
}, 0)
function playCamera (player, plane) {
    const height = PlaneCameraPrperties[plane.typeId].height
    const distance = PlaneCameraPrperties[plane.typeId].distance
    /*
    const cameraOptions = { viewOffset: { x: 3, y: 3 }}
    player.camera.setCamera('minecraft:follow_orbit', cameraOptions);
    */
    //player.runCommand("camera @s set minecraft:follow_orbit distance 20")
    player.camera.setCamera("l4gg:riding_plane1")
    const hasCustomCamera = player.getDynamicProperty ("hasCustomCamera")
    if (hasCustomCamera) return
    player.setDynamicProperty ("hasCustomCamera", true)
}
function clearCamera (player, plane) {
    const hasCustomCamera = player.getDynamicProperty ("hasCustomCamera")
    if (hasCustomCamera) {
        player.camera.clear()
        player.setDynamicProperty ("hasCustomCamera", undefined)
    }
}
function getRidingEntity (player) {
    let ridingCompt = player.getComponent("riding")
    if (ridingCompt) {
        return ridingCompt.entityRidingOn
    }
    return undefined
}
 