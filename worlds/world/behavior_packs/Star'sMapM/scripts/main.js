import { world, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

const bannerIds = [
    "minecraft:standing_banner",
    "minecraft:wall_banner"
    ];
const structures = [
    "white",
    "orange",
    "magenta",
    "light_blue",
    "yellow",
    "lime",
    "pink",
    "gray",
    "light_gray",
    "cyan",
    "purple",
    "blue",
    "brown",
    "green",
    "red",
    "black"
    ];

// initialize dynamic properties to store marker locations
if (world.getDynamicProperty("markers") == undefined) {
    world.setDynamicProperty("markers", "")
}

function locToStr(loc) {
    return `${loc.x}.${loc.y}.${loc.z}`
}

// check whether a location is stored in marker locations
function checkLoc(loc) {
    loc = locToStr(loc);
    var locs = world.getDynamicProperty("markers");
    if (locs == undefined) var locs = "";
    locs = locs.split(",");
    if (locs.includes(loc)) {
        return true;
    } else {
        return false;
    }
}

// add a location to marker locations
function addLoc(loc) {
    loc = locToStr(loc);
    var locs = world.getDynamicProperty("markers");
    if (locs == undefined) var locs = "";
    locs = locs.split(",");
    locs.push(loc);
    locs = locs.toString();
    world.setDynamicProperty("markers", locs);
}

// delete a location from marker locations
function deleteLoc(loc) {
    loc = locToStr(loc);
    var locs = world.getDynamicProperty("markers");
    locs = locs.split(",");
    delete locs[locs.indexOf(loc)];
    locs = locs.toString();
    world.setDynamicProperty("markers", locs);
}

// main logic
world.afterEvents.itemStartUseOn.subscribe((e) => {
    const block = e.block;
    if (block.dimension.id != "minecraft:overworld") return;
    if (!bannerIds.includes(block.typeId) || e.itemStack.typeId != "minecraft:brush") return;
    if (checkLoc(block.location)) {
        e.source.runCommandAsync(`structure load marker:air ${block.x - 6} 319 ${block.z - 12}`);
        deleteLoc(block.location);
    } else {
        new ModalFormData()
        .title("Add Marker")
        .dropdown("Select Color:", structures)
        .show(e.source)
        .then(r => {
            if (r.isCanceled) return;
            e.source.runCommandAsync(`structure load marker:${structures[r.formValues[0]]} ${block.x - 6} 319 ${block.z - 12}`);
            addLoc(block.location);
        });
    }
});

// to remove the marker if the player breaks the banner
world.beforeEvents.playerBreakBlock.subscribe((e) => {
    const b = e.block;
    if (b.dimension.id == "minecraft:overworld" && bannerIds.includes(b.typeId) && checkLoc(b.location)) {
        e.player.runCommandAsync(`structure load marker:air ${b.x - 6} 319 ${b.z - 12}`);
        deleteLoc(b.location);
    }
});
