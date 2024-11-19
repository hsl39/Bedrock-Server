import { world, system, ItemStack} from '@minecraft/server'
import { ActionFormData, ActionFormResponse} from '@minecraft/server-ui';
import {VECTOR} from "./mathUtils.js"
import {aircraftSettings} from "./aircraftSettings.js"
const VERSION = 3
world.afterEvents.worldInitialize.subscribe(() => {
    //print()
    addonIntro ()
    const defaultSteering = world.getDynamicProperty("defaultSteering")
    
    resetPlayers ()
    //resetDynamicProperties()
    if (!defaultSteering) {
    initializeDynamicProperties ()
    }
    setUpScoreboard ()
})
function resetPlayers () {
    let players = world.getPlayers()
    for (let player of players) {
        player.camera.clear()
    }
}
function setRiderRotScoreboard () {
    let id = world.scoreboard.getObjective("adn:riderRot")
    if (id) return
    world.scoreboard.addObjective("adn:riderRot", "adn:riderRot")
    
}
function resetDynamicProperties() {
    let players = world.getPlayers()
    for (let player of players) {
        player.setDynamicProperty("adn/ride/id", undefined)
    }
}
function print () {
    let ev = world.afterEvents
    
    for (let e in ev) {
        world.sendMessage(e)
    }
}
let players
function addonIntro () {
    let isInitialized = world.getDynamicProperty("adn/voxelPlanes/initialized")
    if (isInitialized > VERSION) return
    let runId = system.runInterval(() => {
        
        players = world.getAllPlayers()
        for (let player of players) {
            if (!isPlayerActive (player)) continue
            for (let p of players) {
                introForm(p)
            }
            world.setDynamicProperty("adn/voxelPlanes/initialized", VERSION + 1)
            system.clearRun(runId)
        }
    }, 0)
}

function isPlayerActive(player) {
	let rot = player.getRotation()
	let velocity = player.getVelocity()
	velocity = VECTOR.getMagnitude(velocity)
	return velocity > 0.001 || Math.abs(rot.x) > 1
}
const Title = "§l§0WW2 WAR PLANES Beta"
function introForm(player) {
    let bodyText = "Welcome to the WW2 Warplanes add-on for Minecraft Bedrock Edition, it features  iconic planes, realistic weaponry, and immersive air combat mechanics.\n\n"
    bodyText += "§eThis Addon Is Still In Development If You Find Any Bugs Or You Have Some Suggestion Comment It On Mcpedl or in my Youtube Provided Below\n\n"
    bodyText += "§l§nCreator Info§r\n   §2Mcpedl: L4ggcrafter\n   §4Youtube: ned2z§r\n\n"
    bodyText += "§l§nFeatures§r\n Smooth Animations\n Custom Camera\n Custom Rotation\n Custom Movement\n Fuel System\n Collision Detection(Experemental)\n Gun Firing \n Bomb Dropping \n\n"
    bodyText += "§l§nCompatibility§r\n Minecraft 1.21.20+\n\n"
    bodyText += "This Addon Is Exclusive To MCPEDL/CurseForge"
    
    let form = new ActionFormData()
    form.title(Title)
    form.body(bodyText)
    
    form.button("Continue")
    form.show(player).then((response) => {
        gettingStartedForm (player)
    })
}

function gettingStartedForm (player) {
    let bodyText = ""
    //"§l§nHow To Get Planes§r\n You Can Create Planes Using The Workbench, The Workbench Can Be Crafted In The Crafting Table\n\n"
    bodyText += "§l§nHow To Fly The Plane§r\n Use The Accelerator Item to Accelerate, make sure you are in a flat area and wait for the takeOff progress bar to complete\n\n"
    bodyText += "§l§nAccesing The Settings§r\n This Addon Has Settings Were You Can Enable Or Disable Features, You Can Access The Settings By Using the Settings Item That Will Be Given To You Later.\n\n"
    
    bodyText += "§eNote That Some Features Are Experimental That May Be Unstable."
    
    let form = new ActionFormData()
    form.title(Title)
    form.body(bodyText)
    
    form.button("Continue")
    form.show(player).then((response) => {
        initializeDynamicProperties ()
        giveSettingsItem (player) 
    })
}
function initializeDynamicProperties () {
    world.setDynamicProperty("aircraftCollision", "off")
    world.setDynamicProperty("defaultSteering", "steering:normal")
    world.setDynamicProperty("adnAircraftFuelSystem", true)
    world.setDynamicProperty("PlaneGunsCustomDamage", true)
    
}
function giveSettingsItem (player) {
    let playerContainer = player.getComponent("inventory").container
    let settings = new ItemStack("l4gg:warplanes_settings", 1)
        settings.keepOnDeath = true
        playerContainer.addItem(settings)
}
function setUpScoreboard () {
    let objective = world.scoreboard.getObjective("L4gg-armorPoints")
    if (objective) return
    world.scoreboard.addObjective("L4gg-armorPoints", "Armor Points")
    
}