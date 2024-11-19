

execute @a[hasitem={item=mc_ark:gas_mask, location=slot.armor.head}] ~ ~ ~ effect @s blindness 0 8 true
execute @a[hasitem={item=mc_ark:gas_mask, location=slot.armor.head}] ~ ~ ~ effect @s darkness 0 8 true
execute @a[hasitem={item=mc_ark:gas_mask, location=slot.armor.head}] ~ ~ ~ effect @s poison 0 1 true
execute @a[hasitem={item=mc_ark:gas_mask, location=slot.armor.head}] ~ ~ ~ effect @s slowness 0 1 true

execute @a[hasitem={item=mc_ark:ghillie_helmet, location=slot.armor.head}] ~ ~ ~ tag @s add ghillie_1
execute @a[tag=ghillie_1] ~~~ execute @a[hasitem={item=mc_ark:ghillie_helmet, location=slot.armor.head,quantity=0}] ~ ~ ~ tag @s remove ghillie_1

execute @a[hasitem={item=mc_ark:ghillie_chestplate, location=slot.armor.chest}] ~ ~ ~ tag @s add ghillie_2
execute @a[tag=ghillie_2] ~~~ execute @a[hasitem={item=mc_ark:ghillie_chestplate, location=slot.armor.chest,quantity=0}] ~ ~ ~ tag @s remove ghillie_2

execute @a[hasitem={item=mc_ark:ghillie_leggings, location=slot.armor.legs}] ~ ~ ~ tag @s add ghillie_3
execute @a[tag=ghillie_3] ~~~ execute @a[hasitem={item=mc_ark:ghillie_leggings, location=slot.armor.legs,quantity=0}] ~ ~ ~ tag @s remove ghillie_3 
 
execute @a[hasitem={item=mc_ark:ghillie_boots, location=slot.armor.feet}] ~ ~ ~ tag @s add ghillie_4
execute @a[tag=ghillie_4] ~~~ execute @a[hasitem={item=mc_ark:ghillie_boots, location=slot.armor.feet,quantity=0}] ~ ~ ~ tag @s remove ghillie_4

execute @a[tag=ghillie_1] ~~~ execute @s[tag=ghillie_2] ~~~ execute @s[tag=ghillie_3] ~~~ execute @s[tag=ghillie_4] ~~~ tag @s add camuflaje_armor_efecto
execute @a[tag=ghillie_1] ~~~ execute @s[tag=ghillie_2] ~~~ execute @s[tag=ghillie_3] ~~~ execute @s[tag=ghillie_4] ~~~ effect @s speed 5 0 true

execute @a[tag=ghillie_1] ~~~ execute @s[tag=ghillie_2] ~~~ execute @s[tag=ghillie_3] ~~~ execute @s[tag=!ghillie_4] ~~~ tag @s remove camuflaje_armor_efecto
execute @a[tag=ghillie_1] ~~~ execute @s[tag=ghillie_2] ~~~ execute @s[tag=!ghillie_3] ~~~ tag @s remove camuflaje_armor_efecto
execute @a[tag=ghillie_1] ~~~ execute @s[tag=!ghillie_2] ~~~ tag @s remove camuflaje_armor_efecto
execute @a[tag=!ghillie_1] ~~~ tag @s remove camuflaje_armor_efecto 


execute @a[lm=1] ~~~ scoreboard players set @s lvl 1
execute @a[lm=2] ~~~ scoreboard players set @s lvl 2
execute @a[lm=3] ~~~ scoreboard players set @s lvl 3
execute @a[lm=4] ~~~ scoreboard players set @s lvl 4
execute @a[lm=5] ~~~ scoreboard players set @s lvl 5
execute @a[lm=6] ~~~ scoreboard players set @s lvl 6
execute @a[lm=7] ~~~ scoreboard players set @s lvl 7
execute @a[lm=8] ~~~ scoreboard players set @s lvl 8
execute @a[lm=9] ~~~ scoreboard players set @s lvl 9
execute @a[lm=10] ~~~ scoreboard players set @s lvl 10
execute @a[lm=11] ~~~ scoreboard players set @s lvl 11
execute @a[lm=12] ~~~ scoreboard players set @s lvl 12
execute @a[lm=13] ~~~ scoreboard players set @s lvl 13
execute @a[lm=14] ~~~ scoreboard players set @s lvl 14
execute @a[lm=15] ~~~ scoreboard players set @s lvl 15
execute @a[lm=16] ~~~ scoreboard players set @s lvl 16
execute @a[lm=17] ~~~ scoreboard players set @s lvl 17
execute @a[lm=18] ~~~ scoreboard players set @s lvl 18
execute @a[lm=19] ~~~ scoreboard players set @s lvl 19
execute @a[lm=20] ~~~ scoreboard players set @s lvl 20
execute @a[lm=21] ~~~ scoreboard players set @s lvl 21
execute @a[lm=22] ~~~ scoreboard players set @s lvl 22
execute @a[lm=23] ~~~ scoreboard players set @s lvl 23
execute @a[lm=24] ~~~ scoreboard players set @s lvl 24
execute @a[lm=25] ~~~ scoreboard players set @s lvl 25
execute @a[lm=26] ~~~ scoreboard players set @s lvl 26
execute @a[lm=27] ~~~ scoreboard players set @s lvl 27
execute @a[lm=28] ~~~ scoreboard players set @s lvl 28
execute @a[lm=29] ~~~ scoreboard players set @s lvl 29
execute @a[lm=30] ~~~ scoreboard players set @s lvl 30
execute @a[lm=31] ~~~ scoreboard players set @s lvl 31
execute @a[lm=32] ~~~ scoreboard players set @s lvl 32
execute @a[lm=33] ~~~ scoreboard players set @s lvl 33
execute @a[lm=34] ~~~ scoreboard players set @s lvl 34
execute @a[lm=35] ~~~ scoreboard players set @s lvl 35
execute @a[lm=36] ~~~ scoreboard players set @s lvl 36
execute @a[lm=37] ~~~ scoreboard players set @s lvl 37
execute @a[lm=38] ~~~ scoreboard players set @s lvl 38
execute @a[lm=39] ~~~ scoreboard players set @s lvl 39
execute @a[lm=40] ~~~ scoreboard players set @s lvl 40
execute @a[lm=41] ~~~ scoreboard players set @s lvl 41
execute @a[lm=42] ~~~ scoreboard players set @s lvl 42
execute @a[lm=43] ~~~ scoreboard players set @s lvl 43
execute @a[lm=44] ~~~ scoreboard players set @s lvl 44
execute @a[lm=45] ~~~ scoreboard players set @s lvl 45
execute @a[lm=46] ~~~ scoreboard players set @s lvl 46
execute @a[lm=47] ~~~ scoreboard players set @s lvl 47
execute @a[lm=48] ~~~ scoreboard players set @s lvl 48
execute @a[lm=49] ~~~ scoreboard players set @s lvl 49
execute @a[lm=50] ~~~ scoreboard players set @s lvl 50 



 

# scoreboards
scoreboard objectives add lvl dummy §l§0Mc-Ark
scoreboard objectives setdisplay list lvl
scoreboard players add @a[scores={lvl=0}] lvl 1
scoreboard objectives add mark dummy
scoreboard players add @a mark 1
execute @a[scores={mark=100}] ~~~ playsound sound.spawn_mc_ark @s
execute @a[scores={mark=100}] ~~~ title @s title §l§2Mc-Ark
execute @a[scores={mark=101}] ~~~ title @s subtitle §6By @Leonard98617179 and @Alexvr587 


scoreboard objectives add mc_ark_time dummy
scoreboard players add @a[tag=mostrarpuntos_r] mc_ark_time 1
execute @a[scores={mc_ark_time=501}, tag=mostrarpuntos_r] ~~~ execute @s[tag=!in_attack] ~~~ title @s clear
execute @a[scores={mc_ark_time=501}, tag=mostrarpuntos_r] ~~~ execute @s[tag=!in_attack] ~~~ tag @s remove mostrarpuntos_r
execute @a[scores={mc_ark_time=505}] ~~~ scoreboard players set @s mc_ark_time 1


  

effect @a[scores={lvl=20..100}] haste 2 0 true
effect @a[scores={lvl=25..100}] speed 2 0 true
effect @a[scores={lvl=30..100}] strength 2 0 true
effect @a[scores={lvl=35..100}] health_boost 2 0 true
effect @a[scores={lvl=35..100}] jump_boost 2 0 true
effect @a[scores={lvl=40..100}] resistance 2 0 true
effect @a[scores={lvl=50}] regeneration 2 0 true



  

tag @e[type=xp_orb] add z
execute @e[type=xp_orb,tag=!z] ~~~ playsound random.levelup @p

execute @a[tag=!a,scores={lvl=5}] ~~~ playsound sound.level_up_mc_ark @a[r=10]
execute @a[tag=!b,scores={lvl=10}] ~~~ playsound sound.level_up_mc_ark @a[r=10]
execute @a[tag=!c,scores={lvl=20}] ~~~ playsound sound.level_up_mc_ark @a[r=10]
execute @a[tag=!d,scores={lvl=30}] ~~~ playsound sound.level_up_mc_ark @a[r=10]
execute @a[tag=!e,scores={lvl=40}] ~~~ playsound sound.level_up_mc_ark @a[r=10]
execute @a[tag=!f,scores={lvl=50}] ~~~ playsound sound.level_up_mc_ark @a[r=10]


execute @a[tag=!a,scores={lvl=5}] ~~~ particle minecraft:totem_particle ~~~
execute @a[tag=!b,scores={lvl=10}] ~~~ particle minecraft:totem_particle ~~~
execute @a[tag=!c,scores={lvl=20}] ~~~ particle minecraft:totem_particle ~~~
execute @a[tag=!d,scores={lvl=30}] ~~~ particle minecraft:totem_particle ~~~
execute @a[tag=!e,scores={lvl=40}] ~~~ particle minecraft:totem_particle ~~~
execute @a[tag=!f,scores={lvl=50}] ~~~ particle minecraft:totem_particle ~~~


execute @a[tag=!a,scores={lvl=5}] ~~~ playsound random.levelup @a
execute @a[tag=!b,scores={lvl=10}] ~~~ playsound random.levelup @a
execute @a[tag=!c,scores={lvl=20}] ~~~ playsound random.levelup @a
execute @a[tag=!d,scores={lvl=30}] ~~~ playsound random.levelup @a
execute @a[tag=!e,scores={lvl=40}] ~~~ playsound random.levelup @a
execute @a[tag=!f,scores={lvl=50}] ~~~ playsound random.levelup @a

execute @a[scores={lvl=5}] ~~~ tag @s add a
execute @a[scores={lvl=10}] ~~~ tag @s add b
execute @a[scores={lvl=20}] ~~~ tag @s add c
execute @a[scores={lvl=30}] ~~~ tag @s add d
execute @a[scores={lvl=40}] ~~~ tag @s add e
execute @a[scores={lvl=50}] ~~~ tag @s add f

# dead
scoreboard players set @a[l=0,lm=0] power 0
xp 1L @a[l=0,lm=0]