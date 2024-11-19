import { world } from "@minecraft/server";
import { Oxidise } from "./modules/Oxidize";
import { Combat } from "../../modules/Combat";
import "./modules/Deoxidize";
/**
 * Start oxidization process
 */
Oxidise();
world.afterEvents.entityHurt.subscribe(Combat);
