// AIR6D_MOVE.js – kompatibel mit 2our Engine

import { VEC_CORE } from "./VEC_CORE.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { FORM_CORE } from "./FORM_CORE.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { SYN_CORE } from "./syn.js";

export function AIR6D_MOVE(mia, echo, t = 0){

    // Stage 0 – VEC (Pulse, Warp, Charge)
    const vec = VEC_CORE({
        pulse: mia.pulse,
        warp: echo.warp,
        charge: mia.charge
    });

    // Stage 1 – FLX (Resonanzkrümmung)
    const flx = FLX_CORE({
        amplitude: vec.x,
        resonance: echo.resonance,
        origin: vec.z
    });

    // Stage 2 – FORM (Etage, Modul, Aufgabe)
    const matrix = FORM_MATRIX(FORM_CORE);
    const form = FORM_ENGINE(matrix, t);

    // Stage 8 – SYN (Synchronisation)
    const syn = SYN_CORE(mia, echo, form);

    // Finaler 6D Move
    return {
        mode: "AIR6D",
        time: t,

        vector: {
            x: vec.x,
            y: vec.y,
            z: vec.z,
            magnitude: vec.magnitude
        },

        flex: {
            bend: flx.bend,
            curve: flx.curve,
            flight: flx.flight
        },

        form: {
            etage: form.etage,
            modul: form.modul,
            aufgabe: form.aufgabe,
            pulse: form.pulse,
            warp: form.warp,
            drift: form.drift,
            angle: form.angle
        },

        sync: {
            lock: syn.lock,
            stable: syn.stable
        }
    };
}
