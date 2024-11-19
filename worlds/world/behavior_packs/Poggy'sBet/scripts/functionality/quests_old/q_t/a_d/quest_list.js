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
        id: Quests.sadEnderman,
        name: "Trader!",
        icon: "textures/items/bounty_system/bought_quest",
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uTrader");
            form.body("Trade for a bought quest at a librarian villager.\n\n§eYou may have to reroll trades. Obtaining a librarian is as simple as placing a lectern next to a jobless villager.§f\n\nRewards:\n§c- 3x Ender Pearls\n§c- 100 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Trade for a bought quest at a librarian villager.\n\n§eYou may have to reroll trades. Obtaining a librarian is as simple as placing a lectern next to a jobless villager.§f\n\nRewards:\n§c- 3x Ender Pearls\n§c- 100 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('sadEndermanQuestStart');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.sadEnderman).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 100",
            "give @s ender_pearl 3"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData();
            form.title("§uSad Enderman");
            form.body("Claim:\n§c- 3x Ender Pearls\n§c- 100 XP");
            form.button("Claim");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.sadEnderman);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.bountyTime,
        name: "Bounty Time",
        icon: "textures/items/bounty_system/bounty_scroll_closed",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Trader!\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uBounty Time");
            form.body("Get a Bounty Scroll found at the Trader Outpost, which is found anywhere in the overworld.\nRewards:\n§c- 75 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get a Bounty Scroll found at the Trader Outpost, which is found anywhere in the overworld.\nRewards:\n§c- 75 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('bountyTimeQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.bountyTime).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 75",
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData()
            form.title("§uBounty Time")
            form.body("Claim:\n§c- 75 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.bountyTime);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.logCollector,
        name: "Wizard Craft!",
        icon: "textures/items/staffs/runes/strength_rune",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Bounty Time\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uWizard Craft!");
            form.body("Buy a Fire Rune from a Lonley Wizard.\nRewards:\n§c- 1x Travelers Record\n§c- 250 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Buy a Fire Rune from a Lonley Wizard.\nRewards:\n§c- 1x Travelers Record\n§c- 250 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_3");
                            player.onScreenDisplay.setTitle('logCollectorQuestStart');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.logCollector).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 250",
            "give @s better_on_bedrock:record_stardust 1"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData();
            form.title("§uWizard Craft!");
            form.body("Claim:\n§c- 1x Travels Record\n§c- 250 XP");
            form.button("Claim");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.logCollector);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.oreCollector,
        name: "Traveler",
        icon: "textures/items/waystone/waystone",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Wizard Craft!\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uTraveler");
            form.body("Get a waystone.\nRewards:\n§c- 1x Enderman Tear\n§c- 250 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get a waystone.\nRewards:\n§c- 1x Enderman Tear\n§c- 250 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_4");
                            player.onScreenDisplay.setTitle('oreCollectorQuestStart');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.oreCollector).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 250",
            "give @s better_on_bedrock:ender_tear 1"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData()
            form.title("§uTraveler")
            form.body("Claim:\n§c- 1x Enderman Tear\n§c- 250 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.oreCollector);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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
        id: Quests.evokerSpells,
        name: "Staffs And Stones!",
        icon: "textures/items/staffs/runes/strength_rune",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Traveler\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData()
            form.title("§uStaffs And Stones!");
            form.body("Upgrade any rune from a Lonely Wizard.\nRewards:\n§c- 2x Golden Apples\n§c- 200 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Upgrade any rune from a Lonely Wizard.\nRewards:\n§c- 2x Golden Apples\n§c- 200 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_5");
                            player.onScreenDisplay.setTitle('non');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.evokerSpells).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests2",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 200",
            "give @s golden_apple 2"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
            const form = new ActionFormData()
            form.title("§uEvoker Spells")
            form.body("Claim:\n§c- 2x Golden Apples\n§c- 200 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.evokerSpells);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests2",
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

export const adventure_delight = (player) => {
    let savedQuests = JSON.parse(player.getDynamicProperty("quests2"));
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
        "quests2",
        JSON.stringify(savedQuests),
    );

    const form = new ActionFormData();
    form.title("§uTime to Mine");
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