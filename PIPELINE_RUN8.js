// PIPELINE_RUN8.js – 4‑Stufen‑Pipeline

import { VEC_CORE } from "./VEC_CORE.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { SYN_CORE } from "./syn.js";

export function PIPELINE_RUN8(input) {
    const { ion, echo, mia, formCore, t = 0 } = input || {};

    // Stage 0 – VEC
    const vec = VEC_CORE({
        pulse: ion?.pulse ?? mia?.pulse ?? 0,
        warp: ion?.warp ?? echo?.warp ?? 0,
        charge: ion?.charge ?? mia?.charge ?? 0
    });

    // Stage 1 – FLX
    const flx = FLX_CORE({
        amplitude: vec.x,
        resonance: echo?.resonance ?? 0,
        origin: vec.z
    });

    // Stage 2 – FORM
    const matrix = FORM_MATRIX(formCore || []);
    const form = FORM_ENGINE(matrix, t);

    // Stage 8 – SYN
    const syn = SYN_CORE(
        mia || { fusion: 50 },
        echo || { state: 'loud', resonance: 30 },
        form
    );

    return {
        stage0: vec,
        stage1: flx,
        stage2: form,
        stage8: syn,
        mode: "RUN8",
        time: t
    };
}
