execute if score @s m249 matches 5.. as @s[tag=!underground] run playsound gun.m249.fire.belt @a[r=200] ~~~ 100 1 0.01
execute if score @s m249 matches 5.. as @s[tag=underground] run playsound gun.m249.fire.belt.reverb @a[r=200] ~~~ 100 1 0.01
execute if score @s m249 matches ..4 as @s[tag=!underground] run playsound gun.m249.fire @a[r=200] ~~~ 100 1 0.01
execute if score @s m249 matches ..4 as @s[tag=underground] run playsound gun.m249.fire.reverb @a[r=200] ~~~ 100 1 0.01
playanimation @s animation.m249.fire fire 0 "!q.is_item_name_any('slot.weapon.mainhand', 0, 'gabrielaplok:m249')"
camerashake add @s[tag=sneaking] 0.02 0.2 rotational
camerashake add @s[tag=!sneaking] 0.06 0.2 rotational
scoreboard players remove @s[scores={m249=1..}, m=!c] m249 1
function effect/muzzle_flash
event entity @s gabrielaplok:fire