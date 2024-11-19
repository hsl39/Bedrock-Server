execute as @s[tag=!underground] run playsound gun.mossberg.fire @a[r=400] ~~~ 100 1 0.01
execute as @s[tag=underground] run playsound gun.mossberg.fire.reverb @a[r=400] ~~~ 100 1 0.01
playanimation @s animation.mossberg.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:mossberg')"
camerashake add @s[tag=sneaking] 0.06 0.2 rotational
camerashake add @s[tag=!sneaking] 0.12 0.2 rotational
scoreboard players remove @s[scores={mossberg=1..}, m=!c] mossberg 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire