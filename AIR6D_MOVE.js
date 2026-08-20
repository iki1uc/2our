import { VEC_CORE } from "./VEC_CORE.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { FORM_CORE } from "./FORM_CORE.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { SYN_CORE } from "./syn.js";

export function AIR6D_MOVE(input) {

    const { ion, echo, mia, formCore, t = 0 } = input;

    // Stage 0 – VEC
    const vec = VEC_CORE({
        pulse: ion.pulse,
        warp: ion.warp,
        charge: ion.charge
    });

    // Stage 1 – FLX
    const flx = FLX_CORE({
        amplitude: vec.x,
        resonance: echo.resonance,
        origin: vec.z
    });

    // Stage 2 – FORM
    const matrix = FORM_MATRIX(formCore || FORM_CORE);
    const form = FORM_ENGINE(matrix, t);

    // Stage 8 – SYN
    const syn = SYN_CORE(mia, echo, form);

    return {
        mode: "AIR6D",
        time: t,
        vector: vec,
        flex: flx,
        form: form,
        sync: syn
    };
}
