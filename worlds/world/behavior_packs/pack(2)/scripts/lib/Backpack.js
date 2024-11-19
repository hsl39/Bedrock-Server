import { ItemStack } from '@minecraft/server';
export class Backpack {
    item;
    entity;
    constructor(item, entity) {
        this.item = item;
        this.entity = entity;
    }
    get inventory() {
        return this.entity.inventory.container;
    }
    isSame(item) {
        return this.item.getDynamicProperty('true:id') === item.getDynamicProperty('true:id');
    }
    static hasData(item) {
        return !!item.getDynamicProperty('true:storage');
    }
    loadInventory() {
        const inv = this.inventory;
        const items = this.getData();
        for (const { typeId, amount, nameTag, lore, canDestroy, canPlaceOn, damage, enchanments, dynamicProperties, slot } of items) {
            const item = new ItemStack(typeId, amount);
            item.nameTag = nameTag;
            item.setLore(lore);
            item.setCanDestroy(canDestroy);
            item.setCanPlaceOn(canPlaceOn);
            if (damage)
                item.getComponent('durability').damage = damage;
            if (enchanments)
                item.getComponent('enchantable')?.addEnchantments(enchanments);
            dynamicProperties.forEach(({ id, value }) => item.setDynamicProperty(id, value));
            inv.setItem(slot, item);
        }
    }
    saveInventory() {
        const inv = this.inventory;
        const items = [];
        for (let i = 0; i < inv.size; i++) {
            const item = inv.getItem(i);
            if (!item || item.typeId.includes('heavy:multi_backpack'))
                continue;
            items.push({
                slot: i,
                typeId: item.typeId,
                amount: item.amount,
                lore: item.getLore(),
                nameTag: item.nameTag,
                keepOnDeath: item.keepOnDeath,
                canDestroy: item.getCanDestroy(),
                canPlaceOn: item.getCanDestroy(),
                damage: item.getComponent('durability')?.damage,
                enchanments: item.getComponent('enchantable')?.getEnchantments(),
                dynamicProperties: item.getDynamicPropertyIds().map(id => ({ id, value: item.getDynamicProperty(id) })),
            });
        }
        this.item.setDynamicProperty('true:storage', JSON.stringify(items));
        if (!this.item.getDynamicProperty('true:id'))
            this.item.setDynamicProperty('true:id', Date.now());
        return this.item;
    }
    getData() {
        return JSON.parse(this.item.getDynamicProperty('true:storage'));
    }
}
// class Backpack__ {
// 	item: ItemStack
// 	entity: Entity;
// 	inventory: SlotData[];
// 	constructor(backpackItem: ItemStack, backpackEntity: Entity) {
// 		this.item = backpackItem;
// 		this.entity = backpackEntity;
// 		this.inventory = this._serializeItems();
// 		// else this.inventory = getItemsWithFilter(backpackEntity);
// 	}
// 	// static fromItem(itemStack: ItemStack, entity: Entity) {
// 	// 	return new Backpack(itemStack, entity);
// 	// }
// 	static hasData(itemStack: ItemStack): boolean {
// 		return !!itemStack.getDynamicProperty('true:storage');
// 	}
// 	isSame(itemStack: ItemStack): boolean {
// 		return this.item.getDynamicProperty('true:id') === itemStack?.getDynamicProperty('true:id');
// 	}
// 	saveInventoryData() {
// 		const inventory = this._stringifyItems();
// 		this.item.setDynamicProperty('true:storage', inventory);
// 		this.item.setDynamicProperty('true:id', this.entity.id);
// 		return this.item;
// 	}
// 	updateInventory() {
// 		if (!this.entity?.isValid()) return;
// 		this.inventory = getItemsWithFilter(this.entity);
// 	}
// 	getInventoryData(): ItemDB[] {
// 		try {
// 			return JSON.parse(this.item.getDynamicProperty('true:storage') as string ?? '[]');
// 		} catch (e) {
// 			console.warn(e);
// 			return [];
// 		}
// 	}
// 	fillInventory(entity: Entity) {
// 		if (!this.inventory) return;
// 		const inventory = entity.inventory?.container;
// 		if (!inventory) return;
// 		this._serializeItems().map(({ slot, item }) => inventory.setItem(slot, item));
// 	}
// 	_serializeItems() {
// 		const itemStacks = [];
// 		for (const { slot, typeId, amount, damage, nameTag, enchanments, dynamicProperties } of this.getInventoryData()) {
// 			if (typeId.includes('heavy:multi_backpack')) continue;
// 			const item = new ItemStack(typeId, amount);
// 			item.nameTag = nameTag;
// 			const durability = item.getComponent('durability');
// 			const enchantable = item.getComponent('enchantable');
// 			if (durability) durability.damage = damage;
// 			enchantable?.addEnchantments(enchanments);
// 			this._applyDynamicProperties(item, dynamicProperties);
// 			if (durability) durability.damage = damage;
// 			enchantable?.addEnchantments(enchanments);
// 			itemStacks.push({ slot, item });
// 		}
// 		return itemStacks;
// 	}
// 	updateBackpackItem(itemStack: ItemStack) {
// 		return this.item = itemStack;
// 	}
// 	_stringifyItems(): string {
// 		return JSON.stringify(this.inventory.map(({ slot, item }: SlotData) => {
// 			if (!(item instanceof ItemStack)) return item;
// 			const durability = item.getComponent('durability');
// 			const enchanments = item.getComponent('enchantable')?.getEnchantments() ?? [];
// 			return {
// 				slot,
// 				enchanments: enchanments,
// 				damage: durability?.damage,
// 				typeId: item.typeId,
// 				amount: item.amount,
// 				nameTag: item.nameTag,
// 				dynamicProperties: this._serializeDynamicProperties(item),
// 			} as ItemDB;
// 		}));
// 	}
// 	_serializeDynamicProperties(item: ItemStack) {
// 		const ids = item.getDynamicPropertyIds();
// 		return ids.map((id) => ({
// 			id,
// 			value: item.getDynamicProperty(id),
// 		}));
// 	}
// 	_applyDynamicProperties(item: ItemStack, serializedProperties: ItemDB['dynamicProperties']) {
// 		for (const dynamicProperty of serializedProperties) {
// 			const { id, value } = dynamicProperty;
// 			item.setDynamicProperty(id, value);
// 		}
// 	}
// }
export default Backpack;
