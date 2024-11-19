import { system, world, EntityEquippableComponent, EquipmentSlot, ItemStack} from "@minecraft/server";

world.beforeEvents.itemUseOn.subscribe(use =>{
	try{
		let p = use.source;
		let item = use.itemStack;
		let block = use.block;
		let l = [block.location.x, block.location.y, block.location.z]
		let damage = item.getComponent("durability").damage;
		let maxDurability = item.getComponent("durability").maxDurability;
		if(item.typeId == "new:wyvern_bone_hoe"){
			if(block.typeId.includes("grass") || block.typeId.includes("dirt")){
				p.runCommandAsync(`fill ${l[0]} ${l[1]} ${l[2]} ${l[0]} ${l[1]} ${l[2]} farmland`)
			}
		}
		if(item.typeId == "new:wyvern_bone_shovel"){
			if(block.typeId.includes("grass") || block.typeId.includes("dirt")){
				p.runCommandAsync(`fill ${l[0]} ${l[1]} ${l[2]} ${l[0]} ${l[1]} ${l[2]} grass_path`)
			}
		}
		let axe = ["acacia", "oak", "spruce", "jungle", "dark_oak", "birch", "mangrove", "cherry"]
		for(let ids of axe){
			if(item.typeId == "new:wyvern_bone_axe"){
				if(block.typeId.includes(`${ids}_log`)){
					p.runCommandAsync(`fill ${l[0]} ${l[1]} ${l[2]} ${l[0]} ${l[1]} ${l[2]} stripped_${ids}_log [] replace ${ids}_log`)
				}
			}
		}

	}catch(e){
	}
});

export function getScore(player, objective) {
	return world.scoreboard.getObjective(objective).getScore(player) ?? 0;
}
export function setScore(player, objective, score) {
	return world.scoreboard.getObjective(objective).setScore(player, score) ?? 0;
}
export function addScore(player, objective, score) {
	return world.scoreboard.getObjective(objective).addScore(player, score) ?? 0;
}

let w = world.getDimension("overworld");

world.afterEvents.entitySpawn.subscribe(use =>{
	let e = use.entity;
	if(e.typeId.includes("_wyvern_egg")){
		let nameTag = e.typeId.replace("_wyvern_egg", "")
		e.runCommandAsync("scoreboard objectives add egg_time dummy")
		e.runCommandAsync("scoreboard players set @s egg_time 20")
		e.addTag(`${nameTag}`)
		
	}
});

let wyverns_type = ["fire", "ice", "ground", "poison", "wither", "ender"]
system.runInterval(() =>{
	try{
		for(let p of world.getPlayers()){
			p.runCommandAsync("gamerule commandblockoutput false")
			if(p.hasTag("mount") && p.isJumping){
				p.runCommandAsync("effect @e[family=wyvern_tamed,r=4] levitation 1 5 true")
				p.runCommandAsync("event entity @e[family=wyvern_tamed,r=4] new:wyvern_can_fly")
				p.runCommandAsync("camera @s set minecraft:third_person")
			}
			if(!p.hasTag("mount")){
				p.runCommandAsync("event entity @e[family=wyvern_tamed,r=4] new:wyvern_not_can_fly")
				p.runCommandAsync("camera @s clear")
			}

			for(let types of wyverns_type){
				let wyverns_egg = w.getEntities({type: `new:${types}_wyvern_egg`})
				for(let we of wyverns_egg){
					let egg_time = getScore(we, "egg_time");
					if(!we.hasTag("shaked")){
						if(egg_time == 10){
							we.runCommandAsync("event entity @s[tag=!shaked] new:egg_shaked")
							we.runCommandAsync("tag @s[tag=!shaked] add shaked")
						}
					}
					if(we.hasTag("shaked")){
						if(egg_time == 0){
							we.runCommandAsync("event entity @s[tag=shaked] new:egg_transform")
						}
					}
					let view = p.getEntitiesFromViewDirection({maxDistance: 7});
					view.forEach((look) => {
						let eggTag;
						let firstWord;
						let eggName;
						if(look.entity.typeId == we.typeId){
							look.entity.getTags().forEach(t => {
								if (t.startsWith('new:')) {
									eggTag = `${t.replace("new:", "").split(",")}`
									firstWord = t[4].toUpperCase();
									eggName = `${firstWord}`+`${eggTag.replace(`${t[4]}`, "")}`
									p.runCommandAsync(`title @s actionbar §7--${eggName} Wyvern Egg--\n§6Hatching Time: §b${getScore(look.entity, "egg_time")} min`);
								}
							}); 
						}
					});
				}
			}
		}
	}catch(e){

	};
})


system.runInterval(()=>{			
	for(let types of wyverns_type){
		let wyverns_egg = w.getEntities({type: `new:${types}_wyvern_egg`})
		for(let we of wyverns_egg){
			let egg_time = getScore(we, "egg_time");
			if(egg_time > 0){
				we.runCommandAsync(`scoreboard players remove @s egg_time 1`)
			}
		}
	}
}, 1200)

function addEffect(p, effect, duration, level, particles){
	try{
		return p.addEffect(effect, duration*2, {amplifier: level, showParticles: particles}) ?? 0;
	}catch(e){

	}
}


world.afterEvents.itemUse.subscribe(use =>{
	try{
		let itemStack = use.itemStack;
		let p = use.source;
		let damage = itemStack.getComponent("durability").damage;
		let maxDurability = itemStack.getComponent("durability").maxDurability;
		if(itemStack.typeId.includes("ender_wyvern_wand") && !p.hasTag("cooldown")){
			let arrow = p.dimension.spawnEntity(`new:ender_wyvern_wand`, p.getHeadLocation());
			let projectile = arrow.getComponent('projectile');
			projectile.owner = p;
			projectile.shoot({x: p.getViewDirection().x*3, y: p.getViewDirection().y*3, z: p.getViewDirection().z*3});
			p.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${itemStack} 1 ${damage+2}`)
			p.runCommandAsync("playsound mob.wither.shoot @s")
			p.addTag("cooldown")
			if(damage >= maxDurability){
				p.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 air`)
				p.runCommandAsync("playsound random.item_break @s ~~~")
			}
			system.runTimeout(()=>{
				p.removeTag("cooldown")
			}, 60)
		}
	}catch(e){}
})

world.afterEvents.itemCompleteUse.subscribe(use =>{
	try{
		let p = use.source;
		let item = use.itemStack;
		if(item.typeId == "new:fire_essence"){
			addEffect(p, "fire_resistance", 1800, 4, false)
		}
	}catch(e){

	}
})

world.afterEvents.entityHurt.subscribe(hurt =>{
	try{
		let eHurt = hurt.hurtEntity;
		let damageSource = hurt.damageSource;
		let damage = hurt.damage;
		let cause = damageSource.cause;
		let damaging = damageSource.damagingEntity;
		if(damaging.typeId == "minecraft:player"){
			let equip = damaging.getComponent(EntityEquippableComponent.componentId);
			let hand = equip.getEquipment(EquipmentSlot.Mainhand);
			if(hand){
				if(hand.typeId == "new:poison_wyvern_dagger"){
					addEffect(eHurt, "poison", 40, 2, true)
				}
				if(hand.typeId == "new:ice_wyvern_dagger"){
					addEffect(eHurt, "slowness", 40, 2, true)
				}
				if(hand.typeId == "new:wither_wyvern_dagger"){
					addEffect(eHurt, "wither", 40, 2, true)
				}
			}
		}
	}catch(e){

	};
})