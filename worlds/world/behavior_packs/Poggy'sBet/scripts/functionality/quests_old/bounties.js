import { ItemStack, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

import * as Bounties from "./constants/Bounties.js";
import * as BountyStatus from "./constants/BountyStatus.js";

/*world.afterEvents.worldInitialize.subscribe(
    ({ propertyRegistry }) => {
        const playerCompShowTick = new DynamicPropertiesDefinition();
        
        playerCompShowTick.defineString( "bounties", 233 );
        //wait
        //okay
            
        propertyRegistry.registerEntityTypeDynamicProperties(
            playerCompShowTick, EntityTypes.get("minecraft:player")
        );
    },
);*/

const getFormattedStatus = (status) => {
    if (status == 0) return "§8Open";
    else if (status == 1) return "§6In progress...";
    else if (status == 2) return "§qCompleted";
    else if (status == 3) return "§2Reward claimed.";
    else if (status == 4) return "§cLocked";
};

const bounties = [
    [
        Bounties.cowSlayer,
        0,
        BountyStatus.Open,
    ],
    [
        Bounties.ZombieSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.PigSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.SheepSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.GhastSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.PhantomSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.DeerSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.SpiderSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.SkeletonSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.BlazeSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.PiglinSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.VexSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.EndermanSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.VindicatorSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.WitchSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.EvokerSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.RavagerSlayer,
        0,
        BountyStatus.Locked,
    ],

    [
        Bounties.WillagerSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.flenderSlayer,
        0,
        BountyStatus.Locked,
    ],
    [
        Bounties.EnchanterSlayer,
        0,
        BountyStatus.Locked,
    ],
];

const quests = [
    {
        id: Bounties.cowSlayer,
        name: "Cow Slayer I",
        description: "Hunt down 3 cows.",
        rewards: "24 Coal and 20 XP",
        commands: [
            "xp 20",
            "give @s coal 24",
        ],
    },
    {
        id: Bounties.ZombieSlayer,
        name: "Zombie Slayer II",
        description: "Hunt down 8 Zombies.",
        rewards: "3 Iron Ingots and 20 XP",
        commands: [
            "xp 20",
            "give @s iron_ingot 3",
        ],
    },
    {
        id: Bounties.PigSlayer,
        name: "Pig Hunter II",
        description: "Hunt down 6 Pigs.",
        rewards: "8 Carrots and 25 XP",
        commands: [
            "xp 25",
            "give @s carrot 8",
        ],
    },
    {
        id: Bounties.SheepSlayer,
        name: "Sheep Hunter I",
        description: "Hunt down 3 Sheep.",
        rewards: "4 Wheat and 35 XP",
        commands: [
            "xp 35",
            "give @s wheat 4",
        ],
    },
    {
        id: Bounties.GhastSlayer,
        name: "Ghast Hunter III",
        description: "Hunt down 6 Ghasts.",
        rewards: "8 Iron Ingots and 50 XP",
        commands: [
            "xp 50",
            "give @s iron_ingot 8",
        ],
    },
    {
        id: Bounties.PhantomSlayer,
        name: "Phantom Hunter IV",
        description: "Hunt down 12 Phantoms.",
        rewards: "16 Arrows and 45 XP",
        commands: [
            "xp 45",
            "give @s arrow 16",
        ],
    },
    {
        id: Bounties.DeerSlayer,
        name: "Deer Slayer II",
        description: "Hunt down 5 Deers.",
        rewards: "8 Cooked Beef and 35 XP",
        commands: [
            "xp 35",
            "give @s cooked_beef 8",
        ],
    },
    {
        id: Bounties.SpiderSlayer,
        name: "Spider Hunter II",
        description: "Hunt down 5 Spiders.",
        rewards: "8 Strings and 25 XP",
        commands: [
            "xp 25",
            "give @s string 8",
        ],
    },
    {
        id: Bounties.SkeletonSlayer,
        name: "Skeleton Hunter III",
        description: "Hunt down 5 Skeletons.",
        rewards: "6 Bones and 25 XP",
        commands: [
            "xp 25",
            "give @s bone 6",
        ],
    },
    {
        id: Bounties.BlazeSlayer,
        name: "Blaze Hunter V",
        description: "Hunt down 13 Blazes.",
        rewards: "Flint and Steel and 50 XP",
        commands: [
            "xp 25",
            "give @s flint_and_steel",
        ],
    },
    {
        id: Bounties.PiglinSlayer,
        name: "Piglin Hunter V",
        description: "Hunt down 7 Piglin Brutes.",
        rewards: "Iron Sword and 50 XP",
        commands: [
            "xp 50",
            "give @s iron_sword",
        ],
    },
    {
        id: Bounties.VexSlayer,
        name: "Vex Hunter IV",
        description: "Hunt down 5 Vexes.",
        rewards: "50 XP",
        commands: [
            "xp 50",
        ],
    },
    {
        id: Bounties.EndermanSlayer,
        name: "Enderman Hunter III",
        description: "Hunt down 16 Endermans.",
        rewards: "3 Diamonds and 65 XP",
        commands: [
            "xp 65",
            "give @s diamond 3",
        ],
    },
    {
        id: Bounties.VindicatorSlayer,
        name: "Vindicator Hunter I",
        description: "Hunt down 4 Vindicators.",
        rewards: "2 Golden Apples and 25 XP",
        commands: [
            "xp 25",
            "give @s golden_apple 2",
        ],
    },
    {
        id: Bounties.WitchSlayer,
        name: "Witch Hunter III",
        description: "Hunt down 5 Witches.",
        rewards: "1 Bucket and 35 XP",
        commands: [
            "xp 35",
            "give @s bucket",
        ],
    },
    {
        id: Bounties.EvokerSlayer,
        name: "Evoker Hunter II",
        description: "Hunt down 10 Evokers.",
        rewards: "16 Cobblestone and 25 XP",
        commands: [
            "xp 25",
            "give @s cobblestone 16",
        ],
    },
    {
        id: Bounties.RavagerSlayer,
        name: "Ravager Hunter III",
        description: "Hunt down 5 Ravagers.",
        rewards: "2 Golden Apple and 45 XP",
        commands: [
            "xp 45",
            "give @s golden_apple 2",
        ],
    },

    {
        id: Bounties.WillagerSlayer,
        name: "Willager Hunter I",
        description: "Hunt down a Willager.",
        rewards: "1 Totem of Undying and 100 XP",
        commands: [
            "xp 100",
            "give @s totem",
        ],
    },
    {
        id: Bounties.flenderSlayer,
        name: "flender Hunter I",
        description: "Hunt down a flender.",
        rewards: "2 Golden Apples and 125 XP",
        commands: [
            "xp 125",
            "give @s golden_apple 2",
        ],
    },
    {
        id: Bounties.EnchanterSlayer,
        name: "Enchanter Hunter I",
        description: "Hunt down an Enchanter.",
        rewards: "1 Enchanted Golden Apple and 150 XP",
        commands: [
            "xp 150",
            "give @s enchanted_golden_apple",
        ],
    },
];

const functions = {
    start: (player, bounty) => {
        const savedBounties = JSON.parse(player.getDynamicProperty("bounties"));
        const form = new ActionFormData();
        form.title(bounty.name);
        form.body(bounty.description + "\n§dRewards: " + bounty.rewards);
        form.button("Start Hunt");
        form.button("Not Now");
        form.show(player).then(
            (response) => {
                switch (response?.selection) {
                    case 0:
                        if (savedBounties.find((b) => b[2] == BountyStatus.Busy)) return player.sendMessage("§cYou're already doing a different bounty!");
                        player.sendMessage("§a[!] §rBounty Accepted!");
                        savedBounties.find((b) => b[0] == bounty.id)[2] = BountyStatus.Busy;
                        player.setDynamicProperty(
                            "bounties",
                            JSON.stringify(savedBounties),
                        );
                        break;
                };
            },
        );
    },
    about: (player, bounty) => {
        const form = new ActionFormData();
        form.title(bounty.name);
        form.body(bounty.description + "\n§dRewards: " + bounty.rewards);
        form.button("Got It!");
        form.show(player);
    },
    claim: (player, bounty) => {
        const savedBounties = JSON.parse(player.getDynamicProperty("bounties"));
        const form = new ActionFormData();
        form.title(bounty.name);
        form.body("Bounty completed, claim your reward!\n§dRewards: " + bounty.rewards);
        form.button("Claim!");
        form.show(player).then(
            (response) => {
                switch (response?.selection) {
                    case 0:
                        const savedBounty = savedBounties.find((b) => b[0] == bounty.id);
                        const b = quests.find((b) => b.id == bounty.id);
                        if (savedBounty[2] != BountyStatus.Claimed) {
                            for (const command of b.commands) {
                                player.runCommandAsync(command);
                            };

                            savedBounty[2] = BountyStatus.Claimed;
                            player.setDynamicProperty(
                                "bounties",
                                JSON.stringify(savedBounties),
                            );
                        };
                        break;
                };
            },
        );
    },
};
//Ssend the line here of how the dps are saved 
//"[{\"id\":0,\"p\":0,\"s\":0},{\"id\":1,\"p\":0,\"s\":0},{\"id\":2,\"p\":0,\"s\":0},{\"id\":3,\"p\":0,\"s\":0}]"
export const bounty_tier_page = (player) => {
    let savedBounties = JSON.parse(player.getDynamicProperty("bounties") ?? "[]");
    for (const savedBounty of savedBounties) {
        if (!quests.find((q) => q.id == savedBounty[0])) {
            savedBounties = savedBounties.filter((q) => q[0] != savedBounty[0]);
        };
    };

    player.setDynamicProperty(
        "bounties",
        JSON.stringify(savedBounties),
    );

    const form = new ActionFormData();
    form.title("§uBounties");
    form.body("Select an existing bounty, or a newly unlocked bounty and follow the instructions.\nEach bounty will have a difficulty indicated by 'I, II, III, IV, V'.");

    const buttons = [];
    for (const questO of quests) {
        const quest = savedBounties.find((b) => b[0] == questO.id);
        if (quest[2] === 3)
            continue;

        const questStatus = getFormattedStatus(quest[2]);
        form.button(questO.name + " - " + questStatus, questO.icon);
        buttons.push(quest);
    };

    for (const questO of quests) {
        const quest = savedBounties.find((b) => b[0] == questO.id);
        if (quest[2] !== 3)
            continue;

        const questStatus = getFormattedStatus(quest[2]);
        form.button(questO.name + " - " + questStatus, questO.icon);
        buttons.push(quest);
    };

    form.button("§c< Go back");
    form.show(player).then(
        (response) => {
            if (response.canceled) return;

            if (response.selection === quests.length) {
                bountiesMenu(player);
                return;
            };

            const bounty = buttons[response.selection];
            const b = quests.find((b) => b.id == bounty[0]);

            if (bounty[2] == BountyStatus.Open) functions.start(player, b);
            else if (bounty[2] == BountyStatus.Busy) functions.about(player, b);
            else if (bounty[2] == BountyStatus.Completed) functions.claim(player, b);
            else if (bounty[2] == BountyStatus.Claimed) {
                player.sendMessage("§c[!] §rThis bounty's rewards have already been claimed.");
            }
            else if (bounty[2] == BountyStatus.Locked) player.sendMessage("§c[!] §rThis Bounty is currently locked.");
        },
    );
};

function bountiesMenu(player) {
    new ActionFormData()
    .title("§uBounties")
    .button("Available")
    .button("§q> Claim all")

    .show(player).then(
        (response) => {
            if (response.canceled)
                return;

            switch (response.selection) {
                case 0: bounty_tier_page(player); break;
                case 1: {
                    let savedBounties = JSON.parse(player.getDynamicProperty("bounties") ?? "[]");
                    const unclaimedBounties = savedBounties.filter((b) => b[2] == BountyStatus.Completed);
                    if (unclaimedBounties.length === 0) {
                        player.sendMessage("§c[!] §rYou have no completed bounties to claim.");
                        return;
                    };

                    for (let bounty of unclaimedBounties) {
                        const b = quests.find((b) => b.id == bounty[0]);
                        for (const command of b.commands) {
                            player.runCommandAsync(command);
                        };
    
                        bounty[2] = BountyStatus.Claimed;
                        player.setDynamicProperty(
                            "bounties",
                            JSON.stringify(savedBounties),
                        );
                    };
    
                    player.sendMessage("§a[!] §rSuccessfully claimed all bounties!");
                    break;
                };
            };
        },
    );
};

world.afterEvents.itemUse.subscribe(data => {
    let { source: player } = data

    let invi = player.getComponent("inventory").container;
    let items = invi.getItem(player.selectedSlotIndex);
    //this spawns the entity with a tag with the player name when the player does not have tag 'backpack1'
    if (items?.typeId == "better_on_bedrock:quest_scroll_closed") {
        invi.setItem(player.selectedSlotIndex, new ItemStack("better_on_bedrock:quest_scroll_opened"));
    }
    if (items?.typeId == "better_on_bedrock:quest_scroll_opened") {
        if (!player.getDynamicProperty("bounties")) {
            player.setDynamicProperty(
                "bounties",
                JSON.stringify(bounties),
            );
        };
        bountiesMenu(player)
    }
})
