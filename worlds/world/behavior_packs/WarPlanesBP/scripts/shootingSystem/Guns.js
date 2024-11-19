export const PlaneGuns = {
    "l4gg:spitfire": {
        machineGun: {
            cooldown: 2,
            count: 8,
            bullet: "l4gg:machine_bullet",
            overheat: 260,
            positions: [0.25, -0.25, 0.7, -0.7, 1.1, -1.1, 1.5, -1.5 ],
            fireAnimation: "animation.plane.spitfire.shoot",
            projectile: {
                count: 1,
                id: "l4gg:bullet",
                power: 12,
                gravity: 0.15,
                uncertainty: 1
                
            },
            sounds: {
                fire: {
                    id: "ak47.fire"
                    
                }
            }
        }
    },
    "l4gg:sbd_dauntless": {
        machineGun: {
            cooldown: 2,
            count: 2,
            bullet: "l4gg:machine_bullet",
            overheat: 300,
            verticalPosition: 2.1,
            positions: [0.35, -0.35],
            fireAnimation: "animation.plane.sbd_dauntless.shoot",
            projectile: {
                count: 1,
                id: "l4gg:bullet",
                power: 12,
                gravity: 0.15,
                uncertainty: 1
                
            },
            sounds: {
                fire: {
                    id: "ak47.fire"
                    
                }
            }
        }
    },
    "l4gg:bf109": {
        machineGun: {
            cooldown: 2,
            count: 8,
            bullet: "l4gg:machine_bullet",
            overheat: 260,
            positions: [0, -0.3, 0.3],
            fireAnimation: "animation.plane.bf109.shoot",
            projectile: {
                count: 1,
                id: "l4gg:bullet",
                power: 12,
                gravity: 0.15,
                uncertainty: 0.6
                
            },
            sounds: {
                fire: {
                    id: "ak47.fire"
                    
                }
            }
        }
    },
}