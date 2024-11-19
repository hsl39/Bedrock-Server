execute as @s[tag=!underground, tag=!silencer] run playsound gun.glock18.fire @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=!silencer] run playsound gun.glock18.fire.reverb @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=!underground, tag=silencer] run playsound gun.glock18.fire_silenced @a[r=40] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=silencer] run playsound gun.glock18.fire_silenced.reverb @a[r=40] ~~~ 100 1 0.01
playanimation @s[tag=silencer] animation.glock18.fire.silenced fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:glock18')"
playanimation @s[tag=!silencer] animation.glock18.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:glock18')"
camerashake add @s[tag=sneaking] 0.02 0.2 rotational
camerashake add @s[tag=!sneaking] 0.06 0.2 rotational
scoreboard players remove @s[scores={glock18=1..}, m=!c] glock18 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire