export function ARC_CORE(pul, ion, mia, echo){
    return {
        mode: "archive",
        lastPulse: pul,
        lastIon: ion,
        lastFusion: mia,
        lastEcho: echo
    };
}
