import { world, system } from '@minecraft/server'
import { ModalFormData, ModalFormResponse } from '@minecraft/server-ui';
const DynamicPropertiesValues = {
    aircraftCollision: "",
    defaultSteering: "",
    adnAircraftFuelSystem: true,
    PlaneGunsCustomDamage: false
}
const PropertyInfo = [
    {
        id: "aircraftCollision",
        label: "Collision Detection Type (experimental)",
        formType: "dropDown",
        values: ["velocity", "raycast", "off"],
        ValuesLabel: ["Velocity Based", "Raycast Based", "Off"]
    },
    {
        id: "defaultSteering",
        label: "Steering Type",
        formType: "dropDown",
        values: ["steering:normal", "steering:telt_based"],
        ValuesLabel: ["Normal", "Rotate by telt (Experimental)"]
    },
    {
        id: "adnAircraftFuelSystem",
        label: "Fuel System",
        formType: "toggle"
    },
    {
        id: "PlaneGunsCustomDamage",
        label: "Custom Guns Damage System (experemental)",
        formType: "toggle"
    }
]

world.afterEvents.itemStartUse.subscribe(({itemStack, source, useDuration}) => {
    
    if (itemStack.typeId !== "l4gg:warplanes_settings") return
    aircraftSettings (source)
})
function updateDynamicPropertiesValues() {
    for (let prop in DynamicPropertiesValues) {
        let value = world.getDynamicProperty(prop)
        DynamicPropertiesValues[prop] = value
    }
}
export function aircraftSettings (player) {
    updateDynamicPropertiesValues()
    const form = new ModalFormData()
    form.title("§lWar Planes Addon Settings")
    //form.submitButton("Apply Changes")
    for (let property of PropertyInfo) {
        let currentValue
        switch (property.formType) {
            case "dropDown":
                currentValue = DynamicPropertiesValues[property.id]
                let index = property.values.indexOf(currentValue)
                form.dropdown(property.label, property.ValuesLabel , index)
                break;
            case "toggle": 
                currentValue = DynamicPropertiesValues[property.id]
                form.toggle(property.label, currentValue)
                break;
        }
    }
    form.show (player).then(result => {
        
        if (result.formValues) {
            for (let i in result.formValues) {
                let propertyId = PropertyInfo[i].id
                let value = result.formValues[i]
                updateDynamicProperty(i, propertyId, value)
            }
            updateAircrafts () 
        }
    })
}
function updateDynamicProperty(i, id, result) {
    let propertyInfo = PropertyInfo[i]
    let newValue = result
    let valueLabel = newValue
    if (propertyInfo.formType == "dropDown") {
        newValue = propertyInfo.values[result]
        valueLabel = propertyInfo.ValuesLabel[result]
        
    }
    let oldValue = DynamicPropertiesValues[id]
    if (oldValue == newValue) return
    let propertyId = propertyInfo.id
    world.setDynamicProperty(propertyId, newValue)
    
    world.sendMessage(`§2§l[WW2 WarPlanes] §6§r${propertyInfo.label} Has Been Set To `+valueLabel)
    
}



const Query = {
	families: [
		"plane"
	]
}
function updateAircrafts () {
    let steeringType = world.getDynamicProperty("defaultSteering")
	let entities = world.getDimension("overworld").getEntities(Query);
	for (let plane of entities) {
	    plane.triggerEvent(steeringType)
	}
}
