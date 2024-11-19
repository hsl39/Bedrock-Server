import { world, system } from '@minecraft/server'
import {VECTOR, Angle} from "./mathUtils.js"
import {Aircrafts, MaxTakeOffTime} from "./Aircrafts.js"
import {removeControls} from "./aircraft/controls.js"
import {Rideable} from "./aircraft/rideable.js"
const CameraClampOnGround = -5
export const Rider = {
    cam1 (plane, player, takeOffTime) => {
        if (player.hasTag("vxRemoveCamera")) {
            player.camera.clear()
            return
        }
        if (plane.hasTag("aircraft/takenOff")) {
            this.cam2 (plane, player)
            return
        }
        let cameraDistance = Aircrafts[plane.typeId].camera.distance

        let location = player.location
        let viewDirection = player.getViewDirection()
        let playerRotation = player.getRotation()
        const targetAirTime = MaxTakeOffTime
        let airTimeRatio = takeOffTime/MaxTakeOffTime
        let xAngle = "~"
        
        if ((plane.isOnGround || takeOffTime < targetAirTime )&& playerRotation.x < CameraClampOnGround) {
            let clampedAngle = -90 * airTimeRatio
            let angle = Math.max (clampedAngle, playerRotation.x)
            viewDirection.y = 0
            viewDirection = VECTOR.normalize(viewDirection)
            viewDirection = VECTOR.rotateVectorByPitch(viewDirection, angle)
            //let clampedAngle = -90 * airTimeRatio
            //xAngle = Math.max(playerRotation.x, clampedAngle)
            let ratio = (1- airTimeRatio)
            let angleRatio = Math.min(playerRotation.x, 0)/90
            angleRatio = Math.abs(angleRatio)
            const extraDistance = 4 * angleRatio
            location.y += extraDistance * ratio
            cameraDistance += -extraDistance * ratio
            
        }
        
        viewDirection = VECTOR.multiplyByNum(viewDirection, cameraDistance)
        let cameraLocation = VECTOR.addWithVector(location, viewDirection)
        cameraLocation.y 
        
        
        
        let {x, y, z} = cameraLocation
        player.setDynamicProperty("cameraLocation", cameraLocation)
        
        //player.runCommand(`camera @s set minecraft:free ease 1 spring pos ${x} ${y} ${z} rot ${xAngle} ~`)
        let camOption = {
            location: cameraLocation,
            facingLocation: location,
            easeOptions: {
                easeTime: 0.25,
                easeType: "Linear"
            }
        }
        player.camera.setCamera("minecraft:free", camOption)
    },
    cam2 (plane, player) => {
        
        const cameraDistance = Aircrafts[plane.typeId].camera.distance
        let loc = plane.location
        let direction = player.getViewDirection()
        let cameraLocation = VECTOR.multiplyByNum(direction, -cameraDistance)
        cameraLocation = VECTOR.addWithVector(loc, cameraLocation)
        cameraLocation.y+= cameraDistance/2
        //cameraDistance/3
        
        let cameraOption ={
            easeOption: {
                easeTime: 1,
                easeType: "linear"
            },
            facingLocation: loc,
            location: cameraLocation
        }
        //player.camera.setCamera("minecraft:free", cameraOption)
        player.setDynamicProperty("cameraLocation", cameraLocation)
        let rotX = player.getRotation().x
        if (!plane.hasTag("aircraft/hastakeOff")) {
            rotX = Math.max(rotX, -25)
        }
        
        player.runCommand(`camera @s set minecraft:free ease 1 spring pos ^ ^2 ^${cameraDistance} rot ~ ~`)
        
    },
    
    playRiderAnimation (rider, plane) {
        if (plane.isOnGround) return
        let animation = "animation.player.riding.rotation1"
        rider.playAnimation(animation, {blendOutTime: 2, nextState: animation+0, stopExpression: "!query.is_riding"})
        
    },
    setActionbar (rider, plane, speedLevel) {
        const lowSpeed = Aircrafts[plane.typeId].speed.low
        const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift
        let velocity = plane.getVelocity()
        let magnitude = VECTOR.getMagnitude(velocity)
        let text = "speed "
        let max = Aircrafts[plane.typeId].speed.max
        text += getSpeedMeter (plane, speedLevel, max)
        
        if (world.getDynamicProperty("adnAircraftFuelSystem")) {
            text += "§7 fuel "
            text += getFuelLevel (plane, 20)
        }
        
        text += " f "+plane.getProperty("adn:fuel").toFixed(1)
        /*
        let airTime1 = plane.getDynamicProperty("adn/airTime") || 0
        let groundTime = plane.getDynamicProperty("adn/groundTime") || 0
        text += " GT: "+groundTime
        //text += getVelocityStat (plane, rider)
        */
        text += plane.getDynamicProperty("collision/log")
        rider.onScreenDisplay.setActionBar(text)
}
}

function getSpeedMeter (plane, targetSpeed, maxSpeed) {
    const barCount = 20
    let currentSpeed = plane.getDynamicProperty("aircraft/current/speed")
    
    const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift
    const lowSpeed = Aircrafts[plane.typeId].speed.low
    
    
    let barCounts = [
        {count:0, color: ""},
        {count:0, color: ""},
        {count:0, color: ""}
        ]
    let color = currentSpeed > minSpeedForLift ? TextColor.green : currentSpeed > lowSpeed ? TextColor.gold : TextColor.red
    let secondaryColor = currentSpeed > minSpeedForLift ? TextColor.lightGreen : currentSpeed > lowSpeed ? TextColor.yellow : TextColor.orange
    
    if (currentSpeed <= targetSpeed) {
    
        barCounts[0].count = Math.round((currentSpeed/maxSpeed) * barCount)
        barCounts[0].color = color
        
        barCounts[1].count = Math.round((targetSpeed/maxSpeed) * barCount) - barCounts[0].count
        barCounts[1].color = secondaryColor
    } else {
        barCounts[0].count = Math.round((targetSpeed/maxSpeed) * barCount)
        barCounts[0].color = color
        barCounts[1].count = Math.round((currentSpeed/maxSpeed) * barCount) - barCounts[0].count
        barCounts[1].color = secondaryColor
    }
    barCounts[2].count = barCount - (barCounts[0].count + barCounts[1].count)
    barCounts[2].color = TextColor.white
    
    let result = ""
    for (let i = 0; i < barCounts.length; i++) {
        result += getLevel (barCounts[i].count, barCounts[i].color)
    }
    return result
}
function getLevel (count, color) {
    let text = ""
    for (let i = 0; i < count; i++) {
        text += `${color}▎`
    }
    return text
}
const TextColor = {
    yellow: "§e",
    green: "§2",
    red: "§4",
    blue: "§9",
    white: "§7",
    orange: "§c",
    lightGreen: "§a",
    gold: "§6"
}
export function getFuelLevel (plane, barCount) {
    const fuel = plane.getProperty("adn:fuel") || 0
    const maxFuel = Aircrafts[plane.typeId].fuel.max
    let result = getBarLevel(fuel, maxFuel, TextColor.green, barCount)
    return result
}


function getBarLevel (current, max, color, barCount ) {
    let level = (current/max) * barCount
    level = Math.ceil(level)
	let result = color
	for (let i = 0; i < barCount; i++) {
		if (i == level) {
			result += "§7"
		}
		result += "▎"
	}
	return result
}
