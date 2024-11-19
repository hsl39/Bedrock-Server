import * as mc from "@minecraft/server"
import * as ui from "@minecraft/server-ui"

import { getPack, getScreenName, clear } from "./utils/display"
import { setHealth } from "./utils/health"
import { time } from "./utils/time"
import { validation, crops } from "./utils/validation"
import { blocks } from "./utils/blocks"

const { world, system } = mc
const excludedEntities = ["xp_orb", "container", "snowball", "fishing_hook", "aquamarine_trident_projectile", "opal_spear_projectile", "peridot_spear_projectile"]
const maxDistance = 5

world.afterEvents.playerSpawn.subscribe(({ player }) => {
  const developer = player.getDynamicProperty("developer")
  const waio = player.getDynamicProperty("waio")
  const noLang = player.getDynamicProperty("noLang")

  if (developer === undefined) player.setDynamicProperty("developer", false)
  if (waio === undefined) player.setDynamicProperty("waio", true)
  if (noLang === undefined) player.setDynamicProperty("noLang", false)

})

system.runInterval(() => {
  const players = world.getAllPlayers()
  for (const player of players) {
    if (player.getDynamicProperty("waio") !== true) return

    const entity = player.getEntitiesFromViewDirection()[0]?.entity
    const block = player.getBlockFromViewDirection()?.block
    const headLoc = player.getHeadLocation()

    const developer = player.getDynamicProperty("developer")
    const noLang = player.getDynamicProperty("noLang")
    let titleRaw = ""

    if (entity && distance(headLoc, entity.location)) {
      const { name, nameTag, typeId } = entity
      const [id, ename] = typeId.split(":")
      const pack = getPack(id, noLang)

      const item = entity.getComponent("item")
      const health = entity.getComponent("health")
      const variant = entity.getComponent("variant")?.value
      const markVar = entity.getComponent("mark_variant")?.value
      const skinId = entity.getComponent("skin_id")?.value
      const tameable = entity.getComponent("tameable")
      const movement = entity.getComponent("movement")?.defaultValue
      const healable = entity.getComponent("healable")

      if (!item && !excludedEntities.includes(ename)) {
        titleRaw += developer ? `\n§7${typeId}` : ""

        if (health && ename !== "armor_stand" && !entity.hasTag("Dead")) {
          const { currentValue, defaultValue } = health
          titleRaw += `\n${setHealth(Math.round(currentValue), defaultValue)}`
        }

        if (developer && (variant || markVar || skinId)) {
          if (variant) titleRaw += `\n§dVariant: ${variant}`
          if (markVar) titleRaw += `\n§dMark Variant: ${markVar}`
          if (skinId) titleRaw += `\n§dSkin Id: ${skinId}`
        }

        if (movement) titleRaw += `\n§7Speed: ${movement.toFixed(2)}`
        if (player.isSneaking) {
          if (tameable) {
            const itemList = tameable?.getTameItems.map((item) => item.typeId).join(', ') + '.'
            titleRaw += `\n§7Tame Chance: ${tameable.probability.toFixed(2)}`
            titleRaw += `\n§7Tame Items: ${itemList}`
          }

          if (entity?.getEffects()) {
            const effectList = entity?.getEffects().map((effect) => {
              const { displayName, duration } = effect
              const display = `\n§a${displayName} (${time(duration)})`

              return display
            })

            titleRaw += `${effectList.join("")}`
          }
        }

        player.onScreenDisplay.setActionBar({
          "rawtext": [
            { translate: getScreenName("entity", id, ename, nameTag, name) },
            { text: titleRaw },
            { text: "\n§9§o" },
            { translate: pack },
          ]
        })
      }
    }

    else if (block && distance(headLoc, block.location)) {
      const { typeId, permutation, location } = block
      const { x, y, z } = location

      let [id, name] = typeId.split(":")
      const pack = getPack(id, player.hasTag("waioNoLang"))
      const inv = block.getComponent("inventory")?.container

      const lang = blocks[typeId]?.lang
      const tool = blocks[typeId]?.tool

      titleRaw += developer ? `\n§7${typeId}` : ""
      titleRaw += tool ? `\n§7Tool: ${tool}` : ""

      if (inv) {
        let slots = 0;
        let itemsString = "";

        for (let i = 0; i < inv.size; i++) {
          const item = inv.getItem(i);
          if (item) {
            slots++;
            if (player.isSneaking) {
              const clearItem = clear(`${item.typeId.split(":")[1]}, `);
              itemsString += clearItem;
            }
          }
        }

        titleRaw += `\n§7Container: ${slots}/${inv.size}`;

        if (player.isSneaking && slots) {
          let formattedItems = itemsString.replace(/,(?=[^,]*$)/, ".");
          if (formattedItems.length >= 20) formattedItems = formattedItems.slice(0, 19) + "...";

          titleRaw += `\n§7Items: ${formattedItems}`;
        }
      }

      // console.warn(block.typeId)

      if (id === "minecraft") {
        const growth = permutation?.getState("growth")
        const honeyLevel = permutation?.getState("honey_level")
        const openBit = permutation?.getState("open_bit")
        const osb = permutation?.getState("output_subtract_bit")
        const repeaterDelay = permutation?.getState("repeater_delay")
        const redstone = block?.getRedstonePower

        const sign = block?.getComponent("sign")

        name = validation(block)

        if (crops.hasOwnProperty(name)) {
          const growthRate = crops[name];
          const result = growth / growthRate;
          const roundedResult = result !== 0 ? result.toFixed(2) : 0;

          if (name === "melon_stem") name = "melon_block";
          else if (name === "pitcher_crop") name = "pitcher_plant";

          let growthText =
            roundedResult === "1.00" ? "§aMature" : `${roundedResult}%`;
          titleRaw += `\n§7Growth: ${growthText}`;
        }

        titleRaw += honeyLevel !== undefined ? `\n§7Honey: ${honeyLevel}/5` : "";
        titleRaw += osb !== undefined ? `\n§7Mode: ${osb ? "Subtractor" : "Comparator"}` : "";
        titleRaw += openBit !== undefined && name === "lever" ? `\n§7Active: ${openBit}` : "";
        titleRaw += repeaterDelay !== undefined ? `\n§7Delay: ${repeaterDelay + 1}` : "";
        titleRaw += redstone !== undefined && redstone > 0 ? `\n§7Power: ${redstone}` : "";

        if (sign) {
          let getText = sign.getText();

          if (getText.length > 0) {
            titleRaw += player.isSneaking ? `\n§7Text: ${getText}` : "";

            if (getText.length < 15 && !player.isSneaking) titleRaw += `\n§7Text: ${getText}`;
            if (getText.length >= 15 && !player.isSneaking) titleRaw += `\n§7Text: ${getText.slice(0, 14)}...`;
          }
        }

      }

      titleRaw += player.isSneaking ? `\n§7Position: ${x}, ${y}, ${z}` : ""

      if (developer) {
        titleRaw += `\n\nAll States: §7${JSON.stringify(block.permutation.getAllStates(), null, 2)}`
      }

      player.onScreenDisplay.setActionBar({
        rawtext: [
          { translate: lang !== undefined ? lang : getScreenName("block", id, name) },
          { text: titleRaw },
          { text: "\n§9§o" },
          { translate: pack },
        ],
      })

    }

  }
})

world.beforeEvents.chatSend.subscribe((ev) => {
  const player = ev.sender
  const message = ev.message.toLowerCase()

  if (message === "waio!configuration" || message === "w!configuration") {
    ev.cancel = true

    const options = [
      { property: "waio", label: "Active" },
      { property: "developer", label: "Developer Mode" },
      { property: "noLang", label: "Name Without Lang File" },
    ]

    system.run(async function () {
      const modalForm = new ui.ModalFormData().title("WAIO Configuration")

      options.forEach((option) => {
        modalForm.toggle(option.label, player.getDynamicProperty(option.property))
      })

      const response = await forceShow(player, modalForm)
      if (response.canceled) return

      options.forEach((option, index) => {
        const property = option.property;
        const value = response.formValues[index];

        if (value === false) {
          player.setDynamicProperty(property, false);
        } else {
          player.setDynamicProperty(property, true);
        }
      });

      player.sendMessage("§aConfiguration has been successfully updated");
    })

  }
})

function distance(headLoc, loc) {
  const { x: hx, y: hy, z: hz } = headLoc;
  const { x, y, z } = loc;
  return Math.abs(x - hx) < maxDistance && Math.abs(y - hy) < maxDistance && Math.abs(z - hz) < maxDistance;
}

async function forceShow(player, form, timeout = Infinity) {
  const startTick = system.currentTick;
  while (system.currentTick - startTick < timeout) {
    const response = await form.show(player);
    if (response.cancelationReason !== ui.FormCancelationReason.UserBusy) {
      return response;
    }
  }
  throw new Error(`Timed out after ${timeout} ticks`);
}