// pipeline.js – 4‑Stufen‑Pipeline für RUN 8

import { VEC_CORE } from "./VEC_CORE.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { SYN_CORE } from "./syn.js";

export function PIPELINE_RUN8(input){
    
    // Stage 0 – VEC
    const vec = VEC_CORE(input.ion);

    // Stage 1 – FLX
    const flx = FLX_CORE({
        amplitude: vec.x,
        resonance: input.echo.resonance,
        origin: vec.z
    });

    // Stage 2 – FORM
    const matrix = FORM_MATRIX(input.formCore);
    const form = FORM_ENGINE(matrix, input.t);

    // Stage 8 – SYN (Move)
    const syn = SYN_CORE(input.mia, input.echo, form);

    return {
        stage0: vec,
        stage1: flx,
        stage2: form,
        stage8: syn,
        mode: "RUN8"
    };
}
