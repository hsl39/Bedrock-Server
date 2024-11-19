execute as @s[tag=!underground, tag=!silencer] run playsound gun.awp.fire @a[r=400] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=!silencer] run playsound gun.awp.fire.reverb @a[r=400] ~~~ 100 1 0.01
execute as @s[tag=!underground, tag=silencer] run playsound gun.awp.fire_silenced @a[r=50] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=silencer] run playsound gun.awp.fire_silenced.reverb @a[r=50] ~~~ 100 1 0.01
playanimation @s[tag=silencer] animation.awp.fire.silenced fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:awp')"
playanimation @s[tag=!silencer] animation.awp.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:awp')"
camerashake add @s[tag=sneaking] 0.06 0.2 rotational
camerashake add @s[tag=!sneaking] 0.1 0.2 rotational
scoreboard players remove @s[scores={awp=1..}, m=!c] awp 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire