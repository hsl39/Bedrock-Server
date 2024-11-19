import { ActionFormData } from "@minecraft/server-ui";
import { regularScreen } from "../../../quests/regular/main.js";

import * as Quests from "../../constants/Quests.js";
import * as QuestStatus from "../../constants/QuestStatus.js";

const getFormattedStatus = (status) => {
    switch (status) {
        case 1: return "§8Unlocked§r";
        case 2: return "§6Busy§r";
        case 3: return "§qCompleted§r";
        case 4: return "§qClaimed§r";
        default: return "§cLocked§r";
    };
};

export const quests = [
    {
        id: Quests.ThatsFine,
        name: "That's fine",
        icon: "textures/items/blaze_rod",
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uThat's fine");
            form.body("Get 5 Blaze Rods by slaying Blazes.\n§dRewards:\n§c- 5x Blaze Powder\n§c- 15 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Get 5 Blaze Rods by slaying Blazes.\n§dRewards:\n§c- 5x Blaze Powder\n§c- 15 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('thatsFineQuestStart');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.ThatsFine).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 15",
            "give @s blaze_powder 5"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData();
            form.title("§uThat's fine");
            form.body("§dClaim:\n§c- 5x Blaze Powder\n§c- 15 XP");
            form.button("Claim");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ThatsFine);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
    {
        id: Quests.Snowwhite,
        name: "Snow white?",
        icon: "textures/items/quartz",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"That's fine\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uSnow white?");
            form.body("Get 32 Quartz.\n§dRewards:\n§c- 5x Iron Ingots\n§c- 10 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 32 Quartz.\n§dRewards:\n§c- 5x Iron Ingots\n§c- 10 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('snowwhiteQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.Snowwhite).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 10",
            "give @s iron_ingot 5"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("§uSnow white?")
            form.body("§dClaim:\n§c- 5x Iron Ingots\n§c- 10 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Snowwhite);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
    {
        id: Quests.Netherite,
        name: "Nether ite?",
        icon: "textures/items/netherite_ingot",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Snow white?\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uNether ite?");
            form.body("Get a Netherite Ingot.\n§dRewards:\n§c- 1x Smithing Table\n§c- 25 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get a Netherite Ingot.\n§dRewards:\n§c- 1x Smithing Table\n§c- 25 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('netheriteQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.Netherite).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 25",
            "give @s smithing_table 1"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("§uNether ite?")
            form.body("§dClaim:\n§c- 1x Smithing Table\n§c- 25 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Netherite);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
    {
        id: Quests.EnderPlayer,
        name: "Ender Player",
        icon: "textures/items/chorus_fruit",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Nether ite?\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uEnder Player");
            form.body("Get 64 Chorus Fruit.\n§dRewards:\n§c- 3x Ender Pearls\n§c- 50 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 64 Chorus Fruit.\n§dRewards:\n§c- 3x Ender Pearls\n§c- 50 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('enderPlayerQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.EnderPlayer).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 50",
            "give @s ender_pearl 3"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("§uEnder Player")
            form.body("§dClaim:\n§c- 3x Ender Pearls\n§c- 50 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.EnderPlayer);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
    {
        id: Quests.NetherBed,
        name: "Nether Bed",
        icon: "textures/items/glowstone_dust",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Ender Player\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uNether Bed");
            form.body("Craft a Respawn Anchor.\n§dRewards:\n§c- 8x Glowstone\n§c- 75 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Craft a Respawn Anchor.\n§dRewards:\n§c- 8x Glowstone\n§c- 75 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('netherBedQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.NetherBed).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 50",
            "give @s ender_pearl 3",
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("§uNether Bed")
            form.body("§dClaim:\n§c- 8x Glowstone\n§c- 75 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.NetherBed);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
    {
        id: Quests.MovableChest,
        name: "Movable Chest",
        icon: "textures/items/shulker_shell",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Nether Bed\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uMovable Chest");
            form.body("Get a Shulker Box.\n§dRewards:\n§c- 75 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get a Shulker Box.\n§dRewards:\n§c- 75 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('movableChestQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.MovableChest).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 75"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("§uMovable Chest")
            form.body("§dClaim:\n§c- 75 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.MovableChest);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
    {
        id: Quests.DragonEgg,
        name: "Dragon Egg",
        icon: "textures/items/chorus_fruit",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Movable Chest\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uDragon Egg");
            form.body("Get the Dragon Egg.\n§dRewards:\n§c- 1x Enchanted Golden Apple\n§c- 175 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get the Dragon Egg.\n§dRewards: 1x Enchanted Golden Apple\n§c- 175 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('dragonEggQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.DragonEgg).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests7",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 175",
            "give @s enchanted_golden_apple"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
            const form = new ActionFormData()
            form.title("§uDragon Egg")
            form.body("§dClaim:\n§c- 1x Enchanted Golden Apple and 175 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.DragonEgg);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests7",
                                    JSON.stringify(savedQuests),
                                );
                            };
                            break;
                    };
                },
            );
        },
    },
];

export const beyond_the_overworld = (player) => {
    let savedQuests = JSON.parse(player.getDynamicProperty("quests7"));
    for (const questO of quests) {
        const qBefore = savedQuests.find((q) => q.id == (questO.id - 1));
        if (!savedQuests.find((q) => q.id == questO.id)) {
            savedQuests.push(
                {
                    id: questO.id,
                    status: (
                        qBefore.s == QuestStatus.Completed
                            ? QuestStatus.Unlocked
                            : QuestStatus.Locked
                    ),
                },
            );
        };
    };

    for (const savedQuest of savedQuests) {
        if (!quests.find((q) => q.id == savedQuest.id)) {
            savedQuests = savedQuests.filter((q) => q.id != savedQuest.id);
        };
    };

    player.setDynamicProperty(
        "quests7",
        JSON.stringify(savedQuests),
    );

    const form = new ActionFormData();
    form.title("§uBeyond the Overworld");
    form.body("Complete Quests To Unlock The Next Tier");

    for (const questO of quests) {
        const quest = savedQuests.find((q) => q.id == questO.id);
        const questStatus = getFormattedStatus(quest.s);

        form.button(questO.name.concat(" - ", questStatus), questO.icon);
    };

    form.button("§c< Go back");
    form.show(player).then(
        (response) => {
            if (response.canceled)
                return;

            if (response.selection == quests.length) {
                regularScreen(player);
                return;
            };
            
            const quest = savedQuests.find((q) => q.id == response.selection);
            const q = quests.find((q) => q.id == response.selection);

            if (quest.s == QuestStatus.Locked) q.locked(player);
            else if (quest.s == QuestStatus.Unlocked) q.start(player);
            else if (quest.s == QuestStatus.Busy) q.info(player);
            else if (quest.s == QuestStatus.Completed) q.claim(player);
        },
    );
};