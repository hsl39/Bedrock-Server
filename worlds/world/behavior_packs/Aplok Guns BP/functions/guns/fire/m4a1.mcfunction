execute as @s[tag=!underground, tag=!silencer] run playsound gun.m4a1.fire @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=!silencer] run playsound gun.m4a1.fire.reverb @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=!underground, tag=silencer] run playsound gun.m4a1.fire_silenced @a[r=40] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=silencer] run playsound gun.m4a1.fire_silenced.reverb @a[r=40] ~~~ 100 1 0.01
playanimation @s[tag=silencer] animation.m4a1.fire.silenced fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:m4a1')"
playanimation @s[tag=!silencer] animation.m4a1.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:m4a1')"
camerashake add @s[tag=sneaking, tag=!foregrip] 0.02 0.2 rotational
camerashake add @s[tag=!sneaking, tag=!foregrip] 0.06 0.2 rotational
camerashake add @s[tag=sneaking, tag=foregrip] 0.01 0.1 rotational
camerashake add @s[tag=!sneaking, tag=foregrip] 0.02 0.1 rotational
scoreboard players remove @s[scores={m4a1=1..}, m=!c] m4a1 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire