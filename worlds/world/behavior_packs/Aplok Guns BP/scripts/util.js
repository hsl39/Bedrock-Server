/**
 * Hello, u're looking to steal my code, good luck!
 * If I were you I would at least ask permission before that,
 * I would be happy instead of you stealing my code and having to take drastic measures.
 * Well, thank you, Gabriel Aplok.
 */

import{world as e,EntityComponentTypes as t}from"@minecraft/server";export const getItems=e=>{let o=e.getComponent(t.Inventory),r=o.container,n=[];for(let s=0;s<r.size;s++){let c=r.getItem(s);c&&n.push(c)}return{inventory:o,container:r,items:n}};export const queryItems=(e,o)=>{let r=e.getComponent(t.Inventory),n=r.container,s=[],c=0;for(let p=0;p<n.size;p++){let a=n.getItem(p);a&&o.includes(a.typeId)&&(c+=a.amount,s.push(a))}return{inventory:r,container:n,items:s,amount:c}};export const playSound=(e,t,o={x:0,y:0,z:0},r=20,n={},s={})=>{if(e)for(let c of e.getPlayers(Object.assign({location:o,minDistance:0,maxDistance:r},s)))c.playSound(t,Object.assign({location:o},n))};export const convertText=e=>e?e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):null;export const removePrefix=e=>e?e.split(":").pop():null;export const getItemName=e=>e?`item.${removePrefix(e)}.name`:null;export const getOrCreateScoreboard=t=>{let o=e.scoreboard.getObjective(t);return o||(o=e.scoreboard.addObjective(t,t)),o};export const clamp=function(e,t,o){return Math.max(Math.min(e,o),t)};export const lerp=function(e,t,o){return e+(t-e)*o};export const log=e=>{console.warn(e)};
