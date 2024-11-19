export function easeTargetVelocity(currentTarget, newTarget, easeFactor) {
    return {
        x: currentTarget.x + (newTarget.x - currentTarget.x) * easeFactor,
        y: currentTarget.y + (newTarget.y - currentTarget.y) * easeFactor,
        z: currentTarget.z + (newTarget.z - currentTarget.z) * easeFactor
    };
}