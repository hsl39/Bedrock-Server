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
        id: Quests.Metallis,
        name: "First Wood!",
        icon: "textures/items/stick",
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uFirst Wood!");
            form.body("Get at least 3 Logs.\n§dRewards:\n§c- 4x Stick\n- 25 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Get at least 3 Logs.\n§dRewards:\n§c- 4x Stick\n- 25 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");

                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.Metallis).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 25",
            "give @s stick 4"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData();
            form.title("§uFirst Wood!");
            form.body("§dClaim:\n§c- 4x Stick\n§c- 25 XP");
            form.button("Claim");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Metallis);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.LightMyDay,
        name: "Stone Age",
        icon: "textures/items/coal",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"First Wood!\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uStone Age!");
            form.body("Get 14x Cobblestone.\n§dRewards:\n§c- 4x Torches\n§c- 25 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 14x Cobblestone.\n§dRewards:\n§c- 4x Torches\n§c- 25 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")

                            player.sendMessage("§a[!] §rQuest started!")
                            savedQuests.find((q) => q.id == Quests.LightMyDay).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 25",
            "give @s torch 4"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData()
            form.title("§uStone Age!")
            form.body("§dClaim:\n§c- 4x Torches\n§c- 25 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.LightMyDay);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.WitchcraftBlue,
        name: "Getting an upgrade!",
        icon: "textures/items/stone_pickaxe",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Stone Age!\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uGetting an upgrade!");
            form.body("Upgrade your wooden pickaxe to a stone pickaxe.\n§dRewards: 5x Coal and 50x XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Upgrade your wooden pickaxe to a stone pickaxe.\n§dRewards: 5x Coal and 50x XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_3");

                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.WitchcraftBlue).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 50",
            "give @s coal 5"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData();
            form.title("§uGetting an upgrade!");
            form.body("§dClaim: 5x Coal and 50 XP");
            form.button("Claim");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.WitchcraftBlue);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.Amethysts,
        name: "Iron-y!",
        icon: "textures/items/iron_pickaxe",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Getting An Upgrade!\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uGetting An Upgrade!");
            form.body("Upgrade your pickaxe to an Iron Pickaxe.\n\n§cYou require Copper tools to mine iron ore. \n§dRewards:\n§c- 4x Leather\n§c- 50 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Upgrade your pickaxe to an Iron Pickaxe.\n\n§cYou require Copper tools to mine iron ore. \n§dRewards:\n§c- 4x Leather\n§c- 50 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_4");

                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.Amethysts).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 50",
            "give @s leather 4"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData()
            form.title("§uAmethysts")
            form.body("§dClaim:\n§c- 4x Leather\n§c- 50 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Amethysts);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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
        id: Quests.Diamonds,
        name: "Diamonds???",
        icon: "textures/items/diamond",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Iron-y\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData()
            form.title("§uDiamonds???");
            form.body("Get 9 Diamonds.\n§dRewards:\n§c- 1x Diamond\n§c- 100 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 9 Diamonds.\n§dRewards:\n§c- 1x Diamond\n§c- 100 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_5");

                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.Diamonds).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 100",
            "give @s diamond 1"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests"));
            const form = new ActionFormData()
            form.title("§uDiamonds???")
            form.body("§dClaim:\n§c- 1x Diamond\n§c- 100 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.Diamonds);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests",
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

export const time_to_mine = (player) => {
    let savedQuests = JSON.parse(player.getDynamicProperty("quests"));
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
        "quests",
        JSON.stringify(savedQuests),
    );

    const form = new ActionFormData();
    form.title("§uGetting Started!");
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