import { world, system } from '@minecraft/server'
import {VECTOR, Angle} from "../mathUtils.js"
import {Aircrafts, MaxTakeOffTime} from "../Aircrafts.js"
import {Bombers} from '../shootingSystem/bombers.js'
import {removeControls} from "../aircraft/controls.js"
import {Rideable} from "../aircraft/rideable.js"
import {PlanesGunData} from "../shootingSystem/planesGunsData.js"
import {getSpeedMeter,getLevel, getFuelLevel, getBarLevel, getGunTemp} from "./actionbarHelper.js"
const CameraClampOnGround = -5

export function setCamera (player, plane, itemHold) {
    if (player.hasTag("l4gg-firstPerson")) return
    if (itemHold && itemHold.typeId == "l4gg:drop_bomb" && !plane.isOnGround && Bombers.hasOwnProperty(plane.typeId)) {
        setBomberCamera (player, plane)
    } else {
        postTakeOffCamera(player, plane)
    }
}
function setBomberCamera (player, plane) {
    let {x, y, z} = plane.location
    y -= 1.5
    player.runCommand(`camera @s set minecraft:free ease 1 spring pos ${x} ${y} ${z} rot 90 ~`);
    
}
export function postTakeOffCamera (player, plane) {
    const cameraDistance = Aircrafts[plane.typeId].camera.distance;
    let loc = plane.location;
    let direction = player.getViewDirection();
    let cameraLocation = VECTOR.multiplyByNum(direction, -cameraDistance);
    cameraLocation = VECTOR.addWithVector(loc, cameraLocation);
    cameraLocation.y += cameraDistance / 2;

    let cameraOption = {
        easeOption: {
            easeTime: 1,
            easeType: "linear"
        },
        facingLocation: loc,
        location: cameraLocation
    };

    player.setDynamicProperty("cameraLocation", cameraLocation);
    let rotX = player.getRotation().x;

    if (!plane.hasTag("aircraft/hastakeOff")) {
        rotX = Math.max(rotX, -25);
    }

    player.runCommand(`camera @s set minecraft:free ease 1 spring pos ^ ^2 ^${cameraDistance} rot ~ ~`);
}

export function playRiderAnimation(rider, plane) {
    if (plane.isOnGround) {
        let animation = "animation.player.riding.on_ground.rotation"
        rider.playAnimation(animation, {
        blendOutTime: 2, 
        nextState: "animation.player.riding.rotation1", 
        stopExpression: "!query.is_riding"
    })
        return
    }
    let animation = "animation.player.riding.rotation1";
    rider.playAnimation(animation, {
        blendOutTime: 2, 
        nextState: animation + 0, 
        stopExpression: "!query.is_riding"
    });
}





export function setActionbar(rider, plane, itemHold) {
    const speedLevel = plane.getProperty("adn:speed") 
    let currentSpeed = plane.getDynamicProperty("aircraft/current/speed")
    const lowSpeed = Aircrafts[plane.typeId].speed.low;
    const minSpeedForLift = Aircrafts[plane.typeId].speed.minForlift;
    let velocity = plane.getVelocity();
    let magnitude = VECTOR.getMagnitude(velocity);
    let text = ""
    const hasTakenOff = plane.getProperty("l4gg:has_taken_off") 
    
    if (!hasTakenOff) {
        text += "Take Off Progress "
        let current = plane.getDynamicProperty("takeOffProgress") || 0
        const duration = Aircrafts[plane.typeId].takeOff?.duration || 80
        text += getBarLevel (current, duration, "§2", 18)
        text += " §a§lS§r-";
        let max = Aircrafts[plane.typeId].speed.max;
        text += getSpeedMeter(plane, currentSpeed, speedLevel, max, 6);
    } else {
        text += " §a§lS§r-";
        let max = Aircrafts[plane.typeId].speed.max
        
            
        text += getSpeedMeter(plane, currentSpeed, speedLevel, max, 18);
    }
    text += "§r"

    // Check if the fuel system is enabled, and add fuel level info
    
    
    if (world.getDynamicProperty("adnAircraftFuelSystem")) {
        text += " §l§cF§r-";
        text += getFuelLevel(plane); 
        //text += " f " + plane.getProperty("adn:fuel").toFixed(1);
    }
    text += "§r"

    // Add the fuel property of the plane (rounded to 1 decimal place)
    
    if (itemHold && itemHold.typeId == "l4gg:fire_gun") {
        text += "§l [GUN §4T-§r"
        text += getGunTemp(plane)
        text += "§r§l]"
        text += "§r"
    }

    // Uncomment these if you want to display air and ground time
    /*
    let airTime1 = plane.getDynamicProperty("adn/airTime") || 0;
    let groundTime = plane.getDynamicProperty("adn/groundTime") || 0;
    text += " GT: " + groundTime;
    */

    // Add collision detection log
    if (rider.hasTag("l4gg-dev")) {
        text += "\n" +plane.getDynamicProperty("collision/log") || ""
    }
    

    // Display the action bar text on the rider's screen
    rider.onScreenDisplay.setActionBar(text);
}
