// BillyTheKidMove.js – Instant Pulse Kick

export function BillyTheKidMove(ion) {

    // 1. Instant‑Pulse (direkter Schuss)
    const pulse = ion.pulse * 3.0;

    // 2. Warp‑Snap (keine Kurve, nur Kick)
    const warp = ion.warp * 0.2;

    // 3. Charge‑Pop (kurzer Energie‑Impuls)
    const charge = ion.charge + 0.1;

    return {
        mode: "BillyTheKid",
        vector: {
            x: pulse,
            y: warp,
            z: charge,
            magnitude: Math.sqrt(pulse*pulse + warp*warp + charge*charge)
        },
        kick: true,
        instant: true
    };
}
