export const minSpeedForLift = 0.6
export const MaxTakeOffTime = 30
export const MaxAirTime = 100
export const AngleForLift = -30
export const Aircrafts = {
    "l4gg:spitfire": {
        acceleration: 0.035,
        brakes: -0.055,
        fuel: {
            max: 50,
            usagePerSecond: 0.083
        },
        rotationSpeed: {
            x: 3.9, y: 6, xMin: 1, yMin: 1.5, groundRotation: 4
        },
        takeOffRotation: -20,
        speed: {
            max: 1.8,
            moderate: 1.1,
            minForlift: 0.7,
            low: 0.3
        },
        
        camera: {
            distance: -14
        }
    },
    "l4gg:sbd_dauntless": {
        acceleration: 0.035,
        brakes: -0.055,
        fuel: {
            max: 50,
            usagePerSecond: 0.083
        },
        rotationSpeed: {
            x: 3, y: 4.5, xMin: 0.8, yMin: 1, groundRotation: 4
        },
        takeOffRotation: -20,
        speed: {
            max: 1.5,
            moderate: 1.1,
            minForlift: 0.7,
            low: 0.3
        },
        
        camera: {
            distance: -14
        }
    },
    "l4gg:bf109": {
        acceleration: 0.035,
        brakes: -0.055,
        fuel: {
            max: 50,
            usagePerSecond: 0.083
        },
        rotationSpeed: {
            x: 4, y: 6.5, xMin: 1, yMin: 1.5, groundRotation: 4
        },
        takeOffRotation: -20,
        speed: {
            max: 1.9,
            moderate: 1.1,
            minForlift: 0.7,
            low: 0.3
        },
        
        camera: {
            distance: -14
        }
    },
}
