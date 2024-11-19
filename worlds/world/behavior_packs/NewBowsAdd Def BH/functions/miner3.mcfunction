execute as @s if block ~~~1 deny -1 run tag @s add tag1
execute as @s if block ~~~-1 deny -1 run tag @s add tag2
execute as @s if block ~-1~~ deny -1 run tag @s add tag3
execute as @s if block ~1~~ deny -1 run tag @s add tag4
execute as @s if block ~1~~1 deny -1 run tag @s add tag5
execute as @s if block ~1~~-1 deny -1 run tag @s add tag6
execute as @s if block ~-1~~1 deny -1 run tag @s add tag7
execute as @s if block ~-1~~-1 deny -1 run tag @s add tag8

execute as @s if block ~~~1 border_block -1 run tag @s add tag1
execute as @s if block ~~~-1 border_block -1 run tag @s add tag2
execute as @s if block ~-1~~ border_block -1 run tag @s add tag3
execute as @s if block ~1~~ border_block -1 run tag @s add tag4
execute as @s if block ~1~~1 border_block -1 run tag @s add tag5
execute as @s if block ~1~~-1 border_block -1 run tag @s add tag6
execute as @s if block ~-1~~1 border_block -1 run tag @s add tag7
execute as @s if block ~-1~~-1 border_block -1 run tag @s add tag8

execute as @s if block ~~~1 bedrock 0 run tag @s add tag1
execute as @s if block ~~~-1 bedrock 0 run tag @s add tag2
execute as @s if block ~-1~~ bedrock 0 run tag @s add tag3
execute as @s if block ~1~~ bedrock 0 run tag @s add tag4
execute as @s if block ~1~~1  bedrock 0 run tag @s add tag5
execute as @s if block ~1~~-1  bedrock 0 run tag @s add tag6
execute as @s if block ~-1~~1 bedrock 0 run tag @s add tag7
execute as @s if block ~-1~~-1 bedrock 0 run tag @s add tag8


execute as @s[tag=!tag4] run setblock ~1~~ air -1 destroy
execute as @s[tag=!tag1] run setblock ~~~1 air -1 destroy
execute as @s[tag=!tag2] run setblock ~~~-1 air -1 destroy
execute as @s[tag=!tag3] run setblock ~-1~~ air -1 destroy
execute as @s[tag=!tag5] run setblock ~1~~1 air -1 destroy
execute as @s[tag=!tag7] run setblock ~-1~~1 air -1 destroy
execute as @s[tag=!tag6] run setblock ~1~~-1 air -1 destroy
execute as @s[tag=!tag8] run setblock ~-1~~-1 air -1 destroy