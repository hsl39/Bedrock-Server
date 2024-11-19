import {Aircrafts, MaxTakeOffTime} from "../Aircrafts.js"
import {PlanesGunData} from "../shootingSystem/planesGunsData.js"
import {PlaneGuns} from "../shootingSystem/Guns.js"
const PreviousSpeedActionbar = {}
const changeTreshold = 0.01
function initializePreviousSpeedActionbar (plane) {
    if (!PreviousSpeedActionbar.hasOwnProperty(plane.id)) {
        PreviousSpeedActionbar[plane.id] = {}
    }
}
function hasSufficientChange (plane, current, target, barCount) {
    //I use this function to only update the speedMeter actionabr if necessary 
    
    const prevTargetSpeed = PreviousSpeedActionbar[plane.id].targetSpeed || 0
    const prevCurrentSpeed = PreviousSpeedActionbar[plane.id].currentSpeed || 0
    const prevBarCount = PreviousSpeedActionbar[plane.id].barCount || 0
    const targetDiff = Math.abs(prevTargetSpeed - target)
    const currentDiff = Math.abs(prevCurrentSpeed - current)
    if (targetDiff > changeTreshold || currentDiff > changeTreshold || prevBarCount != barCount) {
        PreviousSpeedActionbar[plane.id].currentSpeed = current
        PreviousSpeedActionbar[plane.id].targetSpeed = target
        PreviousSpeedActionbar[plane.id].barCount = barCount
        return true
    }
    
    return false
}

export function getSpeedMeter (plane, currentSpeed, targetSpeed, maxSpeed, barCount) {
    
    if (PreviousSpeedActionbar[plane.id] && !hasSufficientChange(plane, currentSpeed, targetSpeed, barCount)) {
        return PreviousSpeedActionbar[plane.id].speedMeter
    }
    
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
    initializePreviousSpeedActionbar (plane)
    PreviousSpeedActionbar[plane.id].speedMeter = result
    
    return result 
}
export function getLevel (count, color) {
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

const PrevFuelActionabar = {}
const FuelChangeTreshold = 0.5
function initializePrevFuelActionabar (plane) {
    if (!PrevFuelActionabar.hasOwnProperty(plane.id)) {
        PrevFuelActionabar[plane.id] = {}
    }
}
function hasSufficientChangeInFuel (plane, current) {
    //I use this function to only update the speedMeter actionabr if necessary 
    
    const previous = PrevFuelActionabar[plane.id].targetSpeed || 0
    
    const difference = Math.abs(previous - current)
    if (difference > FuelChangeTreshold) {
        PrevFuelActionabar[plane.id].targetSpeed = current
        return true
    }
    
    return false
}
export function getFuelLevel (plane) {
    const fuel = plane.getProperty("adn:fuel") || 0
    const maxFuel = Aircrafts[plane.typeId].fuel.max
    initializePrevFuelActionabar (plane)
    if (PrevFuelActionabar[plane.id] && !hasSufficientChangeInFuel(plane, fuel) && PrevFuelActionabar[plane.id].fuelBar) {
        return PrevFuelActionabar[plane.id].fuelBar
    }
    let result = getFuelBar (fuel, maxFuel, TextColor.green)
    PrevFuelActionabar[plane.id].fuelBar = result
	return result 
}

const PrevTempActionabar = {}
const TempChangeTreshold = 4
function initializePrevTempActionabar (plane) {
    if (!PrevTempActionabar.hasOwnProperty(plane.id)) {
        PrevTempActionabar[plane.id] = {}
    }
}
function hasSufficientChangeInTemp (plane, current) {
    //I use this function to only update the speedMeter actionabr if necessary 
    
    const previous = PrevTempActionabar[plane.id].targetSpeed || 0
    
    const difference = Math.abs(previous - current)
    if (difference > TempChangeTreshold) {
        PrevTempActionabar[plane.id].targetSpeed = current
        return true
    }
    
    return false
}
export function getGunTemp (plane) {
    const MaxTemp = PlaneGuns[plane.typeId].machineGun.overheat
    const currentTemp = Math.min(PlanesGunData[plane.id].machineGun.overheatValue, MaxTemp)
    initializePrevTempActionabar (plane)
    if (PrevTempActionabar[plane.id] && !hasSufficientChangeInTemp(plane, currentTemp) && PrevTempActionabar[plane.id].tempBar) {
        return PrevTempActionabar[plane.id].tempBar
    }
    let result = getBarLevel (currentTemp, MaxTemp, TextColor.red, 6 ) 
    PrevTempActionabar[plane.id].tempBar = result
	return result
}



const tempColors = [ TextColor.yellow, TextColor.gold, TextColor.orange, TextColor.red]

const fuelColors = [TextColor.red, TextColor.orange, TextColor.gold, TextColor.yellow, TextColor.lightGreen, TextColor.green]
export function getFuelBar(current, max, color, barCount = 6) {

    let level = (current/max) * barCount
    level = Math.ceil(level)
    const fuelPerBar = max/barCount
	let result = color
	for (let i = 0; i < barCount; i++) {
	    if (i == level -1) {
	        let colorIndex = current - (i * fuelPerBar)
	        colorIndex /= fuelPerBar
	        colorIndex = Math.round(colorIndex * (fuelColors.length -1))
	        let newColor = fuelColors[colorIndex]
	        result += newColor
	    } else if (i == level) {
			result += "§7"
		}
		result += "▎"
	}
	
	return result
}

export function getBarLevel (current, max, color, barCount ) {
    let level = (current/max) * barCount
    level = Math.floor(level)
	let result = color
	for (let i = 0; i < barCount; i++) {
		if (i == level) {
			result += "§7"
		}
		result += "▎"
	}
	return result
}
