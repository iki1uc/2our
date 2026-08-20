// AIR6D_MOVE.js – repariert & kompatibel mit RUN8

import { VEC_CORE } from "./VEC_CORE.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { FORM_CORE } from "./FORM_CORE.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { SYN_CORE } from "./syn.js";

export function AIR6D_MOVE(input) {
    // ─── Einheitliche Struktur ──────────────────────────
    const { ion, echo, mia, formCore, t = 0 } = input;

    // Stage 0 – VEC (Pulse, Warp, Charge)
    const vec = VEC_CORE({
        pulse: ion?.pulse ?? mia?.pulse ?? 0,
        warp: ion?.warp ?? echo?.warp ?? 0,
        charge: ion?.charge ?? mia?.charge ?? 0
    });

    // Stage 1 – FLX (Resonanzkrümmung)
    const flx = FLX_CORE({
        amplitude: vec.x,
        resonance: echo?.resonance ?? 0,
        origin: vec.z
    });

    // Stage 2 – FORM (Etage, Modul, Aufgabe)
    const matrix = FORM_MATRIX(formCore || FORM_CORE || []);
    const form = FORM_ENGINE(matrix, t);

    // Stage 8 – SYN (Synchronisation)
    const syn = SYN_CORE(
        mia || { fusion: 50 },
        echo || { state: 'loud', resonance: 30 },
        form
    );

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
