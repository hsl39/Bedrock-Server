import { ActionFormData } from "@minecraft/server-ui";
import { regularScreen } from "../../../quests/regular/main.js";

import * as Quests from "../../constants/Quests.js";
import * as QuestStatus from "../../constants/QuestStatus.js";

const getFormattedStatus = ( status ) => {
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
        id: Quests.ZombieSlayer,
        name: "Zombie Slayer",
        icon: "textures/items/raw_iron",
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§uZombie Slayer" );
            form.body( "Get 32 Rotten Flesh.\n§dRewards:\n§c- 6x Cooked Beef\n§c- 10 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData();
            form.title( "Start Quest?" );
            form.body( "Get 32 Rotten Flesh.\n§dRewards:\n§c- 6x Cooked Beef\n§c- 10 XP" );
            form.button( "Start Quest!" );
            form.button( "Cancel" );
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            player.removeTag("unlocked_1");
                            player.onScreenDisplay.setTitle('zombieSlayerQuestStart');
                            player.sendMessage("§a[!] §rQuest started!");
                            savedQuests.find((q) => q.id == Quests.ZombieSlayer).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                        break;
                    };
                },
            );
        },
        commands: [
            "xp 10",
            "give @s cooked_beef 6",
        ],
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData();
            form.title("§uZombie Slayer");
            form.body("§dClaim:\n§c- 6x Cooked Beef\n§c- 10 XP");
            form.button("Claim");
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.ZombieSlayer);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.CreeperHunter,
        name: "Creeper Hunter",
        icon: "textures/items/gunpowder",
        locked: ( player ) => player.sendMessage( "§c[!] §rYou need to complete §7\"Zombie Slayer\" §rin order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§uCreeper Hunter" );
            form.body( "Get 16 Gunpowder.\n§dRewards:\n§c- 5x TNT\n§c- 15 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 16 Gunpowder.\n§dRewards:\n§c- 5x TNT\n§c- 15 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('creeperHunterQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.CreeperHunter).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        commands: [
            "xp 15",
            "give @s tnt 5"
        ],
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§uCreeper Hunter")
            form.body("§dClaim:\n§c- 5x TNT\n§c- 15 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.CreeperHunter);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.StringySituation,
        name: "Stringy Situation",
        icon: "textures/items/string",
        locked: ( player ) => player.sendMessage( "§c[!] §rYou need to complete §7\"Creeper Hunter\" §rin order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§uStringy Situation" );
            form.body( "Get 14 String.\n§dRewards:\n§c- Shears\n§c- 15 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 14 String.\n§dRewards:\n§c- Shears\n§c- 15 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('stringySituationQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.StringySituation).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        commands: [
            "xp 15",
            "give @s shears 1"
        ],
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§uStringy Situation")
            form.body("§dClaim:\n§c- Shears\n§c- 15 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.StringySituation);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
    {
        id: Quests.MoreSouls,
        name: "More Souls",
        icon: "textures/items/trophies/soul_star",
        locked: ( player ) => player.sendMessage( "§c[!] §rYou need to complete §7\"More Souls\" §rin order to unlock this quest." ),
        info: ( player ) => {
            const form = new ActionFormData();
            form.title( "§uMore Souls" );
            form.body( "Get 2 Souls by slaying mobs.\n§dRewards:\n§c- 2x Diamonds\n§c- 100 XP" );
            form.button( "Ok" );
            form.show( player );
        },
        start: ( player ) => {
             const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
             const form = new ActionFormData()
             form.title("Start Quest?")
             form.body("Get 2 Souls by slaying mobs.\n§dRewards:\n§c- 2x Diamonds\n§c- 100 XP")
             form.button("Start Quest!")
             form.button("Cancel")
             form.show( player ).then(
                 (response) => {
                     switch (response?.selection) {
                         case 0:
                            player.removeTag("unlocked_2")
                            player.onScreenDisplay.setTitle('moreSoulsQuestStart')
                            player.sendMessage("§aQuest started!")
                            savedQuests.find((q) => q.id == Quests.MoreSouls).s = QuestStatus.Busy;
                            player.setDynamicProperty(
                                "quests4",
                                JSON.stringify( savedQuests ),
                            );
                         break;
                     };
                },
            );
        },
        commands: [
            "xp 100",
            "give @s diamond 2"
        ],
        claim: ( player ) => {
            const savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
            const form = new ActionFormData()
            form.title("§uMore Souls")
            form.body("§dClaim:\n§c- 2x Diamonds\n§c- 100 XP")
            form.button("Claim")
            form.show( player ).then(
                (response) => {
                    switch (response?.selection) {
                        case 0:
                            const quest = savedQuests.find((q) => q.id == Quests.MoreSouls);
                            if (quest.s != QuestStatus.Claimed) {
                                const questO = quests.find(({id}) => id == quest.id);
                                for (const command of questO.commands) {
                                    player.runCommandAsync(command);
                                };
                                
                                quest.s = QuestStatus.Claimed;
                                player.setDynamicProperty(
                                    "quests4",
                                    JSON.stringify( savedQuests ),
                                );
                            };
                        break;
                    };
                },
            );
        },
    },
];

export const monster_looter = ( player ) => {
    let savedQuests = JSON.parse(player.getDynamicProperty( "quests4" ));
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
        "quests4",
        JSON.stringify( savedQuests ),
    );
    
    const form = new ActionFormData();
    form.title( "§uMonster Looter" );
    form.body( "Complete Quests To Unlock The Next Tier" );
    
    for (const questO of quests) {
        const quest = savedQuests.find((q) => q.id == questO.id);
        const questStatus = getFormattedStatus(quest.s);
        
        form.button(questO.name.concat(" - ", questStatus), questO.icon);
    };
    
    form.button("§c< Go back");
    form.show( player ).then(
        (response) => {
            if (response.canceled)
                return;

            if (response.selection == quests.length) {
                regularScreen(player);
                return;
            };
            
            const quest = savedQuests.find((q) => q.id == response.selection);
            const q = quests.find((q) => q.id == response.selection);
            
            if (quest.s == QuestStatus.Locked) q.locked( player );
            else if (quest.s == QuestStatus.Unlocked) q.start( player );
            else if (quest.s == QuestStatus.Busy) q.info( player );
            else if (quest.s == QuestStatus.Completed) q.claim( player );
        },
    );
};