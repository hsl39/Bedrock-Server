import { ActionFormData } from "@minecraft/server-ui";

import { mainScreen } from "../main";

import { QuestStatus } from "../constants.js";
import { time_to_mine, quests } from "../../quests_old/q_t/t_t_m/quest_list.js";
import { adventure_delight, quests as quests2 } from "../../quests_old/q_t/a_d/quest_list.js";
import { test, quests as quests3 } from "../../quests_old/q_t/test/quest_list.js";
import { monster_looter, quests as quests4 } from "../../quests_old/q_t/m_l/quest_list.js";
import { more_food, quests as quests5 } from "../../quests_old/q_t/m_f/quest_list.js";
import { the_willager, quests as quests6 } from "../../quests_old/q_t/t_w/quest_list.js";
import { beyond_the_overworld, quests as quests7 } from "../../quests_old/q_t/b_t_o/quest_list.js";

const tiers = [
    {
        name: "Getting Started",
        icon: "textures/items/raw_iron",
        handle: time_to_mine,
        property: "quests",
        quests,
    },
    {
        name: "Mining Time",
        icon: "textures/items/diamond_boots",
        handle: adventure_delight,
        property: "quests2",
        quests: quests2,
    },
    {
        name: "Nether Arise",
        icon: "textures/items/ingots/fire/firey_ingot",
        handle: test,
        property: "quests3",
        quests: quests3,
    },
    {
        name: "Monster Looter",
        icon: "textures/items/rotten_flesh",
        handle: monster_looter,
        property: "quests4",
        quests: quests4,
    },
    {
        name: "The Willager",
        icon: "textures/items/dragons_breath",
        handle: the_willager,
        property: "quests5",
        quests: quests5,
    },
    {
        name: "Adventure Time!",
        icon: "textures/items/apple",
        handle: more_food,
        property: "quests6",
        quests: quests6,
    },
    {
        name: "Beyond the Overworld",
        icon: "textures/items/ingots/enderite/end_ingot",
        handle: beyond_the_overworld,
        property: "quests7",
        quests: quests7,
    },
];

/** @param { import("@minecraft/server").Player } player  */
export function regularScreen(player) {
    const tiersCompleted = player.getDynamicProperty("tiersCompleted") ?? 0;

    const form = new ActionFormData()
    .title("§uQuest Tiers")
    .body("These quests are a guide to help you with your journey!");

    for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i];
        const isUnlocked = tiersCompleted >= i;

        form.button(tier.name.concat("\n", isUnlocked ? "" : "§c[LOCKED]§r"), tier.icon);
    };

    let shouldClaimAll = false;
    for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i];
        let savedQuests = JSON.parse(player.getDynamicProperty(tier.property));
        for (const questO of tier.quests) {
            const quest = savedQuests.find((q) => q.id == questO.id);
            if (quest == undefined)
                continue;

            if (quest.s == QuestStatus.Completed) {
                shouldClaimAll = true;
                break;
            };
        };
    };
    
    if (shouldClaimAll)
        form.button("§q> Claim all");
    form.button("§c< Go back");
    form.show(player).then(
        (response) => {
            if (response.canceled)
                return;

            if (shouldClaimAll) {
                switch (response.selection) {
                    case tiers.length: {
                        for (let i = 0; i < tiers.length; i++) {
                            const tier = tiers[i];
                            let savedQuests = JSON.parse(player.getDynamicProperty(tier.property));
                            for (const questO of tier.quests) {
                                const quest = savedQuests.find((q) => q.id == questO.id);
                                if (quest == undefined)
                                    continue;
                    
                                if (quest.s == QuestStatus.Completed) {
                                    for (const command of questO.commands) {
                                        player.runCommandAsync(command);
                                    };

                                    quest.s = QuestStatus.Claimed;
                                };
                            };
                            
                            player.setDynamicProperty(
                                tier.property,
                                JSON.stringify(savedQuests),
                            );
                        };

                        player.sendMessage("§a[!] §rSuccessfully claimed all quests!");
                        return;
                    };
                    case tiers.length + 1: {
                        mainScreen(player);
                        return;
                    };
                    default:
                        break;
                };
            } else if (response.selection == tiers.length) {
                mainScreen(player);
                return;
            };

            const tiersCompleted = player.getDynamicProperty("tiersCompleted") ?? 0;
            if (tiersCompleted < response.selection) {
                const previousQuest = tiers[response.selection - 1];
                player.sendMessage("§c[!] §rYou need to complete §7\"".concat(previousQuest.name, "\"§r in order to unlock this tier."));
                return;
            };

            const tier = tiers[response.selection];
            tier.handle(player);
        },
    );
};