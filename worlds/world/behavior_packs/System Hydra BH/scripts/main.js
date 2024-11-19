import { system, world, EntityEquippableComponent, EquipmentSlot, ItemStack} from "@minecraft/server";

function addEffect(p, effect, duration, level){
	try{
		return p.addEffect(effect, duration*2, {amplifier: level}) ?? 0;
	}
	catch(e){

	}
}

let armorType = ["helmet", "boots", "leggings", "chestplate"]
let itemsType = ["poison", "electric", "ice", "fire"]

system.runInterval(() =>{
	try{
		for(let p of world.getPlayers()){
			p.runCommandAsync("function armor_effects")
			let inv = p.getComponent("inventory").container;
			for(let slot = 0; slot < inv.size; slot++){
				let item = inv.getItem(slot);
				if(item){
					if(item.typeId.includes("new:")){
						let maxDurability = item.getComponent("durability").maxDurability;
						let lore = item.getLore()[0];
						if(!lore){
							for(let armor of armorType){
								if(item.typeId.includes(`electric_hydra_${armor}`)){
									item.setLore([`\n§7Durability: §7${maxDurability}`, `§7Wither Immune (full set)`])
									inv.setItem(slot, item)
								}
								if(item.typeId.includes(`fire_hydra_${armor}`)){
									item.setLore([`\n§7Durability: §7${maxDurability}`, `§7Fire Immune (full set)`])
									inv.setItem(slot, item)
								}
								if(item.typeId.includes(`ice_hydra_${armor}`)){
									item.setLore([`\n§7Durability: §7${maxDurability}`, `§7Slowness Immune (full set)`])
									inv.setItem(slot, item)
								}
								if(item.typeId.includes(`poison_hydra_${armor}`)){
									item.setLore([`\n§7Durability: §7${maxDurability}`, `§7Poison Immune (full set)`])
									inv.setItem(slot, item)
								}
							}
							for(let types of itemsType){
								if(item.typeId.includes(`${types}_hydra_pickaxe`)){
									item.setLore([`\n§7Durability: ${maxDurability}`])
									inv.setItem(slot, item)
								}
							}
							if(item.typeId.includes(`poison_hydra_sword1`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Poison Aspect I`])
								inv.setItem(slot, item)
							}

							if(item.typeId.includes(`poison_hydra_sword2`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Poison Aspect II`])
								inv.setItem(slot, item)
							}
							if(item.typeId.includes(`poison_hydra_sword3`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Poison Aspect III`])
								inv.setItem(slot, item)
							}

							if(item.typeId.includes(`electric_hydra_sword1`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Electric Aspect I`])
								inv.setItem(slot, item)
							}

							if(item.typeId.includes(`electric_hydra_sword2`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Electric Aspect II`])
								inv.setItem(slot, item)
							}
							if(item.typeId.includes(`electric_hydra_sword3`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Electric Aspect III`])
								inv.setItem(slot, item)
							}

							if(item.typeId.includes(`fire_hydra_sword1`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Fire Aspect I`])
								inv.setItem(slot, item)
							}

							if(item.typeId.includes(`fire_hydra_sword2`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Fire Aspect II`])
								inv.setItem(slot, item)
							}
							if(item.typeId.includes(`fire_hydra_sword3`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Fire Aspect III`])
								inv.setItem(slot, item)
							}


							if(item.typeId.includes(`ice_hydra_sword1`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Ice Aspect I`])
								inv.setItem(slot, item)
							}

							if(item.typeId.includes(`ice_hydra_sword2`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Ice Aspect II`])
								inv.setItem(slot, item)
							}
							if(item.typeId.includes(`ice_hydra_sword3`)){
								item.setLore([`\n§7Durability: ${maxDurability}`, `§7Ice Aspect III`])
								inv.setItem(slot, item)
							}
						}
					}
				}
				
				let equip = p.getComponent(EntityEquippableComponent.componentId);
				let hand = equip.getEquipment(EquipmentSlot.Mainhand);
				let offhand = equip.getEquipment(EquipmentSlot.Offhand);
				let head = equip?.getEquipment(EquipmentSlot.Head);
				let chest = equip?.getEquipment(EquipmentSlot.Chest);
				let legs = equip?.getEquipment(EquipmentSlot.Legs);
				let feet = equip?.getEquipment(EquipmentSlot.Feet);
				if(head){
					let maxDurability = head.getComponent("durability").maxDurability;
					let lore0 = head.getLore()[0];
					if(head.typeId.includes(`poison_hydra_helmet`)){
						if(!lore0){
							head.setLore([`\n§7Durability: ${maxDurability}`, `§7Poison Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Head, head)
						}
					}
					if(head.typeId.includes(`ice_hydra_helmet`)){
						if(!lore0){
							head.setLore([`\n§7Durability: §7${maxDurability}`, `§7Slowness Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Head, head)
						}
					}
					if(head.typeId.includes(`fire_hydra_helmet`)){
						if(!lore0){
							head.setLore([`\n§7Durability: §7${maxDurability}`, `§7Fire Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Head, head)
						}
					}
					if(head.typeId.includes(`electric_hydra_helmet`)){
						if(!lore0){
							head.setLore([`\n§7Durability: §7${maxDurability}`, `§7Wither Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Head, head)
						}
					}
				}
				if(chest){
					let maxDurability = chest.getComponent("durability").maxDurability;
					let lore0 = chest.getLore()[0];
					if(chest.typeId.includes(`poison_hydra_chestplate`)){
						if(!lore0){
							chest.setLore([`\n§7Durability: §7${maxDurability}`, `§7Poison Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Chest, chest)
						}
					}
					if(chest.typeId.includes(`ice_hydra_chestplate`)){
						if(!lore0){
							chest.setLore([`\n§7Durability: §7${maxDurability}`, `§7Slowness Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Chest, chest)
						}
					}
					if(chest.typeId.includes(`fire_hydra_chestplate`)){
						if(!lore0){
							chest.setLore([`\n§7Durability: §7${maxDurability}`, `§7Fire Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Chest, chest)
						}
					}
					if(chest.typeId.includes(`electric_hydra_chestplate`)){
						if(!lore0){
							chest.setLore([`\n§7Durability: §7${maxDurability}`, `§7Wither Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Chest, chest)
						}
					}
				}

				if(legs){
					let maxDurability = legs.getComponent("durability").maxDurability;
					let lore0 = legs.getLore()[0];
					if(legs.typeId.includes(`poison_hydra_leggings`)){
						if(!lore0){
							legs.setLore([`\n§7Durability: §7${maxDurability}`, `§7Poison Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Legs, legs)
						}
					}
					if(legs.typeId.includes(`ice_hydra_leggings`)){
						if(!lore0){
							legs.setLore([`\n§7Durability: §7${maxDurability}`, `§7Slowness Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Legs, legs)
						}
					}
					if(legs.typeId.includes(`fire_hydra_leggings`)){
						if(!lore0){
							legs.setLore([`\n§7Durability: §7${maxDurability}`, `§7Fire Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Legs, legs)
						}
					}
					if(legs.typeId.includes(`electric_hydra_leggings`)){
						if(!lore0){
							legs.setLore([`\n§7Durability: §7${maxDurability}`, `§7Wither Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Legs, legs)
						}
					}
				}
				if(feet){
					let maxDurability = feet.getComponent("durability").maxDurability;
					let lore0 = feet.getLore()[0];
					if(feet.typeId.includes(`poison_hydra_boots`)){
						if(!lore0){
							feet.setLore([`\n§7Durability: §7${maxDurability}`, `§7Poison Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Feet, feet)
						}
					}
					if(feet.typeId.includes(`ice_hydra_boots`)){
						if(!lore0){
							feet.setLore([`\n§7Durability: §7${maxDurability}`, `§7Slowness Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Feet, feet)
						}
					}
					if(feet.typeId.includes(`fire_hydra_boots`)){
						if(!lore0){
							feet.setLore([`\n§7Durability: §7${maxDurability}`, `§7Fire Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Feet, feet)
						}
					}
					if(feet.typeId.includes(`electric_hydra_boots`)){
						if(!lore0){
							feet.setLore([`\n§7Durability: §7${maxDurability}`, `§7Wither Immune (full set)`])
							equip.setEquipment(EquipmentSlot.Feet, feet)
						}
					}
				}
			}
		}
	}catch(e){

	};
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
				if(hand.typeId == "new:poison_hydra_sword1"){
					addEffect(eHurt, "poison", 40, 2)
				}
				if(hand.typeId == "new:poison_hydra_sword2"){
					addEffect(eHurt, "poison", 60, 3)
				}
				if(hand.typeId == "new:poison_hydra_sword3"){
					addEffect(eHurt, "poison", 80, 4)
				}



				if(hand.typeId == "new:electric_hydra_sword1"){
					addEffect(eHurt, "wither", 40, 2)
				}
				if(hand.typeId == "new:electric_hydra_sword2"){
					addEffect(eHurt, "wither", 60, 3)
				}
				if(hand.typeId == "new:electric_hydra_sword3"){
					addEffect(eHurt, "wither", 80, 4)
				}


				if(hand.typeId == "new:ice_hydra_sword1"){
					addEffect(eHurt, "slowness", 40, 2)
				}
				if(hand.typeId == "new:ice_hydra_sword2"){
					addEffect(eHurt, "slowness", 60, 3)
				}
				if(hand.typeId == "new:ice_hydra_sword3"){
					addEffect(eHurt, "slowness", 80, 4)
				}


				if(hand.typeId == "new:fire_hydra_sword1"){
					eHurt.setOnFire(5, true)
				}
				if(hand.typeId == "new:fire_hydra_sword2"){
					eHurt.setOnFire(10, true)
				}
				if(hand.typeId == "new:fire_hydra_sword3"){
					eHurt.setOnFire(15, true)
				}
			}
		}
	}catch(e){

	};
})