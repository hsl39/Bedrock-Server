import { world, system, ItemStack, ItemLockMode } from '@minecraft/server'
import {Rideable} from "./rideable.js"
/*
const Controls = [
    "l4gg:decelerator",
    "l4gg:accelerator",
    "l4gg:fire_gun"
]
*/
const PlaneControls = {
    "l4gg:spitfire": [
        "l4gg:decelerator",
        "l4gg:accelerator",
        "l4gg:fire_gun"
    ],
    "l4gg:sbd_dauntless": [
        "l4gg:decelerator",
        "l4gg:accelerator",
        "l4gg:fire_gun",
        "l4gg:drop_bomb"
    ],
    "l4gg:bf109": [
        "l4gg:decelerator",
        "l4gg:accelerator",
        "l4gg:fire_gun"
    ],
}
export function setUpControls (player, plane, containerEntity) {
    if (!player.isValid() || player.hasTag("onLoadingScreen") || (containerEntity == undefined || !containerEntity.isValid() ) ) { 
        console.warn("controls setUp cancel")
        return
    }
    player.setDynamicProperty("adn/private_container", containerEntity.id)
    containerEntity.setDynamicProperty("currentOwner", player.id)
    let playerContainer = player.getComponent("inventory").container
    let privateContainer = containerEntity.getComponent("inventory").container
    const Controls = PlaneControls[plane.typeId]
    for (let i = 0; i < Controls.length; i++) {
        let currentItem = playerContainer.getItem(i)
        if (currentItem && currentItem.typeId == Controls[i]) continue
        let control = new ItemStack(Controls[i], 1)
        control.keepOnDeath = true
        control.lockMode = ItemLockMode.slot
        //control.setLore(["press and hold"])
        playerContainer.moveItem(i, i, privateContainer)
        playerContainer.setItem(i, control)
    }
}
const AllControls = [
    "l4gg:decelerator",
    "l4gg:accelerator",
    "l4gg:fire_gun",
    "l4gg:drop_bomb"
]
export function removeControls (player, containerEntity) {
    if (!player.isValid() || (containerEntity == undefined || !containerEntity.isValid() )) { 
        console.warn("remove setUp cancel")
        player.addTag("onLoadingScreen")
        return 
    } else if (player.hasTag("onLoadingScreen")){
        player.removeTag("onLoadingScreen")
    }
    let playerContainer = player.getComponent("inventory").container
    let privateContainer = containerEntity.getComponent("inventory").container
    for (let i = 0; i < AllControls.length; i++) {
        let item = playerContainer.getItem(i)
        if (item && AllControls.includes(item.typeId)) {
            playerContainer.setItem(i, undefined)
            privateContainer.moveItem(i, i, playerContainer)
        } 
    }
    player.setDynamicProperty("adn/private_container", undefined)
    containerEntity.setDynamicProperty("currentOwner", undefined)
}