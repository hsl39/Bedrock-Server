import { world, system } from '@minecraft/server'
import { ModalFormData, ModalFormResponse } from '@minecraft/server-ui';

world.afterEvents.itemStartUse.subscribe(({itemStack, source, useDuration}) => {
    
    if (itemStack.typeId !== "adn:debug_tool") return
    debug (source)
})


function debug (player) {

    const form = new ModalFormData()
    form.title("Voxel Planes Dev Tool")
    form.textField("Run Command", "")
    form.show (player).then(result => {
        try {
            let commandText = result.formValues[0]
            if (Commands.hasOwnProperty(commandText)) {
                Commands[commandText]()
            }
            
        } catch (e) {
            console.warn(e)
        }
    })
}
const Commands = {
    printAllDynamicProperties () {
        let propertyIds = world.getDynamicPropertyIds()
        world.sendMessage("[Debug] World Dynamic Properties List: ")
        for (let id of propertyIds) {
            let value = world.getDynamicProperty(id)
            world.sendMessage(id+" - "+value)
        }
    },
    reset () {
        world.setDynamicProperty("adn/voxelPlanes/initialized", undefined)
        
    }
}