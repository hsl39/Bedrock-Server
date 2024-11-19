execute as @s[tag=!recline_left] anchored eyes unless block ^0.5^^0.8 air run event entity @s gabrielaplok:add_recline_left
execute as @s[tag=recline_left] anchored eyes if block ^0.5^^0.8 air run event entity @s gabrielaplok:remove_recline
execute as @s[tag=!recline_left] anchored eyes unless block ^0.5^^0.8 air run tag @s add recline_left
execute as @s[tag=recline_left] anchored eyes if block ^0.5^^0.8 air run tag @s remove recline_left
execute as @s[tag=!recline_right] anchored eyes unless block ^-0.5^^0.8 air run event entity @s gabrielaplok:add_recline_right
execute as @s[tag=recline_right] anchored eyes if block ^-0.5^^0.8 air run event entity @s gabrielaplok:remove_recline
execute as @s[tag=!recline_right] anchored eyes unless block ^-0.5^^0.8 air run tag @s add recline_right
execute as @s[tag=recline_right] anchored eyes if block ^-0.5^^0.8 air run tag @s remove recline_right