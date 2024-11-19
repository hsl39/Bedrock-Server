function player/score
playsound random.pop @a[r=40] ~~~ 1 1 0.01
gamerule recipesunlock false
gamerule sendcommandfeedback false
scoreboard players set @s ak12 30
scoreboard players set @s ak47 30
scoreboard players set @s awp 10
scoreboard players set @s deagle 10
scoreboard players set @s fnfal 20
scoreboard players set @s glock17 17
scoreboard players set @s glock18 17
scoreboard players set @s m249 200
scoreboard players set @s m4a1 30
scoreboard players set @s mossberg 6
scoreboard players set @s mp5a5 30
scoreboard players set @s deaths 0
scoreboard players set @s kills 0
tellraw @s {"rawtext":[{"text":"⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_1"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_2"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_3"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_4"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_5"}]}
tellraw @s {"rawtext":[{"text":"⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"}]}
event entity @s gabrielaplok:remove_recline
tag @s remove underground
tag @s remove sneaking
tag @s remove e26e3e3cd89141f98767aa164b61d0ec
tag @s remove cc8d3071e18f412e81846071b93c9774
tag @s remove c156f063ad4049c68856d7d653e2ce45
tag @s remove e32e54b6b52c4108b2d561e3f12d5919
tag @s add d26055f5212646949c264302765ac197
gamerule sendcommandfeedback true