import { world, system, EntityItemComponent, MinecraftDimensionTypes } from "@minecraft/server";
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
        for (const entity of dimension.getEntities({ type: "minecraft:item" })) {
            const { itemStack } = entity.getComponent(EntityItemComponent.componentId);
            if (!this.AllowedPrefixes.some(prefix => itemStack.typeId.includes(prefix)))
                continue;
            entity.triggerEvent("pure_netherite_fire");
        }
    }
}
