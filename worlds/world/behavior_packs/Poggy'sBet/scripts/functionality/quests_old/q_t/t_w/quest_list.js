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
        id: Quests.BowMaster,
        name: "Bow Master",
        icon: "textures/items/arrow",
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uBow Master");
            form.body("Get 48 Arrows.\n§dRewards:\n§c- 1x Bow\n§c- 15 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData();
            form.title("Start Quest?");
            form.body("Get 48 Arrows.\n§dRewards:\n§c- 1x Bow\n§c- 15 XP");
            form.button("Start Quest!");
            form.button("Cancel");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('bowMasterQuestStart');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.BowMaster).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 15",
            "give @s bow 1"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData();
            form.title("§uBow Master");
            form.body("§dClaim:\n§c- 1x Bow\n§c- 15 XP");
            form.button("Claim");
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.BowMaster);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.StayingHealthy,
        name: "Staying Healthy",
        icon: "textures/items/crops/food/healthy_carrot",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Zombie Slayer\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uStaying Healthy");
            form.body("Get 16 Healthy Carrots by planting and growing Wild Carrots.\n§dRewards:\n§c- 8x Healthy Carrots\n§c- 10 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get 16 Healthy Carrots by planting and growing Wild Carrots.\n§dRewards:\n§c- 8x Healthy Carrots\n§c- 10 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('stayingHealthyQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.StayingHealthy).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 10",
            "give @s better_on_bedrock:healthy_carrot_item 8"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData()
            form.title("§uStaying Healthy")
            form.body("§dClaim:\n§c- 8x Healthy Carrots\n§c- 10 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.StayingHealthy);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.ArmoredUp,
        name: "Armored Up",
        icon: "textures/items/diamond_chestplate",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Creeper Hunter\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uArmored Up");
            form.body("Get Diamond Chestplate.\n§dRewards:\n§c- 50 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get Diamond Chestplate.\n§dRewards:\n§c- 50 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('armoredUpQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.ArmoredUp).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 50"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData()
            form.title("§uArmored Up")
            form.body("§dClaim:\n§c- 50 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ArmoredUp);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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
        id: Quests.WillagerHat,
        name: "Willager Hat",
        icon: "textures/items/wearables/willager_hat",
        locked: (player) => player.sendMessage("§c[!] §rYou need to complete §7\"Stringy Situation\" §rin order to unlock this quest."),
        info: (player) => {
            const form = new ActionFormData();
            form.title("§uWillager Hat");
            form.body("Get the Willager Hat.\n§dRewards:\n§c- 1x Enchanted Golden Apple\n§c- 200 XP");
            form.button("Ok");
            form.show(player);
        },
        start: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData()
            form.title("Start Quest?")
            form.body("Get the Willager Hat.\n§dRewards:\n§c- 1x Enchanted Golden Apple\n§c- 200 XP")
            form.button("Start Quest!")
            form.button("Cancel")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('willagerHatQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.WillagerHat).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests6",
                                JSON.stringify(savedQuests),
                            );
                            break;
                    };
                },
            );
        },
        commands: [
            "xp 200",
            "give @s enchanted_golden_apple 1"
        ],
        claim: (player) => {
            const savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
            const form = new ActionFormData()
            form.title("§uWillager Hat")
            form.body("§dClaim:\n§c- 1x Enchanted Golden Apple\n§c- 200 XP")
            form.button("Claim")
            form.show(player).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.WillagerHat);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests6",
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

export const the_willager = (player) => {
    let savedQuests = JSON.parse(player.getDynamicProperty("quests6"));
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
        "quests6",
        JSON.stringify(savedQuests),
    );

    const form = new ActionFormData();
    form.title("§uThe Willager");
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