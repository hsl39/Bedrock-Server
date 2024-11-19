import { world, system, ItemStack} from '@minecraft/server';
import { ActionFormData, ActionFormResponse} from '@minecraft/server-ui';
import {Contents} from "./contents.js"
/*
world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
	
	const {block, blockFace, faceLocation, itemStack, player} = event
	//console.warn(itemStack.typeId)
	system.run(() =>{
	if (block.typeId == "adn:workbench" && !player.isSneaking) {
	    showMenu(player, block)
		event.cancel = true
	    
	}
	
	})
})
*/


export function showMenu(player, block) {
    const form = new ActionFormData()
        .title('§lWarPlanes Workbench')
    for (let c of Contents) {
        let displayName = c.displayName
        let image = c.image
        form.button(displayName, image)
    }
    form.button("More Planes Coming Soon!")

    form.show(player).then((response) => {
        if (response.selection == undefined) return
        if (response.selection == Contents.length) {
            showMenu(player, block)
            return
        }
        showContent(player, Contents[response.selection])
    });
}
const space = "     "
function showContent (player, cont) {
    const ItemDatas = getItemData(player, cont.items)
    //world.sendMessage(JSON.stringify(ItemDatas, null, 2))
    const form = new ActionFormData()
    form.title(cont.displayName)
    let body = "§2Recipe: \n\n"
    
    for (let i in ItemDatas) {
        let displayName = ItemDatas[i].displayName
        let targetAmount = "§a"+ItemDatas[i].targetAmount
        let amountColor = ItemDatas[i].amount >= ItemDatas[i].targetAmount ? "§a" : "§4"
        let amount = amountColor + ItemDatas[i].amount
        body += space + displayName
        body += space + amount + "§7/"+ targetAmount + "  "
        body += "\n\n"
    }
    body += "\n\n"
    let hasCompleteItem = hasEnoughAmounts(ItemDatas)
    if (hasCompleteItem) {
        form.body(body)
        form.button("§lCraft")
    } else {
        form.body(body)
         form.button("§lExit(insufficient items)")
    }
   
    form.show(player).then((response) => {
        if (response.selection == 0 && hasCompleteItem) {
            clearUsedItems(player, ItemDatas)
            player.runCommandAsync("give @s "+cont.output)
        }
    });
}

function getItemData(player, items) {
	let itemAmounts = {}
	for (let item of items) {
		itemAmounts[item.itemId] = {
		    displayName: item.displayName,
			amount: 0,
			targetAmount: item.amount
		}
	}
	let inventory = player.getComponent("inventory").container
	
	for (let i = 0; i < inventory.size; i++) {
		let item = inventory.getItem(i)
		if (item == undefined || !itemAmounts.hasOwnProperty(item.typeId)) continue
		itemAmounts[item.typeId].amount += item.amount
	}
	return itemAmounts
}



function clearUsedItems (player, items) {
	for (let id in items) {
		let amount = items[id].targetAmount
		player.runCommandAsync(`clear @s ${id} 0 ${amount}`);
	}
	
}
function hasEnoughAmounts (items) {
	for (let i in items) {
	 if (items[i].amount < items[i].targetAmount) {
	 	return false
	 }
	}
	return true
}