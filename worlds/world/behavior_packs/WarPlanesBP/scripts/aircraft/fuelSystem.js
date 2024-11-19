import { world, system } from '@minecraft/server'
import { ModalFormData, ModalFormResponse } from '@minecraft/server-ui';
import {PlayerEquipment} from "../playerComponents.js"
import {Aircrafts} from "../Aircrafts.js"
import {getFuelLevel} from "../riderFunctions.js"
const Fuel = "minecraft:redstone"
export function updateFuel (plane, player) {
    let currentFuel = plane.getProperty("adn:fuel") || 0
    if (system.currentTick % 20 != 0 || currentFuel <= 0) return currentFuel
    const speed = plane.getProperty("adn:speed") || 0
    const topSpeed = Aircrafts[plane.typeId].speed.max
    let fuelUsagePerTick = Aircrafts[plane.typeId].fuel.usagePerSecond
    let totalUsage = fuelUsagePerTick * (speed/topSpeed)
    currentFuel = Math.max(currentFuel - totalUsage, 0)
    plane.setProperty("adn:fuel", currentFuel)
    return currentFuel
}

export function addFuel (plane, player) {
    let item = PlayerEquipment.getItemHold(player)
    let currentFuel = plane.getProperty("adn:fuel")
    if (item == undefined || item.typeId != Fuel) return
    
    
    if (currentFuel >= Aircrafts[plane.typeId].fuel.max) {
        let fuelLevel = getFuelLevel(plane, 40)
        player.onScreenDisplay.setActionBar("Fuel "+fuelLevel)
        return
    }
    FuelForm (player, plane, item, currentFuel)
    
    return
    
    
}
function FuelForm (player, plane, item, currentFuel) {
    const MaxFuel = Aircrafts[plane.typeId].fuel.max
    let fuelLevel = getFuelLevel(plane, 40)
    let form = new ModalFormData ()
    form.title("Add Fuel")
    let title = "Fuel Level "
    title += fuelLevel
    title += "\n\n§4Redston Dust §7"
    const emptyFuel = Math.ceil(MaxFuel - currentFuel)
    const fuelAmount = item.amount
    const sliderMax = Math.min(fuelAmount, emptyFuel)
    form.slider (title, 0, sliderMax, 1, 0)
    form.show(player).then((response) => {
        const addFuelAmount = response.formValues[0]
        if (addFuelAmount) {
            player.runCommand(`clear @s ${Fuel} 0 ${addFuelAmount}`)
            plane.setProperty("adn:fuel", currentFuel + addFuelAmount)
            system.runTimeout(() => {
                let fuelLevel = getFuelLevel(plane, 40)
                player.onScreenDisplay.setActionBar("Fuel "+fuelLevel)
            }, 1)
        }
    })
}