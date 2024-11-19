import { world, system, GameMode } from "@minecraft/server"
const range = 25; // Adjust this value to define the desired search area
const chunkSize = 7; // Adjust this value to control the number of blocks checked per iteration

function searchCube(player) {
    for (let xStart = -range; xStart <= range; xStart += chunkSize) {
        for (let yStart = -range; yStart <= range; yStart += chunkSize) {
            for (let zStart = -range; zStart <= range; zStart += chunkSize) {
                for (let i = 0; i < chunkSize; i++) {
                    if (Math.random() > 0.7) {
                        const randomXOffset = Math.floor(Math.random() * chunkSize);
                        const randomYOffset = Math.floor(Math.random() * chunkSize);
                        const randomZOffset = Math.floor(Math.random() * chunkSize);

                        const blockX = player.location.x + xStart + randomXOffset;
                        const blockY = player.location.y + yStart + randomYOffset + 16;
                        const blockZ = player.location.z + zStart + randomZOffset;

                        try {
                            if (player.hasTag("fallenLeaves")) {
                                const block = player.dimension.getBlock({ x: blockX, y: blockY, z: blockZ });
                                let particle;
                                switch (block.typeId) {
                                    case "minecraft:oak_leaves": particle = "pog:oak_leaf"; break;
                                    case "minecraft:dark_oak_leaves": particle = "pog:oak_leaf"; break;
                                    case "minecraft:acacia_leaves": particle = "pog:oak_leaf"; break;
                                    case "minecraft:spruce_leaves": particle = "pog:spruce_leaf"; break;
                                    case "minecraft:jungle_leaves": particle = "pog:jungle_leaf"; break;
                                    case "minecraft:birch_leaves": particle = "pog:birch_leaf"; break;
                                    case "minecraft:azalea_leaves": particle = "pog:azalea_leaf"; break;
                                    default: continue;
                                };

                                player.dimension.spawnParticle(particle, block.location);
                            };
                        } catch {};
                    };
                };
            };
        };
    };
};

system.runInterval(() => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        switch (player.dimension.id) {
            case "minecraft:overworld": {
                player.removeTag("overworld");
                searchCube(player);
                break;
            };
        };
    };
}, 40);

system.runInterval(() => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player.matches({ gameMode: GameMode.creative }))
            continue;

        switch (player.dimension.id) {
            case "minecraft:overworld": {
                player.playSound("confused_and_deeds_and_prelude");
                break;
            };
        };
    };
}, Math.floor(Math.random() * (18 - 8 + 1)) + 8 * 60 * 20)

system.runInterval(() => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        switch (player.dimension.id) {
            case "minecraft:overworld": {
                if (player.hasTag("cave"))
                    player.playSound("ambient.cave_random");
                break;
            };
            case "minecraft:the_end": {
                player.playSound("ambient.random.end");
                break;
            };
        };
    };
}, Math.random() * (880 - 480) + 480);

world.afterEvents.playerSpawn.subscribe(
    ({ player }) => {
        const ambienceEntities = player.dimension.getEntities({
            type: "better_on_bedrock:ambiententity",
            location: player.location
        });

        for (let j = 0; j < ambienceEntities.length; j++) {
            const entity = ambienceEntities[j];
            if (entity.getTags().some((tag) => {
                try {
                    return world.getEntity(tag) !== undefined
                } catch {};
            })) entity.remove();
        };
    },
);

system.runInterval(() => {
    const players = world.getAllPlayers();
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const ambienceEntities = player.dimension.getEntities({
            type: "better_on_bedrock:ambiententity",
            location: player.location
        });

        let playerAmbienceEntity;
        for (let j = 0; j < ambienceEntities.length; j++) {
            const entity = ambienceEntities[j];
            if (!entity.getTags().some((tag) => {
                try {
                    return world.getEntity(tag) !== undefined
                } catch {};
            })) {
                entity.remove();
                continue;
            };

            if (entity.getTags().includes(player.id))
                playerAmbienceEntity = entity;
        };

        switch (player.dimension.id) {
            case "minecraft:the_end":
            case "minecraft:nether": {
                if (player.hasTag("overworld"))
                    continue;

                player.addTag("overworld");
                player.removeTag("night");
                player.removeTag("swamps");
                player.removeTag("swamp");
                player.removeTag("taigas");
                player.removeTag("taiga");
                player.removeTag("jungles");
                player.removeTag("jungle");
                player.removeTag("plain");
                player.removeTag("plains");
                player.playMusic("confused_and_deeds_and_prelude", {
                    fade: 0,
                    volume: 2
                });
                break;
            };
            case "minecraft:overworld": {
                function underwaterAmbience() {
                    if (player.location.y + 1 > player.dimension.heightRange.max
                        || player.location.y < player.dimension.heightRange.min)
                        return false;

                    const headBlock = player.dimension.getBlock({
                        x: player.location.x,
                        y: player.location.y + 1,
                        z: player.location.z,
                    });
                    if (headBlock?.typeId?.includes("water")) {
                        if (player.hasTag("underwater"))
                            return true;

                        if (playerAmbienceEntity !== undefined)
                            playerAmbienceEntity.triggerEvent("despawn");

                        player.addTag("underwater");
                        player.playMusic("ambient.underwater.loop", {
                            volume: 1,
                            loop: true,
                            fade: 1
                        });
                        return;
                    }
                    else if (player.hasTag("underwater")) {
                        player.removeTag("underwater");
                        player.stopMusic();
                    };

                    return false;
                };

                if (player.location.y <= 56) {
                    if (player.isInWater) {
                        underwaterAmbience();
                        continue;
                    };

                    if (player.hasTag("cave"))
                        continue;

                    if (playerAmbienceEntity !== undefined)
                        playerAmbienceEntity.triggerEvent("despawn");

                    player.addTag("cave");
                    player.removeTag("night");
                    player.playMusic("ambient.cave_loop", {
                        loop: true,
                        fade: 1,
                        volume: 0.13
                    });
                    continue;
                };

                if (player.hasTag("cave"))
                    player.removeTag("cave");

                if (world.getTimeOfDay() >= 12500 && world.getTimeOfDay() <= 23500) {
                    if (player.hasTag("night"))
                        continue;

                    if (playerAmbienceEntity !== undefined)
                        playerAmbienceEntity.triggerEvent("despawn");

                    player.addTag("night");
                    player.playMusic("ambient.night", {
                        loop: true,
                        fade: 3,
                        volume: 0.1
                    });
                }
                else {
                    if (player.hasTag("night"))
                        player.removeTag("night");

                    if (underwaterAmbience())
                        continue;

                    if (playerAmbienceEntity == undefined) {
                        if (!player.isValid())
                            continue;
                        
                        try {
                            const entity = player.dimension.spawnEntity("better_on_bedrock:ambiententity", player.location);
                            entity.addTag(player.id);
                        } catch {};
                        continue;
                    };

                    playerAmbienceEntity.teleport({
                        x: player.getHeadLocation().x - player.getViewDirection().x + 1,
                        y: player.getHeadLocation().y,
                        z: player.getHeadLocation().z - player.getViewDirection().z + 1
                    });

                    if (playerAmbienceEntity.hasTag("plains")) {
                        if (playerAmbienceEntity.hasTag("plain"))
                            continue;

                        playerAmbienceEntity.addTag("plain");
                        playerAmbienceEntity.removeTag("taiga");
                        playerAmbienceEntity.removeTag("swamp");
                        playerAmbienceEntity.removeTag("jungle");
                        playerAmbienceEntity.removeTag("cold");
                        player.playMusic("ambient.plains", {
                            loop: true,
                            fade: 3,
                            volume: 0.2
                        });
                    }
                    else if (playerAmbienceEntity.hasTag("taigas")) {
                        if (playerAmbienceEntity.hasTag("taiga"))
                            continue;

                        playerAmbienceEntity.addTag("taiga");
                        playerAmbienceEntity.removeTag("plain");
                        playerAmbienceEntity.removeTag("swamp");
                        playerAmbienceEntity.removeTag("jungle");
                        playerAmbienceEntity.removeTag("cold");
                        player.playMusic("ambient.bird", {
                            loop: true,
                            fade: 3,
                            volume: 0.07
                        });
                    }
                    else if (playerAmbienceEntity.hasTag("swamps")) {
                        if (playerAmbienceEntity.hasTag("swamp"))
                            continue;

                        playerAmbienceEntity.addTag("swamp");
                        playerAmbienceEntity.removeTag("plain");
                        playerAmbienceEntity.removeTag("taiga");
                        playerAmbienceEntity.removeTag("jungle");
                        playerAmbienceEntity.removeTag("cold");
                        player.playMusic("ambient.swamp", {
                            loop: true,
                            fade: 3,
                            volume: 0.25
                        });
                    }
                    else if (playerAmbienceEntity.hasTag("jungles")) {
                        if (playerAmbienceEntity.hasTag("jungle"))
                            continue;

                        playerAmbienceEntity.addTag("jungle");
                        playerAmbienceEntity.removeTag("plain");
                        playerAmbienceEntity.removeTag("taiga");
                        playerAmbienceEntity.removeTag("swamp");
                        playerAmbienceEntity.removeTag("cold");
                        player.playMusic("ambient.jungle", {
                            loop: true,
                            fade: 3,
                            volume: 0.13
                        });
                    }
                    else if (playerAmbienceEntity.hasTag("colds")) {
                        if (playerAmbienceEntity.hasTag("cold"))
                            continue;

                        playerAmbienceEntity.addTag("cold");
                        playerAmbienceEntity.removeTag("plain");
                        playerAmbienceEntity.removeTag("taiga");
                        playerAmbienceEntity.removeTag("swamp");
                        playerAmbienceEntity.removeTag("jungle");
                        player.playMusic("ambient.snow", {
                            loop: true,
                            fade: 3,
                            volume: 0.43
                        });
                    };
                };
                break;
            };
        };
    };
}, 20);