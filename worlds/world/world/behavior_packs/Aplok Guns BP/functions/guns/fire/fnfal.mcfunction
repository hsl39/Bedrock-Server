execute as @s[tag=!underground, tag=!silencer] run playsound gun.fnfal.fire @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=!silencer] run playsound gun.fnfal.fire.reverb @a[r=200] ~~~ 100 1 0.01
execute as @s[tag=!underground, tag=silencer] run playsound gun.fnfal.fire_silenced @a[r=40] ~~~ 100 1 0.01
execute as @s[tag=underground, tag=silencer] run playsound gun.fnfal.fire_silenced.reverb @a[r=40] ~~~ 100 1 0.01
playanimation @s[tag=silencer] animation.fnfal.fire.silenced fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:fnfal')"
playanimation @s[tag=!silencer] animation.fnfal.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:fnfal')"
camerashake add @s[tag=sneaking] 0.02 0.2 rotational
camerashake add @s[tag=!sneaking] 0.06 0.2 rotational
scoreboard players remove @s[scores={fnfal=1..}, m=!c] fnfal 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire