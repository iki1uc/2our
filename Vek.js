export function VEC_CORE(ion){
    return {
        mode: "vector",
        x: ion.pulse,
        y: ion.warp,
        z: ion.charge
    };
}
