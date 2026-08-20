// pipeline.js – 4‑Stufen‑Pipeline für RUN 8
// MIT Fallbacks + Fehlerbehandlung

import { VEC_CORE } from "./VEC_CORE.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { SYN_CORE } from "./syn.js";

export function PIPELINE_RUN8(input) {
    // ─── Fallbacks ──────────────────────────────────────
    const safe = {
        ion: input?.ion || { pulse: 0, warp: 0, charge: 0 },
        echo: input?.echo || { resonance: 0, state: 'neutral' },
        mia: input?.mia || { fusion: 0 },
        formCore: input?.formCore || [],
        t: input?.t || 0
    };

    try {
        // Stage 0 – VEC
        const vec = VEC_CORE(safe.ion);

        // Stage 1 – FLX
        const flx = FLX_CORE({
            amplitude: vec.x || 0,
            resonance: safe.echo.resonance || 0,
            origin: vec.z || 0
        });

        // Stage 2 – FORM
        const matrix = FORM_MATRIX(safe.formCore);
        const form = FORM_ENGINE(matrix, safe.t);

        // Stage 8 – SYN (Move)
        const syn = SYN_CORE(safe.mia, safe.echo, form);

        return {
            stage0: vec,
            stage1: flx,
            stage2: form,
            stage8: syn,
            mode: "RUN8",
            time: safe.t,
            status: "success"
        };

    } catch (e) {
        return {
            mode: "RUN8",
            error: e.message,
            status: "failed",
            input: safe
        };
    }
}
