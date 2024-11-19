import { world, system} from '@minecraft/server';
const ArmorData = {
  "leather_helmet": { points: 1, location: "slot.armor.head" },
  "leather_chestplate": { points: 3, location: "slot.armor.chest" },
  "leather_leggings": { points: 2, location: "slot.armor.legs" },
  "leather_boots": { points: 1, location: "slot.armor.feet" },
  
  "golden_helmet": { points: 2, location: "slot.armor.head" },
  "golden_chestplate": { points: 5, location: "slot.armor.chest" },
  "golden_leggings": { points: 3, location: "slot.armor.legs" },
  "golden_boots": { points: 1, location: "slot.armor.feet" },
  
  "chainmail_helmet": { points: 2, location: "slot.armor.head" },
  "chainmail_chestplate": { points: 5, location: "slot.armor.chest" },
  "chainmail_leggings": { points: 4, location: "slot.armor.legs" },
  "chainmail_boots": { points: 1, location: "slot.armor.feet" },
  
  "iron_helmet": { points: 2, location: "slot.armor.head" },
  "iron_chestplate": { points: 6, location: "slot.armor.chest" },
  "iron_leggings": { points: 5, location: "slot.armor.legs" },
  "iron_boots": { points: 2, location: "slot.armor.feet" },
  
  "diamond_helmet": { points: 3, location: "slot.armor.head" },
  "diamond_chestplate": { points: 8, location: "slot.armor.chest" },
  "diamond_leggings": { points: 6, location: "slot.armor.legs" },
  "diamond_boots": { points: 3, location: "slot.armor.feet" },
  
  "netherite_helmet": { points: 3, location: "slot.armor.head" },
  "netherite_chestplate": { points: 8, location: "slot.armor.chest" },
  "netherite_leggings": { points: 6, location: "slot.armor.legs" },
  "netherite_boots": { points: 3, location: "slot.armor.feet" },
  
  "turtle_helmet": { points: 2, location: "slot.armor.head" }
};
const ArmorWearableEntities = [
    ""
    ]
export function setArmorPoints (entity) {
    if (!entity) return 0
    let updatePointsCooldown = entity.getDynamicProperty("updatePointsCooldown") || 0
    if (system.currentTick < updatePointsCooldown)  return
    entity.runCommandAsync("scoreboard players set @s L4gg-armorPoints 0")
    entity.runCommandAsync("execute as @s run function getArmorPoints")
    /*
    for (const armor in ArmorData) {
        const points = ArmorData[armor].points
        const location = ArmorData[armor].location
        entity.runCommandAsync(`scoreboard players add @s[hasitem={item=${armor}, location=${location}, slot=0}] L4gg-armorPoints ${points}`)
        
    };
    */
    entity.setDynamicProperty("updatePointsCooldown", system.currentTick + 20)
    system.runTimeout (() => {
        printArmorPoints (entity)
    }, 1)
    
}
export function getArmorPoints (entity) {
    const objective = world.scoreboard.getObjective("L4gg-armorPoints")
    if (!objective.hasParticipant(entity)) {
        return undefined
    }
    let score = objective.getScore(entity)
    return score
    
}
function printArmorPoints (entity) {
    const objective = world.scoreboard.getObjective("L4gg-armorPoints")
    let score = objective.getScore(entity)
    //console.warn("score "+score)
    
}