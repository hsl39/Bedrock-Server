import { blockBackpacks, getItemsWithFilter, unblockBackpacks } from './lib/functions';
import { world, EquipmentSlot, ItemLockMode, system } from '@minecraft/server';
import { beforeEvents } from './lib/utils';
import Backpack from './lib/Backpack';
const Backpacks = new Map();
async function Interval() {
    const players = world.getPlayers();
    for (const player of players) {
        if (!player.isValid())
            continue;
        const spawned = player.dimension.getEntities({ tags: [`backpack:${player.id}`] })[0];
        try {
            if (spawned && player.dimension.getBlock(player.location)?.typeId.includes('portal')) {
                spawned.remove();
                continue;
            }
            const equippable = player.equippable;
            const hand = equippable.getEquipment(EquipmentSlot.Mainhand);
            const invBackpacks = getItemsWithFilter(player, (i) => i.typeId.includes('heavy:multi_backpack'));
            if (!hand?.typeId.includes('heavy:multi_backpack')) {
                for (const data of invBackpacks) {
                    unblockBackpacks(player, data);
                }
                Backpacks.delete(player.id);
                spawned?.remove();
                continue;
            }
            const head = player.getHeadLocation();
            let BPContainer = spawned ?? setupContainer(player, hand.nameTag);
            hand.lockMode = ItemLockMode.slot;
            BPContainer.teleport(head, { dimension: player.dimension });
            let backpack = Backpacks.get(player.id);
            if (!backpack) {
                backpack = new Backpack(hand, BPContainer);
                if (Backpack.hasData(hand))
                    backpack.loadInventory();
            }
            if (!backpack.isSame(hand)) {
                backpack.item = hand;
                BPContainer.remove();
                BPContainer = setupContainer(player, hand.nameTag);
                backpack = new Backpack(hand, BPContainer);
                if (Backpack.hasData(hand))
                    backpack.loadInventory();
            }
            equippable.setEquipment(EquipmentSlot.Mainhand, backpack.saveInventory());
            Backpacks.set(player.id, backpack);
            for (const data of invBackpacks) {
                blockBackpacks(player, data);
            }
        }
        catch (e) {
            Backpacks.delete(player.id);
            spawned?.remove();
            continue;
        }
    }
    system.run(Interval);
}
Interval();
beforeEvents.playerLeave.subscribe(({ player }) => {
    const spawned = player.dimension.getEntities({ tags: [`backpack:${player.id}`] });
    system.run(() => {
        for (const s of spawned)
            s.remove();
    });
});
function setupContainer(player, name) {
    const BPContainer = player.dimension.spawnEntity('multi_backpack:backpack_container', player.getHeadLocation());
    BPContainer.addTag(`backpack:${player.id}`);
    BPContainer.nameTag = name ?? 'Backpack';
    return BPContainer;
}
