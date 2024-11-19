import { world, system } from "@minecraft/server";
system.runInterval(() => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (player.dimension.id !== "minecraft:the_end")
            continue;

        if (player.hasTag('endFog')) {
            const floorBlock = player.dimension.getBlockFromRay({ x: player.location.x, y: player.location.y + 1, z: player.location.z }, ({ x: 0, y: -1, z: 0 }));
            if (floorBlock?.block === undefined)
                continue;
            
            if (floorBlock.block.typeId == 'better_on_bedrock:shrub_nylium' && !player.hasTag('vacant')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:vacant_dusk test")
                player.playMusic("ambient.vacant", { volume: 1, fade: 1, loop: true })
                player.addTag('vacant')
                player.removeTag('void')
                player.removeTag('chorus')
                player.removeTag('abyssal')
                player.removeTag("wastes")
                player.removeTag('shroom')
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:void_grass_block' && !player.hasTag('void')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:voiding_plains test")
                player.playMusic("ambient.voiding_plains", { volume: 1, fade: 1, loop: true })
                player.addTag('void')
                player.removeTag('chorus')
                player.removeTag('abyssal')
                player.removeTag('vacant')
                player.removeTag("wastes")
                player.removeTag('shroom')
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:shroom_nylium' && !player.hasTag('shroom')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:fungal_grove test")
                player.playMusic("ambient.fungal_grove", { volume: 1, fade: 1, loop: true })
                player.addTag('shroom')
                player.removeTag('vacant')
                player.removeTag('chorus')
                player.removeTag('abyssal')
                player.removeTag('void')
                player.removeTag("wastes")
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:fall_nylium' && !player.hasTag('abyssal')) {

                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:voided_abyssal test")
                player.playMusic("ambient.voided_abyss", { volume: 1, fade: 1, loop: true })
                player.addTag('abyssal')
                player.removeTag('vacant')
                player.removeTag('shroom')
                player.removeTag('chorus')
                player.removeTag('void')
                player.removeTag("wastes")
            }
            if (floorBlock.block.typeId == 'better_on_bedrock:chorus_grass_block' && !player.hasTag('chorus')) {
                player.runCommand("fog @p remove test")
                player.runCommand("fog @p push pog:chorus_forest test")
                player.playMusic("ambient.chorus_forest", { volume: 1, fade: 1, loop: true })
                player.addTag('chorus')
                player.removeTag('vacant')
                player.removeTag("wastes")
                player.removeTag('shroom')
                player.removeTag('void')
            }
            if (floorBlock.block.typeId == 'minecraft:end_stone' && !player.hasTag('wastes')) {
                player.runCommand("fog @p remove test")
                player.addTag("wastes")
                player.playMusic("ambient.end_wastes", { volume: 1, fade: 1, loop: true })
                player.removeTag('abyssal')
                player.removeTag('vacant')
                player.removeTag('shroom')
                player.removeTag('void')
                player.removeTag('chorus');
            };
        };
    };
}, 30);