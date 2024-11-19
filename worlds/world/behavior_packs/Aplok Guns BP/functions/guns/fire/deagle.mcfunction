execute as @s[tag=!underground, tag=!silencer] run playsound gun.deagle.fire @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=!silencer] run playsound gun.deagle.fire.reverb @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=!underground, tag=silencer] run playsound gun.deagle.fire_silenced @a[r=40] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=silencer] run playsound gun.deagle.fire_silenced.reverb @a[r=40] ~~~ 100 1 0.01
playanimation @s[tag=silencer] animation.deagle.fire.silenced fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:deagle')"
playanimation @s[tag=!silencer] animation.deagle.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:deagle')"
camerashake add @s[tag=sneaking] 0.06 0.2 rotational
camerashake add @s[tag=!sneaking] 0.1 0.2 rotational
scoreboard players remove @s[scores={deagle=1..}, m=!c] deagle 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire