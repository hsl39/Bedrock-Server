export function clear(string) {
  return string
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getPack(id, noLang) {
  if (id !== "minecraft") return noLang ? clear(id) : `waio.${id}:description.name`
  else return "Minecraft"
}

export function getScreenName(type, id, bename, nameTag, name) {
  if (type === "entity") {
    if (bename !== "player") {
      if (!nameTag) {
        return `entity.${id === "minecraft" ? "" : `${id}:`}${bename}.name`;
      } else {
        return nameTag;
      }
    } else {
      return name;
    }
  }

  if (type === "block") {
    const display = `tile.${id === "minecraft" ? "" : `${id}:`}${bename}.name`;
    return display;
  }

}

export const armorData = {
  "minecraft:leather_helmet": 1,
  "minecraft:leather_chestplate": 3,
  "minecraft:leather_leggings": 2,
  "minecraft:leather_boots": 1
}