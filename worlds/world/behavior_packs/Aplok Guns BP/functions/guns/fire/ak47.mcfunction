execute as @s[tag=!underground, tag=!silencer] run playsound gun.ak47.fire @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=!silencer] run playsound gun.ak47.fire.reverb @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=!underground, tag=silencer] run playsound gun.ak47.fire_silenced @a[r=20] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=silencer] run playsound gun.ak47.fire_silenced.reverb @a[r=40] ~~~ 100 1 0.01
playanimation @s[tag=silencer] animation.ak47.fire.silenced fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:ak47')"
playanimation @s[tag=!silencer] animation.ak47.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:ak47')"
camerashake add @s[tag=sneaking] 0.02 0.2 rotational
camerashake add @s[tag=!sneaking] 0.06 0.2 rotational
scoreboard players remove @s[scores={ak47=1..}, m=!c] ak47 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire