import { world, system, MinecraftDimensionTypes } from "@minecraft/server";
export default class AntiBurner {
    AllowedPrefixes;
    constructor(ItemPrefixes) {
        this.AllowedPrefixes = ItemPrefixes;
        const Dimensions = [MinecraftDimensionTypes.overworld, MinecraftDimensionTypes.nether, MinecraftDimensionTypes.theEnd];
        system.runInterval(() => {
            Dimensions.map(dimension => this.evitBurning(dimension));
        }, 0);
    }
    evitBurning(dimensionId) {
        const dimension = world.getDimension(dimensionId);
        for (const item of dimension.getEntities({ type: "minecraft:item" })) {
            const stack = item.getComponent('item');
            if (!this.AllowedPrefixes.some(prefix => stack.itemStack.typeId.includes(prefix)))
                continue;
            item.triggerEvent("pure_netherite_fire");
        }
    }
}
