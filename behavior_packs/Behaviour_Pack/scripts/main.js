import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent("gb:muzzle_flash", {
    onTick: e => {
      e.block.setType("minecraft:air");
    }
  });
});