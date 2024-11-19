export function getRidingEntity (player) {
    let ridingCompt = player.getComponent("riding")
    if (ridingCompt) {
        return ridingCompt.entityRidingOn
    }
    return undefined
}